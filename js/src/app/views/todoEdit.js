App.View.TodoEditView = Backbone.View.extend({
    tagName: 'li',
    template: '#todoEditTemplate',
    events : {
        'click .edit' : 'saveTodo'
    },
    initialize: function() {
        this.model.on('change', function() {
            App.Router.Events.trigger('show', this.id);
        });
        this.$el.addClass('pin-' + Math.round(Math.random()*17 + 1));
    },
    saveTodo: function() {
        this.model.set({
            title: this.$('.title').val(),
            date: this.$('.date').val(),
            description: this.$('.description').val()
        });
        this.model.save();
    },
    render: function() {
        var template = _.template( $(this.template).html() );
        this.$el.html( template(this.model.toJSON()) );
        this.$('.date').datepicker();
        return this;
    }
});