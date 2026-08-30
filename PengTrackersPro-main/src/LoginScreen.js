import LogoLight1 from './LogoLight1.png';  // Changed: Replaced samplelogo import with LogoLight1.png
import LogoDark1 from './LogoDark1.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import './LoginScreen.css';
import './index.css';
import ProfileDropdown from './ProfileDropdown';
import "./DatabaseAPI"
import { DatabaseAPI_SignUp, DatabaseAPI_LogIn } from './DatabaseAPI';
import TopNav from './TopNav.js';
import useLocalStorage from "use-local-storage";

export default function LoginScreen() {
    // State variables for managing modal visibility and form inputs
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Log In');
    // Function to close both modals
    const closeModal = () => {setShowSignUpModal(false); setShowLogInModal(false)};
    // State variables for sign up form inputs
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    // State variables for log in form inputs
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    // Dark mode state, retrieved from local storage
    const [isDark] = useLocalStorage("isDark", false);
    // Function to handle user sign up
    async function signup(email, username, password) {
        var res = await DatabaseAPI_SignUp(email, username, password);
        if(res != null && res.status == 201) {
            window.location.href = "/home";
        }
    }
    // Function to handle user login
    async function login(username, password) {
        console.log("username: " + username, " password: " + password);
        if(password.length < 7)
        {
            alert("Password must be 7 characters or more!")
        }
        var res = await DatabaseAPI_LogIn(username, password);
        if(res != null && res.status == 200) {
            window.location.href = "/home";
        }
    }
    // Function to trigger sign up process
    function triggerSignUp() {
        signup(signUpEmail, signUpUsername, signUpPassword);
    }
    // Function to trigger login process
    function triggerLogin() {
        login(loginUsername, loginPassword);
    }

    return (
        <>
            <TopNav />
            <div className="mainTheme" data-theme={isDark ? "dark" : "light"}>
            <Container className='mainContainer'>
                <Row>
                    <Col>
                        <h1 className="text-center">Peng Tracker Pro</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        {/* Changed: Replaced samplelogo with LogoLight1 and added styling for smaller size */}
                        <img
                            src={isDark ? LogoDark1 : LogoLight1}
                            alt="Peng Trackers Pro Logo"
                            className="logo-img"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Stack gap={3} style={{width: "50%"}} className="mx-auto">
                            <Button id="show_login_modal_button" variant={isDark ? "dark" : "light"} onClick={() => setShowLogInModal(true)}>Log In</Button>
                            <Button variant={isDark ? "dark" : "light"} onClick={() => setShowSignUpModal(true)}>Sign Up</Button>
                        </Stack>
                    </Col>
                </Row>
            </Container>
            </div>

            {/* Log In Modal */}
            <Modal show={showLogInModal} onHide={closeModal}>
                <Modal.Header className='modalHeader' data-theme={isDark ? "dark" : "light"} closeVariant='white' closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBody' data-theme={isDark ? "dark" : "light"}>
                    <Form onSubmit={(event) => { triggerLogin(); event.preventDefault(); }}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" id="login_username_field" placeholder="Enter username" value={loginUsername} onChange={(e) => { setLoginUsername(e.target.value) }} />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="login_password_field" placeholder="Password" value={loginPassword}  onChange={(e) => { setLoginPassword(e.target.value) }} />
                        </Form.Group>
                        <Button variant="dark" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Sign Up Modal */}
            <Modal show={showSignUpModal} onHide={closeModal}>
                <Modal.Header closeButton closeVariant='white' className='modalHeader' data-theme={isDark ? "dark" : "light"}>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBody' data-theme={isDark ? "dark" : "light"}>
                    <Form onSubmit={(event) => { triggerSignUp(); event.preventDefault(); }}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={signUpEmail} onChange={(e) => { setSignUpEmail(e.target.value) }} />
                        </Form.Group>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={signUpUsername} onChange={(e) => { setSignUpUsername(e.target.value) }} />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={signUpPassword} onChange={(e) => { setSignUpPassword(e.target.value) }} />
                        </Form.Group>
                        <Button variant="dark" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
