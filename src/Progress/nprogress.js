import Progress from './index';
import React, { useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

const RenderProgress = React.forwardRef((props,ref) => {

    const {
        children,
        onDone
    } = props;

    const [progress, setProgress] = React.useState(0);

    const progressRef=React.useRef(null);

    const [done,setDone]=React.useState(false);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => { 
                if (oldProgress >=95 && done===false) {
                    return 95;
                }

                if (done===true) {
                    return 100;
                }
                
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, [done]);

    const setTransition=()=>{ 
         
        function transitionend(){ 
            progressRef.current.firstElementChild.removeEventListener('transitionend', transitionend, false);

            onDone && onDone()
        }
        progressRef.current.firstElementChild.addEventListener('transitionend', transitionend, false);
        
    }

    const setDoneStatus=()=>{
        setDone(true);
    }

    useImperativeHandle(ref,()=>({
        setDone:setDoneStatus
    }));

    React.useEffect(()=>{
        if(progress===100){
            setTransition();
        }
    },[progress]);

    return React.cloneElement(children, {
        value:progress,
        ref:progressRef
    });
});

let nprogress = {};
let show = false;
const div = document.createElement("div");
let instance;

function handleRemove(){ 
    document.body.removeChild(div);

    ReactDOM.unmountComponentAtNode(div);
}

nprogress.start = () => {

    show = true;

    document.body.appendChild(div);

    ReactDOM.render(show ? <RenderProgress ref={(ref)=>instance=ref} onDone={handleRemove}><Progress type="liner" color={"danger"} variant="determinate" topScroll /></RenderProgress> : null, div);
}

nprogress.done = () => {
    show = false;

    instance.setDone();

    // document.body.removeChild(div);

    // ReactDOM.unmountComponentAtNode(div);
}

export default nprogress;