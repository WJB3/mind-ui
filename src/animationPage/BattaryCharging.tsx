import * as React from 'react';
import { classNames } from './../components/helper/className';

import "./BattaryCharging.less";

class BattaryCharging extends React.Component {
    render() {

        const { children } = this.props;
        return (
            <div className={
                classNames(
                    'melon-animation-battery'
                )
            }>
                <div className={
                    classNames(
                        'melon-animation-battery-body'
                    )
                }>

                </div>
            </div>
        )
    }
}

export default BattaryCharging;