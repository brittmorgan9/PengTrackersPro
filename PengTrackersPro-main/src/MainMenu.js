
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import  './index.css';
import  './MainMenu.css';
import ProfileDropdown from './ProfileDropdown';
import Map from './Map'
import Animal from './Animal'
import Description from './description';
import { getNames } from './getNames.js';
import SearchBar from './SearchBar.js';
import TreeView from './TreeView.js';
import { getTree } from './getTree.js';
import TopNav from './TopNav.js';
import useLocalStorage from "use-local-storage";

// MainMenu component definition
export default function MainMenu() {
    // State variables
    const [selectedAnimal, setSelectedAnimal] = useState("");
    const [options, setOptions] = useState([]);
    const [animalSearchQuery, setAnimalSearchQuery] = useState("")
    const [favoritePenguins, setFavoritePenguins ] = useState([]); 

    const [isDark] = useLocalStorage("isDark", false);

    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate(); //for rediriction to login if needed

    // Effect hook to handle authentication token check
  useEffect(() => {
        const myAuthToken = sessionStorage.getItem("authToken");
        // If no auth token, redirect to login page
        if(myAuthToken == null) {
            alert('Please log in to access this page.');
            window.location.href= "/login"; 
        } else {
            setAuthenticated(true)
        }
    }, []); 

    // Effect hook to fetch animal names from the API
    useEffect(() => {
        async function fetchData() {
            const names = await getNames();
            setOptions(names);
            if(names && names.length > 0){
                setSelectedAnimal(names[0])
            }
        }

        fetchData();
    }, []);

     // Function to add a penguin to favorites
     const toggleFavorite = (animal) => {
        setFavoritePenguins((prevFavorites) =>
            prevFavorites.includes(animal)
                ? prevFavorites.filter((fav) => fav !== animal)
                : [...prevFavorites, animal]
        );
    };

    // Function to remove a penguin from favorites
    const removeFavorite = (penguinName) => {
        setFavoritePenguins(favoritePenguins.filter(name => name !== penguinName));
    };


    return (
        <>
            <TopNav />

            {authenticated ? 

                <div className="mainTheme" data-theme={isDark ? "dark" : "light"}>
                <Container fluid className='h-100 d-flex flex-column my-auto'>
                    {/* Header Bar */}
                    <header className="text-center py-3">
                        
                    </header>

                    <Row className="flex-grow-1">
                        {/* Left Side Panel */}
                        <Col md={2}>
                        <div style = {{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <h2>
                                Penguins
                            </h2>
                            
                            <SearchBar changeSearchQuery={setAnimalSearchQuery} darkMode={isDark}></SearchBar>
                            <div style = {{ height: "40vh", overflow: "auto" }}>
                                <Animal Name="Select Penguin To Research"
                                options ={options}
                                onSelectAnimal={setSelectedAnimal}
                                animalSearchQuery={animalSearchQuery}
                                addFavorite={toggleFavorite}
                                favorites={favoritePenguins}
                                isDark={isDark}
                                />
                            </div>
                            
                            <div className="mt-3">
                                <TreeView changeSearchQuery={setAnimalSearchQuery} />
                            </div>
                        

                        {/* Favorites Section */}
                        <div className="mt-3">
                                <h2>Favorites</h2>
                                <div className="favoritesArea" data-theme={isDark ? "dark" : "light"}>
                                <ul>
                                    {favoritePenguins.map((penguin, index) => (
                                        <li key={index} className="d-flex">
                                            <button
                                                onClick={() => setSelectedAnimal(penguin)} // Show data on click
                                                className={`btn btn-link ${
                                                    penguin === selectedAnimal ? "fw-bold" : ""
                                                }`}
                                                data-theme={isDark ? "dark" : "light"}
                                            >
                                                {penguin}
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger ms-2"
                                                onClick={() => removeFavorite(penguin)}
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                </div>
                            </div>
                            </div>
                        </Col>

                        {/* Middle Content Panel */}
                        <Col md={8} className = "d-flex flex-column text-center"  style={{height:"80vh"}}>
                        
                            <div className="flex-grow-1">
                                <Map selectedAnimal={selectedAnimal}/>
                            </div>
                        
                        {/* Add main content here */}
                        </Col>

                        {/* Right Side Panel */}
                        <Col md={2}>
                        <h2>Information</h2>
                        <Description name={selectedAnimal}/>
                        </Col>
                    </Row>

                    {/* Footer Bar */}
                    <footer className="text-center py-3">
                        
                    </footer>
                </Container>
                </div>
            : ""}
        </>
    );
}