App.View.TodoView = Backbone.View.extend({
    tagName: 'li',
    template: '#todoListItemTemplate',
    initialize: function() {
        this.render();
    },
    render: function() {
        var template = _.template( $(this.template).html() );
        this.$el.html( template(this.model.toJSON()) );
        return this;
    }
});