import React, {useEffect, useState} from "react";
import TodoList from "./TodoList";
import TODO_LIST from '../blockchain/build/contracts/TodoList.json';
import Web3 from "web3";
import useInterval from "../Hooks/useInterval";


export const TodoApp = ({handleAccountChange, account}) => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contract, setContract] = useState({});
    const [render, setRender] = useState(false);


    // get data from blockchain
    async function fetchData() {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const todolist = new web3.eth.Contract(TODO_LIST.abi, TODO_LIST.networks["5777"].address);
        setContract(todolist);
        const address = await web3.eth.getAccounts();
        let userTodoList = await todolist.methods.getTasksByOwner(address[0]).call();
        if (userTodoList) {
            for (const index of userTodoList) {
                const task = await todolist.methods.tasks(parseInt(index)).call();
                task.id = parseInt(index);
                if (task.content !== "") {
                    setTodos(todos => [...todos, task]);
                }
            }
        }
        setLoading(false);
    }

    // fetches data from blockchain everytime the value of render changes
    useEffect(() => {
        fetchData();

    }, [render]);

    // change todos when account changes
    useInterval(async () => {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        let address = await web3.eth.getAccounts();
        if (address[0] !== account) {
            handleAccountChange(address[0])
            setTodos([]);
            setRender(!render);
        }
    }, 1000)


    // creates a task on the blockchain
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

    // toggles the attribute completed on task
    const completeTask = (taskID) => {
        setLoading(true);
        contract.methods.toggleCompleted(taskID).send({from: account}).once('receipt', (receipt) => {
            setRender(!render);
            setTodos([]);
            setLoading(false);
        });
    }

    // deletes the task
    const deleteTask = (taskID) => {
        setLoading(true);
        contract.methods.deleteTask(taskID).send({from: account}).once('receipt', (receipt) => {
            setRender(!render);
            setTodos([]);
            setLoading(false);
        });
    }


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