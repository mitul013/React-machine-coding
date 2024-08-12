import React, { useState } from "react";
function InfiniteScrollList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    items.length - 1
  );
  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetTop = startIndex * itemHeight;
  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };
  return (
    <div
      style={{ height: `${containerHeight}px`, overflowY: "scroll" }}
      onScroll={handleScroll}
    >
      <div style={{ height: `${totalHeight}px`, position: "relative" }}>
        <div style={{ position: "absolute", top: `${offsetTop}px` }}>
          {visibleItems.map((item) => (
            <div key={item.id} style={{ height: `${itemHeight}px` }}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default InfiniteScrollList;
