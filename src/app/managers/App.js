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

    const gameData = GridFactory(Levels[0])
    this.state=gameData.getData()

    this.newGrid=this.newGrid.bind(this)
    this.onNewRevealedCell=this.onNewRevealedCell.bind(this)
    this.chooseLevel=this.chooseLevel.bind(this)
    
    this.count=0

  }

  newGrid(level){
    const gameData = GridFactory(level)
  
    this.count++
    this.setState(gameData.getData())
    
  }

  onNewRevealedCell(id, type){
    this.setCellState(id, 'revealedCell')
  }

  chooseLevel(content){
        this.newGrid(Levels[content])
  }

  setCellState(id,state){
    const gameData=this.state
    gameData.cells[id].state=state
    this.setState(gameData)
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

