'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var NoteCollection = require('../collection/note_collection').NoteCollection;
var Container = require('../view/container').Container;
var Router = require('./router').Router;

var initializeNotes = function () {
    var noteCollection = new NoteCollection([
        {
            title: 'タイトル1',
            body: 'テスト1です。'
        },
        {
            title: 'タイトル2',
            body: 'テスト2です。'
        },
        {
            title: 'タイトル3',
            body: 'テスト3です。'
        }
    ]);

    noteCollection.each(function (note) {
        note.save();
    });

    return noteCollection.models;
};

$(function () {
    var noteCollection = new NoteCollection();
    var mainContainer = new Container({
        el: '#main-container'
    });
    var headerContainer = new Container({
        el: '#header-container'
    });

    noteCollection.fetch().then(function (notes) {
        if (notes.length === 0) {
            var models = initializeNotes();
            noteCollection.reset(models);
        }

        var router = new Router({
            collection: noteCollection,
            mainContainer: mainContainer,
            headerContainer: headerContainer
        });
        Backbone.history.start();
    });
});
