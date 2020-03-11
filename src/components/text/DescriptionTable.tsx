import * as React from 'react';
import "./DescriptionTable.less";

class DescriptionTable extends React.Component {
    render() {

        const {
            children,
            columns,
            dataSource
        } = this.props;

        return (
            <table className={"descriptiontable_component"} border="1">

                <colgroup>
                   
                    {
                        columns.map((item,index) => (
                            <col width={item.width || ''} key={index}></col>
                        ))
                    }
                </colgroup>
                <thead>
                    <tr>

                        {
                            columns.map((item,index) => {
                                return (
                                    <th key={index}>
                                        {item.title}

                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>

                    {
                        dataSource.map((data,index) => {
                            return <React.Fragment key={index}>
                                <tr key={index}>

                                    {columns.map((column,index) => {
                                        if (column.render) {
                                            return <td key={index}>{column.render(data[column.dataIndex], data)}</td>
                                        }
                                        return (
                                            <td key={index}>{data[column.dataIndex]}</td>
                                        )
                                    })}</tr>

                            </React.Fragment>
                        })
                    }
                </tbody>

            </table>
        )
    }
}

export default DescriptionTable;