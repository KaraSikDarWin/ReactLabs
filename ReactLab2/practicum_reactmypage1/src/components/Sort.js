const Sort = ({filtering, data, fullData}) => {
    const handleSubmit= (event) => {        
        event.preventDefault();		

        
        filtering(filteredData);   
	}

    const handleReset = () => {
        filtering(fullData);
    };

    return (
        <details >
        <summary>Фильтр</summary>
        <form onSubmit={ handleSubmit } onReset={ handleReset }>
            <p>
          <label>Первый уровень сортировки
          <select key="1" name="firstLevel" id="firstLevel" onchange="selChang()">
            <option key="1" value="0">Нет</option>
            <option key="2" value="1">Имя Фамилия</option>
            <option key="3" value="2">Среднее время</option>
            <option key="4" value="3">Лучшее время</option>
          </select>
          </label>
          по убыванию? <input  type="checkbox"  id="fieldsFirstDesc"/>
          </p>
           <p>
          <label>Второй уровень сортировки
            <select id="secondLevel" onchange="selChang()" disabled >
              <option value="0">Нет</option>
            </select>
            </label>
            по убыванию? <input  type="checkbox"  id="fieldsSecondDesc"/>
            </p>
           <p>
            <label>Третий уровень сортировки
              <select id="thirdLevel" onchange="selChang()" disabled>
                <option value="0">Нет</option>
              </select>
              </label>
              по убыванию? <input  type="checkbox"  id="fieldsThirdDesc"/>
              </p>
            <p>         
                <button type="submit">Сортировать</button>   
                <button type="reset">Сбросить сортировку</button>
            </p>
        </form> 
          </details>
    )
       
}