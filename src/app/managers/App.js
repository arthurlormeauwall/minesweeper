import React from 'react';

import '../../scss/App.scss';
import '../../scss/custom.scss'

import gridGenerator from './GridGenerator'
import Grid from '../components/GridView'
import LevelChoiceView from '../components/LevelChoiceView';
import Levels from '../data/Levels'


export default class App extends React.Component{
  constructor(props){
    super(props)

    const gameData = gridGenerator(Levels[0])
    
    
    this.state=gameData

    this.newGrid=this.newGrid.bind(this)
    this.onNewRevealedCell=this.onNewRevealedCell.bind(this)
    this.chooseLevel=this.chooseLevel.bind(this)
    
    this.count=0

  }

  newGrid(level){
    const gameData =  gridGenerator(level) 
    this.count++
    this.setState(gameData)
    
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
       
                  <Grid grid={this.state.cells}
                    size={this.state.size}
                    onRevealedCell={this.onNewRevealedCell} 
                    key={this.count}
                  />
        </div>
    )
  }
}

