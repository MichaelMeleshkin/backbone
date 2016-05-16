App.View.TodoShareAddingView = Backbone.View.extend({
    tagName: 'li',
    template: '#todoSharedListTemplate',
    events: {
        'click .remove' : 'remove'
    },
    render: function() {
        var template = _.template( $(this.template).html() );
        this.$el.html( template(this.model.toJSON()) );
        return this;
    },
    remove: function () {
        console.log(this.model);
        var parent = this.model.get('parent');
        this.model.destroy();
        parent.save();
    }
});