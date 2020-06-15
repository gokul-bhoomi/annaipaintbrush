import React, { useContext } from 'react';
import productContext from '../../../context/product/productContext';

const Pmodal = () => {
    const { current } = useContext(productContext);

    return (
        <div id="modal3" className="modal"  >
            <div class="modal-content">
                <h4><b>{current.text}</b><span style={{ color: '#e53935 ' }}> (Use mouse or touch to move over the image !)</span> </h4>
                <img src={require(`../../../media/products/${current.src}.png`)} alt="brush" />
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
        </div>
    );
};

export default Pmodal;
