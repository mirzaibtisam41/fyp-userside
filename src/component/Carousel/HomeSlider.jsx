import React, { useContext } from 'react';
import { Carousel } from "react-bootstrap";
import { GlobalContext } from "../Home/HomeContext";
import { ServerPort } from "../../Api/apiActions";
import "./Slider.css"

const HomeSlider = () => {
    const { ImagesAddsCarousel } = useContext(GlobalContext);

    return <React.Fragment>
        <div style={{ height: "25rem"}}>
            <Carousel className="h-100">
                {
                    ImagesAddsCarousel.length > 0 && ImagesAddsCarousel.map((item, index) => {
                        if (item.imageFor === "slider") {
                            return <Carousel.Item key={index} className="c-item">
                                <img
                                    className=" w-100 h-100 img-responsive"
                                    src={`${ServerPort}${item.Add}`}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        }
                    })
                }
            </Carousel>
        </div>
    </React.Fragment>
}

export default HomeSlider;
