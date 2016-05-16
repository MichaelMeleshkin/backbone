App.View.TodoListView = Backbone.View.extend({
    tagName: 'ul',
    id: 'todoList',
    categories: '#tasksCategoryTemplate',

    content: '#content',
    createNewLinkTemplate: '#todoCreateLinkTemplate',
    editTodoTemplate: '#todoEditTemplate',
    backToMainTemplate: '#todoBackToMainLinkTemplate',
    sharedForTemplate: '#todoSharedForTemplate',
    additionalTemplate: '',

    initialize: function() {
        this.collection.on('sync', this.renderAll, this);
        this.collection.on('destroy', this.destroyed, this);
        App.Router.Events.on('showAll', this.renderAll, this);
        App.Router.Events.on('show', this.renderByID, this);
        App.Router.Events.on('edit', this.editByID, this);
        // App.Router.Events.on('addShare', this.addingShares, this);
        
        App.Router.Events.on('share', this.shareByID, this);

        $( '#tasks-category' ).on('change', function() {
            App.Router.Events.trigger('showAll');
        });
    },
    render: function() {
        var $content = $( this.content ).empty();
        $content.append( $( this.additionalTemplate ).html() );
        $content.append( $( this.$el ) );
    },
    renderAll: function() {
        this.$el.empty();
        this.collection.each(this.renderNew, this);

        this.additionalTemplate = this.createNewLinkTemplate;
        this.render();
        return this;
    },
    renderNew: function(todo) {
        var type = +$('#tasks-category').val();
        var todoView = new App.View.TodoView({model: todo});

        var date = todo.get('date').split('/');
        var now = new Date();

        if (type == 0) {
            this.$el.append( todoView.render().el );
        } else if (type == 1) {
            if (+date[0] == now.getMonth() + 1 && +date[1] == now.getDate() && +date[2] == now.getFullYear()) {
                this.$el.append( todoView.render().el );
            }
        } else if (type == 2) {
            if (+date[0] == now.getMonth() + 1 && +date[1] > now.getDate() && +date[2] == now.getFullYear()) {
                this.$el.append( todoView.render().el );
            }
        } else if (type == 3) {
            if (todo.get('status') == 'completed') {
                this.$el.append( todoView.render().el );
            }
        } else if (type == 4) {
            if (+date[0] == now.getMonth() + 1 && +date[1] < now.getDate() && +date[2] == now.getFullYear()) {
                this.$el.append( todoView.render().el );
            }
        }



    },
    renderByID: function(id) {
        var model = this.collection.get(id);
        if (!model) {
            App.Router.todoRouter.navigate('show', true);
        } else {
            var todoFullView = new App.View.TodoFullView({model: model});

            this.$el.html( todoFullView.render().el );
            this.additionalTemplate = this.backToMainTemplate;
            this.render();
            todoFullView.delegateEvents();
        }
    },
    editByID: function(id) {
        var model = this.collection.get(id);

        var todoEditView = new App.View.TodoEditView({model: model});

        this.$el.html( todoEditView.render().el );
        this.additionalTemplate = this.backToMainTemplate;
        this.render();
        todoEditView.delegateEvents();
    },
    destroyed: function() {
        this.$el.empty();
        $('<li/>').text('Task has been deleted').delay(1500).fadeOut(500).appendTo(this.$el);
    },

    shareByID: function (id) {
        var model = this.collection.get(id);

        var shareAddingForm = new App.View.TodoShareAddingFormView({model: model});
        this.$el.html( shareAddingForm.render().$el );
        this.additionalTemplate = this.backToMainTemplate;

        this.render();

        shareAddingForm.renderShareList();
        shareAddingForm.delegateEvents();
    }

    // addingShares: function () {
    //     this.$el.empty();
    //     var form = new App.View.TodoShareAddingFormView();
    //     this.$el.append(form.render().el);
    //
    //     this.collection.each(this.renderOneShare, this);
    //
    //     this.render();
    //     form.delegateEvents();
    //     return this;
    // },
    // renderOneShare: function(todo) {
    //     var todoView = new App.View.TodoShareAddingView({model: todo});
    //     this.$el.append(todoView.render().el);
    // },
    // addShares: function () {
    //     console.log('add');
    // }
});