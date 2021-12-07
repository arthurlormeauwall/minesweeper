import React from 'react';

import '../../scss/App.scss';
import '../../scss/custom.scss'
import gameData from '../data/gameData'
import gridGenerator from './GridGenerator'
import Grid from '../components/GridView'

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state=gameData
    this.newGrid=this.newGrid.bind(this)
    this.onNewRevealedCell=this.onNewRevealedCell.bind(this)
  }

  newGrid(newSize){
    gameData = {size: newSize, grid : gridGenerator(newSize)} 
    this.setState(gameData)
  }

  onNewRevealedCell(content){
    console.log(content+" has been display")
  }


  render(){
      return (<div id='AppDiv'>
                  <Grid gridData={this.state.grid}
                    size={this.state.size}
                    onRevealedCell={this.onNewRevealedCell}
                  />
        </div>
    )
  }
}

