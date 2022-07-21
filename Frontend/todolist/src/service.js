import axios from 'axios'

const list = "http://localhost:8080/api/note/list"
const del = "http://localhost:8080/api/note/delete"
const add = "http://localhost:8080/api/note/add"
const getId = "http://localhost:8080/api/note/"
const update = "http://localhost:8080/api/note/update"

class NoteService {
    liste(id) {
        return axios.get(list+"/"+id);
    }
    delete(note) {
        return axios.delete(del, {
            data: {
                note_id: note.id
            }
        })
    }
    add(note) {
        return axios.post(add, note)
    }
    getById(id) {
        return axios.get(getId + id)
    }
    update(note){
        return axios.post(update, note)
    }
}

export default new NoteService()