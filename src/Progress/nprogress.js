import Progress from './index';
import React from 'react';
import ReactDOM from 'react-dom';

const RenderProgress = (props) => {

    const {
        children
    } = props;

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                console.log(oldProgress)
                if (oldProgress >90) {
                    return 90;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

  


    return React.cloneElement(children, {
        value:progress
    });
}

let nprogress = {};
let show = false;
const div = document.createElement("div");

nprogress.start = () => {

    show = true;

    document.body.appendChild(div);

    ReactDOM.render(show ? <RenderProgress><Progress type="liner" color={"danger"} variant="determinate" topScroll /></RenderProgress> : null, div);
}

nprogress.done = () => {
    show = false;

    document.body.removeChild(div);

    ReactDOM.unmountComponentAtNode(div);
}

export default nprogress;