jQuery(function(){
    App.Collection.todoList = new App.Collection.TodoList();
    App.Collection.todoList.fetch();

    App.View.todoListView = new App.View.TodoListView({collection: App.Collection.todoList});

    App.View.todoFormCreation = new App.View.TodoFormCreation({collection: App.Collection.todoList});

    App.Router.todoRouter = new App.Router.TodoRouter();
    Backbone.history.start();
});