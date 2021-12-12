import React from 'react';
import CellView from "./CellView"

const rowOfCells=(props)=>{
    const rowCount = props.rowCount
    const size = props.size
    const tableData = props.cells
    const onRevealedCell = props.onRevealedCell
    const flagCell=props.flagCell
    
    const returnCallBack=(callBack)=>{
        return callBack()
    }

    
    return (
        returnCallBack( () => {
            const cells=[]
     
            for (let cellCount=0; cellCount < size; cellCount++){
              
                   cells.push(
                 
                    <td key={cellCount+rowCount* size}>
                       
                        <CellView  cellData= {tableData[cellCount+rowCount* size]}
                                   onRevealedCell={(onRevealedCell)}
                                   flagCell={flagCell}
                          
                           /></td>
                    )
            }   
            return cells
            }
        ).map(item=>item)
    )
   
}

const Grid =(props)=>{  
    
    const returnCallBack=(callBack)=>{
        return callBack()
    }
    
    return(
        <div className="Grid">
                <table>
                
                    {returnCallBack(()=> {
                       var rows=[]
                        for (let rowCount=0; rowCount <  props.size; rowCount++){
                        
                            rows.push(<tbody><tr key={rowCount+1000}>
                                    {rowOfCells({...props, rowCount})}
                                </tr></tbody>)
                        }
                        return rows
                    }
                    ).map(item=>item)}
                        
                
                </table>
  
    </div>)
}

export default Grid

    