'use strict';

var Backbone = require('backbone');
var template = require("./noteListItemView-template.hbs");

module.exports.NoteListItemView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {
        this.listenTo(this.model, 'destroy', this.remove);
    },

    events: {
        'click .js-delete': 'onClickDelete'
    },

    render: function () {
        var html = template(this.model.toJSON());
        this.$el.html(html);
        return this;
    },

    onClickDelete: function (event) {
        event.preventDefault();
        this.model.destroy();
    }
});