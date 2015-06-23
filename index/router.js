'use strict';

var Backbone = require('backbone');
var Note = require('../model/note').Note;
var NoteCollection = require('../collection/note_collection').NoteCollection;
var NoteListView = require('../view/note_list').NoteListView;
var NoteControlView = require('../view/note_control').NoteControlView;
var NoteDetailView = require('../view/note_detail').NoteDetailView;
var NoteFormView = require('../view/note_form').NoteFormView;

module.exports.Router = Backbone.Router.extend({
    initialize: function (options) {
        this.noteCollection = options.collection;
        this.mainContainer = options.mainContainer;
        this.headerContainer = options.headerContainer;
    },

    routes: {
        'notes/:id': 'showNoteDetail',
        'new': 'showNewNote',
        'notes/:id/edit': 'showEditNote',
        'notes/search/:query': 'searchNote',
        '*actions': 'defaultRoute'
    },

    defaultRoute: function () {
        this.showNoteList();
        this.navigate('notes');
    },

    showNoteList: function (models) {
        if(!this.filteredCollection) {
            this.filteredCollection = new NoteCollection();
        }

        if(!this.mainContainer.has(NoteListView)) {
            var noteListView = new NoteListView({
                collection: this.filteredCollection
            });

            this.mainContainer.show(noteListView);
        }

        models = models || this.noteCollection.models;

        this.filteredCollection.reset(models);
        this.showNoteControl();
    },

    showNoteControl: function () {
        var noteControlView = new NoteControlView();

        noteControlView.on('submit:form', function(query) {
            this.searchNote(query);
            this.navigate('notes/search/' + query);
        }, this);

        this.headerContainer.show(noteControlView);
    },

    showNoteDetail: function (id) {
        var note = this.noteCollection.get(id);
        var noteDetailView = new NoteDetailView({
            model: note
        });

        this.mainContainer.show(noteDetailView);
        this.headerContainer.empty();
    },

    showNewNote: function () {
        var self = this;
        var noteFormView = new NoteFormView({
            model: new Note()
        });

        noteFormView.on('submit:form', function (attrs) {
            self.noteCollection.create(attrs);
            self.showNoteList();
            self.navigate('notes');
        });

        this.mainContainer.show(noteFormView);
        this.headerContainer.empty();
    },

    showEditNote: function (id) {
        var self = this;
        var note = this.noteCollection.get(id);
        var noteFormView = new NoteFormView({
            model: note
        });

        noteFormView.on('submit:form', function (attrs) {
            note.save(attrs);

            self.showNoteDetail(note.get('id'));
            self.navigate('notes/' + note.get('id'));
        });

        this.mainContainer.show(noteFormView);
    },

    searchNote: function (query) {
        var filtered = this.noteCollection.filter(function (note) {
            return note.get('title').indexOf(query) !== -1;
        });

        this.showNoteList(filtered);
    }
});
