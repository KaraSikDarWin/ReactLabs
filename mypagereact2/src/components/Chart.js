import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import ChartDraw from './ChartDraw';

const Chart = ({ data }) => {
  const [ox, setOx] = useState('name'); 
  const [oy, setOy] = useState([true, false, false]); 
  const [graphType, setGraphType] = useState('dotted'); 
  const [error, setError] = useState(false); 
  const [tempOy, setTempOy] = useState([false, false, false]); 


  const createArrGraph = (data, key) => {
    const groupObj = d3.group(data, (d) => d[key]);
    let arrGraph = [];

    for (let entry of groupObj) {
      let values = [];
      let minMax = d3.extent(entry[1][0]['results']);
      if (oy[1]) values.push({ value: minMax[1], type: 'max' });
      if (oy[0]) values.push({ value: minMax[0], type: 'min' }); 
      if (oy[2]) values.push({ value: entry[1][0]['avg'], type: 'avg' }); 
      arrGraph.push({ labelX: entry[0], values });
    }

    return arrGraph;
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!tempOy[0] && !tempOy[1] && !tempOy[2]) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    setOy(tempOy);
    setGraphType(event.target['graphType'].value);
  };

  
  useEffect(() => {
    if (tempOy[0] || tempOy[1] || tempOy[2]) {
      setError(false);
    }
  }, [tempOy]);

  return (
    <>
      <details>
        <summary>График</summary>
      <form onSubmit={handleSubmit}>

        <p>Значение по оси OY:</p>
        <div className={error ? 'error' : ''}>
          <input
            type="checkbox"
            name="oy"
            id="showMin"
            onChange={(e) => setTempOy([e.target.checked, tempOy[1], tempOy[2]])}
            defaultChecked={oy[0]}
          />
          Лучшее время <br />
          <input
            type="checkbox"
            name="oy"
            id="showMax"
            onChange={(e) => setTempOy([tempOy[0], e.target.checked, tempOy[2]])}
            defaultChecked={oy[1]}
          />
          Худшее время <br />
          <input
            type="checkbox"
            name="oy"
            id="showAvg"
            onChange={(e) => setTempOy([tempOy[0], tempOy[1], e.target.checked])}
            defaultChecked={oy[2]}
          />
          Среднее время
        </div>

        <p>Тип диаграммы:</p>
        <select name="graphType" defaultValue={graphType}>
          <option value="dotted">Точечная диаграмма</option>
          <option value="histogram">Гистограмма</option>
        </select>

        <p>
          <button type="submit">Построить</button>
        </p>
      </form>

      
      <ChartDraw
        data={createArrGraph(data, ox)}
        oy={oy}
        graphType={graphType}
      />
       </details>
    </>
  );
};

export default Chart;