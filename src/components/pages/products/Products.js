import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';
import M from 'materialize-css/dist/js/materialize.min.js';
import productContext from '../../../context/product/productContext';


const Products = () => {
    const { choice } = useContext(productContext);
    useEffect(() => {
        M.toast({ html: "Click on the image to enlarge" });
        M.AutoInit();

    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [choice]);


    const arr1 = ["ANNAI PREMIUM MILK WHITE 4 INCH", "TAPPER DOUBLE 4 INCH", "ANNAI TOUCH WOOD 1 INCH", "ANNAI TOUCH WOOD 1.5 INCH", "ANNAI TOUCH WOOD 2 INCH", "ANNAI TOUCH WOOD 2.5 INCH", "ANNAI TOUCH WOOD 3 INCH", "TAPPER 0.5 INCH", "TAPPER 1 INCH", "TAPPER 1.5 INCH", "TAPPER 2 INCH", "TAPPER 2.5 INCH", "TAPPER 3 INCH", "TAPPER 2 INCH ( DOUBLE BERTH )", "TAPPER 3 INCH ( DOUBLE BERTH )", "HOLLOW SINGLE 4 INCH"];
    const arr2 = ["FLAT BRUSH AVAILABLE IN ALL NOS", "ROUND BRUSH AVAILABLE IN ALL NOS", "SET BRUSH"];
    const arr3 = ["ACRYLIC INTERIOR 9 INCH", "EXTERIOR 9 INCH", "EPOXY 9 INCH", "ENAMEL ROLLER 6 INCH", "ENAMEL ROLLER 4 INCH", "ENAMEL ROLLER 2 INCH", "SET ROLLER AVAILABLE IN 4 INCH AND 6 INCH", "PAINT TRAY"];
    const arr4 = ["PUTTY BLADE 2 INCH TO 12 INCH", "ALTEK BLADE 3 INCH TO 14 INCH", "PATTA ULI"];


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    const pageNumbers = [];

    let currentPosts = [];
    let totalPosts = 0;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    switch (choice) {
        case 1:
            currentPosts = arr1.slice(indexOfFirstPost, indexOfLastPost);
            totalPosts = arr1.length;
            break;
        case 2:
            currentPosts = arr2.slice(indexOfFirstPost, indexOfLastPost);
            totalPosts = arr2.length;
            break;
        case 3:
            currentPosts = arr3.slice(indexOfFirstPost, indexOfLastPost);
            totalPosts = arr3.length;
            break;
        case 4:
            currentPosts = arr4.slice(indexOfFirstPost, indexOfLastPost);
            totalPosts = arr4.length;
            break;
        default:

    }

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);

    };


    return (
        <Fragment>
            <Link className="btn side" to="/contactus">  <i className="material-icons">local_phone</i> <span>Call</span>
            </Link>
            <div className="banner animated">
                <h3>Our Products</h3>
            </div>
            <h6 style={{ textAlign: 'center', marginBottom: '2em', fontWeight: 'bold' }}>Call us for the Best Price</h6>





            <div className="row ">
                {

                    currentPosts.map((items) =>

                        <ProductItem src={items} key={items} text={items} />

                    )


                }







            </div>
            <div>
                <div className='page'>
                    <ul className='pagination'>
                        {pageNumbers.map((number) => (
                            <li key={number} className=''>
                                <Link
                                    onClick={() => paginate(number)}
                                    to='#top'
                                    className={currentPage === number ? 'active' : ''}

                                >
                                    {number}
                                </Link>
                            </li>


                        ))}
                        {currentPage - 1 > 0 ?
                            <li > <Link className='nostyle'
                                onClick={() => paginate(currentPage - 1)}
                                to='/ourproducts'

                            >
                                Back
                        </Link></li> : ''}
                        {pageNumbers.length >= currentPage + 1 ?
                            <li > <Link className='nostyle'
                                onClick={() => paginate(currentPage + 1)}
                                to='/ourproducts'

                            >
                                Next
                        </Link></li> : ''}
                    </ul>
                </div>
            </div>

        </Fragment>
    );
};

export default Products;
