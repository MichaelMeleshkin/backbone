App.Model.Todo = Backbone.RelationalModel.extend({
    defaults: {
        status: null,
        id: this.cid
    },
    relations: [
        {
            type: Backbone.HasMany, // Use the type, or the string 'HasOne' or 'HasMany'.
            key: 'share',
            relatedModel: 'App.Model.Share',
            collectionType: 'App.Collection.TodoList',
            reverseRelation: {
                key: 'parent'
            }
        }
    ]

});