
import './App.css';
import AddJobSchedule from './components/AddJobSchedule';
import JobSchedule from './components/JobSchedule';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import EditProduct from './components/EditProduct';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<JobSchedule/>} />
      <Route exact path="/add" element={<AddJobSchedule/>} />
      
      </Routes>
      {/* <Route exact path="/edit/:id">
          <EditProduct/>
      </Route>  */}
    </Router>
  );
}

export default App;