import React, { Children } from 'react';
import { classNames } from './../helper/className';
import { GridContext } from './../grid';
import "./../styles/grid.scss";
 

interface RowProps{
    children?:any,
    gutter?:number,
}

const Row:React.FunctionComponent<RowProps>=(RowProps)=>{

    const {
        children,
        gutter
    }=RowProps;

    const classes=classNames("wonderful-row")

    return(
        <div className={classes} style={{marginLeft:gutter?-gutter/2:0,marginRight:gutter?-gutter/2:0}}>
            <GridContext.Provider value={{gutter:gutter}}>
                {children}
            </GridContext.Provider>
        </div>
    )
}

export default Row;