App.View.TodoListView = Backbone.View.extend({
    tagName: 'ul',
    id: 'todoList',

    content: '#content',
    createNewLinkTemplate: '#todoCreateLinkTemplate',
    editTodoTemplate: '#todoEditTemplate',
    backToMainTemplate: '#todoBackToMainLinkTemplate',
    additionalTemplate: '',

    initialize: function() {
        this.collection.on('destroy', this.destroyed, this);
        App.Router.Events.on('showAll', this.renderAll, this);
        App.Router.Events.on('show', this.renderByID, this);
        App.Router.Events.on('edit', this.editByID, this);
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
        var todoView = new App.View.TodoView({model: todo});
        this.$el.append( todoView.render().el );
    },
    renderByID: function(id) {
        var model = this.collection.get(id);
        if (!model) {
            App.Router.todoRouter.navigate('show/', true);
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
    }
});