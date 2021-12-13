import React from 'react';
import GridView from './GridView'
import LevelChoiceView from './LevelChoiceView';
import ResultView from './ResultView';
import TimerViews from './TimerView';
import Contact from './Contact'

import '../../scss/style.scss'

const AppView=(props)=>{
  let chooseLevel=props.chooseLevel
  let cells=props.cells
  let size=props.size
  let onNewRevealedCell=props.onRevealedCell
  let flagCell=props.flagCell
  let gameState=props.gameState
  let tick=props.tick

  return (<div id='AppDiv'>
              <LevelChoiceView levelChosen={chooseLevel}/>
              <TimerViews tick={tick}/>
              <GridView cells={cells}
                        size={size}
                        onRevealedCell={onNewRevealedCell} 
                        flagCell={flagCell}
              />
              <ResultView gameState={gameState}/>
              <Contact/>
    </div>
  )
}

export default  AppView
