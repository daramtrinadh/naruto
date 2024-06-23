import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/Home";

import Characters from './components/Characters'
import CharacterItemDetails from "./components/CharacterItemDetails";

import Akatsuki from './components/Akatsuki'
import AkatsukiItemDetails from "./components/AkatsukiItemDetails";

import TailedBeasts from './components/TailedBeasts'
import TailedBeastDetails from './components/TailedBeastDetails'

const App=()=>(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/characters" element={<Characters/>}/>
      <Route path="/character/:id" element={<CharacterItemDetails/>}/>
      <Route path="/akatsuki" element={<Akatsuki/>}/>
      <Route path='/akatsuki/:id' element={<AkatsukiItemDetails/>}/>
      <Route path='/tailedbeasts' element={<TailedBeasts/>}/>
      <Route path='/tailedbeast/:id' element={<TailedBeastDetails/>}/>
    </Routes>
  </Router>
)
export default App