import React from 'react'
import Instruction from './instruction'

const instructions = () => {
    return (
        <>
            <h2>Instructions</h2>
            <ul>
                <Instruction instr='1. You type into the input box,then submit by clicking on the 
                                    submit button or hit the enter button.It is then added to the "to-do" category.'/>
                <Instruction instr='2. In order to move your list from one category to another,you 
                                    basically just have to drag the particular list and then drop at the category you want to drop it, just below the text'/>
                <Instruction instr='3. In the process of dropping be very careful,make sure the drop symbol appears 
                                    before you drop it into any other category.'/>
                <Instruction instr='4. In order to delete an item, click on the delete button located to the right of each item.'/>
                <Instruction instr='5. If you want to edit what you typed, you can  click on the text and can now automatically edit what you typed in the input box. '/>
            </ul>
        </>
    )
}

export default instructions
