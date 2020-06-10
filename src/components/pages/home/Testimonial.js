import React from 'react';
import { Fade } from 'react-slideshow-image';

const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    pauseOnHover: false,
    arrows: false
};


const Testimonial = () => {

    return (
        <div className="testimonial">
            <h3 style={{ paddingTop: '1em', marginBottom: '0' }}>What our customers say?</h3>
            <div className='slide-container' style={{ width: '50%', margin: 'auto', marginBottom: '10em', marginTop: '10em' }}>
                <Fade {...fadeProperties}>
                    <div className='each-fade' style={{ display: 'block', paddingBottom: '8em' }}>
                        <img
                            src={require('../../../media/person.png')}
                            style={{ width: '125px', margin: 'auto', display: 'block', marginBottom: '0' }}
                            alt='roller'
                        /> <br />
                        <p style={{ textAlign: 'center', marginTop: '0' }}><b>Murugan</b> (Painter)</p>
                        <p style={{ textAlign: 'center', marginTop: '0' }}>"The the quality and durability of Annai Brush is excellent. I am using Annai brand tools for the past 4 years and I'm very satisfied with it."</p>

                    </div>
                    <div className='each-fade' style={{ display: 'block', paddingBottom: '8em' }}>
                        <img
                            src={require('../../../media/person.png')}
                            style={{ width: '125px', margin: 'auto', display: 'block', marginBottom: '0' }}
                            alt='roller'
                        /> <br />
                        <p style={{ textAlign: 'center', marginTop: '0' }}><b>Suresh</b> (Shop Owner)</p>
                        <p style={{ textAlign: 'center', marginTop: '0' }}>"I'm a customer of Annai Brush for the past 3 years. Their delivery is really fast. Also their product's price are very reasonable"</p>

                    </div>
                    <div className='each-fade' style={{ display: 'block', paddingBottom: '8em' }}>
                        <img
                            src={require('../../../media/person.png')}
                            style={{ width: '125px', margin: 'auto', display: 'block', marginBottom: '0' }}
                            alt='roller'
                        /> <br />
                        <p style={{ textAlign: 'center', marginTop: '0' }}><b>Antony</b> (Shop Owner)</p>
                        <p style={{ textAlign: 'center', marginTop: '0' }}>"Looking for best quality at the same time best price? My first suggestion would be Annai Brush. Go for it you won't regret"</p>

                    </div>
                    <div className='each-fade' style={{ display: 'block', paddingBottom: '8em' }}>
                        <img
                            src={require('../../../media/person.png')}
                            style={{ width: '125px', margin: 'auto', display: 'block', marginBottom: '0' }}
                            alt='roller'
                        /> <br />
                        <p style={{ textAlign: 'center', marginTop: '0' }}><b>Selva</b> (Painter)</p>
                        <p style={{ textAlign: 'center', marginTop: '0' }}>"The finish we get while painting walls with Annai Brush is sliky smooth.Annai products gives a rich feel to the wall we paint."</p>

                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default Testimonial;
