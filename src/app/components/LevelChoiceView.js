import React from 'react';
import PropTypes from 'prop-types';

export default class LevelChoiceView extends React.Component {

      constructor(props){
            super(props)
            this.levelChosen=props.levelChosen
            this.onLevelChosen= this.onLevelChosen.bind(this)
      }


      static propTypes = {

      }

      static defaultProps={
         
      }

      onLevelChosen(event){
        this.levelChosen(event.currentTarget.id)
      }
      render(){  
            return(
                <div className="LevelChoice">
                     <button id="hard" onClick={this.onLevelChosen}>hard</button>
                     <button id="veryHard" onClick={this.onLevelChosen}>Very Hard</button>
                     <button id="impossible" onClick={this.onLevelChosen}>Impossible</button>
            </div>
           )
        }
}