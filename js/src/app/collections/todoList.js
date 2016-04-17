App.Collection.TodoList = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("TodoList"),
    model: App.Model.Todo
});