import * as React from 'react';
import "./index.less";

interface TableProps {
    columns?: [];
    dataSource?: [];
    rowSelection?: any;
    checkboxInput?: any;
    expand?: boolean;
    height?:number
}

interface TableState {
    data: object,
    selectedRows?: [],
    expandIds?: []
}

class Table extends React.Component<TableProps, TableState> {

    static defaultProps = {
        columns: [],
        dataSource: [],
        expand: false
    };

    private allCheckboxNode: HTMLElement | null;
    private tableHeaderRef: HTMLElement | null;
    private tableBodyRef: HTMLElement | null;

    constructor(props: TableProps) {
        super(props);
        this.state = {
            selectedRows: [],
            data: props.dataSource,
            expandIds: []
        }
    }

    selectAll = (e) => { // 单击表头的多选框并向外触发事件
        const { data } = this.state;
        const { rowSelection: { onSelectAll } } = this.props;
        let checked = e.target.checked;
        const selectedRows = checked ? JSON.parse(JSON.stringify(data)) : [];
        this.setState({
            selectedRows
        })
        if (onSelectAll) {
            onSelectAll(selectedRows)
        }
    }

    formateStatus = (row) => { // 表体的每个多选框是否被勾选
        const { selectedRows } = this.state;
        return selectedRows.findIndex(item => item.id === row.id) >= 0;
    }

    toggleSelect = (e, row) => {// 单击表体的多选框并向外触发事件
        let checked = e.target.checked;
        const { selectedRows } = this.state;
        const { rowSelection: { onSelect } } = this.props;
        if (checked) {
            selectedRows.push(row);
            this.setState({
                selectedRows: selectedRows
            })
        } else {
            let idx = selectedRows.findIndex(item => item.id === row.id);
            selectedRows.splice(idx, 1);
            this.setState({
                selectedRows: selectedRows
            })
        }
        if (onSelect) {
            onSelect(row, JSON.parse(JSON.stringify(selectedRows)))
        }
    }

    isSelectAll = () => {// 表头全选的勾选状态应该根据当前已选的来计算，最好不要直接比较数组长度是否相等，而是应该在比较长度的基础上比较每一项的 id 是否一样，虽然目前看起来这个步骤很多余
        const { data, selectedRows } = this.state;
        let allId = data.map(item => item.id).sort();
        let selectedId = selectedRows.map(item => item.id).sort();
        let isSelectAll = true;
        if (allId.length === selectedId.length) {
            for (let i = 0, len = allId.length; i < len; i++) {
                if (allId[i] !== selectedId[i]) {
                    isSelectAll = false;
                    break;
                }
            }
        } else {
            isSelectAll = false;
        }
        return isSelectAll;
    }

    checkIsExpand = (id) => {
        const { expandIds } = this.state;
        return expandIds.indexOf(id) >= 0;
    }

    toggleExpand = (id) => {
        const { expandIds } = this.state;

        let idx = expandIds.indexOf(id);
        if (idx >= 0) {
            expandIds.splice(idx, 1);
        } else {
            expandIds.push(id);
        }
        this.setState({
            expandIds
        })
    }

    componentDidMount(){
        const { height }=this.props;
        let headerH=parseInt(window.getComputedStyle(this.tableHeaderRef).height);
        let bodyH=height-headerH;
        this.tableBodyRef.style.height=`${bodyH}px`;
    }

    render() {

        const {
            columns = [],
            dataSource = [],
            rowSelection,
            expand
        } = this.props;

        return (
            <React.Fragment>
                <div class="melon_table">
                    <div class="melon_table__header" ref={self=>this.tableHeaderRef=self}>
                        <table border={"1"} >

                            <colgroup>
                                {
                                    expand && <col width={50}></col>
                                }
                                {
                                    rowSelection &&
                                    <col width={rowSelection.columnWidth}></col>
                                }
                                {
                                    columns.map(item => (
                                        <col width={item.width || ''}></col>
                                    ))
                                }
                            </colgroup>

                            <thead>
                                <tr>
                                    {
                                        expand && <th>
                                             
                                        </th>
                                    }
                                    {
                                        rowSelection && rowSelection.type === "checkbox" &&
                                        <th>
                                            <input checked={this.isSelectAll()} ref={(ref) => { this.allCheckboxNode = ref }} type="checkbox" onChange={this.selectAll} />
                                        </th>
                                    }
                                    {
                                        columns.map(item => {
                                            return (
                                                <th>
                                                    {item.title}
                                                    <div style={{width:"30px",height:"30px",background:'red',float:"right"}}></div>
                                                </th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>

                        </table>
                    </div>
                    <div class="melon_table__body" ref={self=>this.tableBodyRef=self}>
                        <table border={"1"} >

                            <colgroup>
                                {
                                    expand && <col width={50}></col>
                                }
                                {
                                    rowSelection &&
                                    <col width={rowSelection.columnWidth}></col>
                                }
                                {
                                    columns.map(item => (
                                        <col width={item.width || ''}></col>
                                    ))
                                }
                            </colgroup>

                            <tbody>

                                {
                                    dataSource.map(data => {
                                        return <React.Fragment>
                                            <tr>
                                                {
                                                    expand && <td>
                                                        <div onClick={() => this.toggleExpand(data.id)}>></div>
                                                    </td>
                                                }
                                                {
                                                    rowSelection && rowSelection.type === "checkbox" &&
                                                    <td>
                                                        <input
                                                            checked={this.formateStatus(data)}
                                                            ref={(ref) => { this.checkboxInputNode = ref }}
                                                            type="checkbox"
                                                            onChange={(e) => this.toggleSelect(e, data)}
                                                        />
                                                    </td>
                                                }
                                                {columns.map(column => {
                                                    if (column.render) {
                                                        return <td>{column.render(data[column.key], data)}</td>
                                                    }
                                                    return (
                                                        <td>{data[column.key]}</td>
                                                    )
                                                })}</tr>
                                            {
                                                this.checkIsExpand(data.id) && <tr key={`expand-${data.id}`}>
                                                    <td colSpan={columns.length + 2}>{data.desc}</td>
                                                </tr>
                                            }
                                        </React.Fragment>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Table;