App.Model.Todo = Backbone.Model.extend({
    defaults: {
        status: null,
        id: this.cid
    }
});