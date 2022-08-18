import logo from './logo.svg';
import './App.css';
import Calculator from './components/Calculator';
import CalculatorProvider from './components/Calculator/resources/CalculatorContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CalculatorProvider>
          <Calculator />
        </CalculatorProvider>
      </header>
    </div>
  );
}

export default App;
