App.View.TodoView = Backbone.View.extend({
    tagName: 'li',
    template: '#todoListItemTemplate',
    initialize: function() {
        this.render();
        this.$el.addClass('pin-' + Math.round(Math.random()*17 + 1));
    },
    render: function() {
        var template = _.template( $(this.template).html() );
        this.$el.html( template(this.model.toJSON()) );
        return this;
    }
});