import {Form} from 'react-bootstrap'
import useLocalStorage from "use-local-storage";


function SearchBar({changeSearchQuery, darkMode}){

    const [isDark] = useLocalStorage("isDark", false);

    return(
        <>
            <Form.Control
                type="text" 
                onChange={(e)=>{changeSearchQuery(e.target.value)}} 
                placeholder="search species"
                data-bs-theme = {isDark ? "dark" : "light"}>
            </Form.Control>
        </>
    )
}

export default SearchBar;