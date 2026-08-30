import React, { useState } from 'react';
import  './index.css';
import ProfileDropdown from './ProfileDropdown';
import useLocalStorage from "use-local-storage";
// Toggle component renders a checkbox that controls light/dark mode
export const Toggle = ({ handleChange, isChecked }) => {
    return(
        <div className="toggle-container">
            <input
                type="checkbox"
                id="check"
                className="toggle"
                onChange={handleChange}
                checked={isChecked}
            />
            <label htmlFor="check">{isChecked? "Dark" : "Light"} Mode</label>
        </div>
    );
};

function TopNav() {

    // TopNav's theme is set using the localStorage cookie set by flipping the dark/light mode toggle switch.
    const [isDark, setIsDark] = useLocalStorage("isDark", false);

    return (
        
        <div className="topNav d-flex justify-content-between align-items-center" data-theme={isDark ? "dark" : "light"}>
            <div>
                <a href="/home">Home</a>
                <a href="/login">Login</a>
            </div>
            <div className = "toggleButton">
                <Toggle
                    isChecked={isDark}
                    handleChange={() => setIsDark(!isDark)}
                />
            </div>
            <div>
                <ProfileDropdown />
            </div>
        </div>
    );
}

export default TopNav;