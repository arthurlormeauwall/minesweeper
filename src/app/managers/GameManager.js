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
    this.state={grid : this.gridManager.getData(), gameState: this.gameState}

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
    this.setState({grid:this.gridManager.getData(), gameState:this.gameState})
  }


onNewRevealedCell(index, type){
  let cellIndexToReveal=[]
  cellIndexToReveal= this.gridManager.getCellsToReveal(index)

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


  setCellState(index,state){
    this.gridManager.cells[index].state=state
    this.gameState.state= 'isPlaying'
    
    
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
    this.gameState.score.result='You win'
    this.setState(({grid : this.gridManager.getData(), gameState : this.gameState}))
  }

  youLoose(){
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
       remainingBomb:remainingBomb
     })
  }

  render(){
      return (<AppView
                    onRevealedCell={this.onNewRevealedCell} 
                    flagCell={this.flagCell}
                    chooseLevel={this.chooseLevel}
                    cells={this.state.grid.cells}
                    size={this.state.grid.size}
                    gameState={this.state.gameState}  
                  />
    )
  }
}

