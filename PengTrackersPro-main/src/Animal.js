import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import "./Animal.css"
import { FaStar } from 'react-icons/fa';
import useLocalStorage from "use-local-storage";

// Component definition for Animal
function Animal( {Name, options = [], animalSearchQuery, onSelectAnimal , addFavorite, favorites } ) {
    // State to hold the filtered list of options
    const [filteredOptions, setFilteredOptions] = useState([]);
    // Retrieve the dark mode setting from local storage
    const [isDark] = useLocalStorage("isDark", false);

    // Effect to filter options whenever the options prop changes
    useEffect(()=>{filterAnimalSearchQuery()}, [options])
    // Effect to filter options whenever the animalSearchQuery prop changes
    useEffect(()=>{filterAnimalSearchQuery()}, [animalSearchQuery])

    // Function to filter options based on the search query
    function filterAnimalSearchQuery()
    {
        console.log("Animal search query:")
        console.log(animalSearchQuery)
        if(animalSearchQuery != null && animalSearchQuery.length > 0){
            var tempOptions = options
            setFilteredOptions(tempOptions.filter(item => item.toLowerCase().includes(animalSearchQuery.toLowerCase())))
        } else {
            setFilteredOptions(options)
        }
    }
    
    // JSX to render the Animal component
    return (
        <div>
            <h3>{Name}</h3>
            <ul className="animalList">
                {filteredOptions.map((option, index) => (
                    <li key={index + ":" + option} className="d-flex align-items-center">
                        <button
                            onClick={() => onSelectAnimal(option)}
                            className="animalListItem me-2"
                            data-theme={isDark ? "dark" : "light"}
                        >
                            {option}
                        </button>
                        
                        <FaStar
                            className="favorite-icon"
                            style={{
                                cursor: "pointer",
                                color: favorites.includes(option) ? "gold" : "gray",
                            }}
                            onClick={() => addFavorite(option)}
                            title={favorites.includes(option) ? "Remove from Favorites" : "Add to Favorites"}
                        />
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Export the Animal component
export default Animal;