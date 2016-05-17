App.Collection.TodoList = Backbone.Collection.extend({
    url: '/collection',
    model: App.Model.Todo
});