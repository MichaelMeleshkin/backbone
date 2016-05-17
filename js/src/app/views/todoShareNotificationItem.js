App.View.TodoShareNotificationItemView = Backbone.View.extend({
    tagName: 'li',
    template: '#todoSharedNotificationItemTemplate',
    render: function() {
        var template = _.template( $(this.template).html() );
        this.$el.html( template(this.model.toJSON()) );
        return this;
    }
});