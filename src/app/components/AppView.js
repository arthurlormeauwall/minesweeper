import React from 'react';
import GridView from '../components/GridView'
import LevelChoiceView from '../components/LevelChoiceView';
import ResultView from './ResultView';

import '../../scss/App.scss';
import '../../scss/custom.scss'

export default class AppView extends React.Component{
    constructor(props){
      super(props)
        
    }
    render(){
        this.chooseLevel=this.props.chooseLevel
        this.cells=this.props.cells
        this.size=this.props.size
        this.onNewRevealedCell=this.props.onRevealedCell
        this.flagCell=this.props.flagCell
        this.gameState=this.props.gameState

        return (<div id='AppDiv'>
                    <LevelChoiceView levelChosen={this.chooseLevel}/>
                    <GridView cells={this.cells}
                      size={this.size}
                      onRevealedCell={this.onNewRevealedCell} 
                      flagCell={this.flagCell}
                    />
                    <ResultView gameState={this.gameState}/>
          </div>
      )
    }
  }