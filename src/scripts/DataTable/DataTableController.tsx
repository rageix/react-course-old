import React, {Dispatch, SetStateAction, useState} from "react";
import {IDataTableState, IPagination} from "./Types";
import {IState} from "../CommentsTable/Controller";

export default class DataTableController<T> {
    state: IDataTableState<T>;
    updateState: Dispatch<SetStateAction<IDataTableState<T>>>;

    constructor() {

    }

    onRender = () => {

        [this.state, this.updateState] = useState<IDataTableState<T>>();

    }


    saveState = (state: IDataTableState<T>) => {

        this.updateState(state);

    }

    onChangePagination = (pagination: IPagination) => {

        let newState: IDataTableState<T> = {...this.state};

        newState.pagination = pagination;

        this.saveState(this.updateDisplayItems(newState));

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
