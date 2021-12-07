import React from 'react';
import PropTypes from 'prop-types';


export default class CellView extends React.Component {

      constructor(props){
            super(props)

            console.log("cell : "+props.id+" has been constructed")
            this.id=props.id
            this.srcHidden=props.srcHidden
            this.srcRevealed=props.srcRevealed
            this.onRevealedCell=props.onRevealedCell

            this.content=props.content


            this.reveal=this.reveal.bind(this)
            this.state = {
                  imgContent : this.srcHidden
            }     
      }

      static propTypes = {
            id : PropTypes.number,
            srcHidden : PropTypes.string,
            srcRevealed : PropTypes.string,
            onRevealedCell : PropTypes.func,
            content : PropTypes.string
      }

      static defaultProps={
            id : 0,
            onRevealedCell :f=>f,
            content : "Cell not define"
      }
      
      reveal(){
            this.onRevealedCell(this.content)
            this.setState({ imgContent : this.srcRevealed})
      }

      render(){  
          
            return(
            <div className="cell" onClick={this.reveal}> 
                <img className="cellRevealed" 
                     src={this.state.imgContent}
                     alt={"revealed cell" + this.content} />
            </div>)
      }
}