import React ,{useState,useEffect} from 'react';
import { classNames } from './../helper/className';
import "./../styles/grid.scss";
import { GridContext } from './../grid';
import { number } from 'prop-types';
 
interface ColProps{
   span?:number,
   children?:any,
   offset?:number,
   push?:number,
   pull?:number,
   order?:number,
   flex?:number|string
}

const Col:React.FunctionComponent<ColProps>=(ColProps)=>{

    const {
        span,
        children,
        offset,
        push,
        pull,
        order,
        flex
    }=ColProps;

    const [ changeFlex,setChangeFlex]=useState("");


    const classes=classNames("wonderful-col",
        span?`wonderful-col-${span}`:"",
        offset?`wonderful-offset-${offset}`:"",
        push?`wonderful-push-${push}`:"",
        pull?`wonderful-pull-${pull}`:"",
        order?`wonderful-order-${order}`:"",
    )

    function getFlex(){
        let type=typeof flex;
        if(flex==="auto"){
            setChangeFlex(`1 1 auto`);
            return ;
        }
        
        if(type==="string"){
        
            if(flex.split(" ").length>0){
                setChangeFlex(`${flex}`);
                return ;
            }
        }
        
        switch(type){
            case "string":
                setChangeFlex(`0 0 ${flex}`);
                return ;
            case "number":
                setChangeFlex(`${flex} ${flex} auto`);
                return ;
            default:
                setChangeFlex("");
        }
    }

    useEffect(()=>{
        getFlex()
         
    })

    return(
        
            <GridContext.Consumer>
                {
                    ({gutter})=>
                    <div className={classes} style={{
                        paddingLeft:gutter?gutter/2:0,
                        paddingRight:gutter?gutter/2:0,
                        flex:changeFlex
                    }}>
                        {children}
                    </div>
                }
            </GridContext.Consumer>
      
        
    )
}

export default Col;