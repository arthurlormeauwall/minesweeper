import React from 'react';

import '../../scss/App.scss';
import '../../scss/custom.scss'

import generateNewGrid from './generateNewGrid'
import GridView from '../components/GridView'
import LevelChoiceView from '../components/LevelChoiceView';
import Levels from '../data/Levels'
import GridManager from './gridManager';


export default class App extends React.Component{
  constructor(props){
    super(props)

    this.gameManager = generateNewGrid(Levels[0])
    this.state=this.gameManager.getData()

    this.newGrid=this.newGrid.bind(this)
    this.onNewRevealedCell=this.onNewRevealedCell.bind(this)
    this.chooseLevel=this.chooseLevel.bind(this)
    
    this.count=0
  }

  newGrid(level){
    this.gameManager = generateNewGrid(level)
    this.count++
    this.setState(this.gameManager.getData())
    
  }


onNewRevealedCell(index, type){
  let cellIndexToReveal=[]
  cellIndexToReveal= this.gameManager.getCellsToReveal(index)

  for (let i=0;i<cellIndexToReveal.length;i++){
    this.setCellState(cellIndexToReveal[i], 'revealedCell')
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

