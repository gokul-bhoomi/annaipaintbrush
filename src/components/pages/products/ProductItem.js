import React, { useContext } from 'react';
import productContext from '../../../context/product/productContext';

const ProductItem = ({ src, text }) => {
    const { setCurrent } = useContext(productContext);
    const onClick = () => {

        let data = {
            text,
            src
        };
        setCurrent(data);
    };
    return (
        <div className="col s12 m12 l3 product">
            <div className="card">
                <div className="card-image" onClick={onClick}>
                    <img className="modal-trigger" href="#modal3" alt="brush" src={require(`../../../media/products/${src}.jpg`)} />

                </div>

                <div className="card-action" style={{ textAlign: 'center' }}>
                    <b><a className="waves-effect waves-light btn modal-trigger  light-green darken-3
" href="#modal3" onClick={onClick} >{text}</a></b>
                </div>
            </div>
        </div>




    );
};

export default ProductItem;
