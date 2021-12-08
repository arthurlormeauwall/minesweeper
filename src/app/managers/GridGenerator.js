import { designRessource } from '../data/designRessource';

const cellData=(content, id)=>{
    return({ 
    'id' : id,
    'imgHiddenCell' : designRessource['cellHidden'],
    'imgRevealedCell' : designRessource[content], 
    'content' : content,
    'revealed' : false
    })      
}

function GridGenerator (level) {
   
    const data=[]
    const size=level.size
    const difficulty=level.difficulty
    //put bomb
    for (let i=0;i<size*size;i++){
      (Math.random()*101<difficulty)? data.push(cellData('bomb', i)) : data.push(cellData('cellEmpty', i))
    }
    //fill with numbers
    for (let i=0;i<level.size*level.size;i++){
        // 4 corner cells
        if (i===0 || i===size-1 || i===(size*(size-1)) || i===(size*size)-1){

        }
        // upper line
        if (i>0 && i<(size-1)){

        }
        // leftside line
        if (i%size===0){

        }
        // rightside line
        if ((i+1)%size===0){

        }
        // bottomside line
        if (i>size*(size-1) && i<(size*size)-1){

        }

      }

    return data 
}

export default GridGenerator