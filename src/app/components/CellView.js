import React from 'react';
import PropTypes from 'prop-types';


export default class CellView extends React.Component {

      constructor(props){
            super(props)
                        this.id=this.props.id
            this.srcHidden=this.props.srcHidden
            this.srcRevealed=this.props.srcRevealed
            this.onRevealedCell=this.props.onRevealedCell
            this.content=this.props.content


            this.onChange=this.onChange.bind(this)
            this.reveal=this.reveal.bind(this)
            this.hide=this.hide.bind(this)

            this.props.isRevealed? this.state={imgContent : this.srcRevealed} : this.state={imgContent : this.srcHidden}
           
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
      
      onChange(){
            this.onRevealedCell(this.id, this.content)
            this.reveal();
      }

      reveal(){
            this.setState({imgContent : this.srcRevealed})
      }

      hide(){
            this.setState({imgContent : this.srcHidden})
      }

      render(){  

           
            console.log(this.isRevealed)

            this.imgContent=this.state.imgContent
            
            return(
            <div className="cell" onClick={this.onChange}> 
                <img className="cellRevealed" 
                     src={this.imgContent}
                     alt={"revealed cell" + this.content} />
            </div>)
      }
}