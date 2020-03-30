import React, { Component } from 'react';

import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink coffe'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ]
  };

  createTodoItem(label) {
    return {
    label,
    important: false,
    done: false,
    id: this.maxId++,
    };
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)

      const newArray = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1)
      ];

      return {
        todoData: newArray
      }
    });
  };

  AddItem = (text) => {
    // gen id
    const newItem = this.createTodoItem(text);

     // add item to array

     this.setState(({todoData})=> {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
     });

  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
      const oldItem = arr[index];
      const newItem = {...oldItem,
        [propName]: !oldItem[propName ]};

        return [
          ...arr.slice(0, index),
          newItem,
          ...arr.slice(index + 1)
        ];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData })=> {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
  })
  };

  onToggleDone = (id) => {
    this.setState(({ todoData })=> {
        return {
          todoData: this.toggleProperty(todoData, id, 'done')
        }
    })
  };

  render() {

    const doneCount = this.state.todoData.filter((el)=> el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList todos={this.state.todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
          <ItemAddForm onItemAdded={this.AddItem} />
      </div>
    )
  }
};
