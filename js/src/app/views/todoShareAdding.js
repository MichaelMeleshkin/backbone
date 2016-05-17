App.View.TodoShareAddingView = Backbone.View.extend({
    tagName: 'li',
    template: '#todoSharedListTemplate',
    events: {
        'click .remove' : 'remove'
    },
    render: function() {
        var template = _.template( $(this.template).html() );
        this.$el.html( template(this.model.toJSON()) );
        return this;
    },
    remove: function () {
        $( '.shareListTitle' ).remove();
        var parent = this.model.get('parent');

        var notification = new App.Model.Notification({
            username: this.model.get('name'),
            taskName: this.model.get('parent').get('title'),
            isNew: false
        });
        this.notificationCollection.add(notification);
        notification.save();
        
        this.model.destroy();
        parent.save();
    }
});