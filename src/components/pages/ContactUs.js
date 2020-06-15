import React, { Fragment } from 'react';
import image from '../../media/contact/contact.jpg';
import ContactForm from '../layouts/ContactForm';

const ContactUs = () => {
    return (
        <Fragment>
            <img src={image} alt="brush" style={{ height: 'auto', width: '100%', display: 'block' }} />

            <p style={{ textAlign: 'center', marginTop: '0em', marginBottom: '3em' }}>Working hours : Monday To Saturday 9 AM To 8 PM</p>
            <div className="cards grow" style={{ marginTop: '1em' }}>
                <div className="col s12 m7 ">
                    <div className="card phone" style={{ marginLeft: '2.5em', marginRight: '2.5em', width: '400px', height: '210px' }} >
                        <div className="card-image">
                            <img alt="Quality " src={require("../../media/contact/phone.png")} style={{ width: '64px', margin: 'auto', paddingTop: '1em' }} />
                        </div>
                        <div className="card-content">
                            <p style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>90 42 00 16 16 <br /> 79 04 14 11 87 </p>
                        </div>

                    </div>
                </div>
                <div className="col s12 m7">
                    <div className="card phone" style={{ marginLeft: '2.5em', marginRight: '2.5em', width: '400px', height: '210px' }}>
                        <div className="card-image">
                            <img alt="Price" src={require("../../media/contact/email.png")} style={{ width: '64px', margin: 'auto', paddingTop: '1em' }} />
                        </div>
                        <div className="card-content phone1">
                            <p style={{ textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold' }}>annaipaintbrush@gmail.com </p>
                        </div>

                    </div>
                </div>
                <div className="col s12 m7">
                    <div className="card phone" style={{ marginLeft: '2.5em', marginRight: '2.5em', width: '400px', height: '210px' }}>
                        <div className="card-image">
                            <img alt="Delivery" src={require("../../media/contact/location.png")} style={{ width: '64px', margin: 'auto', paddingTop: '1em' }} />
                        </div>
                        <div className="card-content">
                            <p style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold' }}>P.N.Pudur, Coimbatore.</p>
                        </div>

                    </div>
                </div>

            </div>
            <ContactForm />

        </Fragment>

    );
};

export default ContactUs;
