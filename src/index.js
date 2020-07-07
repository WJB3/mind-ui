import *as ReactDOM from 'react-dom';
import *as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
 
import ButtonPage from './ButtonBase/buttonPage';
import InputPage from './Input/inputPage';
import SelectPage from './Select/selectPage';
import TooltipPage from './Tooltip/tooltipPage';
import PortalPage from './Portal/portalPage';
import PopperPage from './Popper/popperPage';
import GridPage from './Grid/GridPage';
import PopoverPage from './Popover/popoverPage';
import BackDropPage from './BackDrop/backdropPage';
import LoadingPage from './Loading/loadingPage';
import EmptyPage from './Empty/EmptyPage';
import CheckboxPage from './Checkbox/checkboxPage';
import TagPage from './Tag/tagPage'; 
import DatePickerPage from './DatePicker/DatePickerPage';
import TimePickerPage from './TimePicker/TimePickerPage';
import AnimatePage from './Animate/animationPage';
import StepperPage from './Steps/stepsPage';
import CarouselPage from './Carousel/carouselPage';
import SkeletonPage from './Skeleton/skeletonPage';
import AvatarPage from './Avatar/avatarPage';
import DrawerPage from './Drawer/drawerPage';
import ModelPage from './Modal/modalPage';
import PaginationPage from './Pagination/paginationPage';
import BadgePage from './Badge/badgePage';
import BackTopPage from './BackTop/BackTopPage';
import DividerPage from './Divider/dividerPage';

import ParrotLayout from './ParrotLayout';
import Demo from './Demo';

 
import "./index.less";

ReactDOM.render((<HashRouter>
       
                <Route path="/"  component={
                        (props)=><ParrotLayout {...props} >
                                <Switch>
                                        <Route path="/button" exact component={(props)=><ButtonPage {...props}/>}></Route>
                                        <Route path="/input" exact component={(props)=><InputPage {...props}/>}></Route>
                                        <Route path="/select" exact component={(props)=><SelectPage {...props}/>}></Route>
                                        <Route path="/tooltip" exact component={(props)=><TooltipPage {...props}/>}></Route>
                                        <Route path="/portal" exact component={(props)=><PortalPage {...props}/>}></Route>
                                        <Route path="/popper" exact component={(props)=><PopperPage {...props}/>}></Route>
                                        <Route path="/grid" exact component={(props)=><GridPage {...props}/>}></Route>
                                        <Route path="/popover" exact component={(props)=><PopoverPage {...props}/>}></Route>
                                        <Route path="/backdrop" exact component={(props)=><BackDropPage {...props}/>}></Route>
                                        <Route path="/loading" exact component={(props)=><LoadingPage {...props}/>}></Route>
                                        <Route path="/demo" exact component={(props)=><Demo {...props}/>}></Route>
                                        <Route path="/empty" exact component={(props)=><EmptyPage {...props}/>}></Route>
                                        <Route path="/checkbox" exact component={(props)=><CheckboxPage {...props}/>}></Route>
                                        <Route path="/tag" exact component={(props)=><TagPage {...props}/>}></Route>
                                        <Route path="/datepicker" exact component={(props)=><DatePickerPage {...props}/>}></Route>
                                        <Route path="/timepicker" exact component={(props)=><TimePickerPage {...props}/>}></Route>
                                        <Route path="/animate" exact component={(props)=><AnimatePage {...props}/>}></Route>
                                        <Route path="/stepper" exact component={(props)=><StepperPage {...props}/>}></Route>
                                        <Route path="/carousel" exact component={(props)=><CarouselPage {...props}/>}></Route>
                                        <Route path="/skeleton" exact component={(props)=><SkeletonPage {...props}/>}></Route>
                                        <Route path="/avatar" exact component={(props)=><AvatarPage {...props}/>}></Route>
                                        <Route path="/drawer" exact component={(props)=><DrawerPage {...props}/>}></Route>
                                        <Route path="/modal" exact component={(props)=><ModelPage {...props}/>}></Route>
                                        <Route path="/pagination" exact component={(props)=><PaginationPage {...props}/>}></Route>
                                        <Route path="/badge" exact component={(props)=><BadgePage {...props}/>}></Route>
                                        <Route path="/backtop" exact component={(props)=><BackTopPage {...props}/>}></Route>
                                        <Route path="/divider" exact component={(props)=><DividerPage {...props}/>}></Route>
                                </Switch>
                        </ParrotLayout>
                } />
 
      
      
</HashRouter>), document.getElementById("root"));