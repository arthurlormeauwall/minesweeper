import getAllLinkedEmptyCells from "./getAllLinkedEmptyCells"

class GridManager{
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

    applyToAllCells(callback){
        for (let i=0;i<this.size*this.size;i++){
                this.cells[i]=callback(this.cells[i])
        }
    }

    applyToAllLegalNeighbors(index, callback){
        let legalNeighborsIndexs=this.getAllLegalNeighborIndex(index)
        
        for (let i=0;i<legalNeighborsIndexs.length;i++){
                this.cells[legalNeighborsIndexs[i]]=callback(this.cells[legalNeighborsIndexs[i]])
        }
    }

    applyToAllLegalNeighborsAndReturn(index, callback){
        let legalNeighborsIndexs=this.getAllLegalNeighborIndex(index)
        const response=[]
        for (let i=0;i<legalNeighborsIndexs.length;i++){
               response.push(callback(this.cells[legalNeighborsIndexs[i]]))
        }
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

    getCellsToReveal(index){

        let cellsToReveal=[]

        if (this.cells[index].type==='cellEmpty'){
            cellsToReveal=[...getAllLinkedEmptyCells(this, index)]
        }
        else{
            cellsToReveal.push(index)
        }
        
        return  cellsToReveal
    }
    
     

    areCoordLegal (coordXY){
        let x=coordXY[0]
        let y=coordXY[1]
        let response;
        (x<0 || x>=this.level.size || y<0 || y>=this.level.size) ? response= false : response=true
      
        return response
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
    

    getCell(id){
        return this.cells[id]
    }

    changeCellState(index, state){
        this.cells[index].state=state
    }   
}


export default GridManager


