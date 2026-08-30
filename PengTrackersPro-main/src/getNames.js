import axios from 'axios';
import { penguinData } from './penguinData';

// Function to retrieve species names or a specific name's taxonKey
export async function getNames(name = null) {
    try {

        //The following code block is used to retrieve the most recent dataset from GBIF.
        //We retrieved the dataset once but now pull from a locally stored json object.
        //This block should replace the "const data = penguinData.results" if the app is supposed to always fetch the most recent data.
        /* 
            const response = await axios.get(
                'https://api.gbif.org/v1/species/search?rank=SPECIES&highertaxon_key=5284&status=ACCEPTED&status=DOUBTFUL&limit=1000'
            ); 
            const data = response.data.results;
        */

        // Use local data (penguinData) instead of an API call
        const data = penguinData.results

        // Create a mapping of normalized names to taxonKeys
        const nameToKeyMap = data.reduce((map, species) => {
            // Determine the name to use (vernacular or canonical)
            let speciesName = null;

            // Throw an error if the species object is null
            if (species==null)
            {
                throw "Species object is null"
            }

            //Try to set the name of the species to its vernacular name
            if (Array.isArray(species.vernacularNames) && species.vernacularNames.length > 0) {
                const englishName = species.vernacularNames.find(name => name.language === 'eng');
                if (englishName) {
                    speciesName = englishName.vernacularName;
                } else {
                    speciesName = species.vernacularNames[0].vernacularName;
                }
            }

           //Set the species name to its canonical name if the attempt to get its english vernacular name fails
            if (!speciesName && species.canonicalName) {
                speciesName = species.canonicalName;
            }

            //If we have the species name and key, then we add it to the map and correlate it to its key
            if (speciesName && species.key) { 
                const normalizedSpeciesName = speciesName.toLowerCase().trim();
                map[normalizedSpeciesName] = species.key;
            } else {
                console.log('Species missing key or name:', species);
                throw "Species missing key or name"
            }

            return map;
        }, {});

        // If a specific name is provided, return its corresponding taxonKey
        if (name) {
            const normalizedName = name.toLowerCase().trim();
            console.log(`Searching for: ${normalizedName}`);
            return nameToKeyMap[normalizedName] || null; // Return null if the name is not found
        }

        // If no name is provided, return all normalized names
        return Object.keys(nameToKeyMap);
    } catch (error) {
        console.error('Error fetching data from api: ', error);
        return name ? null : []; 
    }
}
