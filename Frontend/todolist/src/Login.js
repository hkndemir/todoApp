import axios from 'axios'
import swal from 'sweetalert';
import React, { useState } from "react"
import { useHistory } from 'react-router-dom';
export default function (props) {





  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }



  let [authMode, setAuthMode] = useState("signin")
  let history = useHistory();
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }



  const styles = {
    border: '70px solid rgba(0, 0, 0, 0.05)', 
  };
  const LoginUser = () => {   
    var name=inputs.username;
    var pass=inputs.password;
    axios.get('http://localhost:8080/login/'+name+'/'+pass, {         
      })
      .then(function (response) {
        if(response.data){       
          swal("Giriş Başarılı", "Notlarınızı Ekleyebilirsiniz.", "success");
          axios.get('http://localhost:8080/login/all')
               .then(function (response) {                                   
                 for(var i=0;i<response.data.length;i++){
                  if(response.data[i].username == inputs.username){
                    var userIdKontrol=response.data[i].id;
                    history.push('/list/user='+userIdKontrol)
                    window.location.reload();
                    break;
                  }
                 }
              })
        }else{
          swal("Giriş Başarısız", "Lütfen Tekrar Deneyiniz!", "error");
          history.push('/')
        }      
      })   
  }

  const CreateUser = () => {   
    var name=inputs.username;
    var pass=inputs.password;
    axios.post('http://localhost:8080/createUser', {
      username: name,
      password: pass
    })
    .then(function (response) {
      if(response.data){       
        swal("Kayıt Başarılı", "Giriş Sayfasına Yönlendiriliyorsunuz.", "success");
        window.location.reload();
      }else{
        swal("Kayıt Başarısız", "Çünkü Kaydınız var!", "error");   
      } 
    })
  }



  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
         <div style={styles}>
          <div  className="Auth-form-content">
            <h3 className="Auth-form-title">Giriş Yap</h3>
            <div className="text-center">
              Henüz Kaydınız Yok Mu?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Kayıt Ol
              </span>
            </div>
            <div className="form-group mt-3">
              <label >Kullanıcı Adı</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Lütfen Kullanıcı Adınızı Giriniz"
                name="username"
                value={inputs.username || ""} 
                onChange={handleChange}
                
              />
            </div>
            <div className="form-group mt-3">
              <label>Parola</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Lütfen Parolanızı Giriniz"
                name="password"
                value={inputs.password || ""} 
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button onClick={LoginUser}  className="btn btn-primary">
                Giriş Yap
              </button>
            </div>
            
          </div>
         </div>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <div style={styles}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Kayıt Ol</h3>
          <div className="text-center">
            Kaydınız var ise?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Giriş Yap
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Kullanıcı Adı</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Lütfen Kullanıcı Adı Oluşturunuz"
              name="username"
              value={inputs.username || ""} 
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Parola</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Lütfen Parolanızı Oluşturunuz"
              name="password"
              value={inputs.password || ""} 
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button  onClick={CreateUser}  className="btn btn-primary">
              Kayıt Ol
            </button>
          </div>
        </div>
        </div>
    </div>
  )
}