import React, {useState, useReducer} from 'react';

interface IProps {
}

const defaultProps: IProps = {}

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

enum EAction {
    Update = 0,
    Create = 1
}

interface IReducerAction {
    type: EAction,
    field: string,
    value: any
}

function formReducer(state: IState, action: IReducerAction): IState {

    let newState: IState = {...state};

    switch (action.type){
        case EAction.Update:

            // @ts-ignore
            newState[action.field] = action.value;

            break;
        case EAction.Create:
            break;
    }

    return newState;

}

export default function LoginFormWithReducer(props: IProps) {

    // const [state, updateState] = useState<IState>(defaultState);
    const [state, dispatch] = useReducer(formReducer, defaultState);

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        // extra processing

    }


    function onChangeEmail(event: React.FormEvent<HTMLInputElement>) {

        // let newState: IState = {...state};
        // newState.email = event.currentTarget.value;

        // updateState({...state, email: event.currentTarget.value});
        dispatch({
            type: EAction.Update,
            field: 'email',
            value: 1
        })

    }

    function onChangePassword(event: React.FormEvent<HTMLInputElement>) {

        // updateState({...state, password: event.currentTarget.value});

        dispatch({
            type: EAction.Update,
            field: 'password',
            value: event.currentTarget.value
        })

    }

    function onChangeRememberMe() {

        // updateState({...state, rememberMe: !state.rememberMe});
        dispatch({
            type: EAction.Update,
            field: 'rememberMe',
            value: !state.rememberMe
        })

    }


    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1"
                       className="form-label">
                    Email address
                </label>
                <input type="email"
                       className="form-control"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       onChange={onChangeEmail}
                       value={state.email}
                />
                <div id="emailHelp"
                     className="form-text">
                    We'll never share your email with anyone else.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1"
                       className="form-label">
                    Password
                </label>
                <input type="password"
                       className="form-control"
                       id="exampleInputPassword1"
                       onChange={onChangePassword}
                       value={state.password}
                />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox"
                       className="form-check-input"
                       id="exampleCheck1"
                       onChange={onChangeRememberMe}
                       checked={state.rememberMe}
                />
                <label className="form-check-label"
                       htmlFor="exampleCheck1">
                    Remember Me
                </label>
            </div>
            <button type="submit"
                    className="btn btn-primary">
                Submit
            </button>
        </form>
    )

}
