App.View.TodoShareAddingFormView = Backbone.View.extend({
    tagName: 'li',
    template: '#todoShareAddingTemplate',
    shareList: '#shareList',
    titleTemplate: '#sharedTitle',
    events: {
        'click .share' : 'addShares'
    },
    initialize: function () {
        this.collection = this.model.get('share');
        this.collection.on('add', this.renderShareItem, this);
        this.collection.on('remove', this.renderShareList, this);
    },
    render: function() {
        var template = _.template( $(this.template).html() );
        this.$el.html( template(this.model.toJSON()) );
        // this.renderShareList();
        return this;
    },
    addShares: function () {
        var username = this.$('.username').val().trim();
        var isModelExist = this.model.get('share').find(function(model) {
            return model.get('name') === username;
        });

        if (!isModelExist || !username) {
            var share = new App.Model.Share({
                name: username
            });

            this.collection.add(share);
            this.model.save();
        }
    },
    renderShareListTitle: function () {
        this.$( this.shareList ).before( $( this.titleTemplate ).html() );
    },
    renderShareList: function () {
        if (this.collection.length && this.collection.length != 1) {
            this.renderShareListTitle();
        }
        this.$( this.shareList ).empty();
        this.collection.each(this.renderShareItem, this);
    },
    renderShareItem: function (model) {
        if (this.collection.length == 1) {
            this.renderShareListTitle();
        }
        var renderShareItem = new App.View.TodoShareAddingView({model: model});
        this.$( this.shareList ).append( renderShareItem.render().$el );
        renderShareItem.delegateEvents();
    }
});