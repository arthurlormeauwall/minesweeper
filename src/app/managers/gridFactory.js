import GridManager from './gridManager';
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
   
    return (Math.random()*100) 
}



function putAndCountBomb(level){
    let interCells=[]
    
    let size=level.size
    let difficulty=level.difficulty
  

    putBomb(difficulty, interCells, size)
   

    let grid= new GridManager(level, interCells)

    for (let i=0;i<size*size;i++){
      if (interCells[i].type=='bomb'){
        grid.applyToAllLegalNeighbors(i, incrementConterCell);
      } 
    }

    return interCells
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
function getRandomOffset(size, numberOfBomb){
    let offset=1/(size*1.8)
    return randomIntFromInterval(-offset*numberOfBomb,offset*numberOfBomb)
}

function getNumberOfBomb(size, difficulty){
    let numberOfBomb=Math.floor((size*size)*difficulty/100)
    numberOfBomb=numberOfBomb+getRandomOffset(size, numberOfBomb)
    return numberOfBomb
}

function putBomb(difficulty, interCells, size){
    let numberOfBomb=getNumberOfBomb(size, difficulty)
    let index=0
    let bombIndex=[]
    let counterIndex=[]
    
    for (let y=0;y<size;y++){
        for (let x=0;x<size;x++){   
            if (randomNumber(index)< (difficulty)) {
                interCells.push(interCellData(index,'bomb')); 
                bombIndex.push(index)
            }
            else{ 
                interCells.push(interCellData(index,'counter'))
                counterIndex.push(index)
            }
            index++
        }
    }
    if(bombIndex.length<numberOfBomb){
        while(bombIndex.length!=numberOfBomb){
            let ranIndex=Math.floor(Math.random() * counterIndex.length)
            let randomCounterIndex=counterIndex[ranIndex]

            bombIndex.push(randomCounterIndex)

            interCells[randomCounterIndex]=interCellData(randomCounterIndex, 'bomb')

            counterIndex.splice(ranIndex,1)
        }
    }
    else if(bombIndex.length>numberOfBomb){
        while(bombIndex.length!=numberOfBomb){
            let ranIndex=Math.floor(Math.random() * counterIndex.length)
            let randomBombIndex=bombIndex[ranIndex]
            counterIndex.push(randomBombIndex)
            interCells[randomBombIndex]=interCellData(randomBombIndex, 'counter')

            bombIndex.splice(ranIndex,1)
        }
    }
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