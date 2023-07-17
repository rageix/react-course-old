import React, {PropsWithChildren, Ref, useEffect, useRef} from 'react';
import * as bootstrap from 'bootstrap';

interface IProps extends PropsWithChildren {
    title: string,
    onClose: () => any,
    show?: boolean,
    options?: Partial<bootstrap.Modal.Options>
}

const defaultProps: IProps = {
    title: '',
    onClose: null,
    show: false,
    options: null
}


export default function Modal(props: IProps) {
    const ref: Ref<HTMLDivElement> = useRef();
    let bootstrapElement: bootstrap.Modal;

    props = {...defaultProps, ...props};

    function hiddenListen() {

            console.log('hide it all');
            props.onClose();

    }

    useEffect(() => {

        bootstrapElement = new bootstrap.Modal(ref.current, props.options);

        if (props.show) {

            bootstrapElement.show();

            ref.current.addEventListener('hidden.bs.modal', hiddenListen);

        }

        return (() => {

            ref.current.removeEventListener('hidden.bs.modal', hiddenListen);
            bootstrapElement.dispose();

        });

    }, [props]);

    return (
        <div className={`${props.show ? '' : 'd-none'}`}>
        <div ref={ref}
             className="modal"
             tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {props.title}
                        </h5>
                        <button type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button"
                                className="btn btn-primary">Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>

    )

}
