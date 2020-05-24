> UI由MaterialUI+Antd风格的UI实现

> 这篇文章主要实现rate组件


# 一、搭建基础框架

src下新建rate文件夹。

<details>
<summary>重点代码</summary>

```js
import React,{forwardRef} from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Icon from '../components/icon';
import "./index.scss";

const Rate=forwardRef((props,ref)=>{

    const {
        prefixCls: customizePrefixCls,//自定义class类名
        className,//传过来的class类名
        style,//传过来的style样式名  
        count=5,   
    } = props;


    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("rate", customizePrefixCls);

    const renderStar=()=>{
        const stars=[];
        for(let i=0;i<count;i++){
            stars.push(
                <div className={classNames(
                    `${prefixCls}-star`
                    )}
                    key={`count-${i}`}
                >
                    <div className={classNames(`${prefixCls}-star-first`)}>
                        <Icon />
                    </div>
                    <div className={classNames(`${prefixCls}-star-second`)}>
                        <Icon />
                    </div>
                </div>
            )
        }
        return stars;
    }

    return(
        <div className={classNames(
            prefixCls
        )}>
            {renderStar()}
        </div>
    )
});

export default Rate;
```

```css
@import "./../components/styles/variable.scss";

$prefixCls:"#{$global-prefix}-rate";

.#{$prefixCls}{
    margin: 0;
    padding:0;
    color: #ffb400;

    &-star{
        position: relative;
        display: inline-block;
        margin: 0;
        padding: 0;
        color: inherit;
        cursor: pointer;
        -webkit-transition: all .3s;
        transition: all .3s;

        &:not(:last-child){
            margin-right: 8px;
        }


        &-first,&-second{
            color: #f0f0f0;
        }

        &-first{
            position: absolute;
            top:0;
            left:0;
            width:50%;
            height: 100%;
        }

        &-second{
            color:inherit;
        }
    }
}
```

</details>

# 二、整理需求

> 我们通过整理的需求来设计我们的API,个人认为设计API是最难得一部分,我们这里参照ANTD的API进行设计,个人认为ANTD的API更全面，更丰富。

## 1.allowClear

>是否允许再次点击后清除

## 2.allowHalf

>是否允许半选

## 3.autoFocus

>自动获取焦点

## 4.character

>自定义字符

## 5.className

>自定义样式类名

## 6.count

>star总数

## 7.disabled

>只读，无法进行交互

## 8.style

>自定义样式对象

## 9.tooltips

>自定义每项的提示信息

## 10.value、defaultValue

>当前值，受控值\默认值

## 11.onBlur

>失去焦点时的回调

## 12.onChange

>选择时的回调

## 13.onFocus

>获取焦点时的回调

## 14.onHoverChange

>鼠标经过时数值变化的回调

## 15.onKeyDown

>按键回调

## 16.color

>评分的颜色

# 三、count实现

>其实我们在初版就实现了这个api，因为count是rate总数，默认是5。

# 四、value/defaultValue实现

>由于在内部我们需要对rate的value进行判断并给予对应的样式

<details>
<summary>重点代码</summary>

```js
.....

const Rate=forwardRef((props,ref)=>{

    const {
.....
        value:valueProps,
        defaultValue 
    } = props;
......

    const [value,setValue]=useControlled({
        controlled:valueProps,
        default:defaultValue
    });

    const handleHover=(e,starIndex)=>{
        setValue(starIndex);
    }

    const handleMouseLeave=()=>{
        setValue(undefined);
    }

    const renderStar=()=>{
        const stars=[];
        for(let i=0;i<count;i++){
            stars.push(
                <div className={classNames(
                    `${prefixCls}-star`,
                    {
                        [`${prefixCls}-star-full`]:i+1<=value,
                        [`${prefixCls}-star-zero`]:value>i+1,

                    }
                    )}
                    key={`count-${i}`}
                    onMouseMove={(e)=>handleHover(e,i+1)}
                    
                >
                    <div className={classNames(`${prefixCls}-star-first`)}>
                        <Icon name="rating" />
                    </div>
                    <div className={classNames(`${prefixCls}-star-second`)}>
                        <Icon name="rating" />
                    </div>
                </div>
            )
        }
        return stars;
    }

    return(
        <div className={classNames(
            prefixCls
            )}
            onMouseLeave={handleMouseLeave}>
            {renderStar()}
        </div>
    )
});

export default Rate;
```

