import {Container, Nav, Navbar} from "react-bootstrap";

const NavbarContainer = ({wallet}) => {

    return (

        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className="navbar-brand"><img src="https://img.icons8.com/nolan/64/todo-list.png"
                                                            alt={"Logo"}/>Todo list on Blockchain</Navbar.Brand>
            </Container>
            <Nav className={"me-4"}>
                <h6 className={"text-light"}>Your Account: {(wallet !== "") ? wallet  : "Please connect to MetaMask."}</h6>
            </Nav>
        </Navbar>
    )
}

export default NavbarContainer