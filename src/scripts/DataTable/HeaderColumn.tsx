import React from 'react';
import {IDataTableColumn} from "./Types";

interface IProps {
    column: IDataTableColumn<any>
}

// const defaultProps: IProps = {
//
// }

export default function HeaderColumn(props: IProps) {

    const column = props.column;

    return (
        <th className="align-middle"
            scope="row">
            {column.label}
        </th>
    )

}
