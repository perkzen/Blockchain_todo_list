import './App.css';
import TodoApp from "./Components/TodoApp";
import NavbarContainer from "./Components/NavbarContainer";
import Web3 from "web3";
import {useEffect, useState} from "react";
import CarouselContainer from "./Components/CarouselContainer";
import Footer from "./Components/Footer";
import Explore from "./Components/Explore";

function App() {
    const [account, setAccount] = useState("");
    useEffect(() => {
        const fetchAccount = async () => {
            const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
            const address = await web3.eth.getAccounts();
            setAccount(address[0]);
        }
        fetchAccount();
    }, [])

    return (
        <div className="App">
            <NavbarContainer wallet={account}/>
            <CarouselContainer/>
            <Explore/>
            <TodoApp account={account}/>
            <Footer/>
        </div>
    );
}


export default App;
