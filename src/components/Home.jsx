import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin3Line } from "react-icons/ri";
import { BsCSquare } from "react-icons/bs";
import {DragDropContext,Draggable,Droppable} from "react-beautiful-dnd";

//getting local data
const getLocalData=(()=>{
    const itemslist=localStorage.getItem("myList")
    if(itemslist){
        return JSON.parse(itemslist);
    }else{
        return [];
    }
})

const Home = () => {
const [inputData,setInput]=useState("");
const [list,setList]=useState(getLocalData());
const [isEdited,setEdited]=useState("");
const [toggleBtn,settoggleBtn]=useState(false);
const [inputDate,setInputDate]=useState( new Date());
const [filt,setFilt]=useState('');

const changeHandler=((e)=>{
    setInput(e.target.value);
});

//adding 
const addItem=(()=>{
    if(!inputData || !inputDate){
        alert("please enter something and Date");
    }
    else if(inputData && toggleBtn && inputDate){
        setList(
            list.map((ele)=>{
                // console.log(isEdited);
                if(ele.id===isEdited){
                    return {...ele,data:inputData};
                }
                return ele;
            })
        )
        setInput("");
        setEdited(null);
        settoggleBtn(false);
    }
    else{
    const itemList={
        id: Math.random(),
        data: inputData,
        date:inputDate,
        complete:false,
    }
    setList([...list,itemList]);
    setInput("");
    setInputDate("")
    // console.log(list);
    
}
})

//Deleting 

const deleteItem=((idx)=>{
        // // console.log(id);
        const newList=list.filter((ele)=>{
            return ele.id!==idx});
        setList(newList);
        // console.log(newList);
});
//editing 
    const editItem=((idx)=>{
        // // console.log(id);
        const editing=list.find((ele)=> {
        return ele.id===idx});
        setInput(editing.data);
        setInputDate(editing.date);
        setEdited(idx);
        settoggleBtn(true);
    });

//Completed
const compItem = (idx) => {
    setList((prevlist) => {
      return prevlist.map((ele) => {
        if (ele.id === idx) {
          return { ...ele, completed: !ele.completed };
        }
        return ele;
      });
    });
  };
  


//Adding local storage
useEffect(()=>{
           localStorage.setItem("myList",JSON.stringify(list));   
},[list]);

//filtering 
const filterItem = (event) => {
    // console.log(event.target.value);
    setFilt(event.target.value);
  };

  const filteredList = list.filter((curItem) => {
    if (filt === 'true' && !curItem.completed) {
      return false;
    } else if (filt === 'false' && curItem.completed) {
      return false;
    }
    return true;
  });

  //dragable
  
  return (

    <div className="main">
      <h1>Task Tracker</h1>  
        <div className="items">
            <div className="inputs">
            <input type="text" placeholder="Add task here..." value={inputData} onChange={changeHandler}/>
            <input type="date"  value={inputDate} onChange={(e)=> setInputDate(e.target.value)}/>
            </div>
            { toggleBtn ? (<button onClick={addItem}>Update</button>):(
                <button onClick={addItem}>Add New</button>
            )}
        </div>
        <div className="filter">
           <form >
            <select name="" id="" onClick={filterItem} className='opt'>
                <option value="">All</option>
                <option value="true">Compelete</option>
                <option value="false">Incompelete</option>
            </select>
           </form>
        </div>
        <div className="itemlist" >
                        {filteredList.map((curItem) =>{
                    return(     
                        <div className='itemList'>
                            <hr className='hr'/>
                            <li key={curItem.id}  className='lists'>  
                            <span className='item' style={{
                            textDecoration: curItem.completed ? 'line' : 'none',
                            color: curItem.completed ? 'red' : 'black',
                            }}>
                            <span>{curItem.data}</span>    
                            <span>{curItem.date}</span>    
                            </span>
                            <span className='icons'>
                            <span className='del' onClick={()=>deleteItem(curItem.id)} title='Delete Task'><RiDeleteBin3Line/></span>
                            <span className='edit' onClick={()=>editItem(curItem.id)} title='Edit Task'><FaEdit/></span>
                            <span className='com' onClick={()=>compItem(curItem.id)} title='Task Completed'><BsCSquare/></span>
                            </span>    
                            </li>
                            </div>
                           
                       )}
               
           )}</div>
           
    </div>

  )
}

export default Home;