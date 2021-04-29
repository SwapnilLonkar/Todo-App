import './App.css';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import React from 'react';
import { useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";


function List() {

    const [todo, settodo] = useState([{
        todotext: "",
        id: "",

    }]);
    
    const [inputText, setinputText] = useState({
        inputText : ""
    });

    const [editState,seteditState] = useState(false);
    const [newState,setnewState] = useState(false);
    const [viewState,setviewState] = useState(true);
    const [searchtext, setsearchText] = useState({
        searchtext : ""
    });
    let history = useHistory();

    
    useEffect(()=>{
        let data = localStorage.getItem('userData');
        data =JSON.parse(data);
        settodo(data);

    },[]);

    const handlesearchtext = (e) =>
    {
      setsearchText({...searchtext,searchtext: e.target.value })  
    }


    const handleInputText = (e) =>
    {
        
        setinputText({...inputText,inputText: e.target.value })

    }
    const savehandler = () =>
    {
        localStorage.setItem('userData', JSON.stringify(todo));
    }
    const handleLogout = () =>{
        localStorage.setItem('userData', JSON.stringify(todo));
            history.push('/home');

    }

    const submitHandler = (e) =>
    {
        e.preventDefault();
        settodo([...todo, {todotext: inputText.inputText, id: Math.random()*1000}]);
        seteditState(false)
        setnewState(false)
        setviewState(true);
        
    }
    return (
        <div className="Container">
            <div className="listcontainer" >
                <button className="logout" onClick={handleLogout}>Logout</button>
            <h1>My To-Do List</h1>
            <div className="listtoolbar">
               <input  className="search"placeholder="Search" onChange={handlesearchtext} value={searchtext.searchtext}  ></input> 
                <button className="new" onClick={()=>{setnewState(true)}}>New</button>
            </div > 

           {newState ? <div className="listtoolbar" >
            <form onSubmit={submitHandler}>
            <input className="search" value={inputText.inputText} onChange={handleInputText} placeholder="Add to-do"></input> 
            <button className="new" onClick={savehandler}>Save</button>
            </form>
             </div> : null}
            <div className="listcomponentContainer" >
                
                    {todo.filter((todo) =>
                    {
                        if (searchtext.searchtext === "") {
                            return ( todo);
                            
                        } else if (todo.todotext.toLocaleLowerCase().includes(searchtext.searchtext.toLocaleLowerCase())) { 
                            return (todo);
                            
                        }
                    }).map(to =>(
                        <div className="listcomponent" >
                           <text >{to.todotext}</text> 
                           {editState ? <div className="listcomponent">
                                <form onSubmit={submitHandler}>
                            <input className="edittext" value={inputText.inputText} onChange={handleInputText} placeholder="Add to-do"></input>  
                            <button className="new">Save</button>
                            </form> </div>
                            
                            : 
                            
                            <div className="listbuttonContainer"> 
                           {/* <button className="listbutton" key={to.id} onClick={() => {
                                console.log(todo)
                             } } ><i><FaEdit/></i></button> */}
                            <button onClick={()=>{settodo(todo.filter((ele) =>ele.id !== to.id));
                            localStorage.setItem('userData', JSON.stringify(todo));}} className='listbutton' ><i className="listicon"><FaTrash /></i></button>
                            </div> }  

                        </div>
                    ))  }
                

            </div>

            </div>
        </div>
    );
}

export default List;