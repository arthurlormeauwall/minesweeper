import { designRessource } from '../data/designRessource';
import GridManager from './grid';



const cellData=(index, type)=>{
    return({ 
    id : index,
    type: type,
    content : { hiddenCell : designRessource['cellHidden'],
                flaggedCell: designRessource['cellFlag'],
                revealedCell : designRessource[type]
              },
    state : 'revealedCell'
    })      
}

const interCellData = (index,type)=>{
    return({
        index:index,
        type:type,
        count : (type==='bomb')? NaN:0
    })
}

function GridFactory (level) {
  
    let grid=new GridManager(level)

    let interCells=[]
    let cells=[]
    
    interCells=putAndCountBomb(grid)
    cells=createCellsFromInterCells(interCells)
  
    grid.setCells(cells)
    return grid
}

function putAndCountBomb(grid){
    let interCells=grid.getCells()
    let index=0
    let size=grid.level.size
    let difficulty=grid.level.difficulty
    for (let y=0;y<size;y++){
        for (let x=0;x<size;x++){   
            (Math.random()*101< difficulty) ? interCells.push(interCellData(index,'bomb')): interCells.push(interCellData(index,'counter'))
            index++
        }
    }
    
    for (let i=0;i<size*size;i++){
      if (interCells[i].type=='bomb'){
        // interCells = incrementAllNeighbors(i,size,interCells, grid)
        grid.applyToAllLegalNeighbors(i, incrementConterCell)
      } 
    }
    
    return interCells
}

function incrementConterCell(cell){
    if (cell.type=='counter'){
        let count=cell.count
        count+=1
        count = min(count,8)
        cell.count=count
        return cell
    }
    else{
        return cell
    }
  }
  
function min (a,b){
    return (a<=b)?a:b
}

  function createCellsFromInterCells(interCells){

    let cells=[]
    
    for (let i=0;i<interCells.length;i++){
        let type=createTypeFromInterType(interCells[i].type, interCells[i].count)
        cells.push(cellData(interCells[i].index,type))
    }
    
    return cells
}

function createTypeFromInterType(interCellType, interCellCount){
    if (interCellType=='bomb'){
        return 'bomb'}
    else if (interCellCount==0){
        return 'cellEmpty'}
    else {
        return 'cell'+interCellCount
    }
}


export default GridFactory