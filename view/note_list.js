'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var NoteListItemView = require('./note_list_item').NoteListItemView;
var template = require("../template/note_list.hbs");

module.exports.NoteListView = Backbone.View.extend({
    tagName: 'table',
    className: 'table',

    initialize: function (options) {
        this.collection = options.collection;
        this.listenTo(this.collection, 'reset', this.render);
    },

    render: function () {
        this.removeItemViews();

        this.$el.html(template());

        this.renderItemViews();
        return this;
    },

    renderItemViews: function () {
        var $insertionPoint = this.$('.js-noteListItemView-container');

        this.itemViews = this.collection.map(function (note) {
            var itemView = new NoteListItemView({
                model: note
            });
            $insertionPoint.append(itemView.render().$el);
            return itemView;
        }, this);
    },

    removeItemViews: function () {
        _.invoke(this.itemViews, 'remove');
    }
});
