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
                        columns.map(item => (
                            <col width={item.width || ''}></col>
                        ))
                    }
                </colgroup>
                <thead>
                    <tr>

                        {
                            columns.map(item => {
                                return (
                                    <th>
                                        {item.title}

                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>

                    {
                        dataSource.map(data => {
                            return <React.Fragment>
                                <tr>

                                    {columns.map(column => {
                                        if (column.render) {
                                            return <td>{column.render(data[column.dataIndex], data)}</td>
                                        }
                                        return (
                                            <td>{data[column.dataIndex]}</td>
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