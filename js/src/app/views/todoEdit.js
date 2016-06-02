App.View.TodoEditView = Backbone.View.extend({
    tagName: 'li',
    template: '#todoEditTemplate',
    events : {
        'click .edit' : 'saveTodo',
        'focus .date' : 'clearValidation'
    },
    initialize: function() {
        this.model.on('change', function() {
            App.Router.Events.trigger('show', this.id);
        });
        this.$el.addClass('pin-' + Math.round(Math.random()*17 + 1));
    },
    saveTodo: function() {
        var date = this.$('.date').val(),
            pattern = /\d{2}\/\d{2}\/\d{4}/,
            isDateValid = pattern.test(date);

        if (date && isDateValid) {

            this.model.set({
                title: this.$('.title').val(),
                date: this.$('.date').val(),
                description: this.$('.description').val()
            });
            this.model.save();

        } else {

            this.$('.date').addClass('crossed');

        }
    },
    clearValidation: function () {
        this.$('.date').removeClass('crossed');
    },
    render: function() {
        var template = _.template( $(this.template).html() );
        this.$el.html( template(this.model.toJSON()) );
        return this;
    }
});