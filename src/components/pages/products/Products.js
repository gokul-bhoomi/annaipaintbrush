import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';
import M from 'materialize-css/dist/js/materialize.min.js';
import Select from 'react-select';


const Products = () => {
    useEffect(() => {
        M.toast({ html: "Click on the image to enlarge" });
        M.AutoInit();

    }, []);
    const options = [
        { value: '1', label: 'Paint Brushes' },
        { value: '2', label: 'Art Brushes' },
        { value: '3', label: 'Paint Rollers' },
        { value: '4', label: 'Putty Knives' },
    ];
    const arr1 = ["TOUCH WOOD 2 INCH"];
    const arr2 = ["MILK WHITE 4 INCH", "MILK WHITE 4 INCH", "MILK WHITE 4 INCH", "MILK WHITE 4 INCH", "MILK WHITE 4 INCH"];
    const arr3 = ["TOUCH WOOD 2 INCH", "TOUCH WOOD 3 INCH", "MILK WHITE 4 INCH", "MILK WHITE 4 INCH"];
    const arr4 = ["TOUCH WOOD 2 INCH", "TOUCH WOOD 3 INCH", "MILK WHITE 4 INCH", "MILK WHITE 4 INCH"];

    const [choice, setchoice] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(1);
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
    const handleChange = (choice) => {
        setchoice(parseInt(choice.value));

    };

    return (
        <Fragment>
            <Link className="btn side" to="/contactus">  <i className="material-icons">local_phone</i> <span>Ask for the best price</span>
            </Link>
            <div className="banner animated">
                <h3>Our Products</h3>
            </div>

            <Select
                value={choice}
                onChange={handleChange}
                options={options}
                className="container"
                isSearchable={false}
                placeholder="Paint Brushes"
            />



            <div className="row ">
                {

                    currentPosts.map((items) =>

                        <ProductItem src={items} text={items} />

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
                                    to='/ourproducts'
                                    className={currentPage === number ? 'active' : ''}
                                >
                                    {number}
                                </Link>
                            </li>


                        ))}
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
