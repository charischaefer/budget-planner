
import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Transactions from './components/Transactions';
import Categories from './components/Categories';

function App() {
 

  return (
    
      <div>

        <h1>Buget-planner</h1>

        <Routes>
          <Route path="/" element= {<Login/>} />
          <Route path="/home" element= {<Home/>} />
          <Route path="/home/transaction" element= {<Transactions/>} />
          <Route path= "/home/categories" element= {<Categories/>} />

          
        </Routes>
      </div>
      
  );
}

export default App;
