import React from 'react';
import CellView from "./CellView"



    
const rowOfCells=(props)=>{
    const rowCount = props.rowCount
    const size = props.size
    
    const tableData = props.gridData
    const onRevealedCell = props.onRevealedCell
    
    const returnCallBack=(callBack)=>{
      
        return callBack()
    }

    
    return (
        returnCallBack( () => {
            const cells=[]
     
            for (let cellCount=0; cellCount < size; cellCount++){
              
                // 
                   cells.push(
                    // <p>test</p>
                    <td key={cellCount+rowCount* size}>
                        <CellView  id= {tableData[cellCount+rowCount* size].id}
                            srcHidden= {tableData[cellCount+rowCount* size].imgHiddenCell}
                            srcRevealed={tableData[cellCount+rowCount* size].imgRevealedCell}
                            onRevealedCell={(onRevealedCell)}
                            content={tableData[cellCount+rowCount* size].content}/></td>
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
                        
                            rows.push(<tbody><tr key={rowCount}>
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

    