import './App.css';
import {Home} from './components/Home';
import {Department} from './components/Department';
import {Employee} from './components/Employee';
import {Navigation} from './components/Navigation';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <h3 className='m-3 d-flex justify-content-center'>
        React js with bootstrap
      </h3>
      <h5 className='m-3 d-flex justify-content-center'>
        Employee management
      </h5>

      <Navigation></Navigation>

      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="department" element={<Department />}>
            <Route path=":teamId" />
            <Route path="new"  />
            <Route index />
          </Route>
        <Route path="/employee" element={<Employee />}>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
