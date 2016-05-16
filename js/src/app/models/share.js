App.Model.Share = Backbone.RelationalModel.extend({
    defaults: {
        name: null,
        notification: true,
        remove: false
    }
});