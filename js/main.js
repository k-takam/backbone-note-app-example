'use strict';

var $ = require('jquery');
var NoteCollection = require('../model/note_collection').NoteCollection;
var Container = require('../view/container').Container;
var NoteListView = require('../view/note_list').NoteListView;

$(function() {
    var noteCollection = new NoteCollection([
        {
            title: 'テスト1',
            body: 'テスト1です。'
        }, {
            title: 'テスト2',
            body: 'テスト2です。'
        }
    ]);

    var mainContainer = new Container({
        el: '#main-container'
    });

    var noteListView = new NoteListView({
        collection: noteCollection
    });

    mainContainer.show(noteListView);

});
