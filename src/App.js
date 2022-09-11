import './App.css';
import {Home} from './components/Home';
import {Department} from './components/Department';
import {Employee} from './components/Employee';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
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
