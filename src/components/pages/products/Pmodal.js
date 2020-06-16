import React, { useContext, Fragment } from 'react';
import productContext from '../../../context/product/productContext';

const Pmodal = () => {
    const { current } = useContext(productContext);

    return (
        <Fragment>

            <div id="modal3" className="modal"  >
                <i className="material-icons modal-close close-button topright">close</i>
                <br />
                <div className="modal-content">
                    <h4><b>{current.text}</b><span style={{ color: '#e53935 ' }}> (Use mouse or touch to move over the image !)</span> </h4>
                    <img src={require(`../../../media/products/${current.src}.png`)} alt="brush" />
                </div>

            </div>
        </Fragment>
    );
};

export default Pmodal;
