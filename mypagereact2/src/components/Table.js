import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort2.js';
import { useState } from "react";

/*
    компонент, выводящий на страницу таблицу 
    пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = ({ data, amountRows, updateCurData, showPagination = true }) => {
    const [activePage, setActivePage] = useState("1");
    const [dataTable, setDataTable] = useState(data);
    const [currData, changeCurrData] = useState(data);
    console.log(currData);
    
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const updateDataTable = (value) => {
        updateCurData(value);
        setDataTable(value);
        setActivePage("1");
    }

    const isPaginationEnabled = showPagination && dataTable.length > amountRows;

	// количество страниц разбиения таблицы
    const n = isPaginationEnabled ? Math.ceil(dataTable.length / amountRows) : 1;
    
    // массив с номерами страниц
    const arr = isPaginationEnabled ? Array.from({ length: n }, (v, i) => i + 1) : [];
    
    // формируем совокупность span с номерами страниц
    const pages = arr.map(index => (
        <span
            key={index}
            className={index.toString() === activePage.toString() ? 'active-page' : ''}
            onClick={ changeActive }
        >
            {index}
        </span>
        )
    );

    const finalAmountRows = isPaginationEnabled ? amountRows : data.length;

    return( 
        <>
            
           
            <table>
                <TableHead   />
                <TableBody body={ dataTable } amountRows={ finalAmountRows } numPage={ activePage } />
            </table>

            {isPaginationEnabled && (
                <div className="pages">
                    {pages}
                </div>
            )}
            <Filter filtering={ updateDataTable } data={ dataTable } fullData={ data } setCurData= {changeCurrData}/>
            <Sort filtering={ updateDataTable } data={ currData } fullData={ data }/>


        </>   
    )   
}

export default Table;