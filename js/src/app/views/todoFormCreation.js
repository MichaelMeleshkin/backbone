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