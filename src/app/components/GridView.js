import React from 'react';
import CellView from "./CellView"

const returnCallBack=(callBack)=>{
    return callBack()
}

const rowOfCells=(props)=>{
    const rowCount = props.rowCount
    const size = props.size
    const tableData = props.cells
    const onRevealedCell = props.onRevealedCell
    const flagCell=props.flagCell

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
        ).map(rowOfCells=>rowOfCells)
    )
   
}

const Grid =(props)=>{   
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
                ).map(row=>row)}   
            </table>
        </div>)
}

export default Grid

    