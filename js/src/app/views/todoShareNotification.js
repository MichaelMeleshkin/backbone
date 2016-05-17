App.View.TodoShareNotificationView = Backbone.View.extend({
    tagName: 'div',
    template: '#todoSharedNotificationTemplate',
    content: '#notification',
    notificationList: '#notificationList',
    renderRequires: false,
    events: {
        'click .confirm' : 'confirm'
    },
    initialize: function () {
        this.collection.on('sync', function () {
            if (this.collection.length) {
                this.render();
            }
        }, this);
    },
    render: function() {
        this.$el.empty();
        this.$el.html( $(this.template).html() );
        $( this.content ).html( this.el );
        this.renderAll();
    },
    renderAll: function() {
        this.collection.each(this.renderOne, this);

        return this;
    },
    renderOne: function(model) {
        var todoView = new App.View.TodoShareNotificationItemView({model: model});
        this.$( this.notificationList ).append( todoView.render().el );
    },
    confirm: function () {
        this.collection.each(function (model) {
            Backbone.sync('delete', model);
        }, this);
        this.remove();
    }
});