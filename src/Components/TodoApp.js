import React, {useEffect, useState} from "react";
import TodoList from "./TodoList";
import TODO_LIST from '../blockchain/build/contracts/TodoList.json';
import {CircularProgressbar} from 'react-circular-progressbar';
import Web3 from "web3";
import {RiCloseCircleLine} from "react-icons/all";


export const TodoApp = ({account}) => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contract, setContract] = useState({});
    const [render, setRender] = useState(false);

    async function fetchData() {

        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const todolist = new web3.eth.Contract(TODO_LIST.abi, TODO_LIST.networks["5777"].address);
        setContract(todolist);
        let taskCount = await todolist.methods.taskCount().call();
        if (taskCount > 0) {
            for (let i = 1; i <= taskCount; i++) {
                const task = await todolist.methods.tasks(i).call();
                if (task.content !== "") {
                    setTodos(todos => [...todos, task]);
                }
            }
        }
        setLoading(false);
    }

    const createTask = e => {
        e.preventDefault();
        setLoading(true);
        contract.methods.createTask(input).send({from: account}).once('receipt', (receipt) => {
            setRender(!render);
            setTodos([]);
            setInput("");
            setLoading(false);
        });
    }

    const completeTask = (taskID) => {
        setLoading(true);
        contract.methods.toggleCompleted(taskID).send({from: account}).once('receipt', (receipt) => {
            setRender(!render);
            setTodos([]);
            setLoading(false);
        });
    }

    const deleteTask = (taskID) => {
        setLoading(true);
        contract.methods.deleteTask(taskID).send({from: account}).once('receipt', (receipt) => {
            setRender(!render);
            setTodos([]);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchData();
    }, [render]);

    return (
        <div className={"section"}>
            <div className={"todo-app"}>
                <form className={"todo-form"} onSubmit={createTask}>
                    <h1>Blockchain Todo List</h1>
                    <input className={"todo-input"} type={"text"} placeholder={"Add task..."}
                           onChange={e => setInput(e.target.value)}
                           value={input}/>
                    <input className={"todo-button"} type={"submit"} value={"Add Todo"}/>
                </form>
                <div className={"todo-list"}>
                    {loading ? <h6 style={{color: " #fff"}}>Loading...</h6> :
                        <TodoList items={todos} toggleCompleted={completeTask} deleteTask={deleteTask}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoApp;