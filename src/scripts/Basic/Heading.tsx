import React, {PropsWithChildren, useState, useContext} from 'react';
import {headingContext} from "./Context";

interface IProps extends PropsWithChildren {
}

const defaultProps: IProps = {
}

interface IState {
}

const defaultState: IState = {
}

export default function Heading(props: IProps) {

    let size = useContext(headingContext);

    switch (size) {
        case 1:
            return <h1>{props.children}</h1>
        case 2:
            return <h2>{props.children}</h2>
        case 3:
            return <h3>{props.children}</h3>
        case 4:
            return <h4>{props.children}</h4>
        default:
            return <h1>{props.children}</h1>
    }

}
