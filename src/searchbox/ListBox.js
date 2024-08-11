const ListBox = ({ datalist, activeIndex }) => {
  return (
    <div className="listbox">
      <ul>
        {datalist.map((item, idx) => (
          <li key={item} className={`${idx == activeIndex ? "active" : ""}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListBox;
