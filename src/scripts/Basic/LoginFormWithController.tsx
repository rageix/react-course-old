import React, {useState} from 'react';
import LoginFormController from "./Controllers/LoginFormController";

interface IProps {
}

const defaultProps: IProps = {}

const controller = new LoginFormController();

export default function LoginFormWithController(props: IProps) {

    controller.onRender();
    const state = controller.state;

    return (
        <form onSubmit={controller.onSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1"
                       className="form-label">
                    Email address
                </label>
                <input type="email"
                       className="form-control"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       onChange={controller.onChangeEmail}
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
                       onChange={controller.onChangePassword}
                       value={state.password}
                />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox"
                       className="form-check-input"
                       id="exampleCheck1"
                       onChange={controller.onChangeRememberMe}
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
