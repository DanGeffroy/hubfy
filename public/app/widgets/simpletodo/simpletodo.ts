import {Component} from '@angular/core';

 @Component({
     selector: 'simpletodo',
     templateUrl: '/app/widgets/simpletodo/simpletodo.html',
     styleUrls: ['app/widgets/simpletodo/simpletodo.css']
 })

 export class Simpletodo {
      newTodo
      todos
     constructor() {
         this.newTodo = '';
         this.todos = [];
     }
     addTodo(event) {
        var todoObj = {
             newTodo: this.newTodo,
             complete: false
         }
         this.todos.push(todoObj);
         this.newTodo = '';
         event.preventDefault();
     }
     deleteTodo(index) {
         this.todos.splice(index, 1);
     }
 }
