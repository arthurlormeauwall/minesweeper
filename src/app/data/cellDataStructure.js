import { designRessource } from '../data/designRessource';

export const cellData=(index, type)=>{
    let gameOver=type+'GO'
    return({ 
    id : index,
    type: type,
    content : { hiddenCell : designRessource['cellHidden'],
                flaggedCell: designRessource['cellFlag'],
                revealedCell : designRessource[type],
                gameOver : designRessource[type+'GO']
              },
    state : 'hiddenCell'
    })      
}