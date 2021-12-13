import GridManager from './gridController';
import {cellData}  from '../entities/cellDataStructure';
import {interCellData}  from '../entities/cellDataStructure';


function gridFactory (level) {

    let cells=[]
    cells = createGridAndPutAndCountBomb(level)
    cells= createCellsFromInterCells(cells)
    let newGrid= new GridManager(level, cells)

    return newGrid
}

const randomNumber=(index)=>{
   
    return (Math.random()*100) 
}



function createGridAndPutAndCountBomb(level){
    let cells=[]
    
    let size=level.size
    let difficulty=level.difficulty
  
    putBomb(difficulty, cells, size)
    let grid= new GridManager(level, cells)

    for (let i=0;i<size*size;i++){
      if (cells[i].type==='bomb'){
        grid.applyToAllLegalNeighbors(i, incrementConterCell);
      } 
    }

    return cells
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
function getRandomOffset(size, numberOfBomb){
    let offset=1/(size*1.8)
    return randomIntFromInterval(-offset*numberOfBomb,offset*numberOfBomb)
}

function computeNumberOfBomb(size, difficulty){
    let numberOfBomb=Math.floor((size*size)*difficulty/100)
    numberOfBomb=numberOfBomb+getRandomOffset(size, numberOfBomb)
    return numberOfBomb
}

function putBomb(difficulty, cells, size){
    let numberOfBomb=computeNumberOfBomb(size, difficulty)
    let index=0
    let bombIndex=[]
    let counterIndex=[]
    
    for (let y=0;y<size;y++){
        for (let x=0;x<size;x++){   
            if (randomNumber(index)< (difficulty)) {
                cells.push(interCellData(index,'bomb')); 
                bombIndex.push(index)
            }
            else{ 
                cells.push(interCellData(index,'counter'))
                counterIndex.push(index)
            }
            index++
        }
    }

    adjustNumberOfBomb(numberOfBomb, bombIndex, counterIndex, cells)
}

function adjustNumberOfBomb(numberOfBomb, bombIndex, counterIndex, cells){
    if(bombIndex.length<numberOfBomb){
        while(bombIndex.length!==numberOfBomb){
            let randomIndex=Math.floor(Math.random() * counterIndex.length)
            let randomCounterIndex=counterIndex[randomIndex]

            bombIndex.push(randomCounterIndex)
            cells[randomCounterIndex]=interCellData(randomCounterIndex, 'bomb')
            counterIndex.splice(randomIndex,1)
        }
    }
    else if(bombIndex.length>numberOfBomb){
        while(bombIndex.length!==numberOfBomb){
            let ranIndex=Math.floor(Math.random() * counterIndex.length)
            let randomBombIndex=bombIndex[ranIndex]
            counterIndex.push(randomBombIndex)
            cells[randomBombIndex]=interCellData(randomBombIndex, 'counter')

            bombIndex.splice(ranIndex,1)
        }
    }
}

function incrementConterCell(cell){
    if (cell.type==='counter'){
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
    if (interCellType==='bomb'){
        return 'bomb'}
    else if (interCellCount===0){
        return 'cellEmpty'}
    else {
        return 'cell'+interCellCount
    }
}

export default gridFactory