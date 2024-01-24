import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin3Line } from "react-icons/ri";

const Home = () => {
const [inputData,SetInput]=useState("");
const [list,setList]=useState([]);

const changeHandler=((e)=>{
    SetInput(e.target.value);
});

//adding 
const addItem=(()=>{

    const itemList={
        id: Math.random(),
        data: inputData,
    }
    setList([list,itemList]);
    SetInput("");
    console.log(list);
    
    
})

//Deleting 
const delteItem=((id)=>{
        console.log(id);
        // const newList=list.filter((item)=> item.id!==id);
        // setList(newList);
})
//editing 
    const editItem=(()=>{});



  return (
    <div className="main">
      <h1>Task Tracker</h1>  
        <div className="items">
            <input type="text" placeholder="Add task here..." value={inputData} onChange={changeHandler}/>
            <button onClick={addItem}>Add</button>
        </div>
        <div className="itemlist">
           <ul>
            {list.map((currenItem) =>{
                return(
                <li key={currenItem.id}>
                    {currenItem.data}
                    <div className="edit"  onClick={editItem(currenItem.id)}><FaEdit/></div>
                    <div className="delete" onClick={delteItem(currenItem.id)}><RiDeleteBin3Line/></div> 
                </li>
           ) })}
           </ul>   
        </div>
    </div>
  )
}

export default Home;