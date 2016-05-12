App.Collection.TodoList = Backbone.Collection.extend({
    // localStorage: new Backbone.LocalStorage("TodoList"),
    url: '/collection',
    model: App.Model.Todo
});