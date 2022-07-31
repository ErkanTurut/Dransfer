import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

const Navigation = ({ web3Handler, account }) => {
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">Dransfer</Navbar.Brand>
          <Nav>
            {account ? (
              <Nav.Link
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button nav-button btn-sm mx-4"
              >
                <Button variant="outline-light">
                  {account.slice(0, 5) + "..." + account.slice(38, 42)}
                </Button>
              </Nav.Link>
            ) : (
              <Button onClick={web3Handler} variant="outline-light">
                Connect Wallet
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
