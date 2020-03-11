import * as React from 'react';
import { classNames } from './../components/helper/className';
import { getSpan } from '@/utils/domUtils';
import "./BounceBall.less";

class BounceBall extends React.Component {

    constructor(config){
        const { id,text }=config;
        this.id=id;
        this.text=text;
        this.$id=document.getElementId(this.id);
        this.init();
    }

    init(){
        const contentArray=this.text.split(' ');
        for(let i=0,len=contentArray.length;i<len;i++){
            const text=contentArray[i];
            const $text=getSpan(text,'text');
            this.append($text)
            const textLen=$text.offsetWidth;

            if(i+1<contentArray.length){
                this.append(getSpan(' '));
            }
        }
    }

    append(element){
        this.$id.appendChild(element);
    }

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

export default BounceBall;