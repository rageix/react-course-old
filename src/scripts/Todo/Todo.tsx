import React from 'react';
import Controller from "./Controller";
import TodoItem from "./TodoItem";

interface IProps {
}

const defaultProps: IProps = {}

let controller: Controller;

export default function Todo(props: IProps) {

    if (!controller) {

        controller = new Controller();

    }

    controller.onRender();
    const state = controller.state;

    return (
        <>
            <form onSubmit={controller.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="taskName"
                           className="form-label">
                        Task Name
                    </label>
                    <input type="text"
                           className="form-control"
                           id="taskName"
                           onChange={controller.onChangeName}
                           value={state.name}
                    />
                </div>
                <button type="submit"
                        className="btn btn-primary">
                    Add Task
                </button>
            </form>
            <div className="mt-3 mb-3">
                <button type="submit"
                        className="btn btn-danger"
                        onClick={controller.onClickDeleteSelected}
                >
                    Delete Selected
                </button>
            </div>
            <table className="table mt-3">
                <thead>
                <tr>
                    <th scope="col">
                        <input className="form-check-input"
                               type="checkbox"
                               checked={state.selectAll}
                               onChange={controller.onClickSelectAll}
                        />
                    </th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {state.items.map(v => <TodoItem key={v.id}
                                                item={v}
                                                onChangeCheck={controller.onChangeCheck}
                                                onClickDelete={controller.onClickDelete}/>
                )}


                </tbody>
            </table>
        </>
    )

}
