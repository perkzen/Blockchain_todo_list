import React from "react";
import {RiCloseCircleLine} from "react-icons/all";


export const TodoList = ({items, toggleCompleted, deleteTask}) => {

    return (
        items.map(item => {
            return (
                <div className={"todo-row"} key={item.id}>
                    <label onClick={() => toggleCompleted(item.id)}
                           style={item.completed ? {textDecoration: "line-through", opacity: 0.4} : {}}>
                        {item.content}
                    </label>
                    <RiCloseCircleLine className={"icons"} onClick={() => deleteTask(item.id)}/>
                </div>
            )
        })
    )
}

export default TodoList;