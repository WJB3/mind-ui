
> UI由MaterialUI+Antd风格的UI实现

> 这篇文章主要实现radio组件

# 一、搭建基础框架

src下新建Radio文件夹，Radio文件夹下新建Radio.js文件,为什么不建index.js呢，因为index.js作为我们的入口文件，我们更希望他有作为入口文件导出组件的功能。

```js
import React, { forwardRef, useContext, useState } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useControlled from '../_utils/useControlled';
import "./index.scss";

const Radio = forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
    } = props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("radio", customizePrefixCls);
 
 
    return (
        <div  className={classNames(
            prefixCls,
            className
        )}>

        </div>
    )
})

export default Radio;
```

# 二、整理需求

## 1.Radio/Radio.Button的autoFocus

>自动获取焦点

## 2.Radio/Radio.Button的checked

>指定当前是否选中

## 3.Radio/Radio.Button的defaultChecked

>初始是否选中

## 4.Radio/Radio.Button的disabled

>禁用Radio

## 5.Radio/Radio.Button的value

>根据value进行比较 判断是否选中

## 6.RadioGroup的defaultValue

>默认选中的值

## 7.RadioGroup的disabled

>禁用所有的子单选器

## 8.RadioGroup的name

>RadioGroup 下所有 input[type="radio"] 的 name 属性

## 9.options

>已配置形式设置子元素

## 10.size

>大小，只对按钮样式生效

## 11.value

>用于设置当前选中的值

## 12.onChange  

>选项变化时的回调函数

## 13.buttonStyle

>RadioButton的风格样式