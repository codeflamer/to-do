import React,{useState,useRef,useEffect} from 'react';
import Items from './components/items';
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Instructions from './components/instructions';

const App = () => {
  const [items,setItems] = useState([]);//{id:1,item:'lab1'}
  const [input,setInput] = useState('');
  const [editing,setEditing] = useState(false);
  const [editingValue,setEditingValue] = useState({});
  const [process,setProcess] = useState([]) //{id:1,item:'labwork'},{id:2,item:'project'}
  const [done,setDone] = useState([])//{id:1,item:'lab1'},{id:2,item:'lab2'}
  const val = useRef(null);

  const handleReplacing = (typeoflist)=>{
     typeoflist.map((todo)=>{ 
        if(todo.id === editingValue.id) {
            todo.item = input
        }
        return todo; 
      });
      setEditing(false);
          setEditingValue({});
          setInput('');
      return typeoflist
      
  }

  const handleSubmit =(e) =>{
    e.preventDefault();
    if(!input){
      alert('you need to input something..')
    }
    if(editing){
      if(editingValue.type ==='new-todo'){
          const value = handleReplacing(items);
          setItems([...value]);
         
      }
       if(editingValue.type ==='processing'){
          const value = handleReplacing(process)
          setItems([...value]);
          
      }
       if(editingValue.type ==='finished'){
          const value = handleReplacing(done)
          setItems([...value]);
          
      }
    }
    if(input && !editing){
       const newItem = {id: new Date().getTime().toString(),item:input};
        setItems([...items,newItem]);
        setInput('');
    }
  }

  const handledelete=(id,category)=>{
    if(category === 'new-todo'){
      const newItem = items.filter((item)=> item.id !== id );
      setItems(newItem);
    }
     if(category === 'processing'){
      const newItem = process.filter((item)=> item.id !== id );
      setProcess(newItem);
    }
     if(category === 'finished'){
      const newItem = done.filter((item)=> item.id !== id );
      setDone(newItem);
    }
  }

  const pushItem = (listtype,id,category)=>{
        const todo = listtype.filter((item)=>item.id === id);
        setInput(todo[0].item);
        setEditingValue({...todo[0],type:category})
        setEditing(true);
  }

  const editItem = (id,category)=>{
    if(category === 'new-todo'){
      pushItem(items,id,category)
    }
    if(category === 'processing'){
      pushItem(process,id,category)
    }
    if(category === 'finished'){
      pushItem(done,id,category)
    }
  }

  const assignVariables=(e,transferItem,cat)=>{
     e.dataTransfer.setData('id',transferItem[0].id);
     e.dataTransfer.setData('item',transferItem[0].item);
     e.dataTransfer.setData('category',cat);
    //  console.log(transferItem[0])
  }

  const onDragStart = (e,itemID,cat)=>{
    // console.log(itemID);
    if(cat==='new-todo'){
      const transferItem = items.filter((item)=>item.id === itemID);
      assignVariables(e,transferItem,cat);
    }
    if(cat==='processing'){
      const transferItem = process.filter((item)=>item.id === itemID);
      assignVariables(e,transferItem,cat);
    }
    if(cat==='finished'){
      const transferItem = done.filter((item)=>item.id === itemID);
      assignVariables(e,transferItem,cat);
    }
  }

  const onDragOver = (event) => {
	    event.preventDefault();
  }
  
  
  const onDrop =(e,cat)=>{
    let receiveditemID = e.dataTransfer.getData('id');
    let receiveditemName = e.dataTransfer.getData('item');
    let category = e.dataTransfer.getData('category');
    let obj = {id:new Date().getTime().toString(),item:receiveditemName};
    // console.log(obj)
    // console.log(category)
    if(cat=== 'processing'){
      setProcess([...process,obj])
      if(category ==='finished'){
        const newItems = done.filter((item)=>{
        return parseInt(item.id) !== parseInt(receiveditemID)
      })
        setDone([...newItems]);
      }
      if(category ==='new-todo'){
        const newItems = items.filter((item)=>{
        return parseInt(item.id) !== parseInt(receiveditemID)
      })
      setItems([...newItems]);
      }
      if(category ==='processing'){
        setProcess([...process]);
      }
    }
    if(cat === 'finished'){
      setDone([...done,obj]);
      if(category ==='processing'){
        const newItems = process.filter((item)=>{
        return parseInt(item.id) !== parseInt(receiveditemID)
      })
      setProcess([...newItems]);
      }
      if(category ==='new-todo'){
        const newItems = items.filter((item)=>{
        return parseInt(item.id) !== parseInt(receiveditemID)
      })
      setItems([...newItems]);
      }
      if(category ==='finished'){
        setDone([...done]);
      }
    }
    if(cat=== 'new-todo'){
      setItems([...items,obj]);
      if(category ==='processing'){
        const newItems = process.filter((item)=>{
        return parseInt(item.id) !== parseInt(receiveditemID)
      })
      setProcess([...newItems]);
      }
      if(category ==='finished'){
        const newItems = done.filter((item)=>{
        return parseInt(item.id) !== parseInt(receiveditemID)
      })
        setDone([...newItems]);
      }
      if(category ==='new-todo'){
        setItems([...items]);
      }
    }
    
  }
  
  useEffect (()=>{
    val.current.focus();
  },[])

  return (
    <>
    <Navbar/>
    <div className='hero'>
       <form className='' onSubmit={handleSubmit}>
         <div className='center'>
          <div className="">
              <input ref={val} placeholder='Add what you wanna do' className="form-control" type='text' value={input} onChange={(e)=> setInput(e.target.value)}/>
          </div>
          <div className="">
            <button className='btn btn-primary'type='submit'>Add</button>
          </div>
        </div>
       </form>
      {/* <Items items={items} todelete={handledelete} editItem={editItem} />         */}
    </div>

    <div className='headers'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='contain newly added col-md-4'>
            <div className='holder'>
               <h2 className='h2 red'>what to-do</h2>
               {items.length === 0 ? 
               <div>
               Add items by typing in the input box
               <Items items={items} todelete={handledelete}  editItem={editItem}  ondragstart={onDragStart} ondragover={onDragOver} ondrop={onDrop} cat='new-todo' color='start'/>
               </div>
               :
                <Items items={items} todelete={handledelete}  editItem={editItem}  ondragstart={onDragStart} ondragover={onDragOver} ondrop={onDrop} cat='new-todo' color='start'/>
               }
            </div>
          </div>
          <div className='contain processing col-md-4'>
            <div className='holder'>
            <h2 className='h2 blue'>Processing</h2>
             {process.length === 0 ? 
             <div>
             Add items ,by dropping in 
             <Items items={process} todelete={handledelete}  editItem={editItem} ondragstart={onDragStart} ondragover={onDragOver} ondrop={onDrop} cat='processing' color='doing'/>
             </div>
             :
            <Items items={process} todelete={handledelete}  editItem={editItem} ondragstart={onDragStart} ondragover={onDragOver} ondrop={onDrop} cat='processing' color='doing'/>
              }
            </div>
          </div>
          <div className='contain done col-md-4'>
            <div className='holder'>
            <h2 className='h2 green'>Completed/done</h2>
             {done.length === 0? 
             <div>
             'Add items ,by dropping in'
              <Items items={done} todelete={handledelete}  editItem={editItem} ondragstart={onDragStart} ondragover={onDragOver} ondrop={onDrop} cat='finished' color='done'/>
              </div>
             :
            <Items items={done} todelete={handledelete}  editItem={editItem} ondragstart={onDragStart} ondragover={onDragOver} ondrop={onDrop} cat='finished' color='done'/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className='instructions'>
      <Instructions/>
    </div>

    <Footer/>
    </>
  )
}

export default App;

