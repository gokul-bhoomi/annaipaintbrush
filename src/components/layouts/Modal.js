import React,{useState} from 'react'
import emailjs from 'emailjs-com' 
import M from 'materialize-css/dist/js/materialize.min.js';

const Modal = () => {

     const initialState = {
       name:'',
       email:'',
       phone: '',
       message:''
     }
     const [state, setstate] = useState(initialState)

     const onChange = (e)=>{
       setstate({...state,[e.target.name]:e.target.value})
     }

     const onSubmit = (e)=>{

      e.preventDefault();

      emailjs.sendForm("gmail",
      "enquiry",
      ".contact_form_class",
      "user_qUwfyg8Rt1mateAvpSIap"

      ).then(() => { M.toast({ html: "Submitted Successfully !" }); }).catch(() => () => { M.toast({ html: "Something Went Wrong !" }); });

      setstate({  name:'',
      email:'',
      phone: '',
      message:''})

     }
    return (
    <div id="modal1" className="modal" onSubmit={onSubmit}>
      <div className="modal-content">
          <form className="contact_form_class col s12" onChange={onChange}>
              <div className="column">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="name2" name='name' type="text" value={state.name} className="validate" required />
                            <label htmlFor="name2">Name</label>
                        </div>

                    </div>
                    <div className="column">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">email
</i>
                            <input id="email2" name='email' type="email" value={state.email} className="validate" />
                            <label htmlFor="email2">Email</label>
                        </div>

                    </div>
                    <div className="column">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">phone
</i>
                            <input id="phone2" type="tel" name='phone' value={state.phone} className="validate" required />
                            <label htmlFor="phone2">Mobile Number</label>
                        </div>

                    </div>
                    <div className="column">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">mode_edit
</i>
                            <textarea id="message2" name='message' value={state.message} className="materialize-textarea"></textarea>
                            <label htmlFor="message2">Type Your message</label>
                        </div>

                    </div>
                    <button className="btn waves-effect waves-light modal-close  light-green accent-4" type="submit" name="action">Submit
    <i className="material-icons right">send</i>
                   </button>
                </form>
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
  </div>
          
    )
}

export default Modal 
    
          