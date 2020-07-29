import React, { Fragment, useEffect } from 'react';
import { getScrollbarSize } from '../src/VirtualRolling/domHelpers';
import { FixedSizeList } from 'react-window';

const Demo = () => {

  const Row = ({ index, style }) => (
    <div style={style}>Row {index}</div>
  );

  const render=()=>{
      return <FixedSizeList
      height={500}
      itemCount={100000}
      itemSize={50}
      width={600}
    >
      {Row}
    </FixedSizeList>
  }

  const render2=()=>{
        return new Array(100000).fill(1).map((item,index)=><div>
          {index}
        </div>)
  }

  useEffect(()=>{
    console.log(getScrollbarSize())
  },[]);

  return render2();
}


export default Demo;