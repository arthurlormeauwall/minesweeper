import React from 'react';

const TimerView = (props)=>{
    let tick=props.tick
    return (<div id='TimerDiv'>
      {tick}
      </div>
    )
  }

export default TimerView