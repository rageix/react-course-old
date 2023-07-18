import React from 'react';
import {IPagination} from "../Pagination/Types";
export interface IDataTableState<T> {
    items: T[],
    selected: string[],
    displayItems: T[],
    columns: IDataTableColumn<T>[],
    pagination: IPagination
}

export interface IDataTableColumn<T> {
    column: keyof T,
    label: string,
    format: (arg: T) => React.ReactElement,
}
