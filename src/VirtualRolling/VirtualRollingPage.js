

import React, { Fragment, useState, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
// import memoize from './memoize';
// import memoize from 'memoize-one';
const Row = ({ index, style }) => (
    <div style={style}>Row {index}</div>
);


const Page = () => {

    const [count, setCount] = useState(0);

    return (
        <List
            height={500}
            itemCount={100000}
            itemSize={35}
            width={300}
        >
            {Row}
        </List>
    )
}

export default Page;