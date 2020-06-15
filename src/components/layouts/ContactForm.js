import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import M from 'materialize-css/dist/js/materialize.min.js';

const ContactForm = () => {
    const initialState = {
        name: '',
        email: '',
        phone: '',
        message: ''
    };
    const [state, setstate] = useState(initialState);

    const onChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {

        e.preventDefault();

        emailjs.sendForm("gmail",
            "enquiry",
            ".contact_form_classs",
            "user_qUwfyg8Rt1mateAvpSIap"

        ).then(() => { M.toast({ html: "Submitted Successfully !" }); }).catch(() => () => { M.toast({ html: "Something Went Wrong !" }); });

        setstate({
            name: '',
            email: '',
            phone: '',
            message: ''
        });

    };
    return (
        <div className='form container' style={{ marginBottom: '3em', marginTop: '6em' }}>
            <div className="column">
                <h4 style={{ textAlign: 'center' }}>Contact Form</h4>

                <form className="col s12 contact_form_classs" onChange={onChange} onSubmit={onSubmit}>
                    <div className="column">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="name1" type="text" name="name" value={state.name} className="validate" required />
                            <label htmlFor="name1">Name</label>
                        </div>

                    </div>
                    <div className="column">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">email
</i>
                            <input id="email1" type="email" name="email" value={state.email} className="validate" />
                            <label htmlFor="email1">Email</label>
                        </div>

                    </div>
                    <div className="column">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">phone
</i>
                            <input id="phone1" type="tel" name="phone" value={state.phone} className="validate" required />
                            <label htmlFor="phone1">Mobile Number</label>
                        </div>

                    </div>
                    <div className="column">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">mode_edit
</i>
                            <textarea id="message1" value={state.message} name="message" className="materialize-textarea"></textarea>
                            <label htmlFor="message1">Type Your message</label>
                        </div>

                    </div>
                    <button className="btn waves-effect waves-light  blue lighten-1" type="submit" name="action">Submit
    <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        </div>


    );
};

export default ContactForm;
