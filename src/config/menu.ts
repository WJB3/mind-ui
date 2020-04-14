import {NavLink} from 'react-router-dom';
const menuInfo=[
    {
        title:"介绍",
        key:"introduce"
    },
    {
        title:"组件",
        key:"component",
        children:[
            {
                title:"Input",
                key:"input",
            },
            {
                title:"Notification",
                key:"notification",
            },
            {
                title:"Grid",
                key:"grid",
                
            },
            {
                title:"按钮",
                key:"button",
                
            },
            {
                title:"Icon",
                key:"icon",
            },
            {
                title:"动画",
                key:"animation",
            },
            {
                title:"上传demo",
                key:"upload",
            },
            
        ]
    }
];

export {
    menuInfo
}