App.View.TodoListTypeView = Backbone.View.extend({
    tagName: 'ul',
    className: 'types',
    render: function() {
        return this;
    },
    renderAll: function () {
        var allTasks = new App.View.TodoListTypeItemView({
            model: {
                className: 'all-tasks',
                text: 'All tasks'
            }
        });
        var today = new App.View.TodoListTypeItemView({
            model: {
                className: 'today',
                text: 'For today'
            }
        });
        var planned = new App.View.TodoListTypeItemView({
            model: {
                className: 'planned',
                text: 'Planned'
            }
        });
        var skipped = new App.View.TodoListTypeItemView({
            model: {
                className: 'skipped',
                text: 'Skipped'
            }
        });
        var noDate = new App.View.TodoListTypeItemView({
            model: {
                className: 'no-date',
                text: 'Without date'
            }
        });
        var completed = new App.View.TodoListTypeItemView({
            model: {
                className: 'completed',
                text: 'Completed'
            }
        });

        this.$el
            .append(allTasks.render().$el)
            .append(today.render().$el)
            .append(planned.render().$el)
            .append(skipped.render().$el)
            .append(noDate.render().$el)
            .append(completed.render().$el);

        allTasks.delegateEvents();
        today.delegateEvents();
        planned.delegateEvents();
        skipped.delegateEvents();
        noDate.delegateEvents();
        completed.delegateEvents();
    }
});