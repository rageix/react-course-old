import React, {PropsWithChildren, useState} from 'react';
import Modal from "./Modal";

interface IProps extends PropsWithChildren {
}

const defaultProps: IProps = {}

interface IState {
    show: boolean
}

const defaultState: IState = {
    show: false
}

export default function ModalView() {

    const [state, updateState] = useState<IState>(defaultState);

    function onClickShow() {

        updateState({show: true});

    }

    function onClickHide() {
        console.log('onClickHide');

        updateState({show: false});

    }

    return (
        <div className="mt-5">
            <Modal title="Our cool Modal"
                   show={state.show}
                   onClose={onClickHide}
            >
                <div>This is the body of our modal</div>
            </Modal>
<div className="mt-5">
    <button type="button"
            className="btn btn-success"
            onClick={onClickShow}
    >
        Show
    </button>
    <button type="button"
            className="btn btn-danger ml-3"
            onClick={onClickHide}
    >
        Hide
    </button>
</div>
        </div>
    )

}
