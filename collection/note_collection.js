'use strict';

var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');
var Note = require('../model/note').Note;

module.exports.NoteCollection = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage('Notes'),
    model: Note
});
