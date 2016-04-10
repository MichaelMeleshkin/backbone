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
            todo.save();
            this.todoList.collection.on('all', function(event) {
                console.log('all');
                console.log(event);
            });
        }
    });

    var TodoListView = Backbone.View.extend({
        el: '#todoList',

        initialize : function() {
            _.bindAll(this, 'render', 'appendToList');
            this.collection = new TodoList();
            this.collection.bind('add', this.appendToList);
//            this.collection.on('all', function(event) {
//                console.log('all');
//                console.log(event);
//            });
//            this.collection.on('sync', function(event) {
//                console.log('sync');
//            });
        },

        render:function(){

            $.each(this.collection.models, function(i, todo){
                self.appendToList(todo);
            });
            this.collection.sync();
        },

        appendToList: function(todo) {
            var todoView = new TodoView({
                model : todo
            });
            $(this.el).append(todoView.render().el);
        }
    });

    var TodoView = Backbone.View.extend({
        tagName : 'li',
        render : function() {
            this.$el.html("<pre>Title: " + this.model.get('title') + "</br>Description: " + this.model.get('description') + "</pre>");
            return this;
        }
    });

    var Todo = Backbone.Model.extend({
        initialize: function(param) {
            this.name = param.name;
            this.description = param.description;
        }
    });

    var TodoList = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("TodoList"),
        model: Todo
    });

    new Container();




});