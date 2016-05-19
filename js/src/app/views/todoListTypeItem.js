App.View.TodoListTypeItemView = Backbone.View.extend({
    todoList: '#todoList',
    tagName: 'li',
    events: {
        'click' : 'sorter'
    },
    initialize: function () {
        this.$el
            .addClass( this.model.className )
            .text( this.model.text );
    },
    render: function() {
        return this;
    },
    sorter: function () {
        if (this.model.className == 'all-tasks') {
            $( this.todoList )
                .find('li')
                .show();
        } else {
            $( this.todoList )
                .find('li')
                .hide()
                .end()
                .find( '.' + this.model.className )
                .show();
        }
    }
});