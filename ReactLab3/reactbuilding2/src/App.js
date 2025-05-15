import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { useEffect, useMemo, useRef, useState } from "react";

function App() {
    const [currData, updateCurData]= useState(buildings);
 return (
 <div className="App">
 <h3>Самые высокие здания и сооружения</h3>
 <Chart data={ currData } />
 <Table data={ buildings } amountRows="10" updateCurData={updateCurData}/>
 </div>
 );
}
export default App;
