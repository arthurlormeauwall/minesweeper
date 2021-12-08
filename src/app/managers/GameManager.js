import gridGenerator from './GridGenerator'
import GridView from '../components/GridView'

class GameManager { 
    constructor(size){
         size==null || size===0 ? this.size=2 : this.size=size
    }

    onNewRevealedCell(cellContent){
        console.log(cellContent)
    }
    
    setSize(size){
        this.size=size
    }

    getGridView(){
        return (
            <GridView   tableData={gridGenerator()}
            size={this.size}
            onRevealedCell={this.onNewRevealedCell}
            />
        )
    }
}

export default GameManager