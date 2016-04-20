App.View.TodoFormCreation = Backbone.View.extend({
    id: 'container',
    className: 'container',
    template: "#todoCreateTemplate",

    content: '#content',
    backToMainTemplate: '#todoBackToMainLinkTemplate',

    events : {
        'click .create' : 'createTodo'
    },
    initialize: function() {
        App.Router.Events.on('create', this.renderForm, this);
    },
    renderForm: function() {
        var $wrap = $("<div/>");

        this.$el.html( $( this.template ).html() );

        $( this.content )
            .empty()
            .append( $( this.backToMainTemplate ).html() )
            .append( this.$el );

        this.delegateEvents();
    },
    createTodo: function() {
        var todo = new App.Model.Todo({
            title: this.$('.title').val(),
            description: this.$('.description').val()
        });

        this.collection.add(todo);
        todo.save();
        this.collection.fetch();
        var id = this.collection.get(todo).id;
        if (id) {
            App.Router.Events.trigger('show', id);
        }
    }
});