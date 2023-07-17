import React from 'react';
import DataTableController from "./DataTableController";
import HeaderColumn from "./HeaderColumn";
import RowItem from "./RowItem";

interface IProps {
    controller: DataTableController<any>
}

const defaultProps: IProps = {
    controller: null
}


export default function DataTable<T>(props: IProps) {

    props.controller.onRender();
    const state = props.controller.state;

    return (
        <>
            <table className="table mt-3">
                <thead>
                <tr>
                    {state.columns.map(v => <HeaderColumn column={v}/>
                    )}
                </tr>
                </thead>
                <tbody>
                {state.displayItems.map(v => <RowItem<T> item={v} columns={state.columns}/>
                )}
                </tbody>
            </table>
        </>
    )

}
