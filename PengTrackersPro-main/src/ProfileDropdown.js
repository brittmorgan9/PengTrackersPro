import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import samplelogo from './samplelogo.png';
import {handleLogout} from "./DatabaseAPI";
import useLocalStorage from "use-local-storage";

function ProfileDropdown() {

    const [isDark, setIsDark] = useLocalStorage("isDark", false);

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant={isDark ? "dark" : "light"}>
                        <img
                            src={samplelogo}
                            alt="profile"
                            className="rounded-circle"
                            style={{width: '40px', height: '40px' }}
                            />
                    </Dropdown.Toggle>
                    <Dropdown.Menu right variant={isDark ? "dark" : "light"}>
                        <Dropdown.Item as="button" href="/account">Account</Dropdown.Item>
                        <Dropdown.Item as="button" href="/preferences">Preferences</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={handleLogout} style={{color:"red"}}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
            </Dropdown>
        </div>
    );

}
export default ProfileDropdown;