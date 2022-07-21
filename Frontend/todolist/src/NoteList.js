import { Button, Table } from 'reactstrap';
import swal from 'sweetalert';
import React, { useState, useEffect } from 'react'
import service from './service'
import Welcome from './Login'
import alertify from "alertifyjs"
import { useHistory ,useLocation} from 'react-router-dom';
const styles = {
  float: 'right',
};

var baseUrl = (window.location).href; 
var usernum = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);

function NoteList() {
  const [note, setNote] = useState([])
  let history = useHistory();
  useEffect(() => {
    service.liste(usernum).then(result => {
      setNote(result.data)
    })
  })

  const deleteNote = (id) => {
    let del = { id }
    service.delete(del).then(() => alertify.success("Not Silindi", 1.5)).catch(() => alertify.danger("Note Silinemedi", 1.5));
  }

  const addNote = () => {
    history.push(`/add/user=${usernum}`)
  }
  
  const updateNote = (id) => {
    history.push(`/update/${id}/user=${usernum}`)
  }
  const logOut = () => {
    swal("Çıkış Yapılıyor","", "success");
    
    history.push('/')
    
  }

  return (
    <div >
      <Button onClick={() => addNote()} className="btn btn-success">Yeni Not Ekle</Button>
      <Button onClick={() => logOut()}  style={styles} className="btn btn-danger">Çıkış Yap</Button>
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Not Başlığı</th>
            <th>Not İçeriği</th>           
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            note.map((not, index) => (
              <tr key={index}>
                <th>{index}</th>
                <td>{not.title}</td>
                <td>{not.content}</td>               
                <td><button onClick={() => updateNote(not.note_id)} className="btn btn-success">Notu Düzenle</button></td>
                <td><button onClick={() => deleteNote(not.note_id)} className="btn btn-danger">Sil</button></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default NoteList;
