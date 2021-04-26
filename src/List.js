import './App.css';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import React from 'react';
import { useState } from 'react';


function List() {
    const [todo, settodo] = useState([{
        todotext: "",
        id:""
    }]);
    const [inputText, setinputText] = useState({
        inputText : ""
    });

    const [editState,seteditState] = useState(false);
    const [newState,setnewState] = useState(false);


    const handleInputText = (e) =>
    {
      setinputText({...inputText,inputText: e.target.value })

    }

    const submitHandler = (e) =>
    {
        e.preventDefault();
        settodo([...todo, {todotext: inputText.inputText, id: Math.random()*1000}]);
        seteditState(false)
        setnewState(false);
    }
    return (
        <div className="Container">
            
            <div className="listcontainer" >
                <button className="logout">Logout</button>
            <h1>My To-Do List</h1>
            <div className="listtoolbar">
               <input className="search"placeholder="Search"></input> 
                <button className="new" onClick={()=>{setnewState(true)}}>New</button>
            </div > 

           {newState ? <div className="listcomponent">
            <form onSubmit={submitHandler}>
            <input className="search" value={inputText.inputText} onChange={handleInputText} placeholder="Add to-do"></input> 
            <button className="new">Save</button>
            </form>
             </div> : null}
            <div className="listcomponent">
                <ul>
                    {todo.map(to =>(
                        
                        <div key={to.id} className="listcomponent">
                            
                           <h2 >{to.todotext}</h2> 
                            {editState ? <button> edit button</button> : null}

                            <button onClick={()=>{seteditState(true)}} ><i><FaEdit/></i></button>
                            <button onClick={()=>{settodo(todo.filter((ele) =>ele.id !== to.id));}} ><i><FaTrash /></i></button>

                        </div>
                    ))}
                </ul>

            </div>

            </div>
        </div>
    );
}

export default List;