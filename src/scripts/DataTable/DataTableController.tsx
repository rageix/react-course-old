import React, {Dispatch, SetStateAction, useState} from "react";
import {IDataTableState} from "./Types";
import {IPagination} from "../Pagination/Types";

export default class DataTableController<T> {
    state: IDataTableState<T>;
    defaultState: IDataTableState<T>;
    updateState: Dispatch<SetStateAction<IDataTableState<T>>>;

    constructor() {

    }

    onRender = () => {

        [this.state, this.updateState] = useState<IDataTableState<T>>(this.defaultState);

    }


    saveState = (state: IDataTableState<T>) => {

        this.updateState(state);

    }

    onChangePage = (page: number) => {

        let newState: IDataTableState<T> = {...this.state};

        let pagination = {...newState.pagination};
        pagination.page = page;

        newState = this.updatePagination(newState, pagination);

        this.saveState(this.updateDisplayItems(newState));

    }


    onChangePagination = (pagination: IPagination) => {

        let newState: IDataTableState<T> = {...this.state};

        newState.pagination = pagination;

        this.saveState(this.updateDisplayItems(newState));

    }

    updatePagination = (state: IDataTableState<T>, pagination: IPagination): IDataTableState<T> => {

        pagination.totalPages = Math.ceil(pagination.totalItems / pagination.perPage);

        if (pagination.page < 0) {

            pagination.page = 0;

        } else if (pagination.page > pagination.totalPages) {

            pagination.page = pagination.totalPages;

        }

        state.pagination = pagination;

        return state;

    }

    updateDisplayItems = (state: IDataTableState<T>): IDataTableState<T> => {

        let start = state.pagination.page * state.pagination.perPage;
        let end = start + state.pagination.perPage;

        state.displayItems = state.items.slice(start, end);

        return state;

    }

    setItems = (items: T[]) => {

        let newState: IDataTableState<T> = {...this.state};

        newState.items = items;

        this.saveState(this.updateDisplayItems(newState));

    }


}
