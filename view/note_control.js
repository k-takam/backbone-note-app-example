'use strict';

var Backbone = require('backbone');
var template = require("../template/note_control.hbs");

module.exports.NoteControlView = Backbone.View.extend({
    events: {
        'submit .js-search-form': 'onSubmit'
    },

    render: function () {
        this.$el.html(template());
        return this;
    },

    onSubmit: function (event) {
        event.preventDefault();

        var query = this.$('.js-search-query').val();
        this.trigger('submit:form', query);
    }
});