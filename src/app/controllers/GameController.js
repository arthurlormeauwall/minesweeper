import React from 'react';

import gridFactory from './gridFactory'
import Levels from '../entities/Levels'
import AppView from '../components/AppView';
import display from '../entities/display';



export default class GameManager extends React.Component{
  constructor(props){
    super(props)

    this.gridManager = gridFactory(Levels[0])

    this.gameState={state:'beforeGame'}
    this.tick=0
    this.state={grid : this.gridManager.getData(), gameState: this.gameState, tick:this.tick}
  
    this.newGrid=this.newGame.bind(this)
    this.onNewRevealedCell=this.onNewRevealedCell.bind(this)
    this.flagCell=this.flagCell.bind(this)
    this.chooseLevel=this.chooseLevel.bind(this)
  }

  chooseLevel(content){
    this.newGame(Levels[content])
  }

  newGame(level){
    this.gridManager = gridFactory(level)
    this.gameState={state: 'beforeGame'}
    this.killTimer()
    this.tick=0
    this.setState({grid:this.gridManager.getData(), gameState:this.gameState, tick:this.tick})
  }

  startGame(){
    this.gameState.state= 'isPlaying'
    this.launchTimer()
  }

  onNewRevealedCell(revealedCellIndex, type){
    let cellIndexToReveal=this.gridManager.getCellsToReveal(revealedCellIndex)

    if (this.gameState.state==='beforeGame'){
      this.startGame()
    }

    if (this.getCellState(revealedCellIndex)!=='flaggedCell'){
      cellIndexToReveal.forEach(index=>{
        if(this.getCellState(index)==='hiddenCell'){
          this.setStateCell(index, 'revealedCell')       
        } 
      })
      if(type==='bomb'){
        this.bombHasBeenfound(revealedCellIndex)
      } 
    }  
  }

  bombHasBeenfound(index){
    this.gameState.score= this.endGameAndGetScore()
    
    this.gridManager.cells[index].content.gameOver=display['bombExplode']
    this.youLoose()
  }

  flagCell(index){
      if (this.getCellState(index)==='flaggedCell'){
        this.setStateCell(index, 'hiddenCell')
      }
      else if (this.getCellState(index)==='hiddenCell'){
        this.setStateCell(index, 'flaggedCell')
      }
  }

  launchTimer(){
    this.timer=setInterval(()=>{
                this.tick++
                this.setState({grid:this.gridManager.getData(), gameState:this.gameState, tick:this.tick})},
                1000)
  }

  killTimer(){
    clearInterval(this.timer)
  }

  setStateCell(index,state){
    this.gridManager.cells[index].state=state
    
    this.setState({grid:this.gridManager.getData(), gameState:this.gameState})

    if (this.gridManager.numberOfHiddenCell()===0){
      this.gameState.score=this.endGameAndGetScore()
      if (this.gameState.score.remainingBomb!==0 || this.gameState.score.wrongFlag !==0){
        this.youLoose()
      }
      else{
        this.youWin()
      }
    }
  }

  youWin(){
    this.killTimer()
    this.gameState.score.result='You win'
    this.setState(({grid : this.gridManager.getData(), gameState : this.gameState}))
  }

  youLoose(){
    this.killTimer()
    this.gameState.score.result='You loose'
    this.setState(({grid : this.gridManager.getData(), gameState : this.gameState}))
  }

  endGameAndGetScore(index){
    this.gameState.state='gameOver'
    let wrongFlag=0
    let bombFound=0
    let remainingBomb=0
    
      this.gridManager.cells.forEach(cell => {
            if(cell.state==='flaggedCell'){
              if(cell.type==='bomb'){
                cell.state='gameOver'
                cell.content.gameOver=display['bombFound']
                bombFound++
              }
              else{
                cell.state='gameOver'
                cell.content.gameOver=display['wrongFlag']
                wrongFlag++
              }
            }
            else{
              cell.state='gameOver'
              if (cell.type==='bomb'){
                remainingBomb++
              }
            }
     });
     return ({
       wrongFlag:wrongFlag,
       bombFound:bombFound,
       remainingBomb:remainingBomb,
       tick:this.tick
     })
  }

  getCellState(index){
    return this.gridManager.getCellState(index)
  }

  render(){
      return (<AppView
                    onRevealedCell={this.onNewRevealedCell} 
                    flagCell={this.flagCell}
                    chooseLevel={this.chooseLevel}
                    tick={this.state.tick}
                    cells={this.state.grid.cells}
                    size={this.state.grid.size}
                    gameState={this.state.gameState}   
                  />
    )
  }
}

