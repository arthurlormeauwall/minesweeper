import GridController from './GridController';
import {cellData}  from '../entities/cellDataStructure';
import {interCellData}  from '../entities/cellDataStructure';


function gridFactory (level) {
    let grid = new GridController(level, [])
    putAndCountBomb(grid)

    return grid
}


function putAndCountBomb(grid){
    
    putBomb(grid)
    incrementCounterCells(grid)
    createCellsFromInterCells(grid)
}

function putBomb(grid){
    let difficulty=grid.level.difficulty
    let size=grid.level.size

    let numberOfBomb=computeNumberOfBomb(size, difficulty)
    let index=0
    let bombIndex=[]
    let counterIndex=[]
    
    for (let y=0;y<size;y++){
        for (let x=0;x<size;x++){   
            if (randomNumber(index)< (difficulty)) {
                grid.pushCell(interCellData(index,'bomb')); 
                bombIndex.push(index)
            }
            else{ 
                grid.pushCell(interCellData(index,'counter'))
                counterIndex.push(index)
            }
            index++
        }
    }

    adjustNumberOfBomb(numberOfBomb, bombIndex, counterIndex, grid)
}

function incrementCounterCells(grid){
    for (const cell of grid.cells){
        if (cell.type==='bomb'){
            grid.applyToAllLegalNeighbors(cell.index, incrementConterCell);
          } 
    }
}

function createCellsFromInterCells(grid){

    let cells=[]
    for (let i=0;i<grid.cells.length;i++){
        let type=createTypeFromInterType(grid.getCellType(i),grid.getCell(i).count)
        cells.push(cellData(grid.getCell(i).index,type))
    }

    grid.setCells(cells)
}


function min (a,b){
    return (a<=b)?a:b
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
function getRandomOffset(size, numberOfBomb){
    let offset=1/(size*1.8)
    return randomIntFromInterval(-offset*numberOfBomb,offset*numberOfBomb)
}

const randomNumber=(index)=>{
    return (Math.random()*100) 
}


function computeNumberOfBomb(size, difficulty){
    let numberOfBomb=Math.floor((size*size)*difficulty/100)
    numberOfBomb=numberOfBomb+getRandomOffset(size, numberOfBomb)
    return numberOfBomb
}

function adjustNumberOfBomb(numberOfBomb, bombIndex, counterIndex, grid){
    if(bombIndex.length<numberOfBomb){
        while(bombIndex.length!==numberOfBomb){
            let randomIndex=Math.floor(Math.random() * counterIndex.length)
            let randomCounterIndex=counterIndex[randomIndex]

            bombIndex.push(randomCounterIndex)
            grid.setCell(randomCounterIndex, interCellData(randomCounterIndex, 'bomb'))
            counterIndex.splice(randomIndex,1)
        }
    }
    else if(bombIndex.length>numberOfBomb){
        while(bombIndex.length!==numberOfBomb){
            let ranIndex=Math.floor(Math.random() * counterIndex.length)
            let randomBombIndex=bombIndex[ranIndex]
            counterIndex.push(randomBombIndex)
            grid.setCell(randomBombIndex, interCellData(randomBombIndex, 'counter'))

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