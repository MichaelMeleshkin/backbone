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