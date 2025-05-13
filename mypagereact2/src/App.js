import './CSS/App.css';
import competitors from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import Info from './components/Info.js';
import Header from './components/Header.js';
import { useEffect, useMemo, useRef, useState } from "react";
function App() {
    const [currData, updateCurData]= useState(competitors);
 return (
 <div className="App">
    <Header />
    <Info />
 <h3>Результаты первого раунда дисциплины кубик Рубика 3х3</h3>
 
 <Table data={ competitors } amountRows="10" updateCurData={updateCurData}/>
 <Chart data={ currData } />
 </div>
 );
}
export default App;
