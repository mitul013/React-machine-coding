function range(start, end) {
  if (end == 0) return [];
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

function Pagination({ currentPage, totalPage, onPageChange, length = 2 }) {
  let startIndex = Math.max(1, Math.ceil(currentPage - length / 2));
  let endIndex = Math.min(startIndex + length - 1, totalPage);

  if (endIndex - startIndex < length - 1) {
    startIndex = endIndex - length + 1;
  }

  let isStartshow = true;
  let isEndshow = true;
  let isStartDotshow = true;
  let isEndDotshow = true;

  if (startIndex == 1) {
    isStartshow = false;
  }

  if (startIndex < 3) {
    isStartDotshow = false;
  }

  if (endIndex == totalPage) {
    isEndshow = false;
  }

  if (endIndex > totalPage - 2) {
    isEndDotshow = false;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        disabled={currentPage == 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      {isStartshow ? (
        <>
          <div
            key={1}
            style={{
              color: `${1 == currentPage ? "white" : "black"}`,
              backgroundColor: `${1 == currentPage ? "blue" : "white"}`,
              border: "1px solid black",
              padding: "5px",
            }}
            onClick={() => onPageChange(1)}
          >
            {1}
          </div>
          {isStartDotshow ? <div>...</div> : null}
        </>
      ) : null}
      {range(startIndex, endIndex).map((page) => {
        return (
          <div
            key={page}
            style={{
              color: `${page == currentPage ? "white" : "black"}`,
              backgroundColor: `${page == currentPage ? "blue" : "white"}`,
              border: "1px solid black",
              padding: "5px",
            }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </div>
        );
      })}
      {isEndshow ? (
        <>
          {isEndDotshow ? <div>...</div> : null}
          <div
            key={totalPage}
            style={{
              color: `${totalPage == currentPage ? "white" : "black"}`,
              backgroundColor: `${totalPage == currentPage ? "blue" : "white"}`,
              border: "1px solid black",
              padding: "5px",
            }}
            onClick={() => onPageChange(1)}
          >
            {totalPage}
          </div>
        </>
      ) : null}
      <button
        disabled={currentPage == totalPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
