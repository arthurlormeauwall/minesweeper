import React from 'react';


export default class ResultView extends React.Component {

      constructor(props){
            super(props)
      }

      render(){  
          this.gameState=this.props.gameState


          if (this.gameState.state=='beforeGame'){
            this.content=<h3>Ready?</h3>
          }
          else if (this.gameState.state=='isPlaying'){
            this.content=<h3>Find them all !!! </h3>
          }
          else{
            this.content= <div className="result">
            <h3> {this.gameState.score.result} !!! </h3>
            <ul> 
                <li>You found {this.gameState.score.bombFound} bomb(s) </li>
                <li>There are {this.gameState.score.remainingBomb} bomb(s) unfound</li>
                <li>There are {this.gameState.score.wrongFlag} wrong flag(s) </li>
            </ul>
        </div>
          }
    
            return(
               this.content
           )
        }
}