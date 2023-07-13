import React from 'react';
import Alert from "../Basic/Alert";

export default function MainView() {

    return (
        <div className="container">
            <h1>Main View</h1>
            <div className="mt-5">
                <Alert message="this is a custom message"
                       className="alert-success"
                />
            </div>
        </div>
    )

}
