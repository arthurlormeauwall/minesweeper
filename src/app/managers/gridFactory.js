import GridManager from './GridManager';
import { cellData } from '../data/cellDataStructure';

const interCellData = (index,type)=>{
    return({
        index:index,
        type:type,
        count : (type==='bomb')? NaN:0
    })
}

function gridFactory (level) {

    let interCells=[]
    let cells=[]

    interCells = putAndCountBomb(level)

    cells= createCellsFromInterCells(interCells)
    let newGrid= new GridManager(level, cells)

    return newGrid

}

const randomNumber=(index)=>{
   
    // return Math.random()*101
    return (Math.random()*100)
  
}
function putAndCountBomb(level){
    let interCells=[]
    let index=0
    let size=level.size
    let difficulty=level.difficulty

    for (let y=0;y<size;y++){
        for (let x=0;x<size;x++){   
            (randomNumber(index)< (difficulty)) ? interCells.push(interCellData(index,'bomb')): interCells.push(interCellData(index,'counter'))
            index++
        }
    }
    let grid= new GridManager(level, interCells)

    for (let i=0;i<size*size;i++){
      if (interCells[i].type=='bomb'){
        grid.applyToAllLegalNeighbors(i, incrementConterCell);
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


export default gridFactory