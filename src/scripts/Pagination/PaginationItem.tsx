import React from 'react';
import {IPaginationItem} from "./Types";

interface IProps {
    item: IPaginationItem,
    onClickChangePage: (arg: number) => any,
}

export default function PaginationItem(props: IProps) {

    function onClick(event: React.MouseEvent) {

        event.preventDefault();

        props.onClickChangePage(props.item.page);

    }

    return (
        <li className="page-item">
            <a className={`page-link ${props.item.active ? 'active': ''}`}
               href="#"
               onClick={onClick}
            >{props.item.label}</a>
        </li>
    )

}
