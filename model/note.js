'use strict';

var Backbone = require('backbone');

module.exports.Note = Backbone.Model.extend({
    defaults: {
        title: '',
        body: ''
    }
});
