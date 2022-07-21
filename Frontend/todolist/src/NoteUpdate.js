import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Modal from "react-modal"
import { GrFormClose } from "react-icons/gr";
import service from './service'
import alertify from "alertifyjs"
var baseUrl = (window.location).href; 
var usernum = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
export default function NoteUpdate(props) {
    const [id, setId] = useState(props.match.params.id)
    const [modalIsOpen, setModalIsOpen] = useState(true)
    let history = useHistory();
    const [title, setTitle] = useState("")
    const [content, setContents] = useState("")

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen)
        history.push(`/list/user=${usernum}`)
    }

    useEffect(() => {
        service.getById(id).then(res => {
            let note = res.data
            setTitle(note.title)
            setContents(note.content)
        })
    }, [])

    const update = () => {
        let note = { note_id: id, title: title, content: content , user_id:usernum }
        service.update(note).then(() => alertify.success("Not Düzenlendi", 1.5), history.push(`/list/user=${usernum}`)).catch(() => alertify.danger("Not Düzenlenemdi", 1.5), history.push(`/list/user=${usernum}`))
    }

    return (
        <div className="container card col-md-6 offset-md-3 offset-md-3">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={toggleModal}
                className="about-modal"
                overlayClassName="about-modal-overlay"
            >
                <button onClick={toggleModal} className="modal-close-btn">
                    <GrFormClose />
                </button>
                <div className="card-body">
                    <form>
                        <div className="text-center">Notu Düzenle</div>
                        <br />
                        <input
                            placeholder="Not Başlığı Giriniz"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                            className="form-control"
                        />
                        <br />
                        <textarea
                            placeholder="Not İçeriği Giriniz"
                            onChange={e => setContents(e.target.value)}
                            value={content}
                            className="form-control"
                        />
                        <br />
                        <button onClick={() => update()} className="btn btn-success">Notu Kaydet</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
