import React, { useContext, useState } from 'react';
import productContext from '../../../context/product/productContext';

const ProductItem = ({ src, text }) => {
    const { setCurrent } = useContext(productContext);
    const [state, setstate] = useState(false);
    const setLoad = () => {
        setstate(true);
    };
    const onClick = () => {

        let data = {
            text,
            src
        };
        setCurrent(data);
    };
    return (
        <div className="col s12 m12 l3 product">
            <div className="card" >
                <div className="card-image" onClick={onClick}>
                    <img onLoad={setLoad} style={{ display: state ? 'block' : 'none' }} className="modal-trigger" href="#modal3" alt={src} src={require(`../../../media/products/${src}.jpg`)} />
                    <p className="loading" style={{ display: state ? 'none' : 'block' }}>Loading..Please Wait</p>
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
