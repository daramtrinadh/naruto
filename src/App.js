import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Characters from './components/Characters'
import CharacterItemDetails from "./components/CharacterItemDetails";

const App=()=>(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/characters" element={<Characters/>}/>
      <Route path="/character/:id" element={<CharacterItemDetails/>}/>
    </Routes>
  </Router>
)
export default App