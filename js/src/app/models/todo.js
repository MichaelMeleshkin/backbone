App.Model.Todo = Backbone.RelationalModel.extend({
    defaults: {
        status: null,
        id: this.cid,
        sharedTask: false
    },
    relations: [
        {
            type: Backbone.HasMany,
            key: 'share',
            relatedModel: 'App.Model.Share',
            collectionType: 'App.Collection.TodoList',
            reverseRelation: {
                key: 'parent'
            }
        }
    ]

});