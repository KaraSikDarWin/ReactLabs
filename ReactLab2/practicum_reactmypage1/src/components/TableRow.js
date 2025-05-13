const TableRow = (props) => {
    
    let cells = [];
        
        cells = props.row.flat().map((item, index) => <td key={index}>{item}</td>);
        
    return <>{cells}</>;
};

export default TableRow;
