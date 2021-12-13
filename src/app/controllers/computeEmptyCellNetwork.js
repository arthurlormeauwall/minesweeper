function computeEmptyCellNetwork(grid, index){

  let linkedEmptyCell=[]
  let cellsToReveal=[]

  linkedEmptyCell.push(index)
  linkedEmptyCell= getLinkedEmptyCells(grid, linkedEmptyCell, 1)
  
  cellsToReveal.push(...linkedEmptyCell)

  for (let i=1;i<linkedEmptyCell.length;i++){
    cellsToReveal.push(...grid.getAllLegalNeighborIndex(linkedEmptyCell[i]))
  }

  return  cellsToReveal
} 


function getLinkedEmptyCells(grid, linkedEmptyCells, numberToSearch){

  let count=0
  let lastLinkedEmptyCellIndex=linkedEmptyCells.length-1

  for (let i=0;i<numberToSearch;i++){   
    
    let cellIndexToSearch=linkedEmptyCells[lastLinkedEmptyCellIndex-i]
  
    if (grid.getCellType(cellIndexToSearch)==='cellEmpty'){
    
      let neighbors=grid.getAllLegalNeighborIndex(cellIndexToSearch);

      let newIndexToAdd= getAllEmptyCellsDirectlyConnected(grid, neighbors, linkedEmptyCells)
      count= newIndexToAdd.length
      linkedEmptyCells.push(...newIndexToAdd)     
    }
    linkedEmptyCells = getLinkedEmptyCells(grid, linkedEmptyCells, count)       
  }   
  return linkedEmptyCells
}
    
function getAllEmptyCellsDirectlyConnected(grid, neighbors, linkedEmptyCells){ 
    let newIndexToAdd=[]

    for (const neighbor of neighbors){
      if (grid.getCellType(neighbor)==='cellEmpty'){ 
        if (linkedEmptyCells.includes(neighbor)===false){
          newIndexToAdd.push(neighbor)
        }
      }
    }
      return newIndexToAdd
}

export default computeEmptyCellNetwork