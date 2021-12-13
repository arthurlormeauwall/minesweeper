import display from './display';

export const cellData=(index, type)=>{

    return({ 
    id : index,
    type: type,
    content : { hiddenCell : display['cellHidden'],
                flaggedCell: display['cellFlag'],
                revealedCell : display[type],
                gameOver : display[type+'GO']
              },
    state : 'hiddenCell'
    })      
}
export const interCellData = (index,type)=>{
  return({
      index:index,
      type:type,
      count : (type==='bomb')? NaN:0
  })
}