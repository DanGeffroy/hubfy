import {Component} from '@angular/core';

 @Component({
     selector: 'quicknote',
     templateUrl: '/app/widgets/quicknote/quicknote.html',
     styleUrls: ['app/widgets/quicknote/quicknote.css']
 })

 export class Quicknote {
      newNoteTitle
      newNoteContent
      notes
     constructor() {
         this.newNoteTitle = '';
         this.notes = [];
     }
     addNote(event) {
        var todoObj = {
            title: this.newNoteTitle,
            content : this.newNoteContent
         }
         this.notes.push(todoObj);
         this.newNoteTitle = '';
         this.newNoteContent = '';
         event.preventDefault();
     }
     deleteNote(index) {
         this.notes.splice(index, 1);
     }
 }
