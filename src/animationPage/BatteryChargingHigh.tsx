import * as React from 'react';
import { classNames } from './../components/helper/className';

import "./BatteryChargingHigh.less";

class BatteryChargingHigh extends React.Component {
    render() {

        const { children } = this.props;
        return (
            <div className={
                classNames(
                    'melon-animation-battery-high'
                )
            }>
                <div className="header"></div>
                <div className="battery"></div>
                <div className="battery-copy">
                    <div className="g-wave"></div>
                    <div className="g-wave"></div>
                    <div className="g-wave"></div>
                </div>
            </div>
        )
    }
}

export default BatteryChargingHigh;