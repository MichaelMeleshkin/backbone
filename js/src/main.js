jQuery(function(){
    window.App = {};
    window.App.View = {};
    window.App.Model = {};
    window.App.Collection = {};

    window.App.Instanse = {};

    window.App.Model.Todo = Backbone.Model.extend({

    });

    window.App.View.TodoView = Backbone.View.extend({
        tagName: 'li',
        template: '#todoTemplate',
        events : {
            'click .delete' : 'deleteTodo',
            'click .update' : 'updateTodo',
            'click .cancel' : 'cancelTodo',
            'click .save' : 'saveTodo'
        },
        initialize: function() {
            this.render();
        },
        deleteTodo: function() {
            this.model.destroy();
        },
        updateTodo: function() {
            this.$('.container, .save, .update, .info, .delete, .cancel').toggle();
        },
        cancelTodo: function() {
            this.$('.container, .save, .update, .info, .delete, .cancel').toggle();
        },
        saveTodo: function() {
            this.model.set('title', this.$('.title').val());
            this.model.set('description', this.$('.description').val());
            this.model.save();
        },
        render: function() {
            var template = _.template( $(this.template).html() );
            this.$el.html( template(this.model.toJSON()) );
            return this;
        }
    });

    window.App.Collection.TodoList = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("TodoList"),
        model: window.App.Model.Todo,
        initialize: function() {
            this.fetch();
            this.on('add remove change', function() {
                window.App.Instanse.TodoListView = new window.App.View.TodoListView({collection: window.App.Collection.todoList});
            });
        }
    });

    window.App.View.TodoListView = Backbone.View.extend({
        tagName: 'ul',
        id: 'todoList',
        template: '#todoTemplate',
        parentEl: '#todoListWrap',
        initialize: function() {
            $( this.parentEl ).html( this.render().el );
        },
        render: function() {
            this.collection.each(function(todo) {
                var todoView = new window.App.View.TodoView({model: todo});
                this.$el.append( todoView.render().el );
            }, this);
            return this;
        }
    });

    window.App.View.Container = Backbone.View.extend({
        el: '#container',
        events : {
            'click button' : 'createTodo'
        },
        createTodo: function() {
            var todo = new window.App.Model.Todo({
                title: this.$('.title').val(),
                description: this.$('.description').val()
            });

            this.collection.add(todo);
            todo.save();
            this.collection.fetch();
        }
    });

    window.App.Collection.todoList = new window.App.Collection.TodoList();
    window.App.Instanse.TodoListView = new window.App.View.TodoListView({collection: window.App.Collection.todoList});

    window.App.Instanse.Container = new window.App.View.Container({collection: window.App.Collection.todoList});
});