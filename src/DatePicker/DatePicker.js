import React,{useState,useRef,useCallback} from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext'
import setRef from '../_utils/setRef';
import useForkRef from '../_utils/useForkRef';
import Paper from '../Paper';
import Popover from '../Popover';
import Icon from '../components/icon';
import Input from '../Input';
import "./index.scss";

const DatePicker = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        style,
        placeholder,
        border,
        disabled
    } = props;

    const [visible, setVisible] = useState(false);

    const selectRef = useRef(null);

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("datepicker", customizePrefixCls);

    const handleClickBackdrop = React.useCallback(() => {
        setVisible(false);
    }, [visible]);

    const renderContent=()=>{
        return <div>content</div>
    }

    const ownRef = useForkRef(selectRef, ref);
    
    const handleRef = React.useCallback(
        (node) => {
            setRef(ownRef, node);
        },
        [ownRef]
    );

    const renderSuffix=()=>{
        return <Icon name="arrow-down"  style={{ fontSize: 16 }} className={classNames(`${prefixCls}-arrow-down`,{
            [`${prefixCls}-arrow-down-focus`]:visible
        })}  />
    }

    const handleFocus = useCallback(() => {
        if (disabled) {
            return;
        }
        setVisible(true);
    }, [visible]);

    return (
        <Paper ref={handleRef}  className={
            classNames(
                prefixCls,
                className
            )
        }>
            <Popover
                trigger={"focus"}
                container={() => selectRef.current}
                placement={"bottom"}
                onCloseBackdrop={handleClickBackdrop}
                visible={visible}
                className={`${prefixCls}-popover`}
                content={renderContent()}
            >
                <Input
                    component="div"
                    suffix={renderSuffix()}
                    placeholder={placeholder}
                    tabIndex={0}
                    style={style}
                    border={border}
                    onFocus={handleFocus}
                />
            </Popover>
        </Paper>
    )
});

DatePicker.propTypes = {
    //传入的className
    className: PropTypes.string,
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //自定义样式
    style: PropTypes.object
};

export default DatePicker;