import './CSS/App.css';
import competitors from './data.js';
import Table from './components/Table.js';
import Info from './components/Info.js';
import Header from './components/Header.js';
function App() {
 return (
 <div className="App">
 <Header />
    <Info />
 <h3>Результаты первого раунда дисциплины кубик Рубика 3х3</h3>
 <Table data={ competitors } amountRows="10" />
 </div>
 );
}
export default App;
