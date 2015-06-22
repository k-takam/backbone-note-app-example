'use strict';

var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');
var Note = require('./note').Note;

module.exports.NoteCollection = Backbone.Collection.extend({
    localStrage: new Backbone.LocalStorage('Notes'),
    model: Note
});
