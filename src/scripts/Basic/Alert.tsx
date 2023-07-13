import React, {useState} from 'react';

interface IProps {
    message?: string
    className?: string
}

const defaultProps: IProps = {
    message: 'this is a default message',
    className: 'alert-warning'
}

interface IState {

}

const defaultState: IState = {}

export default function Alert(props: IProps) {

    const [show, updateShow] = useState<boolean>(true);

    console.log(show);

    props = {...defaultProps, ...props};

    function onClickHide() {

        updateShow(false);

    }

    return (
        <>
            <div className={`alert alert-dismissible ${props.className} ${show ? '' : 'd-none'} `}
                 role="alert">
                {props.message}
                <button type="button"
                        className="btn-close"
                        onClick={onClickHide}
                ></button>
            </div>
        </>
    )

}
