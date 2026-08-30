import React, { useState, useEffect } from "react";
import "./description.css";

// Functional component to display the description of a penguin
function Description({ name }) {
    // State to hold the fetched summary text
    const [summary, setSummary] = useState("");
    // State to hold the image URL
    const [imageUrl, setImageUrl] = useState("");
    // State to manage the loading state
    const [loading, setLoading] = useState(false);

    // useEffect to fetch data when 'name' changes
    useEffect(() => {
        const fetchSummary = async () => {
            // Set loading state to true while fetching data
            setLoading(true);
            try {
                // Replace spaces in the name with underscores for the API query
                const formattedName = name.replace(/ /g, "_");
                // Fetch summary data from Wikipedia's API
                const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${formattedName}`);
                const data = await res.json();

                // Check if the API response contains valid data
                if (data && data.title !== "Not found.") {
                    setSummary(data.extract);
                    setImageUrl(data.thumbnail ? data.thumbnail.source : "");
                } else {
                    // Handle invalid or not found data
                    setSummary("This page was not found.");
                    throw new Error("Page not found");
                }
            } catch (err) {
                // Clear data on error
                setSummary("");
                setImageUrl("");
            } finally {
                // Stop loading state
                setLoading(false);
            }
        };

        // Call the fetch function
        fetchSummary();
    }, [name]); // Dependency array

    // Display a loading message while fetching data
    if (loading) {
        return <p style={{ textAlign: "center" }}>Loading...</p>;
    }

    // Display an error message if no summary or image URL is retrieved
    if (!summary && !imageUrl) {
        return (
            <div className="description-container">
                <p className="error-message">Cannot retrieve this penguin's description.</p>
                <p className="description-extinct">This penguin might be extinct!</p>
                <a
                    href="https://en.wikipedia.org/wiki/Category:Extinct_penguins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="description-link"
                >
                    See More
                </a>
            </div>
        );
    }

    // Default rendering for the description
    return (
        <div className="description-container">
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={`${name} penguin`}
                    className="description-image"
                />
            )}
            <div className="description-name">{name}</div>
            <div className="description-summary-container">
                <p className="description-summary">{summary}</p>
            </div>
            <a
                href={`https://en.wikipedia.org/wiki/${name.replace(/ /g, "_")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="description-link"
            >
                See More
            </a>
        </div>
    );
}

export default Description;
