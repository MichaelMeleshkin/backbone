jQuery(function(){
    App.Collection.todoList = new App.Collection.TodoList();

    App.Collection.todoNotifications = new App.Collection.TodoNotifications();

    $.when(App.Collection.todoList.fetch(), App.Collection.todoNotifications.fetch())
        .then(function () {
            App.View.todoListView = new App.View.TodoListView({collection: App.Collection.todoList});
            App.View.todoListView.notificationCollection = App.Collection.todoNotifications;

            App.Router.todoRouter = new App.Router.TodoRouter();
            Backbone.history.start();
        });

    App.View.todoShareNotificationView = new App.View.TodoShareNotificationView({collection: App.Collection.todoNotifications});

    App.View.todoFormCreation = new App.View.TodoFormCreation({collection: App.Collection.todoList});
});