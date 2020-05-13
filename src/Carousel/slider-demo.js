 
import React from "react";
import { InnerSlider } from "./inner-slider";

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
  }

  innerSliderRefHandler = ref => (this.innerSlider = ref);
 
  slickPrev = () => this.innerSlider.slickPrev();

  slickNext = () => this.innerSlider.slickNext();

  slickGoTo = (slide, dontAnimate = false) =>
    this.innerSlider.slickGoTo(slide, dontAnimate);

  slickPause = () => this.innerSlider.pause("paused");

  slickPlay = () => this.innerSlider.autoPlay("play");

  render() {
    var settings;
 
    let children = React.Children.toArray(this.props.children);
    
    let newChildren = [];
    let currentWidth = null;
    for (let i = 0;i < children.length;i += settings.rows * settings.slidesPerRow) {
      let newSlide = [];
      for (
        let j = i;
        j < i + settings.rows * settings.slidesPerRow;
        j += settings.slidesPerRow
      ) {
        let row = [];
        for (let k = j; k < j + settings.slidesPerRow; k += 1) {
          if (settings.variableWidth && children[k].props.style) {
            currentWidth = children[k].props.style.width;
          }
          if (k >= children.length) break;
          row.push(
            React.cloneElement(children[k], {
              key: 100 * i + 10 * j + k,
              tabIndex: -1,
              style: {
                width: `${100 / settings.slidesPerRow}%`,
                display: "inline-block"
              }
            })
          );
        }
        newSlide.push(<div key={10 * i + j}>{row}</div>);
      }
      if (settings.variableWidth) {
        newChildren.push(
          <div key={i} style={{ width: currentWidth }}>
            {newSlide}
          </div>
        );
      } else {
        newChildren.push(<div key={i}>{newSlide}</div>);
      }
    }

    if (settings === "unslick") {
      const className = "regular slider " + (this.props.className || "");
      return <div className={className}>{children}</div>;
    } else if (newChildren.length <= settings.slidesToShow) {
      settings.unslick = true;
    }

    return (
      <InnerSlider
        style={this.props.style}
        ref={this.innerSliderRefHandler}
        {...settings}
      >
        {newChildren}
      </InnerSlider>
    );
  }
}