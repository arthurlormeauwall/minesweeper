import React from 'react';

import gridFactory from './gridFactory'
import Levels from '../data/Levels'
import AppView from '../components/AppView';
import { designRessource } from '../data/designRessource';



export default class GameManager extends React.Component{
  constructor(props){
    super(props)

    this.gridManager = gridFactory(Levels[0])
    this.gameState={state:'beforeGame'}
    this.tick=0
    this.state={grid : this.gridManager.getData(), gameState: this.gameState, tick:this.tick}
  
    this.newGrid=this.newGrid.bind(this)
    this.onNewRevealedCell=this.onNewRevealedCell.bind(this)
    this.flagCell=this.flagCell.bind(this)
    this.chooseLevel=this.chooseLevel.bind(this)

  }

  chooseLevel(content){
    this.newGrid(Levels[content])
  }


  newGrid(level){
    this.gridManager = gridFactory(level)
    this.gameState={state: 'beforeGame'}
    this.killTimer()
    this.tick=0
    this.setState({grid:this.gridManager.getData(), gameState:this.gameState, tick:this.tick})
  }


  onNewRevealedCell(index, type){
    let cellIndexToReveal=[]
    cellIndexToReveal= this.gridManager.getCellsToReveal(index)
    if (this.gameState.state=='beforeGame'){
      this.gameState.state= 'isPlaying'
      this.launchTimer()
    }
    for (let i=0;i<cellIndexToReveal.length;i++){
      if(this.gridManager.cells[cellIndexToReveal[i]].state==='hiddenCell'){
        this.setCellState(cellIndexToReveal[i], 'revealedCell')
      } 
    }
    if(type==='bomb'){
      this.aBombHasBeenfound(index)
    }
  
  }

  aBombHasBeenfound(index){
    this.gameState.score= this.gameOver()
    
    this.gridManager.cells[index].content.gameOver=designRessource['bombExplode']
    this.youLoose()
  }

  flagCell(index){
      if (this.gridManager.cells[index].state==='flaggedCell'){
        this.setCellState(index, 'hiddenCell')
      }
      else if (this.gridManager.cells[index].state==='hiddenCell'){
        this.setCellState(index, 'flaggedCell')
      }
  }

  launchTimer(){
    this.timer=setInterval(()=>{
      this.tick++
      this.setState({grid:this.gridManager.getData(), gameState:this.gameState, tick:this.tick})
    }, 1000)
  }

  killTimer(){
    clearInterval(this.timer)
  }

  setCellState(index,state){
    this.gridManager.cells[index].state=state
   
    
    this.setState({grid:this.gridManager.getData(), gameState:this.gameState})

    if (this.gridManager.numberOfHiddenCell()==0){
      this.gameState.score=this.gameOver()
      if (this.gameState.score.remainingBomb!=0 || this.gameState.score.wrongFlag !=0){
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

  gameOver(index){
    this.gameState.state='gameOver'
    let wrongFlag=0
    let bombFound=0
    let remainingBomb=0
    
      this.gridManager.cells.forEach(cell => {
            if(cell.state=='flaggedCell'){
              if(cell.type=='bomb'){
                cell.state='gameOver'
                cell.content.gameOver=designRessource['bombFound']
                bombFound++
              }
              else{
                cell.state='gameOver'
                cell.content.gameOver=designRessource['wrongFlag']
                wrongFlag++
              }
            }
            else{
              cell.state='gameOver'
              if (cell.type=='bomb'){
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

