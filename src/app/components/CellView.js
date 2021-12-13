import React from 'react';

export default class CellView extends React.Component {

      constructor(props){
            super(props)
 
            this.onRevealedCell=this.props.onRevealedCell
            this.flagCell=this.props.flagCell

            this.onFlagCell=this.onFlagCell.bind(this)
            this.mouseDownHandler=this.mouseDownHandler.bind(this)  
      }

      onFlagCell(){
            this.flagCell(this.id)
      }

      mouseDownHandler( event ) {
            if( event.button ===0 ) {
                  this.onRevealedCell(this.id, this.type);
            }
            if( event.button ===2 ) {
                  event.preventDefault()
                  this.flagCell(this.id)
            }
      }     
 
      render(){  
            
            this.id=this.props.cellData.id
            this.type=this.props.cellData.type
            this.imgContent=this.props.cellData.content[this.props.cellData.state.toString()]
            
            return(
            <div className="cellDiv" onMouseDown={this.mouseDownHandler} onContextMenu={(e)=> e.preventDefault()}> 
                <img className="cell" 
                     src={this.imgContent}
                     alt={"cell" + this.type} />
            </div>)
      }
}