import React, {PropsWithChildren, useState} from 'react';
import {headingContext} from "./Context";

interface IProps extends PropsWithChildren {
    size: number
}

const defaultProps: IProps = {
    size: 1
}

interface IState {
}

const defaultState: IState = {
}

export default function Card(props: IProps) {

    return (
        <div className="card">
            <div className="card-body">
                <headingContext.Provider value={props.size}>
                {props.children}
                </headingContext.Provider>
            </div>
        </div>
    )

}
