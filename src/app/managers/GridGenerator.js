import { designRessource } from '../data/designRessource';

function toIndex(coordXY,size){
    let x=coordXY[0]
    let y=coordXY[1]

    const a=(y+x*size)
    
    return (a)
}



function toXY(index,size){
    return [Math.floor(index/size), index%size]
}

function min (a,b){
    return (a<=b)?a:b
}


const cellData=(x,y, index, type)=>{
    return({ 
    x:x,
    y:y,
    id : index,
    type: type,
    content : { hiddenCell : designRessource['cellHidden'],
                flaggedCell: designRessource['cellFlag'],
                revealedCell : designRessource[type]
              },
    state : 'hiddenCell'
    })      
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

function createCellsFromInterCells(interCells){

    let cells=[]
    
    for (let i=0;i<interCells.length;i++){
        let type=createTypeFromInterType(interCells[i].type, interCells[i].count)
        cells.push(cellData(interCells[i].x,interCells[i].y,interCells[i].index,type))
    }
    
    return cells
}


function incrementCell(cell){
  let count=cell.count
  count+=1
  count = min(count,8)
  cell.count=count
  return cell
}


function areCoordLegal (coordXY,size){
    let x=coordXY[0]
    let y=coordXY[1]
    let response;
    (x<0 || x>=size || y<0 || y>=size) ? response= false : response=true
  
    return response
}

// give 8 neighbor cells of the XYCoord Cell
function neighbor (x,y)
{
   return [
    [x+1,y],
    [x+1,y+1],
    [x+1,y-1],

       
    [x,y-1],          
    [x,y+1], 

    [x-1,y], 
    [x-1,y+1],
    [x-1,y-1],
    ]
}

function giveAllLegalNeighborIndex(index, size, cells){
    const neighbors=neighbor(toXY(index, size)[0], toXY(index,size)[1]);
    let legalNeighbors=[]
    for (let i=0;i<8;i++){
        if (areCoordLegal(neighbors[i], size)){
            legalNeighbors.push(toIndex(neighbors[i],size))
        }
    }
    return legalNeighbors
}

function incrementAllNeighbors(index, size, cells){
    let legalNeighborsIndexs=giveAllLegalNeighborIndex(index,size,cells)

    for (let i=0;i<legalNeighborsIndexs.length;i++){
        if (cells[legalNeighborsIndexs[i]].type=='counter'){
            cells[legalNeighborsIndexs[i]]=incrementCell(cells[legalNeighborsIndexs[i]])
        }
    }
    return cells
}

const createInterCell = (x,y,index,type)=>{
    let h={
        x:x,
        y:y,
        index:index,
        type:type,
        count : (type==='bomb')? NaN:0
    }
    return h
}

function putAndCountBomb(size,difficulty){
    let interCells=[]
    let index=0
    for (let y=0;y<size;y++){
        for (let x=0;x<size;x++){   
            (Math.random()*101<difficulty) ? interCells.push(createInterCell(x,y,index,'bomb')): interCells.push(createInterCell(x,y,index,'counter'))
            index++
        }
    }
    
    for (let i=0;i<size*size;i++){
      if (interCells[i].type=='bomb'){
        interCells = incrementAllNeighbors(i,size,interCells)
      } 
    }
    
    return interCells
}


function GridFactory (level) {
  
    let interCells=[]
    let cells=[]
    let index=0
    const size=level.size
    const difficulty=level.difficulty
    
    interCells=putAndCountBomb(size,difficulty)
    cells=createCellsFromInterCells(interCells)
  
    return ({
        size:size,
        cells:cells
    })
}
export default GridFactory