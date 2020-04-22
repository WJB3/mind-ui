import *as ReactDOM from 'react-dom';
import *as React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Layout from './layout/index';
import ButtonPage from './ButtonBase/buttonPage';
import IconPage from './iconPage/index';
import AnimationPage from './animationPage/index';
import gridPage from './gridPage/index';
import notificationPage from './notificationPage/index';
import inputPage from './inputPage/index';
import pagerPage from './pagerPage/index';
import animationPage from './Animate/animationPage';
import radioPage from './radioPage/index';
import layoutPage from './layoutPage/index';
import switchPage from './switchPage/index';
import typographyPage from './typographyPage/index';
import spacePage from './Space/spacePage';
import dividerPage from './Divider/dividerPage';
import BackTopPage from './BackTop/BackTopPage';
 
import 'antd/dist/antd.css';
import "./index.less";

ReactDOM.render((<HashRouter>
        <Route path="/" exact component={BackTopPage} />
        <Route path="/backtop" exact component={BackTopPage} />
        <Route path="/divider" exact component={dividerPage} />
        <Route path="/space" exact component={spacePage} />
        <Route path="/typography" exact component={typographyPage} />
        <Route path="/layout" exact component={layoutPage} />
        <Route path="/switch" exact component={switchPage} />
        <Route path="/radio" exact component={radioPage} />
        <Route path="/animation" exact component={animationPage} />
        <Route path="/pager" exact component={pagerPage} />
        <Route path="/notification" exact component={notificationPage} />
        <Route path="/button" component={ButtonPage}></Route>
        <Route path="/layout" component={Layout}></Route>
        <Route path="/icon" component={IconPage}></Route>
        <Route path="/grid" component={gridPage}></Route>
        <Route path="/input" component={inputPage}></Route>
</HashRouter>), document.getElementById("root"));