import React from 'react';
export interface IDataTableState<T> {
    items: T[],
    selected: string[],
    displayItems: T[],
    columns: IDataTableColumn<T>[],
    pagination: IPagination
}

export interface IPagination {
    page: number,
    perPage: number,
}

export interface IDataTableColumn<T> {
    column: keyof T,
    label: string,
    format: (arg: T) => React.ReactElement,
    id?: (arg: T) => string
}
