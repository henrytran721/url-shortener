import logo from './logo.svg';
import './App.css';
import {UrlShortener} from './components/UrlShortener';
import {Navigation} from './components/Navigation';
import {UrlStats} from './components/UrlStats';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Routes>
          <Route exact path='/' element={<UrlShortener />} />
          <Route exact path='/stats' element={<UrlStats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
