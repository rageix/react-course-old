import React from 'react';
import {IPagination, IPaginationItem} from "./Types";
import PaginationItem from "./PaginationItem";

interface IProps {
    pagination: IPagination,
    onClickChangePage: (arg: number) => any,
    next?: boolean,
    last?: boolean,
    before?: number
    after?: number
}

const defaultProps: Partial<IProps> = {
    next: true,
    last: true,
    before: 4,
    after: 4,
}


export default function Pagination(props: IProps) {

    props = {...defaultProps, ...props};

    let numItems: IPaginationItem[] = [];
    let min = Math.max(props.pagination.page - props.before, 0);
    let max = Math.min(props.pagination.page + props.after, props.pagination.totalPages);

    for (let i = min; i < max; i++) {

        numItems.push({
            label: String(i + 1),
            page: i,
            active: props.pagination.page === i
        });

    }

    return (
        <nav>
            <ul className="pagination">
                <PaginationItem item={{
                    label: 'Previous',
                    page: props.pagination.page - 1,
                    active: false
                }}
                                onClickChangePage={props.onClickChangePage}/>
                {numItems.map((v, i) => <PaginationItem key={i}
                                                        item={v}
                                                        onClickChangePage={props.onClickChangePage}/>)}
                <PaginationItem item={{
                    label: 'Next',
                    page: props.pagination.page + 1,
                    active: false
                }}
                                onClickChangePage={props.onClickChangePage}/>
            </ul>
        </nav>
    )

}
