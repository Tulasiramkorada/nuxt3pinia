import { FilterTodos } from './../../.nuxt/components.d';
// import { FilterTodos } from './../.nuxt/components';
import { defineStore } from "pinia"

//  import axios from "axios";
//  import { useStore } from "~/stores/myStore";

// const state = {
//   todos: [],
// };

// const getters = {
//   allTodos: (state) => state.todos,
// };

// const actions = {
//   async fetchTodos({ commit }) {
//     // const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/todos"
//     );

//     commit("setTodos", response.data);
//   },
//   async addTodo({ commit }, title) {
//     const response = await axios.post(
//       "https://jsonplaceholder.typicode.com/todos",
//       { title, completed: false }
//     );

//     commit("newTodo", response.data);
//   },
//   async deleteTodo({ commit }, id) {
//     await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

//     commit("removeTodo", id);
//   },
//   async filterTodos({ commit }, e) {
//     // Get selected number
//     const limit = parseInt(
//       e.target.options[e.target.options.selectedIndex].innerText
//     );

//     const response = await axios.get(
//       `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
//     );

//     commit("setTodos", response.data);
//   },
//   async updateTodo({ commit }, updTodo) {
//     const response = await axios.put(
//       `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
//       updTodo
//     );

//     console.log(response.data);

//     commit("updateTodo", response.data);
//   },
// };

// const mutations = {
//   setTodos: (state, todos) => (state.todos = todos),
//   newTodo: (state, todo) => state.todos.unshift(todo),
//   removeTodo: (state, id) =>
//     (state.todos = state.todos.filter((todo) => todo.id !== id)),
//   updateTodo: (state, updTodo) => {
//     const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
//     if (index !== -1) {
//       state.todos.splice(index, 1, updTodo);
//     }
//   },
// };

// export default {
  
//   state,
//   getters,
//   actions,
//   mutations,
// };
// import { createPinia } from "pinia";


// const pinia = createPinia();

// export default pinia;
// import { defineStore } from "pinia";
import { AddTodo } from "~~/.nuxt/components";
import { TodoItem } from "~~/types/index";


export const useTodoStore = defineStore('todos', {
  state: () => ({todos: [] as TodoItem[]}),

  actions: {
    async fetchTodos() {
    const response = await $fetch<TodoItem[]>(
      'https://jsonplaceholder.typicode.com/todos'
    )
     this.todos = response;
    },
  
  
    async addTodo(title: string) {
      const response = await $fetch<TodoItem> (
        "https://jsonplaceholder.typicode.com/todos",{
        method: "POST",
        body:{
          title:title,
             },
      })
      this.todos.unshift(response);
    }, 
    async deleteTodo(id: number) {
      const responce = await
      $fetch<TodoItem> (`https://jsonplaceholder.typicode.com/todos/${id}`,{
        method: "DELETE",
       
      });
      this.todos = this.todos.filter(todo => todo.id !==id)
    },
    async updateTodo(updTodo) {
      const response = await $fetch<TodoItem> (`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
      {
        method: "PUT", body:{
          title:updTodo.title,
          completed:updTodo.completed
        }
       
      })
      var index = this.todos.findIndex(todo => todo.id === updTodo.id)
      if(index !== -1){
        this.todos.splice(index,1,updTodo)
      }
    },
   async filterTodos(e) {
    const limit = parseInt( e.target.value );
    const response = await $fetch (`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
    this.todos = response;
   },
    
  }
})