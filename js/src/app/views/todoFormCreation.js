App.View.TodoFormCreation = Backbone.View.extend({
    id: 'container',
    className: 'creation pin-' + Math.round(Math.random()*17 + 1),
    template: "#todoCreateTemplate",

    control: '#control',
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
            .append( this.$el );
        $( this.control ).html( $( this.backToMainTemplate ).html() );

        this.delegateEvents();
        this.$('.date').datepicker();
    },
    createTodo: function() {
        var todo = new App.Model.Todo({
            title: this.$('.title').val(),
            date: this.$('.date').val(),
            description: this.$('.description').val()
        });

        this.collection.add(todo);
        todo.save();
        this.collection.fetch();
    }
});