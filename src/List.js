import './App.css';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
function List() {

    
    return (
        <div className="Container">
            
            <div className="listcontainer" >
                <button className="logout">Logout</button>
            <h1>My To-Do List</h1>
            <div className="listtoolbar">
               <input className="search"placeholder="Search"></input> 
                <button className="new">New</button>
            </div >
            <div className="listcomponent">
                <text className="todotext">Sample text</text>
                <FaEdit />
                <FaTrash/>
                
            </div>

            </div>
        </div>
    );
}

export default List;