import * as React from 'react';
import Layout from './../layout/index';
import Table from './../components/table';

class TablePage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            columns:[
                {
                    title:"姓名",
                    key:"name",
                    width:200,
                    render:(text,record)=>{
                        return "我的名字"+record.desc
                    }
                },
                {
                    title:"年龄",
                    key:"age",
                    width:200
                },
                {
                    title:"职业",
                    key:"job",
            
                }
            ],
            dataSource:[
                {
                    id:1,
                    name:"吴家宝",
                    age:18,
                    job:"初级前端工程师",
                    desc:"我是扩展1"
                },
                {
                    id:2,
                    name:"汪琛淮",
                    age:18,
                    job:"初级前端工程师",
                    desc:"我是扩展2"
                },
                {
                    id:3,
                    name:"淮",
                    age:18,
                    job:"初级前端工程师",
                    desc:"我是扩展3"
                },
                {
                    id:4,
                    name:"淮",
                    age:18,
                    job:"初级前端工程师",
                    desc:"我是扩展3"
                },
                {
                    id:5,
                    name:"淮",
                    age:18,
                    job:"初级前端工程师",
                    desc:"我是扩展3"
                },
                {
                    id:6,
                    name:"淮",
                    age:18,
                    job:"初级前端工程师",
                    desc:"我是扩展3"
                },
                {
                    id:7,
                    name:"淮",
                    age:18,
                    job:"初级前端工程师",
                    desc:"我是扩展3"
                },
                {
                    id:8,
                    name:"淮",
                    age:18,
                    job:"初级前端工程师",
                    desc:"我是扩展3"
                },
                {
                    id:9,
                    name:"淮",
                    age:18,
                    job:"初级前端工程师",
                    desc:"我是扩展3"
                },
                {
                    id:10,
                    name:"淮",
                    age:18,
                    job:"初级前端工程师",
                    desc:"我是扩展3"
                },
            ],
            rowSelection:{
                type:"checkbox",
                onSelectAll:(row)=>{},
                onSelect:(record,selectedRows)=>{console.log(record);console.log(selectedRows);},
                columnWidth:50
            }
        }
    }

    render(){

        const { columns,dataSource,rowSelection }=this.state;

        return (
            <Layout>
                 <Table columns={columns} dataSource={dataSource} rowSelection={rowSelection} expand height={400}></Table>
            </Layout>
        )
    }
}

export default TablePage;