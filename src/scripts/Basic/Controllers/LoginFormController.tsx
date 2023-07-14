import React, {Dispatch, SetStateAction, useState} from "react";

interface IState {
    email: string,
    password: string,
    rememberMe: boolean
}

const defaultState: IState = {
    email: '',
    password: '',
    rememberMe: true
}

export default class LoginFormController {
    state: IState;
    updateState: Dispatch<SetStateAction<IState>>;

    constructor() {

    }

    onRender = () => {

        [this.state, this.updateState] = useState<IState>(defaultState);

    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

    }


    onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {

        this.updateState({...this.state, email: event.currentTarget.value});

    }

    onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {

       this.updateState({...this.state, password: event.currentTarget.value});

    }

    onChangeRememberMe = () => {

        this.updateState({...this.state, rememberMe: !this.state.rememberMe});

    }




}
