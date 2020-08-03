

import React, { Fragment, useState, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { FixedSizeList } from './index';
// import memoize from './memoize';
// import memoize from 'memoize-one';
const Row = ({ index, style }) => (
    <div style={style}>Rowaaa {index}</div>
);


const Page = () => {

    const [count, setCount] = useState(0);

    return (
        <FixedSizeList
            height={500}
            itemCount={100000}
            itemSize={35}
            width={"100%"}
        >
            {Row}
        </FixedSizeList>
    )
}

export default Page;