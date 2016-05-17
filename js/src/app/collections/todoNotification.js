App.Collection.TodoNotifications = Backbone.Collection.extend({
    url: '/notification',
    model: App.Model.Notification
});