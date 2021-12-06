import React from 'react';
import PropTypes from 'prop-types';


export default class Cell extends React.Component {

      constructor(props){
            super(props)
            this.id=props.id
            this.srcHidden=props.srcHidden
            this.srcRevealed=props.srcRevealed
            this.updateGame=props.updateGame
            this.content=props.content


            this.reveal=this.reveal.bind(this)
            this.state = {
                  "content" : this.srcHidden
            }     
      }

      static propTypes = {
            clickEvent: PropTypes.func,
            src_hidden: PropTypes.string,
            id: PropTypes.number
      }

      static defaultProps={
            clickEvent : f=>f
      }
      
      reveal(){
            this.updateGame(this.content)
            this.setState({ "content" : this.srcRevealed})
 
      }

      render(){  
            return(
            <div className="cell" onClick={this.reveal}> 
                <img className="cellRevealed" 
                              src={this.state.content}
                              alt={"revealed cell" + this.content} />
            </div>)
      }
}