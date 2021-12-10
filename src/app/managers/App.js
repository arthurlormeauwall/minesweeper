import React from 'react';

import '../../scss/App.scss';
import '../../scss/custom.scss'

import GridFactory from './gridFactory'
import GridView from '../components/GridView'
import LevelChoiceView from '../components/LevelChoiceView';
import Levels from '../data/Levels'


export default class App extends React.Component{
  constructor(props){
    super(props)

    this.gameData = GridFactory(Levels[0])
    this.state=this.gameData.getData()

    this.newGrid=this.newGrid.bind(this)
    this.onNewRevealedCell=this.onNewRevealedCell.bind(this)
    this.chooseLevel=this.chooseLevel.bind(this)
    
    this.count=0

  }

  newGrid(level){
    this.gameData = GridFactory(level)
  
    this.count++
    this.setState(this.gameData.getData())
    
  }

  
  getNeighborIndex(index){

    let cellIndexToReveal=[]
    function getId(cell){
      return cell.id
    }
 
    cellIndexToReveal = this.gameData.applyToAllLegalNeighborsAndReturn(index, getId)
    return cellIndexToReveal
}

onNewRevealedCell(index, type){
  let cellIndexToReveal=[]
  cellIndexToReveal= this.getCellsToReveal(index)

  for (let i=0;i<cellIndexToReveal.length;i++){
    this.setCellState(cellIndexToReveal[i], 'revealedCell')
  }
}

  getCellsToReveal(index){

    let linkedEmptyCell=[]
    let cellToReveal=[]

    linkedEmptyCell.push(index)
    linkedEmptyCell= this.findLinkedEmptyCell(linkedEmptyCell, 1)
    cellToReveal.push(...linkedEmptyCell)

    for (let i=1;i<linkedEmptyCell.length;i++){
      cellToReveal.push(...this.getNeighborIndex(linkedEmptyCell[i]))
    }

    return  cellToReveal
  }

  findLinkedEmptyCell(emptyCellIndex, numberToSearch){
      let count=0
      let indexReference=emptyCellIndex.length-1

      for (let i=0;i<numberToSearch;i++){   
        
        let cellIndexToSearch=emptyCellIndex[indexReference-i]
      
        if (this.gameData.cells[cellIndexToSearch].type==='cellEmpty'){
        
        let neighbors=this.getNeighborIndex(cellIndexToSearch);
        console.log(neighbors)
        let previewsLenght=emptyCellIndex.length
        this.addAllEmptyCellsDirectlyConnected(neighbors, emptyCellIndex)
        count=emptyCellIndex.length-previewsLenght     

        }
        emptyCellIndex = this.findLinkedEmptyCell(emptyCellIndex, count)       
      }   
      return emptyCellIndex
  }

  addAllEmptyCellsDirectlyConnected(neighbors, emptyCellIndex){ 
    let neighborsLength=neighbors.length
    for (let j=0;j<neighborsLength;j++){ // for all neighbors
        if (this.gameData.cells[neighbors[j]].type==='cellEmpty'){ // is it empty ?
          let newUnfound=true
          let emptyCellIndexLength = emptyCellIndex.length
          for (let z=0;z<emptyCellIndexLength ;z++){
            if (emptyCellIndex[z]===neighbors[j]){
              newUnfound=false
            }
          }
          if (newUnfound){
            emptyCellIndex.push(neighbors[j])
          }
        }
      }
  }

  chooseLevel(content){
        this.newGrid(Levels[content])
  }

  setCellState(id,state){
    const gameState=this.state
    gameState.cells[id].state=state
    this.setState(gameState)
  }

  render(){
      return (<div id='AppDiv'>
                  <LevelChoiceView levelChosen={this.chooseLevel}/>
       
                  <GridView cells={this.state.cells}
                    size={this.state.size}
                    onRevealedCell={this.onNewRevealedCell} 
                    key={this.count}
                  />
        </div>
    )
  }
}

