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