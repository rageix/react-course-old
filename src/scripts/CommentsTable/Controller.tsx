import React from "react";
import {IDataTableState} from "../DataTable/Types";
import DataTableController from "../DataTable/DataTableController";
import {comments, IComments} from "./Data";

export interface IState extends IDataTableState<IComments> {

}

export const defaultState: IState = {
    items: comments,
    selected: [],
    displayItems: [],
    columns: [{
        column: "id",
        label: "Id",
        format: v => <td>{v.id}</td>,
    }, {
        column: "postId",
        label: "Post Id",
        format: v => <td>{v.postId}</td>,
    }, {
        column: "name",
        label: "Name",
        format: v => <td>{v.name}</td>,
    }, {
        column: "body",
        label: "Body",
        format: v => <td>{v.body}</td>,
    }, {
        column: "email",
        label: "Email",
        format: v => <td>{v.body}</td>,
    }],
    pagination: {
        page: 0,
        perPage: 10,
    }
}

export default class Controller extends DataTableController<IState> {


}
