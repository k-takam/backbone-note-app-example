'use strict';

var Backbone = require('backbone');
var NoteListItemView = require('./note_list_item').NoteListItemView;
var template = require("../template/note_form.hbs");

module.exports.NoteFormView = Backbone.View.extend({
    render: function () {
        this.$el.html(template(this.model.attributes));
        return this;
    },

    events: {
        'submit form': 'onSubmit'
    },

    onSubmit: function (event) {
        event.preventDefault();

        var attrs = {};
        attrs.title = this.$('.js-noteTitle').val();
        attrs.body = this.$('.js-noteBody').val();
        this.trigger('submit:form', attrs);
    }
});