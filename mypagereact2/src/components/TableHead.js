import TableRow from './TableRow.js';
/*
 компонент, для вывода thead таблицы
 пропсы:
 head - данные для шапки таблицы в виде массива
*/
const TableHead = () => {
 return (
 <thead>
 <tr>
 <td>ID</td>
 <td>Имя</td>
 <td>1</td>
 <td>2</td>
 <td>3</td>
 <td>4</td>
 <td>5</td>
 <td>Среднее</td>

 </tr>
 </thead>
 )
}
export default TableHead;
