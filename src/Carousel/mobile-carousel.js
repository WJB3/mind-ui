import { classNames as classnames } from '../components/helper/className';
import * as React from 'react';
import ReactCarousel from 'rmc-nuka-carousel';
import "./mobile.scss";

export default class Carousel extends React.Component {
  static defaultProps = {
    prefixCls: 'am-carousel',
    dots: true,
    arrows: false,
    autoplay: false,
    infinite: false,
    cellAlign: 'center',
    selectedIndex: 0,
    dotStyle: {},
    dotActiveStyle: {},
  };

  constructor(props ) {
    super(props);
    this.state = {
      selectedIndex: this.props.selectedIndex,
    };
  }

  onChange = (index ) => {
    this.setState(
      {
        selectedIndex: index,
      },
      () => {
        if (this.props.afterChange) {
          this.props.afterChange(index);
        }
      },
    );
  }

  render() {
    const {
      infinite,
      selectedIndex,
      beforeChange,
      afterChange,
      dots,
      ...restProps
    } = this.props;

    const {
      prefixCls,
      dotActiveStyle,
      dotStyle,
      className
    } = restProps;

    const newProps = {
      ...restProps,
      wrapAround: infinite,
      slideIndex: selectedIndex,
      beforeSlide: beforeChange,
    };

    let Decorators = [];

    if (dots) {
      Decorators = [
        {
          component: ({
            slideCount,
            slidesToScroll,
            currentSlide,
          }) => {
            const arr = [];
            for (let i = 0; i < slideCount; i += slidesToScroll) {
              arr.push(i);
            }
            const dotDom = arr.map(index => {
              const dotCls = classnames(`${prefixCls}-wrap-dot`, {
                [`${prefixCls}-wrap-dot-active`]: index === currentSlide,
              });
              const currentDotStyle =
                index === currentSlide ? dotActiveStyle : dotStyle;
              return (
                <div className={dotCls} key={index}>
                  <span style={currentDotStyle} />
                </div>
              );
            });
            return <div className={`${prefixCls}-wrap`}>{dotDom}</div>;
          },
          position: 'BottomCenter',
        },
      ];
    }

    const wrapCls = classnames(prefixCls, className);

    return (
      <ReactCarousel
        {...newProps}
        className={wrapCls}
        decorators={Decorators}
        afterSlide={this.onChange}
      />
    );
  }
}