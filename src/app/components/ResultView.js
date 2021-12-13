import React from 'react';

const ResultView=(props)=>{
  let gameState=props.gameState
  let content={}

  if (gameState.state==='beforeGame'){
    content=<h3>Ready?</h3>
  }
  else if (gameState.state==='isPlaying'){
    content=<h3>Find them all !!! </h3>
  }
  else{
    if (gameState.score.result==='You win'){
      content= <div className="result">
        <h3> {gameState.score.result} !!! </h3>
        You found all the {gameState.score.bombFound} bomb(s) in {gameState.score.tick} seconds ! Congratulation :)
      </div>
    }
    else{
      content= <div className="result">
        <h3> {gameState.score.result} !!! </h3>
          <ul> 
              <li>You found {gameState.score.bombFound} bomb(s) </li>
              <li>There are {gameState.score.remainingBomb} bomb(s) unfound</li>
              <li>There are {gameState.score.wrongFlag} wrong flag(s) </li>
          </ul>
      </div>
    }   
  }
  return(
    content
  )
}
export default ResultView