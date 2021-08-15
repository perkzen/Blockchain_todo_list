import {Container} from "react-bootstrap";


const Explore = () => {
    const spacer = {
        height: "50px"
    }


    return (
        <Container className={"bg-dark"} fluid>
            {/*spacer*/}
            <div className={"row"} id={"spacer"} style={spacer}/>
            <div className={"row  justify-content-center"}>
                <div className="card m-4 text-light card-bg">
                    <div className="card-body">
                        <h1>Frontend</h1>
                        <p className="card-text">React is a free and open-source front-end JavaScript library for
                            building user interfaces or UI components.React can be used as a base in the development of
                            single-page or mobile applications.</p>
                        <button className={"btn btn-dark"} onClick={()=> window.location.href="https://reactjs.org/"}>React.js</button>
                    </div>
                </div>
                <div className="card m-4 text-light card-bg">
                    <div className="card-body">
                        <h1>Backend</h1>
                        <p className="card-text">Solidity is an object-oriented, high-level language for implementing
                            smart contracts. Smart contracts are programs which govern the behaviour of accounts within
                            the Ethereum state.</p>
                        <button className={"btn btn-dark"} onClick={()=> window.location.href="https://docs.soliditylang.org/en/v0.8.7/"}>Solidity</button>
                    </div>
                </div>
            </div>
            {/*spacer*/
            }
            <div className={"row"} id={"spacer"} style={spacer}/>
        </Container>
    )
}
export default Explore;