import './App.scss';
import '../scss/custom.scss'
import Cell from "./grid/Cell"
import { designRessource } from './designRessource';
function App() {
  

  return (
    <div>
      <Cell id={0}
            srcHidden = {designRessource.cellHidden} 
            srcRevealed = {designRessource.cell1} 
            content={"cell1"}
            updateGame={(content)=>{console.log("cell is a "+content)}}
            />
    </div> 
  )
}

export default App;
