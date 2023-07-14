import React from 'react';

export interface ITodoItem {
    id: string,
    checked: boolean,
    taskName: string,
}

interface IProps {
    item: ITodoItem,
    onChangeCheck: (id: string) => void,
    onClickDelete: (id: string) => void
}

// const defaultProps: IProps = {
//
// }

export default function TodoItem(props: IProps) {

    const item = props.item;

    return (
        <tr>
            <th className="align-middle"
                scope="row">
                <input className="form-check-input"
                       type="checkbox"
                       checked={item.checked}
                       onChange={() => props.onChangeCheck(item.id)}
                />
            </th>
            <td className="align-middle">{item.taskName}</td>
            <td className="align-middle">
                <button type="button"
                        className="btn btn-danger"
                        onClick={() => props.onClickDelete(item.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )

}
