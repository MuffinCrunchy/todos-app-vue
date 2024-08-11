import axios from "axios";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
})

export default {
    getTodo(page = 1, size = 5) {
        return api.get(`/todos?_page=${page}&_limit=${size}`)
    },
    createTodo(todo) {
        return api.post(`/todos`, todo)
    },
    updateTodo(id, todo) {
        return api.put(`/todos/${id}`, todo)
    },
    deleteTodo(id) {
        return api.delete(`/todos/${id}`)
    }
}