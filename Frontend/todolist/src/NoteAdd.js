import { useState } from "react"
import service from "./service"
import { useHistory } from 'react-router-dom';
import alertify from "alertifyjs"
var baseUrl = (window.location).href; 
var usernum = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
export default function NoteAdd() {
    const [title, setTitle] = useState("")
    const [content, setContents] = useState("")
    let history = useHistory();

    const add = () => {
        let note = { title: title, content: content, user_id:usernum }
        service.add(note).then(() => alertify.success("Not Eklendi", 1.5), history.push(`/list/user=${usernum}`)).catch(() => alertify.danger("Not Eklenemedi", 1.5), history.push(`/list/user=${usernum}`))
    }

    return (
        <div className="container card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
                <form>
                    <div className="text-center">Not Ekle</div>
                    <br />
                    <input
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Not Başlığı"
                        className="form-control"
                    />
                    <br />
                    <textarea
                        onChange={e => setContents(e.target.value)}
                        placeholder="Not içeriği"
                        className="form-control"
                    />
                    <br />
                    <button className="btn btn-success" onClick={() => add()}>Notu Ekle</button>
                </form>
            </div>

        </div>
    )

}