```css
@import "./../components/styles/variable.scss";

$prefixCls:"#{$global-prefix}-rate";
$prefixClsStar:"#{$global-prefix}-rate-star";

.#{$prefixCls}{
    margin: 0;
    padding:0;
    color: #ffb400;
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &-star{
        position: relative;
        display: inline-block;
        margin: 0;
        padding: 0;
        color: inherit;
        cursor: pointer;
        -webkit-transition: all .3s;
        transition: all .3s;

        &:hover{
            transform: scale(1.3);
        }

        &-full{
            .#{$prefixClsStar}-second{
                color:inherit;
            }
        }

        &:not(:last-child){
            margin-right: 8px;
        }


        &-first,&-second{
            color: #f0f0f0;
        }

        &-first{
            position: absolute;
            top:0;
            left:0;
            width:50%;
            height: 100%;
            opacity: 0;
        }
    }
}
```
</details>

>通过value与坐标对应值比对，得出需要显示样式与不显示样式的星星标志

# 五、allowHalf

>允许半个选择，其实我们在刚开始设计结构的时候已经是半个半个来设计的。

>在这里我们有三种状态 ：zero,half,full 表示星星现在的状态，根据三种状态来给予不同的状态

<details>
<summary>重点代码</summary>

```js
//utils.js文件 计算元素左边的距离

function getClientPosition(elem){
    let x;
    let y;
    const doc=elem.ownerDocument;
    const {body}=doc;
    const docElem=doc && doc.documentElement;
    const box=elem.getBoundingClientRect();
    x=box.left;
    y=box.top;
    x-=docElem.clientLeft||body.clientLeft||0;
    y-=docElem.clientTop||body.clientTop||0;
    return {
        left:x,
        top:y
    }
}

export function getOffsetLeft(el){
    const pos=getClientPosition(el);
    const doc=el.ownerDocument;

    return pos.left;
}

```

```js
......
import { getOffsetLeft } from './utils'
import { findDOMNode } from 'react-dom';

const Rate=forwardRef((props,ref)=>{

    const {
......
        allowHalf
    } = props;
......

    const starRefArr=useRef([]);

......

    const handleHover=(e,starIndex)=>{
        const value=getStarValue(starIndex,e.pageX);
        setValue(value);
    }

    const handleMouseLeave=()=>{
        setValue(undefined);
    }

    const handleStarRef=(node,index)=>{
        starRefArr.current[index]=node;
    }

    const getStarDom=(index)=>{
        return findDOMNode(starRefArr.current[index])
    }

    const renderStar=()=>{
        const stars=[];
        for(let i=0;i<count;i++){
            stars.push(
                <div className={classNames(
                    `${prefixCls}-star`,
                    i+1<=value?`${prefixCls}-star-full`:allowHalf && value+0.5===i+1?`${prefixCls}-star-half`:`${prefixCls}-star-zero`,
                    {
                       
                    }
                    )}
                    key={`count-${i}`}
                    onMouseMove={(e)=>handleHover(e,i)}
                    ref={(node)=>handleStarRef(node,i)}
                >
                    <div className={classNames(`${prefixCls}-star-first`)}>
                        <Icon name="rating" />
                    </div>
                    <div className={classNames(`${prefixCls}-star-second`)}>
                        <Icon name="rating" />
                    </div>
                </div>
            )
        }
        return stars;
    }

    const getStarValue=(index,x)=>{

        let value=index;

        if(allowHalf){
            const starElem=getStarDom(index);
            const leftDis=getOffsetLeft(starElem);
            const width=starElem.clientWidth;
            if(x-leftDis<width/2){
                value+=0.5;
            }else if(x-leftDis>width/2){
                value+=1;
            }

            return value;
        }

        return value+1;
    }   

    return(
        <div className={classNames(
            prefixCls
            )}
            onMouseLeave={handleMouseLeave}>
            {renderStar()}
        </div>
    )
});

export default Rate;
```

