import {createStore} from "vuex";
import api from "@/api/todos"

export default createStore({
    state: {
        todos: [],
        page: 1,
        size: 5
    },

    mutations: {
        setTodos(state, todos) {
            state.todos = todos;
        },
        addTodo(state, todo) {
            state.todos.unshift(todo);
        },
        updateTodo(state, { id, todo }) {
            const idx = state.todos.findIndex((todo) => todo.id === id);
            if (idx !== -1) {
                state.todos[idx] = { ...state.todos[idx], ...todo };
            }
        },
        deleteTodo(state, id) {
            state.todos = state.todos.filter(todo => todo.id !== id);
        },
        setPage(state, page) {
            state.page = page;
        }
    },

    actions: {
        async fetchTodos({ commit, state }) {
            const response = await api.getTodo(state.page, state.size)
            commit('setTodos', response.data)
        },
        async addTodo({ commit }, todo) {
            const response = await api.createTodo(todo)
            commit('addTodo', response.data)
        },
        async updateTodo({ commit }, { id, todo }) {
            await api.updateTodo(id, todo)
            commit('updateTodo', { id, todo })
        },
        async deleteTodo({ commit }, { id }) {
            await api.deleteTodo(id)
            commit('deleteTodo', id)
        }
    }
})