import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeSlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="slider-container mb-5">
        <Slider {...settings}>
            <div>
                <img style={{height:"350px"}} className='w-100' src={require("../../Assets/slider-1.jpg")} alt="product" />
            </div>
            <div>
                <img style={{height:"350px"}} className='w-100' src={require("../../Assets/slider-2.jpg")} alt="product" />
            </div>
            <div>
                <img style={{height:"350px"}} className='w-100' src={require("../../Assets/slider-3.jpg")} alt="product" />
            </div>
            <div>
                <img style={{height:"350px"}} className='w-100' src={require("../../Assets/slider-4.jpg")} alt="product" />
            </div>
        </Slider>
    </div>
    )
}

export default HomeSlider;
