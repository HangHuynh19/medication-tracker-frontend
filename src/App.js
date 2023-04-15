import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header.js';
import IntakeDetails from './components/IntakeDetails/IntakeDetails';

function App() {
  return (
    <div className='App'>
      <Header></Header>
      <IntakeDetails></IntakeDetails>
      <IntakeDetails></IntakeDetails>
      <IntakeDetails></IntakeDetails>
    </div>
  );
}

export default App;
