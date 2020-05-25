import React from 'react';


export default function useMediaQuery(queryInput,options={}){

    let query=typeof queryInput==="function"?queryInput():queryInput;

    query=query.replace(/^@media( ?)/m,"");

    const supportMatchMedia=typeof window!=="undefined" && typeof window.matchMedia !=="undefined";

    const {
        defaultMatches=false,   
        matchMedia=supportMatchMedia ? window.matchMedia : null
    }={...options};
    

    const [match,setMatch]=React.useState(()=>{
        if(supportMatchMedia){
            return matchMedia(query).matches;
        }

        return defaultMatches;
    });

    React.useEffect(()=>{

        let active=true;

        if(!supportMatchMedia){
            return undefined;
        }

        const queryList=matchMedia(query);

        const updateMatch=()=>{
            if(active){
                setMatch(queryList.matches);
            }
        };

        queryList.addListener(updateMatch);

        return ()=>{
            active=false;
            queryList.removeListener(updateMatch);
        }

    },[query,matchMedia,supportMatchMedia]);

    return match;


}