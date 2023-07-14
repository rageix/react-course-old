import React, {Dispatch, SetStateAction, useState} from "react";
import {ITodoItem} from "./TodoItem";
import {v4 as uuidv4} from 'uuid';

interface IState {
    items: ITodoItem[],
    name: string,
    selectAll: boolean
}

const defaultState: IState = {
    items: [],
    name: '',
    selectAll: false,
}

export default class LoginFormController {
    state: IState;
    updateState: Dispatch<SetStateAction<IState>>;

    constructor() {

    }

    onRender = () => {

        [this.state, this.updateState] = useState<IState>(defaultState);

    }


    saveState = (state: IState) => {

        this.updateState(state);

    }


    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        let newState: IState = {...this.state};

        newState.items.push({
            id: uuidv4(),
            taskName: newState.name,
            checked: false
        });

        this.saveState(newState);

    }


    onChangeName = (event: React.FormEvent<HTMLInputElement>) => {

        this.updateState({...this.state, name: event.currentTarget.value});

    }

    onChangeCheck = (id: string) => {

        let newState: IState = {...this.state};

        let index = newState.items.findIndex(v => v.id === id);

        if (index > -1) {

            newState.items[index].checked = !newState.items[index].checked;

        }

        this.saveState(newState);

    }

    onClickDelete = (id: string) => {

        let newState: IState = {...this.state};

        newState.items = newState.items.filter(v => v.id !== id);

        this.saveState(newState);

    }

    onClickSelectAll = () => {

        let newState: IState = {...this.state};

        newState.selectAll = !this.state.selectAll;
        newState.items = newState.items.map(v => {

            v.checked = newState.selectAll;
            return v;

        });

        this.saveState(newState);

    }

    onClickDeleteSelected = () => {

        let newState: IState = {...this.state};

        newState.items = newState.items.filter(v => !v.checked);

        this.saveState(newState);

    }


}
