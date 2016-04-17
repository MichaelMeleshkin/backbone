jQuery(function(){
    window.App = {
        View: {},
        Model: {},
        Collection: {}
    };

    App.Model.Todo = Backbone.Model.extend({

    });

    App.View.TodoView = Backbone.View.extend({
        tagName: 'li',
        template: '#todoTemplate',
        events : {
            'click .delete' : 'deleteTodo',
            'click .update' : 'toggleTodo',
            'click .cancel' : 'toggleTodo',
            'click .save' : 'saveTodo'
        },
        initialize: function() {
            this.render();
            this.model.on('change', function() {
                this.render();
            }, this);
            this.model.on('destroy', function() {
                this.$el.remove();
            }, this);
        },
        deleteTodo: function() {
            this.model.destroy();
        },
        toggleTodo: function() {
            this.$('.container, .save, .update, .info, .delete, .cancel').toggle();
        },
        saveTodo: function() {
            this.model.set({
                title: this.$('.title').val(),
                description: this.$('.description').val()
            });
            this.model.save();
        },
        render: function() {
            var template = _.template( $(this.template).html() );
            this.$el.html( template(this.model.toJSON()) );
            return this;
        }
    });

    App.Collection.TodoList = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("TodoList"),
        model: App.Model.Todo
    });

    App.View.TodoListView = Backbone.View.extend({
        el: '#todoList',
        tagName: 'ul',
        template: '#todoTemplate',
        initialize: function() {
            this.render();
            this.collection.on('add', this.renderNew, this);
        },
        render: function() {
            this.$el.empty();
            this.collection.each(function(todo) {
                this.renderNew(todo);
            }, this);
            return this;
        },
        renderNew: function(todo) {
            var todoView = new App.View.TodoView({model: todo});
            this.$el.append( todoView.render().el );
        }
    });

    App.View.TodoFormCreation = Backbone.View.extend({
        el: '#container',
        events : {
            'click button' : 'createTodo'
        },
        createTodo: function() {
            var todo = new App.Model.Todo({
                title: this.$('.title').val(),
                description: this.$('.description').val()
            });

            this.collection.add(todo);
            todo.save();
            this.collection.fetch();
        }
    });

    App.Collection.todoList = new App.Collection.TodoList();
    App.Collection.todoList.fetch();

    new App.View.TodoListView({collection: App.Collection.todoList});

    new App.View.TodoFormCreation({collection: App.Collection.todoList});
});