import React from 'react';

const SizeContext=React.createContext(undefined);

export const SizeContextProvider=({children,size})=>( 
                <SizeContext.Provider value={size}>
                    {children}
                </SizeContext.Provider>
);

export default SizeContext;