import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin3Line } from "react-icons/ri";


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
const [inputDate,setInputDate]=useState(new Date());

const changeHandler=((e)=>{
    setInput(e.target.value);
   
});

//adding 
const addItem=(()=>{
    if(!inputData){
        alert("please enter something");
    }
    else if(inputData && toggleBtn){
        setList(
            list.map((ele)=>{
                console.log(isEdited);
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
    }
    setList([...list,itemList]);
    setInput("");
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


//Adding local storage
useEffect(()=>{
           localStorage.setItem("myList",JSON.stringify(list));   
},[list]);



  return (
    <div className="main">
      <h1>Task Tracker</h1>  
        <div className="items">
            <div className="inputs">
            <input type="text" placeholder="Add task here..." value={inputData} onChange={changeHandler}/>
            <input type="date"  value={inputData} onChange={(e)=> setInputDate(e.target.value)}/>
            </div>
            { toggleBtn ? (<button onClick={addItem}>Add </button>):(
                <button onClick={addItem}>Add New</button>
            )}
        </div>
        <div className="itemlist">
           <ul>
            {list.map((curItem) =>{
                return(
                <li key={curItem.id}>
                   <div> {curItem.data}
                   {curItem.date}</div>
              <div className="task-btn">
                <div onClick={()=>deleteItem(curItem.id)}><RiDeleteBin3Line/></div>
                <div onClick={()=>editItem(curItem.id)}><FaEdit/></div>
              </div>
                    
                </li>
           ) })}
           </ul>   
        </div>
    </div>
  )
}

export default Home;