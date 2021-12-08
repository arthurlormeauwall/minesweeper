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

    const gameData = {size :Levels[0].size, grid : gridGenerator(Levels[0]), reset : true} 
    this.state=gameData

    this.newGrid=this.newGrid.bind(this)
    this.onNewRevealedCell=this.onNewRevealedCell.bind(this)
    this.chooseLevel=this.chooseLevel.bind(this)
    this.revealCell=this.revealCell.bind(this)
    this.count=0

  }

  newGrid(level){
    const gameData = {size: level.size, grid : gridGenerator(level)} 
    this.count++
    this.setState(gameData)
    
  }

  onNewRevealedCell(id, content){
    console.log(content+" has been display")
  }

  chooseLevel(content){
        this.newGrid(Levels[content])
  }

  revealCell(id){
    const gameData=this.state
    gameData.grid[id].revealed=true
    this.setState(gameData)
  }


  render(){
      return (<div id='AppDiv'>
                  <LevelChoiceView levelChosen={this.chooseLevel}/>
                  <Grid gridData={this.state.grid}
                    size={this.state.size}
                    onRevealedCell={this.onNewRevealedCell} 
                    key={this.count}
                  />
        </div>
    )
  }
}

