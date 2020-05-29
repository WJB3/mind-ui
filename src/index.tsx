import *as ReactDOM from 'react-dom';
import *as React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Layout from './layout/index';
import ButtonPage from './ButtonBase/buttonPage';
import IconPage from './iconPage/index';
import AnimationPage from './animationPage/index';
import gridPage from './gridPage/index';
import notificationPage from './notificationPage/index';
import inputPage from './Input/inputPage';
import paperPage from './Paper/paperPage';
import animationPage from './Animate/animationPage';
import radioPage from './Radio/radioPage';
import layoutPage from './layoutPage/index';
import switchPage from './switchPage/index';
import typographyPage from './typographyPage/index';
import spacePage from './Space/spacePage';
import dividerPage from './Divider/dividerPage';
import BackTopPage from './BackTop/BackTopPage';
import loadingPage from './Loading/loadingPage';
import popperPage from './Popper/popperPage';
import tooltipPage from './Tooltip/tooltipPage';
import badgePage from './Badge/badgePage';
import paginationPage from './Pagination/paginationPage';
import inputnumberPage from './InputNumber/inputnumberPage';
import checkboxPage from './Checkbox/checkboxPage';
import popoverPage from './Popover/popoverPage';
import tagPage from './Tag/tagPage';
import selectPage from './Select/selectPage';
import backdropPage from './BackDrop/backdropPage';
import modalPage from './Modal/modalPage';
import drawerPage from './Drawer/drawerPage';
import avatarPage from './Avatar/avatarPage';
import skeletonPage from './Skeleton/skeletonPage';
import treePage from './Tree/treePage';
import carouselPage from './Carousel/carouselPage';
import stepsPage from './Steps/stepsPage';
import ratePage from './Rate/ratePage';
import appBarPage from './AppBar/appBarPage';
import menuPage from './Menu/menuPage';
import collapsePage from './Collapse/collapsePage';
import Demo from './Demo';
import 'vikingship/dist/index.css'

import 'antd/dist/antd.css';
import "./index.less";

ReactDOM.render((<HashRouter>
        <Route path="/" exact component={menuPage} />
        <Route path="/collapse" exact component={collapsePage} />
        <Route path="/menu" exact component={menuPage} />
        <Route path="/appBar" exact component={appBarPage} />
        <Route path="/rate" exact component={ratePage} />
        <Route path="/steps" exact component={stepsPage} />
        <Route path="/carousel" exact component={carouselPage} />
        <Route path="/tree" exact component={treePage} />
        <Route path="/skeleton" exact component={skeletonPage} />
        <Route path="/avatar" exact component={avatarPage} />
        <Route path="/drawer" exact component={drawerPage} />
        <Route path="/modal" exact component={modalPage} />
        <Route path="/backdrop" exact component={backdropPage} />
        <Route path="/select" exact component={selectPage} />
        <Route path="/tag" exact component={tagPage} />
        <Route path="/popover" exact component={popoverPage} />
        <Route path="/checkbox" exact component={checkboxPage} />
        <Route path="/inputnumber" exact component={inputnumberPage} />
        <Route path="/pagination" exact component={paginationPage} />
        <Route path="/badge" exact component={badgePage} />
        <Route path="/tooltip" exact component={tooltipPage} />
        <Route path="/popper" exact component={popperPage} />
        <Route path="/loading" exact component={loadingPage} />
        <Route path="/backtop" exact component={BackTopPage} />
        <Route path="/divider" exact component={dividerPage} />
        <Route path="/space" exact component={spacePage} />
        <Route path="/typography" exact component={typographyPage} />
        <Route path="/layout" exact component={layoutPage} />
        <Route path="/switch" exact component={switchPage} />
        <Route path="/radio" exact component={radioPage} />
        <Route path="/animation" exact component={animationPage} />
        <Route path="/paper" exact component={paperPage} />
        <Route path="/notification" exact component={notificationPage} />
        <Route path="/button" component={ButtonPage}></Route>
        <Route path="/layout" component={Layout}></Route>
        <Route path="/icon" component={IconPage}></Route>
        <Route path="/grid" component={gridPage}></Route>
        <Route path="/input" component={inputPage}></Route>
</HashRouter>), document.getElementById("root"));