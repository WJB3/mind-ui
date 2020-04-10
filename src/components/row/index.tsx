import React, { useState,useEffect } from 'react';
import { classNames } from './../helper/className';
import { GridContext } from './../grid';
import "./../styles/grid.scss";
import { responsiveObserve,responsiveSize,responsiveArray } from "./../_utils/responsiveObserve";
 
let token:any;

interface RowProps{
    children?:any,
    gutter?:number|object,
    justify?:string
}

const Row:React.FunctionComponent<RowProps>=(RowProps)=>{

    const {
        children,
        gutter,
        justify
    }=RowProps;

    const [screens,setScreens]=useState({xs:true,sm:true,md:true,lg:true,xl:true,xxl:true});
    const [changeGutter,setChangeGutter]=useState(0);

    useEffect(()=>{
        token=responsiveObserve.subscribe(screens=>{
            if(typeof gutter==="object"){
                setScreens(screens);
            }
        });
        changeGutterFunc();
        return ()=>{
            responsiveObserve.unsubscribe(token)
        }
    })

    function changeGutterFunc(){
        if(typeof gutter==="object"){
            let gutter=getGutter();
            if(gutter[0]>0){
                setChangeGutter(gutter[0])
            }
            return ;
        }
        setChangeGutter(gutter)
    }

    function getGutter(){
        const results=[0,0];
        const normalizedGutter=typeof gutter==="object"?[gutter,0]:[0,0];
        normalizedGutter.forEach((g,index)=>{
            if(typeof g==="object"){
                for(let i=0;i<responsiveArray.length;i++){
                    const breakpoint=responsiveArray[i];
                    if(screens[breakpoint] && g[breakpoint]!==undefined){
                        results[index]=g[breakpoint] as number;
                        break;
                    }
                }
            }else{
                results[index]=g||0
            }
        })
        return results;
        
    }

    const classes=classNames("wonderful-row",
        gutter?`wonderful-gutter-row`:"",
        justify?`wonderful-justify-${justify}`:""    
    )

    return(
        <div className={classes} style={{marginLeft:changeGutter?-changeGutter/2:0,marginRight:changeGutter?-changeGutter/2:0}}>
            <GridContext.Provider value={{gutter:changeGutter}}>
                {children}
            </GridContext.Provider>
        </div>
    )
}

export default Row;