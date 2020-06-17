import React, { useState } from 'react';
import { SketchPicker } from 'react-color';


const Sketch = () => {
    const initialState = {
        text: '#fff',
        background: '#ff3d00',
        value: "1"
    };
    const [state, setstate] = useState(initialState);

    const onChange = (color) => {

        if (state.value === "1")
            setstate({ ...state, background: color.hex });
        else
            setstate({ ...state, text: color.hex });
    };
    const handleChange = (e) => {
        setstate({ ...state, value: e.target.value });

    };

    return (
        <div className="about fadeIn" style={{ backgroundColor: state.background, paddingBottom: "1em" }}>

            <p style={{ color: state.text, maxWidth: '100%', width: '20em', marginRight: '5%', marginLeft: '5%', textAlign: 'justify', fontSize: '1.5em', paddingTop: '1.5em' }}>We are manufacturers and wholesalers of premium paint brushes and tools. With over 20+ years of experience in
            manufacturing, our products stand out in quality. Our factory is located in Madurai district with very experienced labours. We never compromise the quality of our
            brushes and tools. Gaining the trust of many painters we now stand as a well-established brand in
            Tamil Nadu and we supply orders all over India. We provide paint brushes and tools at an affordable price at the same time not
            compromising the quality.Our products include Milk White Paint Brush, Paint Roller, Touch Wood Brush, Putty Blade, Patta Uli, Art Brushes (Round and Flat).  </p>

            <div style={{ color: state.text }}>
                <h4>Play With colours !</h4>
                <div className="input-field col s12 cyan accent-1" >
                    <select value={state.value} onChange={handleChange}>
                        <option value="1"  >Background</option>
                        <option value="2" >Text</option>
                    </select>

                </div>
                <div style={{ marginLeft: '2em', marginRight: '2em' }}>
                    <SketchPicker
                        color={state}
                        onChangeComplete={onChange}

                    />
                </div>

            </div>
        </div>

    );
};

export default Sketch;
