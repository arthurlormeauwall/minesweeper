import React from 'react';

import gridFactory from './gridFactory'
import Levels from '../entities/Levels'
import AppView from '../components/AppView';
import display from '../entities/display';



export default class GameManager extends React.Component{
  constructor(props){
    super(props)

    this.gridController = gridFactory(Levels[0])

    this.gameState={state:'beforeGame'}
    this.tick=0
    this.state={grid : this.gridController.getData(), gameState: this.gameState, tick:this.tick}
  
    this.newGrid=this.newGame.bind(this)
    this.onNewRevealedCell=this.onNewRevealedCell.bind(this)
    this.flagCell=this.flagCell.bind(this)
    this.chooseLevel=this.chooseLevel.bind(this)
  }

  chooseLevel(content){
    this.newGame(Levels[content])
  }

  newGame(level){
    this.gridController = gridFactory(level)
    this.gameState={state: 'beforeGame'}
    this.killTimer()
    this.tick=0
    this.setState({grid:this.gridController.getData(), gameState:this.gameState, tick:this.tick})
  }

  startGame(){
    this.gameState.state= 'isPlaying'
    this.launchTimer()
  }

  checkIfFirstMove(){
    if (this.gameState.state==='beforeGame'){
      this.startGame()
    }
  }

  onNewRevealedCell(revealedCellIndex, type){

      this.checkIfFirstMove()

      if (this.gameState.state!=='gameOver'){
        if (this.getCellState(revealedCellIndex)!=='flaggedCell'){
          if(type==='bomb'){
            this.bombHasBeenfound(revealedCellIndex)
          }
          else{
            this.gridController.revealCellsOnNewRevealedCell(revealedCellIndex)
            this.setStateFromGridData()
          } 
        }
    } 
  }

  bombHasBeenfound(index){
    this.gameState.score= this.getGameStats()
    this.gridController.cells[index].content.gameOver=display['bombExplode']
    this.endGame()
    this.youLoose()
  }

  flagCell(index){
      if (this.getCellState(index)==='flaggedCell'){
        this.gridController.setCellState(index, 'hiddenCell')
      }
      else if (this.getCellState(index)==='hiddenCell'){
        this.gridController.setCellState(index, 'flaggedCell')
      }
      this.setStateFromGridData()
  }

  launchTimer(){
    this.timer=setInterval(()=>{
                this.tick++
                this.setState({grid:this.gridController.getData(), gameState:this.gameState, tick:this.tick})},
                1000)
  }

  killTimer(){
    clearInterval(this.timer)
  }

  setStateFromGridData(){
    this.setState({grid:this.gridController.getData(), gameState:this.gameState})
    this.checkIfThisIsEndGame()
  }

  checkIfThisIsEndGame(){
    if (this.gridController.numberOfHiddenCell()===0){
      this.gameState.score=this.getGameStats()
      this.endGame()
      this.endGameCheckingScore()
    }
  }

  youWin(){
    this.killTimer()
    this.gameState.score.result='You win'
    this.setState(({grid : this.gridController.getData(), gameState : this.gameState}))
  }

  youLoose(){
    this.killTimer()
    this.gameState.score.result='You loose'
    this.setState(({grid : this.gridController.getData(), gameState : this.gameState}))
  }

  setCellsToGameOverState(){
    this.gridController.applyToAllCells((cell)=>{
      return ({...cell, state:'gameOver'})
    })
  }

  endGame(){
    this.gameState.state='gameOver'
    this.setCellsToGameOverState()
  }

  endGameCheckingScore(){
    if (this.gameState.score.remainingBomb!==0 || this.gameState.score.wrongFlag !==0){
      this.youLoose()
    }
    else{
      this.youWin()
    }
  }

  getGameStats(){
    let wrongFlag=0
    let bombFound=0
    let remainingBomb=0
  
    this.gridController.cells.forEach(cell => {
          if(cell.state==='flaggedCell'){
            if(cell.type==='bomb'){
              cell.content.gameOver=display['bombFound']
              bombFound++
            }
            else{
              cell.content.gameOver=display['wrongFlag']
              wrongFlag++
            }
          }
          else{
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
    return this.gridController.getCellState(index)
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

