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

                    <img className="modalimg" width="80%" src={require(`../../../media/products/${current.src}.jpg`)} alt={current.src} />
                </div>

            </div>
        </Fragment>
    );
};

export default Pmodal;
