App.View.TodoShareView = Backbone.View.extend({
    tagName: 'li',
    template: '#todoSharedListTemplate',
    render: function() {
        var template = _.template( $(this.template).html() );
        this.$el.html( template( this.model.toJSON() ) );
        return this;
    }
});