$(document).ready(function(event) {
    var Container = Backbone.View.extend({
        el: '#container',
        events : {
            'click button' : 'createTodo'
        },
        initialize: function() {
            this.todoList = new TodoListView();
        },
        createTodo: function() {
            var todo = new Todo({
                title: this.$('.title').val(),
                description: this.$('.description').val()
            });
            this.todoList.collection.add(todo);
        }
    });

    var TodoListView = Backbone.View.extend({
        el: '#todoList',

        initialize : function() {
            _.bindAll(this, 'render', 'appendToList');
            this.collection = new TodoList();
            this.collection.bind('add', this.appendToList);
        },

        render:function(){

            $.each(this.collection.models, function(i, todo){
                self.appendToList(todo);
            });
        },

        appendToList: function(todo) {
            var todoView = new TodoView({
                model : todo
            });
            $(this.el).append(todoView.render().el);
        }
    });


    var Todo = Backbone.Model.extend({
        initialize: function(param) {
            this.name = param.name;
            this.description = param.description;
        }
    });

    var TodoView = Backbone.View.extend({
        tagName : 'li',
        render : function() {
            this.$el.html("<pre>Title: " + this.model.get('title') + "</br>Description: " + this.model.get('description') + "</pre>");
            return this;
        }
    });

    var TodoList = Backbone.Collection.extend({
        model: Todo
    });

    new Container();

//    Backbone.sync = function(method, model, options) {
//        console.log(method);
//        console.log(model);
//        console.log(options);
//
//
//
//
//    };
//
//    Backbone.sync();

});