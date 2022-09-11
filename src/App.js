import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {Home} from './components/Home';
import {Department} from './components/Department';
import {Employee} from './components/Employee';

function App() {
  return (
    <div className="App">
      <Home></Home>
      <Department></Department>
      <Employee></Employee>
      <h2>Merhaba</h2>
      <Button variant="primary">Tıkla</Button>
    </div>
  );
}

export default App;
