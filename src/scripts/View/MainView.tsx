import React from 'react';
import Alert from "../Basic/Alert";
import LoginForm from "../Basic/LoginForm";
import Card from "../Basic/Card";
import Heading from "../Basic/Heading";
import LoginFormWithReducer from "../Basic/LoginFormWithReducer";
import LoginFormWithController from "../Basic/LoginFormWithController";
import Todo from "../Todo/Todo";
import Tooltip from "../Tooltip/Tooltip";
import ModalView from "../Modal/ModalView";

interface IAlertItem {
    id: number,
    message: string,
    className: string,
}

const alertList: IAlertItem[] = [
    {
        id: 1,
        message: 'alert 1',
        className: 'alert-success',
    },
    {
        id: 2,
        message: 'alert 2',
        className: 'alert-danger',
    },
    {
        id: 3,
        message: 'alert 3',
        className: 'alert-info',
    },
    {
        id: 4,
        message: 'alert 4',
        className: 'alert-primary',
    }

];

export default function MainView() {

    return (
        <div className="container">
            <h1>Main View</h1>
            {/*<div className="mt-5">*/}
            {/*    {alertList.map(v => <Alert key={v.id}*/}
            {/*                               message={v.message}*/}
            {/*                               className={v.className}*/}
            {/*    />)}*/}
            {/*</div>*/}
            {/*<div className="mt-5">*/}
            {/*    <Card size={1}>*/}
            {/*        <Heading>Heading</Heading>*/}
            {/*        <Heading>Heading</Heading>*/}
            {/*        <Heading>Heading</Heading>*/}
            {/*        <Card size={2}>*/}
            {/*            <Heading>Heading</Heading>*/}
            {/*            <Heading>Heading</Heading>*/}
            {/*            <Heading>Heading</Heading>*/}
            {/*            <Card size={3}>*/}
            {/*                <Heading>Heading</Heading>*/}
            {/*                <Heading>Heading</Heading>*/}
            {/*                <Heading>Heading</Heading>*/}
            {/*            </Card>*/}
            {/*        </Card>*/}
            {/*    </Card>*/}
            {/*</div>*/}
            {/*<div className="mt-5">*/}
            {/*    <LoginForm/>*/}
            {/*</div>*/}
            {/*<div className="mt-5">*/}
            {/*    <LoginFormWithReducer/>*/}
            {/*</div>*/}
            {/*<div className="mt-5">*/}
            {/*    <LoginFormWithController/>*/}
            {/*</div>*/}
            {/*<div className="mt-5">*/}
            {/*    <Todo/>*/}
            {/*</div>*/}
            {/*<div className="mt-5">*/}
            {/*    <Tooltip title="Our cool tooltip" options={{placement: "right"}}>*/}
            {/*        <button type="button" className="btn btn-primary">Test button</button>*/}
            {/*    </Tooltip>*/}
            {/*</div>*/}

            <div className="mt-5">
               <ModalView/>
            </div>

        </div>
    )

}
