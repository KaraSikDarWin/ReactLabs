import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
function App() {
 return (
 <div className="App">
 <h3>Самые высокие здания и сооружения</h3>
 <Table data={ buildings } amountRows="10" />
 </div>
 );
}
export default App;
