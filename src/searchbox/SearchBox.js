import { useState } from "react";
import useSearchFetch from "./useSearchFetch";

const SearchBox = ({
  fetchPromiseFn,
  convertData,
  listBox,
  minLength = 0,
  debounceWait = 500,
}) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const {
    data: list,
    setData: setList,
    error,
  } = useSearchFetch(query, fetchPromiseFn, convertData, debounceWait);

  const onInputChange = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  const onkeyUp = (e) => {
    console.log(e);
    if (e.keyCode == 13) {
      // enter
      setList([]);
      setQuery(list[activeIndex]);
    }
    if (e.keyCode == 38) {
      // keyup
      if (activeIndex == 0) {
        setActiveIndex(list.length - 1);
      } else {
        setActiveIndex(activeIndex - 1);
      }
    }
    if (e.keyCode == 40) {
      // keyDown
      if (activeIndex == list.length - 1 || activeIndex == null) {
        setActiveIndex(0);
      } else {
        console.log("here....", activeIndex);
        setActiveIndex(activeIndex + 1);
      }
    }
  };

  return (
    <div className="search">
      <div className="input-container">
        <input value={query} onChange={onInputChange} onKeyUp={onkeyUp} />
      </div>
      {list?.length > 0 && query && listBox(list, activeIndex)}
    </div>
  );
};

export default SearchBox;