```css
......

.#{$prefixCls}{
   ......

    &-star{
        ......

        &-half{
            .#{$prefixClsStar}-first{
                color:inherit;
                opacity: 1;
            }
        }
    }
}
```

</details>

# 六、实现style/className

>由于className和style都是样式属性，给外层Div没有意义，我们直接给单个star节点

<details>
<summary>重点代码</summary>

```js
 const renderStar=()=>{
        const stars=[];
        for(let i=0;i<count;i++){
            stars.push(
                <div style={style} className={classNames(
                    className,
                    ......

```

</details>

# 七、实现disabled

>只需要在相关逻辑和样式中判断是否存在disabled 如果有 就不处理逻辑即可

<details>
<summary>重点代码</summary>

```js
....

const Rate=forwardRef((props,ref)=>{

    const {
....
        disabled
    } = props;
....
    const handleHover=(e,starIndex)=>{
        const value=getStarValue(starIndex,e.pageX);
        if(!disabled){
            setValue(value);
        }
    }

    const handleMouseLeave=()=>{
        if(!disabled){
            setValue(undefined);
        }
        
    }
 
....
    return(
        <div className={classNames(
                prefixCls,
                {
                    [`${prefixCls}-disabled`]:disabled
....

```

```css
&-disabled{
        .#{$prefixClsStar}{
            &:hover{
                transform: scale(1);
            }
        }

        > * {
            cursor: auto!important;
        }
        
}
```

</details>

# 八、实现allowClear

>其实在这里我们是需要实现一个点击过后value不再随着鼠标变化，我们顺便实现一个，这样才能实现allowClear

>不妨定一个规则 如果点击了某一个星星 当炫富到其他星星时不变化 除非再次点击其他行星 当设置allowClear时 支持再次点击取消星星选择，当然 这里我们设置allowClear默认为true

<details>
<summary>重点代码</summary>

```js
......
    const {
......
        allowClear=true
    } = props;
 
    const [isClick,setIsClick]=useState(false);

    const handleHover=(e,starIndex)=>{

        if(!isClick){
            const value=getStarValue(starIndex,e.pageX);

            if(!disabled){
                setValue(value);
            }
        }
        
    }

    ......

    const handleClick=(e,starIndex)=>{
        const newValue=getStarValue(starIndex,e.pageX);

        const isSame=newValue===value;

        setValue(isSame && allowClear && isClick ?0:newValue);

        setIsClick(!isClick);
    }
......
                    onClick={disabled?null:(e)=>handleClick(e,i)}
......
 

```

</details>

# 九、实现character和color

>character实现起来也很简单，就是将character替换icon为star就行

>color就是将外层的div颜色换成指定的color就行

<details>
<summary>重点代码</summary>

```js
    <div className={classNames(`${prefixCls}-star-first`)}>
        {!!character?character:<Icon name="rating" />}
    </div>
    <div className={classNames(`${prefixCls}-star-second`)}>
        {!!character?character:<Icon name="rating" />}
    </div>
```
</details>

# 十、实现tooltips

>这里我们借用我们实现的tooltip组件

<details>
<summary>重点代码</summary>

```js
.....
const Rate = forwardRef((props, ref) => {

    const {
......
        tooltips
    } = props;
......
    const renderStar = () => {
        const stars = [];
        for (let i = 0; i < count; i++) {

            if (tooltips) {
                stars.push(
                    <Tooltip title={tooltips[i]}>
                        <div style={style} className={classNames(
                            className,
                            `${prefixCls}-star`,
                            i + 1 <= value ? `${prefixCls}-star-full` : allowHalf && value + 0.5 === i + 1 ? `${prefixCls}-star-half` : `${prefixCls}-star-zero`,
                            {

                            }
                        )}
                            key={`count-${i}`}
                            onMouseMove={disabled ? null : (e) => handleHover(e, i)}
                            onClick={disabled ? null : (e) => handleClick(e, i)}
                            ref={(node) => handleStarRef(node, i)}
                        >
                            <div className={classNames(`${prefixCls}-star-first`)}>
                                {!!character ? character : <Icon name="rating" />}
                            </div>
                            <div className={classNames(`${prefixCls}-star-second`)}>
                                {!!character ? character : <Icon name="rating" />}
                            </div>
                        </div>
                    </Tooltip>
                )

            } else {
                stars.push(
                    <div style={style} className={classNames(
                        className,
                        `${prefixCls}-star`,
                        i + 1 <= value ? `${prefixCls}-star-full` : allowHalf && value + 0.5 === i + 1 ? `${prefixCls}-star-half` : `${prefixCls}-star-zero`,
                        {

                        }
......
```

