import { eachHandler,isFunction,isArray } from './helperUtils';

function QueryHandler(options){
	this.options=options;
	!options.deferSetup && this.setup();
}

QueryHandler.prototype={
	constructor:QueryHandler,
	setup:function(){
		if(this.options.setup){
			this.options.setup();
		}
		this.initialised=true;
	},
	on:function(){
		!this.initialised && this.setup();
		this.options.match && this.options.match();
	},
	off:function(){
		this.options.unmatch && this.options.unmatch();
	},
	destroy:function(){
		this.options.destroy?this.options.destroy():this.off();
	},
	equals:function(target){
		return this.options===target || this.options.match ===target;
	}
}

function MediaQuery(query,isUnconditional){
	this.query=query;
	this.isUnconditional=isUnconditional;
	this.handlers=[];
	this.mql=window.matchMedia(query);
	const self=this;
	this.listener=function(mql){
		self.mql=mql.currentTarget || mql;
		self.assess();
	}
	this.mql.addListener(this.listener);
}

MediaQuery.prototype={
	constructor:MediaQuery,
	addHandler:function(handler){
		let qh=new QueryHandler(handler);
		this.handlers.push(qh);
		this.matches() && qh.on();
	},
	removeHandler:function(handler){
		let handlers=this.handlers;
		eachHandler(handlers,function(h,i){
			if(h.equals(handler)){
				h.destroy();
				return !handlers.splice(i,1);
			}
		})
	},
	matches:function(){
		return this.mql.matches || this.isUnconditional;
	},
	clear:function(){
		eachHandler(this.handlers,function(handler){
			handler.destroy();
		});
		this.mql.removeListener(this.listener);
		this.handlers.length=0;
	},
	assess:function(){
		let action=this.matches()?"on":"off";
		eachHandler(this.handlers,function(handler){
			handler[action]();
		});
	}
}


function MediaQueryDispatch(){
    if(!window.matchMedia) {
        throw new Error('matchMedia不被当前浏览器支持！');
    }
    this.queries={};
}

MediaQueryDispatch.prototype={
    constructor:MediaQueryDispatch,
	register:function(q,options,shouldDegrader){
		let queries=this.queries,
		isUnconditional=shouldDegrader && this.browerIsIncapable;
		
		if(!queries[q]){
			queries[q]=new MediaQuery(q,isUnconditional);
		}
		
		if(isFunction(options)){
			options={match:options};
		}
		
		if(!isArray(options)){
			options=[options];
		}
		
		eachHandler(options,function(handler){
			if(isFunction(handler)){
				handler={match:handler};
			}
			queries[q].addHandler(handler);
		});
		
		return this;
	},
	unregister:function(q,handler){
		let query=this.queries[q];
		if(query){
			if(handler){
				query.removeHandler(handler);
			}
			else{
				query.clear();
			}
		}
		return this;
	}
}

export default new MediaQueryDispatch();