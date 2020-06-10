import *as ReactDOM from 'react-dom';
import *as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
 
import ButtonPage from './ButtonBase/buttonPage';
import InputPage from './Input/inputPage';
import SelectPage from './Select/selectPage';
import TooltipPage from './Tooltip/TooltipPage';
import PortalPage from './Portal/portalPage';
import PopperPage from './Popper/popperPage';
import GridPage from './Grid/GridPage';
import PopoverPage from './Popover/popoverPage';
import BackDropPage from './BackDrop/backdropPage';
 
import ParrotLayout from './ParrotLayout';

 
import "./index.less";

ReactDOM.render((<HashRouter>
       
                <Route path="/"  component={
                        (props)=><ParrotLayout {...props}>
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
                                </Switch>
                        </ParrotLayout>
                } />
 
      
      
</HashRouter>), document.getElementById("root"));