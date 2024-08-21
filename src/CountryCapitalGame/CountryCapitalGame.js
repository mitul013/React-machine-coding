import { useEffect, useState } from "react";

const data = {
  India: "Delhi",
  China: "Bejing",
  Pakistan: "Lahore",
  Russia: "Moscow",
};

function getNamesList(data) {
  const list = [];
  for (let key in data) {
    list.push(key, data[key]);
  }
  list.sort((a, b) => Math.random() - 0.5);
  return list;
}

const STATE = {
  EMPTY: "EMPTY",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const COLOR_MAP = {
  [STATE.EMPTY]: "blue",
  [STATE.SUCCESS]: "green",
  [STATE.FAILURE]: "red",
};

function CountryCapitalGame({ dataMap = data }) {
  const [list, setList] = useState(getNamesList(dataMap));
  const [allSelected, setAllSelected] = useState(new Set());
  const [selected, setSelected] = useState(new Set());
  const [status, setStatus] = useState(STATE.EMPTY);

  useEffect(() => {
    let copySelected = [...selected];
    console.log({ copySelected });
    if (copySelected.length < 2) return;
    let key = copySelected[0];
    let value = copySelected[1];
    if (dataMap[key] == value || data[value] == key) {
      setStatus(STATE.SUCCESS);
      setTimeout(() => {
        setAllSelected((prev) => {
          let updated = new Set(prev);
          updated.add(key);
          updated.add(value);
          return updated;
        });
        setSelected(new Set());
        setStatus(STATE.EMPTY);
      }, 1000);
    } else {
      setStatus(STATE.FAILURE);
      setTimeout(() => {
        setSelected(new Set());
        setStatus(STATE.EMPTY);
      }, 1000);
    }
  }, [selected]);

  const onButtonClick = (name) => {
    setSelected((prev) => {
      let updated = new Set(prev);
      updated.add(name);
      return updated;
    });
  };

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {list.map((item) => (
        <button
          key={item}
          type="button"
          disabled={selected.has(item)}
          style={{
            border: "1px solid",
            padding: "5px",
            borderRadius: "5px",
            borderColor: `${"black"}`,
            cursor: "pointer",
            backgroundColor: `${
              selected.has(item) ? COLOR_MAP[status] : "white"
            }`,
            display: `${allSelected.has(item) ? "none" : "block"}`,
          }}
          onClick={() => {
            onButtonClick(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default CountryCapitalGame;
