import React, { Fragment } from 'react';

const Demo = () => {

  const renderTable = () => {
    let data = 100000;
    return data.map(item => (
      <Fragment>
        <tr>
          <th>Month</th>
          <th>Savings</th>
        </tr>
        <tr>
          <td>January</td>
          <td>$100</td>
        </tr>
      </Fragment>
    ))
  }


  return <Fragment>
    <table>
      {renderTable()}
    </table>
  </Fragment>
}


export default Demo;