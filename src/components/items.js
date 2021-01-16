import React from 'react'
import Item from './item';

const items = ({items,todelete,editItem,ondragstart,ondragover,ondrop,cat,color}) => {

    return (
        <ul onDragOver={(e)=>ondragover(e)} onDrop={(e)=>ondrop(e,cat)}>
            {items.map((todo,index)=>{
                return (
                    <div className='each-element'>
                    <li key={todo.id} draggable="true" className={color}  onDragStart={(e)=>ondragstart(e,todo.id,cat)} >
                        <span onClick={()=>editItem(todo.id,cat)}><Item value={todo.item} /></span>
                    </li>
                    
                    <i className='fas fa-trash-alt' onClick={()=>todelete(todo.id,cat) }></i>
                    </div>
                )
            })}
        </ul>
    )
}

export default items;
