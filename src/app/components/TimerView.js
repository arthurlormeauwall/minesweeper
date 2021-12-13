import React from 'react';

const TimerView = (props)=>{
    let tick=props.tick
    return (<div className='timerDiv'>
      TIME : {tick}
      </div>
    )
  }

export default TimerView