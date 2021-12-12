import React from 'react';


export default class AppView extends React.Component{
    constructor(props){
      super(props)  
    }

    render(){
  
        this.tick=this.props.tick
        return (<div id='TimerDiv'>
          {this.tick}
          </div>
      )
    }
  }