'use strict';

var Backbone = require('backbone');
var NoteListItemView = require('./note_list_item').NoteListItemView;
var template = require("./noteListView-template.hbs");

module.exports.NoteListView = Backbone.View.extend({
    tagName: 'table',
    className: 'table',

    initialize: function (options) {
        this.collection = options.collection;
    },

    render: function () {
        this.$el.html(template());

        this.renderItemViews();
        return this;
    },

    renderItemViews: function () {
        var $insertionPoint = this.$('.js-noteListItemView-container');

        this.collection.each(function (note) {
            var itemView = new NoteListItemView({
                model: note
            });
            $insertionPoint.append(itemView.render().$el);
        }, this);
    }

});