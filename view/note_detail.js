'use strict';

var Backbone = require('backbone');
var template = require("../template/note_detail.hbs");

module.exports.NoteDetailView = Backbone.View.extend({
    render: function () {
        this.$el.html(template(this.model.attributes));
        return this;
    }
});