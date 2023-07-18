import React from "react";
import {IDataTableState} from "../DataTable/Types";
import DataTableController from "../DataTable/DataTableController";
import {comments, IComments} from "./Data";

export interface IState extends IDataTableState<IComments> {
}

export const defaultState: IState = {
    items: comments,
    // items: [],
    selected: [],
    displayItems: [],
    columns: [{
        column: "id",
        label: "Id",
        format: v => <>{v.id}</>,
    }, {
        column: "postId",
        label: "Post Id",
        format: v => <>{v.postId}</>,
    }, {
        column: "name",
        label: "Name",
        format: v => <>{v.name}</>,
    }, {
        column: "body",
        label: "Body",
        format: v => <>{v.body}</>,
    }, {
        column: "email",
        label: "Email",
        format: v => <>{v.body}</>,
    }],
    pagination: null
}

export default class CommentsTableController extends DataTableController<IComments> {

    constructor() {
        super();

        let state = this.updatePagination(defaultState, {
            page: 0,
            perPage: 10,
            totalPages: null,
            totalItems: defaultState.items.length
        });

        this.defaultState = this.updateDisplayItems(state);

    }

}
