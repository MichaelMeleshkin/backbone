App.View.TodoShareListView = Backbone.View.extend({
    tagName: 'ul',
    id: 'shareList',
    initialize: function() {
        App.Router.Events.on('showShareAll', this.render, this);
    },
    render: function() {
        this.$el.empty();
        this.collection.each(this.renderNew, this);
        return this;
    },
    renderNew: function(todo) {
        var todoView = new App.View.TodoShareView({model: todo});
        this.$el.append( todoView.render().el );
    }
});