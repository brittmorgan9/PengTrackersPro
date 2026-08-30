import { penguinData } from "./penguinData";
import Axios from 'axios'

var base_url = "https://api.gbif.org/v1/species/"

var tree_data

// Fetch base penguin data for a given key
async function getBasePenguinData(key) {
    // Fetch the base penguin data and return only the 'data' property from the response
    const response = await Axios.get(base_url + key + "/");
    return response.data; // Return only the 'data' part
}

// Recursively fetch the tree structure for a given species key
export async function getTree(key) {
    // Fetch the base penguin data and assign it to thisPenguinData
    var thisPenguinData = await getBasePenguinData(key);

    // Recursively get children data for the penguin
    thisPenguinData.children = await getPenguinChildren(thisPenguinData.key);

    return thisPenguinData;
}
// Fetch the children of a given species key recursively
async function getPenguinChildren(key) {
    // If the key is null, return null (base case for recursion)
    if (key === null) {
        return null;
    }

    try {
        // Fetch the children of the penguin and access only the 'data' property
        const res = await Axios.get(base_url + key + "/childrenAll?limit=500");

        if (!res || res.data.length === 0) {
            // If there are no children, return null
            console.log("Res is null or of length 0");
            return null;
        }

        // Create a list of promises for each child's tree
        const newDataList = [];

        for (let i = 0; i < res.data.length; i++) {
            // Recursively get the data for each child and push only the 'data' property
            const childTree = await getTree(res.data[i].key);  // assuming res.data[i].key holds the child key
            newDataList.push(childTree);  // Add the child tree to the list
        }

        console.log("Data list: ", newDataList);

        return newDataList;  // Return the list of child penguin trees
    } catch (error) {
        console.error("Error fetching penguin children:", error);
        return null;
    }
}