import React from 'react';
import PropTypes from 'prop-types';
import useForkRef from '../_utils/useForkRef';
import ownerDocument from '../_utils/ownerDocument';
import useInit from '../_utils/useInit';
import ReactDOM from 'react-dom';

function mapEventPropToEvent(eventProp) {
    return eventProp.substring(2).toLowerCase();
}

const ClickAwayListener = React.forwardRef((props, ref) => {
    const {
        children,
        mouseEvent = "onClick",
        onClickAway
    } = props;

    const nodeRef = React.useRef(null);
    const syntheticEventRef = React.useRef(false);
    const isInit = useInit();

    const createHandleSynthetic = (handlerName) => (event) => {
        syntheticEventRef.current = true;
        const childrenPropsHandler = children.props[handlerName];
        if (childrenPropsHandler) {
            childrenPropsHandler(event);
        }
    }

    const handleOwnRef = React.useCallback((instance) => {
        nodeRef.current = ReactDOM.findDOMNode(instance);
    }, []);

    const handleRef = useForkRef(children.ref, handleOwnRef);

    const childrenProps = { ref: handleRef }

    const handleClickAway = (event) => {

        

        const insideReactTree = syntheticEventRef.current;
        syntheticEventRef.current = false;

        if (!isInit || !nodeRef.current) {
            return;
        }

        let insideDOM;

        if (event.composedPath) {
            insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
        } else {
            // TODO v6 remove dead logic https://caniuse.com/#search=composedPath.
            const doc = ownerDocument(nodeRef.current);
            insideDOM =
                !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
        }

        if(!insideDOM && !insideReactTree){ 
            onClickAway(event);
        }


    }

    if (mouseEvent !== false) {
        childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
    }

    React.useEffect(() => {
        if (mouseEvent !== false) {
            const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
            const doc = ownerDocument(nodeRef.current);

            doc.addEventListener(mappedMouseEvent, handleClickAway);

            return () => {
                doc.removeEventListener(mappedMouseEvent, handleClickAway);
            }
        }

        return undefined;
    }, [handleClickAway, mouseEvent])

    return <React.Fragment>
        {
            React.cloneElement(children, childrenProps)
        }
    </React.Fragment>
});

ClickAwayListener.propTypes = {
    children: PropTypes.any,
    onClickAway: PropTypes.func.isRequired
};


export default ClickAwayListener;
