App.Router.TodoRouter = Backbone.Router.extend({
    routes: {
        ''          :'readAll',
        'show/'     :'readAll',
        'create/'   :'create',
        'show/:id'  :'readTodo',
        'edit/:id'  :'editTodo',
        '*notFound' :'defaultTodo'
    },
    readAll: function() {
        App.Router.Events.trigger('showAll');
    },
    create: function() {
        App.Router.Events.trigger('create');
    },
    readTodo: function(id) {
        App.Router.Events.trigger('show', id);
    },
    editTodo: function(id) {
        App.Router.Events.trigger('edit', id);
    },
    defaultTodo: function(notFound) {
        var msg = '<h1>404 Page not found<br/><h3>URL: '+ notFound +'</h3></h1>';
        $('body').html(msg);
    }
});