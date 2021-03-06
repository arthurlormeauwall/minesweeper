import React from 'react';
import levels from "../entities/Levels"

export default class LevelChoiceView extends React.Component {
      constructor(props){
            super(props)
            this.levelChosen=props.levelChosen
            this.onLevelChosen= this.onLevelChosen.bind(this)
      }

      onLevelChosen(event){
        this.levelChosen(event.currentTarget.id)
      }

      render(){       
            return(
                  <div className="LevelChoice">
                  {
                        levels.map((level,i)=>{return(<button id={i} onClick={this.onLevelChosen} key={i}>{level.name} </button>)})
                  }
                  </div>
           )
        }
}