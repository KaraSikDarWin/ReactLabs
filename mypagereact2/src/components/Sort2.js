import { useState, useEffect } from "react";


const Sort = ({ filtering, data, fullData }) => {

    const sortOptions = [
  "Нет",
  "Имя Фамилия",
  "Среднее время",
  "Лучшее время"
];

  const [levels, setLevels] = useState([
    { key: "0", desc: false },
    { key: "0", desc: false },
    { key: "0", desc: false }
  ]);

  const [availableOptions, setAvailableOptions] = useState([
    sortOptions,
    ["Нет"],
    ["Нет"]
  ]);

  useEffect(() => {
    updateOptions();
  }, [levels[0].key, levels[1].key]);

  const updateOptions = () => {
    const firstSelected = sortOptions[levels[0].key];
    const secondSelected = sortOptions[levels[1].key];

    const secondOpts = sortOptions.filter(
      (opt, idx) => idx === 0 || opt !== firstSelected
    );
    const thirdOpts = sortOptions.filter(
      (opt, idx) =>
        idx === 0 || (opt !== firstSelected && opt !== secondSelected)
    );

    setAvailableOptions([
      sortOptions,
      secondOpts,
      thirdOpts
    ]);
  };

  const handleSelectChange = (index, value) => {
    const newLevels = [...levels];
    newLevels[index].key = value;
    setLevels(newLevels);
  };

  const handleCheckboxChange = (index, checked) => {
    const newLevels = [...levels];
    newLevels[index].desc = checked;
    setLevels(newLevels);
  };

  const getValue = (row, key) => {
    switch (key) {
      case "1": return row.name.toLowerCase(); 
      case "2": return parseFloat(row.avg); 
      case "3": return Math.min(...row.results.map(Number));
      default: return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeSorts = levels.filter(l => l.key !== "0");

    const sorted = [...data].sort((a, b) => {
      for (const { key, desc } of activeSorts) {
        const valA = getValue(a, key);
        const valB = getValue(b, key);
        let res = typeof valA === "string"
          ? valA.localeCompare(valB)
          : valA - valB;
        if (desc) res = -res;
        if (res !== 0) return res;
      }
      return 0;
    });

    filtering(sorted);
  };

  const handleReset = () => {
    setLevels([
      { key: "0", desc: false },
      { key: "0", desc: false },
      { key: "0", desc: false }
    ]);
    setAvailableOptions([sortOptions, ["Нет"], ["Нет"]]);
    filtering(data);
  };

  return (
    <details>
      <summary>Сортировка</summary>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        {[0, 1, 2].map(i => (
          <p key={i}>
            <label>
              {i + 1}-й уровень сортировки
              <select
                value={levels[i].key}
                onChange={e => handleSelectChange(i, e.target.value)}
                disabled={i === 1 && levels[0].key === "0" || i === 2 && levels[1].key === "0"}
              >
                {availableOptions[i].map((opt, idx) => (
                  <option key={idx} value={sortOptions.indexOf(opt)}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
            по убыванию?{" "}
            <input
              type="checkbox"
              checked={levels[i].desc}
              onChange={e => handleCheckboxChange(i, e.target.checked)}
              disabled={i === 1 && levels[0].key === "0" || i === 2 && levels[1].key === "0"}
            />
          </p>
        ))}
        <p>
          <button type="submit">Сортировать</button>
          <button type="reset">Сбросить сортировку</button>
        </p>
      </form>
    </details>
  );
};

export default Sort;
