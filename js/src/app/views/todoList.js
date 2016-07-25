App.View.TodoListView = Backbone.View.extend({
    tagName: 'ul',
    id: 'todoList',
    categories: '#tasksCategoryTemplate',

    control: '#control',
    content: '#content',
    listTypeCont: '#listType',
    createNewLinkTemplate: '#todoCreateLinkTemplate',
    editTodoTemplate: '#todoEditTemplate',
    backToMainTemplate: '#todoBackToMainLinkTemplate',
    sharedForTemplate: '#todoSharedForTemplate',
    additionalTemplate: '',

    initialize: function() {
        this.collection.on('sync', function () {
            App.Router.todoRouter.navigate('show', true);
        }, this);
        this.collection.on('destroy', this.destroyed, this);
        App.Router.Events.on('showAll', this.renderAll, this);
        App.Router.Events.on('show', this.renderByID, this);
        App.Router.Events.on('edit', this.editByID, this);
        
        App.Router.Events.on('share', this.shareByID, this);
    },
    render: function() {
        var $content = $( this.content ).empty();
        $( this.control ).html( $( this.additionalTemplate ).html() );
        $content.append( $( this.$el ) );
        $( this.listTypeCont ).empty();
    },
    renderAll: function() {
        this.$el.empty();
        this.collection.each(this.renderNew, this);

        this.additionalTemplate = this.createNewLinkTemplate;
        this.render();

        var listType = new App.View.TodoListTypeView();
        $( this.listTypeCont ).html( listType.render().$el );
        listType.renderAll();

        return this;
    },
    renderNew: function(todo) {
        var todoView = new App.View.TodoView({model: todo});

        var $todo = todoView.render().$el;

        console.log();
        if (todo.get('date')) {

            var date = todo.get('date').split('/'),
                now = new Date(),
                isCurrentMonth = +date[0] == now.getMonth() + 1,
                isCurrentYear = +date[2] == now.getFullYear(),
                isCurrentDay = +date[1] == now.getDate(),

                isPlannedMonth = +date[0] > now.getMonth() + 1,
                isPlannedYear = +date[2] > now.getFullYear(),
                isPlannedDay = +date[1] > now.getDate(),

                isSkippedMonth = +date[0] > now.getMonth() + 1,
                isSkippedYear = +date[2] > now.getFullYear(),
                isSkippedDay = +date[1] > now.getDate(),

                isToday = ( isCurrentDay && isCurrentMonth && isCurrentYear ),
                isPlanned = ( isPlannedYear || (isCurrentYear && isPlannedMonth) || (isCurrentYear && isCurrentMonth && isPlannedDay) ),
                isSkipped = ( isSkippedYear || (isCurrentYear && isSkippedMonth) || (isCurrentYear && isCurrentMonth && isSkippedDay) );

            if ( isToday ) {
                $todo.addClass('today');
            } else if ( isPlanned ) {
                $todo.addClass('planned');
            } else if ( isSkipped ) {
                $todo.addClass('skipped');
            }

        } else {
            $todo.addClass('no-date');
        }

        if (todo.get('status') == 'completed') {
            $todo.addClass('completed');
        }

        this.$el.append( $todo );
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
        $('.date').datepicker();
    },
    destroyed: function() {
        this.$el.empty();
        $('<li/>').text('Task has been deleted').delay(1500).fadeOut(500).appendTo(this.$el);
    },

    shareByID: function (id) {
        var model = this.collection.get(id);

        var shareAddingForm = new App.View.TodoShareAddingFormView({model: model});
        shareAddingForm.notificationCollection = this.notificationCollection;

        this.$el.html( shareAddingForm.render().$el );
        this.additionalTemplate = this.backToMainTemplate;

        this.render();

        shareAddingForm.renderShareList();
        shareAddingForm.delegateEvents();
    }
});