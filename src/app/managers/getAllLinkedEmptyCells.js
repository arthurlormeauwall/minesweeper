function getAllLinkedEmptyCells(grid, index){

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
  let indexReference=linkedEmptyCells.length-1

  for (let i=0;i<numberToSearch;i++){   
    
    let cellIndexToSearch=linkedEmptyCells[indexReference-i]
  
    if (grid.cells[cellIndexToSearch].type==='cellEmpty'){
    
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
    let neighborsLength=neighbors.length
    let newIndexToAdd=[]

    for (let j=0;j<neighborsLength;j++){ // for all neighbors
        if (grid.cells[neighbors[j]].type==='cellEmpty'){ // is it empty ?
          let newUnfound=true
          let emptyCellIndexLength = linkedEmptyCells.length
          for (let z=0;z<emptyCellIndexLength ;z++){ // check if index is not found already
            if (linkedEmptyCells[z]===neighbors[j]){
              newUnfound=false
            }
          }
          if (newUnfound){ // if index is new and not already in the array, put it in the array
            newIndexToAdd.push(neighbors[j])
          }
        }
      }
      return newIndexToAdd
}

export default getAllLinkedEmptyCells