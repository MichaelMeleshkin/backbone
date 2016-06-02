App.View.TodoFormCreation = Backbone.View.extend({
    id: 'container',
    className: 'creation pin-' + Math.round(Math.random()*17 + 1),
    template: "#todoCreateTemplate",

    control: '#control',
    content: '#content',
    backToMainTemplate: '#todoBackToMainLinkTemplate',

    events : {
        'click .create' : 'createTodo',
        'focus .date' : 'clearValidation'
    },
    initialize: function() {
        App.Router.Events.on('create', this.renderForm, this);
    },
    renderForm: function() {
        this.$el.html( $( this.template ).html() );

        $( this.content )
            .empty()
            .append( this.$el );
        $( this.control ).html( $( this.backToMainTemplate ).html() );

        this.delegateEvents();
        this.$('.date').datepicker();
    },
    createTodo: function() {
        var date = this.$('.date').val(),
            pattern = /\d{2}\/\d{2}\/\d{4}/,
            isDateValid = pattern.test(date);

        if (date && isDateValid) {

            var todo = new App.Model.Todo({
                title: this.$('.title').val(),
                date: date,
                description: this.$('.description').val()
            });

            this.collection.add(todo);
            todo.save();
            this.collection.fetch();

        } else {

            this.$('.date').addClass('crossed');

        }
    },
    clearValidation: function () {
        this.$('.date').removeClass('crossed');
    }
});