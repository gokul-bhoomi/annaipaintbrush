import React from 'react';


const Cards = () => {


    return (
        <div className="cards grow">
            <div className="col s12 m7 ">
                <div className="card " style={{ marginLeft: '2.5em', marginRight: '2.5em' }} >
                    <div className="card-image">
                        <img alt="Quality " src={require("../../../media/card/quality.png")} style={{ width: '128px', margin: 'auto', paddingTop: '1em' }} />
                    </div>
                    <div className="card-content">
                        <p>Our products are best in quality and durable </p>
                    </div>

                </div>
            </div>
            <div className="col s12 m7">
                <div className="card" style={{ marginLeft: '2.5em', marginRight: '2.5em' }}>
                    <div className="card-image">
                        <img alt="Price" src={require("../../../media/card/price.png")} style={{ width: '128px', margin: 'auto', paddingTop: '1em' }} />
                    </div>
                    <div className="card-content">
                        <p style={{ textAlign: 'center' }}>We provide our products at unbeatable price  </p>
                    </div>

                </div>
            </div>
            <div className="col s12 m7">
                <div className="card" style={{ marginLeft: '2.5em', marginRight: '2.5em' }}>
                    <div className="card-image">
                        <img alt="Delivery" src={require("../../../media/card/delivery.png")} style={{ width: '128px', margin: 'auto', paddingTop: '1em' }} />
                    </div>
                    <div className="card-content">
                        <p>Faster delivery of products to your doorstep</p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Cards;
