import { useState } from "react";
import Pagination from "./Pagination";

function AppPagination() {
  const [cur, setCur] = useState(1);
  const onPageChange = (page) => {
    setCur(page);
  };

  return (
    <Pagination
      currentPage={cur}
      totalPage={15}
      length={5}
      onPageChange={(page) => {
        onPageChange(page);
      }}
    />
  );
}

export default AppPagination;
