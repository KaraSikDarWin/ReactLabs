import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
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
            <h4>Фильтры</h4>
            <Filter filtering={ updateDataTable } data = {currData}  fullData={ data }  setCurData= {changeCurrData} />

            <table>
                <TableHead head={ Object.keys(data[0]) } />
                <TableBody body={ dataTable } amountRows={ finalAmountRows } numPage={ activePage } />
            </table>

            {isPaginationEnabled && (
                <div className="pages">
                    {pages}
                </div>
            )}
        </>   
    )   
}

export default Table;