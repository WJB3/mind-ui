import React from 'react';
import { classNames } from './../helper/className';
import "./../styles/grid.scss";
import { GridContext } from './../grid';
 
interface ColProps{
   span?:number,
   children?:any
}

const Col:React.FunctionComponent<ColProps>=(ColProps)=>{

    const {
        span,
        children
    }=ColProps;

    const classes=classNames("wonderful-col",span?`wonderful-col-${span}`:"")

    return(
        
            <GridContext.Consumer>
                {
                    ({gutter})=>
                    <div className={classes} style={{paddingLeft:gutter?gutter:0,paddingRight:gutter?gutter/2:0}}>
                        {children}
                    </div>
                }
            </GridContext.Consumer>
      
        
    )
}

export default Col;