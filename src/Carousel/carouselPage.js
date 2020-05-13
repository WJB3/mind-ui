import React from 'react';
import Layout from './../layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import Textlayout from './../components/text/Textlayout';
import DescriptionTable from './../components/text/DescriptionTable';
// import Carousel from './index';
import Button from '../ButtonBase';
import Slider from "react-slick";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import Carousel from './carousel';
import IndicatorDots from './indicator-dots'
import Buttons from './buttons'
import { Carousel as ACarousel } from 'antd';
//import  Notification from 'rc-notification';

class ButtonPage extends React.Component {

    constructor(props) {
        super(props);
        this.CRef = React.createRef();
    }


    render() {

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            
            <Carousel loop auto  duration={5000}>
                <div style={{ backgroundColor: 'tomato', height: '100%' }}>Frame 1</div>
                <div style={{ backgroundColor: 'orange', height: '100%' }}>Frame 2</div>
                <div style={{ backgroundColor: 'orchid', height: '100%' }}>Frame 3</div>
            </Carousel>
          
        )
    }
}

export default ButtonPage;