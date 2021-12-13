import computeEmptyCellNetwork from "./computeEmptyCellNetwork"

class GridController{
    constructor(level, cells){
        this.level=level
        this.cells=cells
    }

    getData(){
        return({
            size: this.level.size,
            cells:this.cells
        })
    }

    numberOfHiddenCell(){
        var count=0
        this.cells.forEach(cell => {
            if (cell.state==='hiddenCell'){
                count++
            }
        });
        return count
    }

    applyToAllCells(callback){
        for (let i=0;i<this.size*this.size;i++){
                this.cells[i]=callback(this.cells[i])
        }
    }

    applyToAllLegalNeighbors(index, callback){
        let legalNeighborsIndex=this.getAllLegalNeighborIndex(index)
        
        for(const index of legalNeighborsIndex){ this.cells[index]=callback(this.cells[index])}
    }

    applyToAllLegalNeighborsAndReturn(index, callback){
        let legalNeighborsIndex=this.getAllLegalNeighborIndex(index)
        const response=[]

        for(const index of legalNeighborsIndex){ response.push(callback(this.cells[index]))}

        return response
    }

    getAllLegalNeighborIndex(index){
        const neighbors=this.neighbor(this.toXY(index)[0], this.toXY(index)[1]);
        
        let legalNeighbors=[]
        for (let i=0;i<8;i++){
            if (this.areCoordLegal(neighbors[i])){
                legalNeighbors.push(this.toIndex(neighbors[i]))
            }
        }
        return legalNeighbors
    }

    getCellsToReveal(newRevealedCellIndex){

        let cellsToReveal=[]

        if (this.getCellType(newRevealedCellIndex)==='cellEmpty'){
            cellsToReveal=[...computeEmptyCellNetwork(this, newRevealedCellIndex)]
        }
        else{
            cellsToReveal.push(newRevealedCellIndex)
        }        
        return  cellsToReveal
    }
    
    areCoordLegal (coordXY){
        let x=coordXY[0]
        let y=coordXY[1]
  
       return (x<0 || x>=this.level.size || y<0 || y>=this.level.size) ? false : true
    }

    // give 8 neighbor cells of the XYCoord Cell
    neighbor (x,y)
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

    toIndex(coordXY){
        let x=coordXY[0]
        let y=coordXY[1]
    
        const a=(y+x*this.level.size)
        
        return (a)
    }
    
    toXY(index){
        return [Math.floor(index/this.level.size), index%(this.level.size)]
    } 
    
    setCells(cells){
        this.cells=cells
    }

    setCell(index, cell){
        this.cells[index]=cell
    }

    pushCell(cell){
        this.cells.push(cell)
    }

    getCell(index){
        return this.cells[index]
    }

    getCellType(index){
        return this.cells[index].type
    }

    getCellState(index){
        return this.cells[index].state
    }
}


export default GridController


