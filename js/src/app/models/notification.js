App.Model.Notification = Backbone.RelationalModel.extend({
    defaults: {
        username: null,
        taskName: null,
        isNew: true
    }
});