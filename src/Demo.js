import React from 'react'
import  { Tree } from 'antd';

function createMarkup (doms) {
  return doms.length ? { __html: doms.join(' ') } : { __html: '' }
}


function dig(path = '0', level = 3) {
    const list = [];
    for (let i = 0; i < 10; i += 1) {
      const key = `${path}-${i}`;
      const treeNode = {
        title: key,
        key,
      };
  
      if (level > 0) {
        treeNode.children = dig(key, level - 1);
      }
  
      list.push(treeNode);
    }
    return list;
  }
  

export default class DOM extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      complexDOMs: []
    }

    this.onCreateComplexDOMs = this.onCreateComplexDOMs.bind(this)
  }

  componentDidMount(){
    this.onCreateComplexDOMs()
  }
  

  onCreateComplexDOMs () {
    const data = []
    for (let i = 0; i < 100000; i += 1) {
        data.push({
          key: i,
        });
    }

    this.setState({
      complexDOMs: data
    })
  }


  render () {

    const treeData = dig();
    

    const columns = [
        { title: 'A', dataIndex: 'key', width: 150 },
        { title: 'B', dataIndex: 'key' },
        { title: 'C', dataIndex: 'key' },
        { title: 'D', dataIndex: 'key' },
        { title: 'E', dataIndex: 'key', width: 200 },
        { title: 'F', dataIndex: 'key', width: 100 },
    ];

    return (
      <div style={{ marginLeft: '10px' }}>
        {/* <h3>Creat large of DOMs：</h3>
        <button onClick={this.onCreateComplexDOMs}>Create Complex DOMs</button>*/}
 
        <Tree treeData={treeData} />
      </div>
    )
  }
}