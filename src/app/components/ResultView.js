import React from 'react';

const ResultView=(props)=>{
  let gameState=props.gameState
  let content={}

  if (gameState.state==='beforeGame'){
    content= <h3>Ready?</h3>
  }
  else if (gameState.state==='isPlaying'){
    content=<h3>Find them all !!! </h3>
  }
  else{
    if (gameState.score.result==='You win'){
      content= 
        <React.Fragment>
        <h3> {gameState.score.result} !!! </h3>
        You found all the {gameState.score.bombFound} bomb(s) in {gameState.score.tick} seconds ! Congratulation :)
        </React.Fragment>
    }
    else{
      content= 
      <React.Fragment>
      <h3> {gameState.score.result} !!! </h3>
           
              <p>You found {gameState.score.bombFound} bomb(s)</p> 
              <p>There are {gameState.score.remainingBomb} bomb(s) unfound</p> 
              <p>There are {gameState.score.wrongFlag} wrong flag(s) </p> 
         
      </React.Fragment>
    }   
  }
  return(
    <div className="resultDiv">{content}</div>
    
  )
}
export default ResultView