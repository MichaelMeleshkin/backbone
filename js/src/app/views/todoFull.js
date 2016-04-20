App.View.TodoFullView = Backbone.View.extend({
    tagName: 'li',
    template: '#todoFullTemplate',
    events : {
        'click .delete' : 'deleteTodo'
    },
    deleteTodo: function() {
        this.model.destroy();
    },
    render: function() {
        var template = _.template( $(this.template).html() );
        this.$el.html( template(this.model.toJSON()) );
        return this;
    }
});