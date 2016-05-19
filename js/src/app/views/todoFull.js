App.View.TodoFullView = Backbone.View.extend({
    tagName: 'li',
    template: '#todoFullTemplate',
    events : {
        'click .delete' : 'deleteTodo',
        'click .complete' : 'completeTodo'
    },
    initialize: function() {
        this.model.on('change:status', function() {
            this.$el.empty();
            $('<span/>').text('Task has been completed').appendTo(this.$el.delay(1500).fadeOut(500));
        }, this);
        this.$el.addClass('pin-' + Math.round(Math.random()*17 + 1));
    },
    deleteTodo: function() {
        this.model.destroy();
    },
    completeTodo: function() {
        this.model.set('status', 'completed');
        this.model.save();
    },
    render: function() {
        var template = _.template( $(this.template).html() );
        this.$el.html( template(this.model.toJSON()) );
        return this;
    }
});