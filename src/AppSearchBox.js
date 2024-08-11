import ListBox from "./searchbox/ListBox";
import SearchBox from "./searchbox/SearchBox";

const AppSearchBox = () => {
  const fetchSearchData = async (query) => {
    return await fetch(`https://swapi.dev/api/people/?search=${query}`);
  };

  const convertData = (data) => {
    const result = data.results;
    const data2 = result.map((item) => item.name);
    return data2;
  };

  return (
    <div className="body">
      <SearchBox
        fetchPromiseFn={fetchSearchData}
        convertData={convertData}
        listBox={(item, activeIndex) => (
          <ListBox datalist={item} activeIndex={activeIndex} />
        )}
      />
    </div>
  );
};

export default AppSearchBox;
