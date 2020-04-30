import * as React from 'react';

/**
 * @ignore - internal component.
 */
const CheckGroupContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
    CheckGroupContext.displayName = 'CheckGroupContext';
}

export default CheckGroupContext;
