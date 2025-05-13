/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = ({filtering, data, fullData, setCurData}) => {

    const handleSubmit= (event) => {        
        event.preventDefault();		

        const nameFilter = event.target["name"].value.toLowerCase().trim();
        const avgFrom = parseFloat(event.target["numberFrom"].value) || -Infinity;
        const avgTo = parseFloat(event.target["numberTo"].value) || Infinity;
        const bestFrom = parseFloat(event.target["bestFrom"].value) || -Infinity;
        const bestTo = parseFloat(event.target["bestTo"].value) || Infinity;
        

        


		 const filteredData = fullData.filter(entry => {
        let bestTime = entry.results[0]; 
        for (let i = 1; i < entry.results.length; i++) {
            if (entry.results[i] < bestTime) {
                bestTime = entry.results[i];
            }
        }
        return (
            (nameFilter === "" || entry.name.toLowerCase().includes(nameFilter)) &&
            (entry.avg >= avgFrom && entry.avg <= avgTo) &&
            (bestTime >= bestFrom && bestTime <= bestTo)
        );
    });
        //передаем родительскому компоненту новое состояние - отфильтрованный массив
        
        setCurData(filteredData)
        filtering(filteredData);   
	}

    const handleReset = () => {
        setCurData(fullData);
        filtering(fullData);
    };

    return (
        <details >
        <summary>Фильтр</summary>
        <form onSubmit={ handleSubmit } onReset={ handleReset }>
            <p>
                <label>Имя:</label>
                <input name="name" type="text" />
            </p>
            <p>
          Среднее время: 
          <label>от
          <input type="number" name="numberFrom"/>
        </label> 
        
          <label>до
          <input type="number" name="numberTo"/>
          </label>
          </p>
            <p>
          Лучшее время: 
          <label>от
          <input type="number" name="bestFrom" />
        </label> 
        <label>до
          <input type="number" name="bestTo" />
          </label>
          </p>
            <p>         
                <button type="submit">Фильтровать</button>   
                <button type="reset">Очистить фильтр</button>
            </p>
        </form> 
          </details>
    )
       
}


export default Filter;