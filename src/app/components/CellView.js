import React from 'react';
import PropTypes from 'prop-types';


export default class CellView extends React.Component {

      constructor(props){
            super(props)
            
            this.id=this.props.cellData.id
            // console.log(this.props.cellData)
            
            this.onRevealedCell=this.props.onRevealedCell

            this.type=this.props.cellData.type

            this.onChange=this.onChange.bind(this)
           
      }
      
      onChange(){
            this.onRevealedCell(this.id, this.type)
      }

 
      render(){  

            this.imgContent=this.props.cellData.content[this.props.cellData.state.toString()]
            return(
            <div className="cellDiv" onClick={this.onChange}> 
                <img className="cell" 
                     src={this.imgContent}
                     alt={"cell" + this.type} />
            </div>)
      }
}