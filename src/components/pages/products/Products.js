import React, { Fragment, useEffect } from 'react';
import ProductItem from './ProductItem';
import M from 'materialize-css/dist/js/materialize.min.js';


const Products = () => {
    useEffect(() => {
        M.toast({ html: "Click on the image to enlarge" });
    }, []);
    return (
        <Fragment>

            <div className="banner animated">
                <h3>Our Products</h3>
            </div>


            <div className="row ">

                <ProductItem src={"TW2"} text={"1 INCH TOUCH WOOD"} />
                <ProductItem src={"TW2"} text={"2 INCH TOUCH WOOD"} />
                <ProductItem src={"TW2"} text={"2.5 INCH TOUCH WOOD"} />
                <ProductItem src={"TW2"} text={"3 INCH TOUCH WOOD"} />
                <ProductItem src={"TW2"} text={"2 INCH TOUCH WOOD"} />




            </div>
        </Fragment>
    );
};

export default Products;
