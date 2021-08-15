import React from "react";
import {Carousel} from "react-bootstrap";

import  slide1 from "../images/pexels-startup-stock-photos-7103.jpg"
import  slide2 from "../images/pexels-marko-klaric-6408402.jpg"
import  slide3 from "../images/pexels-cottonbro-5191391.jpg"

const CarouselContainer = () => {

    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src= {slide1}
                    alt="First slide"

                />
                <Carousel.Caption>
                    <h3>Write Them Down</h3>
                    <p>Be the first to write your todos on the <br/><b>blockchain</b>.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide2}
                    alt="Second slide"

                />

                <Carousel.Caption>
                    <h3>Complete Them</h3>
                    <p>You can write as many todos as you want and complete them all.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide3}
                    alt="Third slide"

                />

                <Carousel.Caption>
                    <h3>Erase Them</h3>
                    <p>When you completed your todos you can earse them form your list.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselContainer;