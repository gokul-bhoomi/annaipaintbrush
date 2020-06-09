import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const Sketch = () => {
    const initialState = {
        text: '#fff',
        background: '#ff3d00',
        value: 1
    };
    const [state, setstate] = useState(initialState);

    const onChange = (color) => {

        if (state.value === 1)
            setstate({ ...state, background: color.hex });
        else
            setstate({ ...state, text: color.hex });
    };
    const handleChange = (e) => {
        setstate({ ...state, value: e.target.value });

    };

    return (
        <div className="about" style={{ backgroundColor: state.background }}>

            <p style={{ color: state.text, maxWidth: '100%', width: '20em', marginRight: '10%', textAlign: 'justify', fontSize: '1.5em' }}>We are manufacturers of premium paint brushes and tools. With over 20+ years of experience in manufacturing our products stand out in quality. Our factory is located in Madurai district with experienced labours. We never comprise the quality of our brushes and tools. Gaining the trust of many painters we now stand as a well-established brand in Tamil Nadu. We provide paint brushes and tools at an affordable price at the same time not compromising the quality.  </p>

            <div style={{ color: state.text }}>
                <h4>Play With colours !</h4>
                <div className="input-field col s12 cyan accent-1" >
                    <select value={state.value} onChange={handleChange}>
                        <option value="1" >Background</option>
                        <option value="2">Text</option>
                    </select>

                </div>
                <div style={{ paddingLeft: '2em' }}>
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