</details>

>只需要借助tooltip进行包裹即可。

# 十一、实现onFocus和onBlur属性

>有的同学会疑惑 我们这里的div怎么样才能有触发焦点事件和离开焦点事件呢？这里我们只需要将div给一个tabIndex属性即可（注意样式问题）

<details>
<summary>重点代码</summary>

```js
import React, { forwardRef, useRef, useState } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Icon from '../components/icon';
import useControlled from '../_utils/useControlled';
import "./index.scss";
import { getOffsetLeft } from './utils';
import Tooltip from '../Tooltip';
import { findDOMNode } from 'react-dom';

const Rate = forwardRef((props, ref) => {

    const {
....
        tabIndex=0,
        onFocus,
        onBlur
    } = props;

 

    const handleFocus=(e)=>{
         if(onFocus){
             onFocus(e);
         }
    }

    const handleBlur=(e)=>{
       if(onBlur){
           onBlur(e)
       }
    }

    return (
        <div className={classNames(
.....
            tabIndex={disabled?-1:tabIndex}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {renderStar()}
        </div>
    
});

export default Rate;
```
</details>

# 十二、实现onChange和onHoverChange

>onChange被认为是点击或者下面说到的键盘按键的回调，onHoverChange的回调

<details>
<summary>重点代码</summary>

```js
......

const Rate = forwardRef((props, ref) => {

    const {
......
        onChange,
        onHoverChange
    } = props;

......
    const handleHover = (e, starIndex) => {
        const value = getStarValue(starIndex, e.pageX);
        if(!currentElem){
            setValue(value);
        }
        if(onHoverChange){
            onHoverChange(value,e);
        }
  
    }

    const handleMouseLeave = (e) => {
        if(!currentElem){
            setValue(undefined);
        }
        if(onHoverChange){
            onHoverChange(undefined,e);
        }
    }
 

    const handleClick = (e, starIndex) => {
        const newValue = getStarValue(starIndex, e.pageX);

        if(!currentElem || currentElem!==getStarDom(starIndex)){//如果没有点击的当前节点就设置节点
            setCurrentElem(getStarDom(starIndex));
            setValue(newValue);
            if(onChange){
                onChange(newValue,e);
            }
        }else if(currentElem && currentElem===getStarDom(starIndex) && allowClear){//如果重复点击同一个点击即清除
            setCurrentElem(null);
            setValue(undefined);
            if(onChange){
                onChange(undefined,e);
            }
        }
    }
......
       
```
</details>

# 十三、实现onKeyDown方法

>在antd中，我们可以通过键盘的左右键来控制星星 那么具体是如何实现的呢？

<details>
<summary>重点代码</summary>

```js
 
......
        onKeyDown
    } = props;

    const handleKeyDown=(e)=>{
        //右键 39 左键 37
        const { keyCode }=e;
        let newValue=value;
        if(keyCode===39 && value<count){
            if(allowHalf){
                newValue=newValue+0.5;
            }else{
                newValue=newValue+1;
            }
        }
        if(keyCode===37 && value>0){
            if(allowHalf){
                newValue=newValue-0.5;
            }else{
                newValue=newValue-1;
            }
        }
        setValue(newValue);
        if(onChange){
            onChange(newValue,e);
        }
        if(onKeyDown){
            onKeyDown(e);
        }
    }

.....
            onKeyDown={disabled ? null : handleKeyDown}
        >
            {renderStar()}
        </div>
    )
});

export default Rate;
```
</details>