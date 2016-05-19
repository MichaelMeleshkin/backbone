App.View.TodoShareAddingView = Backbone.View.extend({
    tagName: 'li',
    template: '#todoSharedListTemplate',
    events: {
        'click .remove' : 'removePerson'
    },
    initialize: function () {
        this.parent = this.model.get('parent');
    },
    render: function() {
        var template = _.template( $(this.template).html() );
        this.$el.html( template(this.model.toJSON()) );
        this.$el.addClass('person-' + Math.round(Math.random()*14 + 1));
        return this;
    },
    removePerson: function () {
        var parent = this.model.get('parent');

        var notification = new App.Model.Notification({
            username: this.model.get('name'),
            taskName: parent.get('title'),
            isNew: false
        });
        this.notificationCollection.add(notification);
        notification.save();
        
        this.model.destroy();
        parent.save();
        this.remove();
    }
});