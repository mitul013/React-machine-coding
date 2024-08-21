import { useLayoutEffect, useRef, useState } from "react";

const imagesData = [
  {
    url: "https://placehold.co/300x400",
    width: 300,
    height: 400,
    fetchPriority: "high",
  },
  {
    url: "https://placehold.co/300x200",
    width: 300,
    height: 200,
    fetchPriority: "high",
  },
  {
    url: "https://placehold.co/300x400",
    width: 300,
    height: 400,
    fetchPriority: "high",
  },
  {
    url: "https://placehold.co/300x400",
    width: 300,
    height: 400,
    fetchPriority: "high",
  },
  {
    url: "https://placehold.co/300x200",
    width: 300,
    height: 200,
    fetchPriority: "auto",
  },
  {
    url: "https://placehold.co/300x400",
    width: 300,
    height: 400,
    fetchPriority: "auto",
  },
  {
    url: "https://placehold.co/300x400",
    width: 300,
    height: 400,
    fetchPriority: "auto",
  },
  {
    url: "https://placehold.co/300x400",
    width: 300,
    height: 400,
    fetchPriority: "auto",
  },
];

const dynamicHeightImagesData = [
  {
    url: "https://placehold.co/300x300",
    width: 300,
    height: 300,
    fetchPriority: "high",
  },
  {
    url: "https://placehold.co/300x200",
    width: 300,
    height: 200,
    fetchPriority: "high",
  },
  {
    url: "https://placehold.co/300x400",
    width: 300,
    height: 400,
    fetchPriority: "high",
  },
  {
    url: "https://placehold.co/300x400",
    width: 300,
    height: 400,
    fetchPriority: "high",
  },
  {
    url: "https://placehold.co/300x250",
    width: 300,
    height: 250,
    fetchPriority: "auto",
  },
  {
    url: "https://placehold.co/300x400",
    width: 300,
    height: 400,
    fetchPriority: "auto",
  },
  {
    url: "https://placehold.co/300x300",
    width: 300,
    height: 300,
    fetchPriority: "auto",
  },
  {
    url: "https://placehold.co/300x400",
    width: 300,
    height: 400,
    fetchPriority: "auto",
  },
];

const PintrestLayout = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        width: "940px",
        gap: "20",
        gridAutoRows: "200px",
      }}
    >
      {imagesData.map((imageObj) => (
        <div
          style={{
            gridRow: `${imageObj.height > 200 ? "2 span" : "1 span"}`,
            marginBottom: "20px",
            background: "white",
            padding: "10px 0px",
          }}
        >
          <img
            src={imageObj.url}
            fetchPriority={imageObj.fetchPriority}
            height={imageObj.height}
            width={imageObj.width}
          />
        </div>
      ))}
    </div>
  );
};

const findMinHeightIndex = (arr) => {
  let minIndex = 0;
  let minHeight = arr[0].height;
  for (let i = 1; i < arr.length; i++) {
    if (minHeight > arr[i].height) {
      minHeight = arr[i].height;
      minIndex = i;
    }
  }
  return minIndex;
};

const PintrestLayoutWithJs = () => {
  const imagesRef = useRef([]);
  const [columnArr, setcolumnArr] = useState([
    { height: 0, left: 0 },
    { height: 0, left: 300 + 10 },
    { height: 0, left: 600 + 20 },
  ]);
  useLayoutEffect(() => {
    let copyColumnArr = [...columnArr];
    dynamicHeightImagesData.forEach((image, i) => {
      const minIndex = findMinHeightIndex([...copyColumnArr]);
      let minObj = { ...copyColumnArr[minIndex] };
      imagesRef.current[i].style.top = `${minObj.height}px`;
      imagesRef.current[i].style.left = `${minObj.left}px`;
      minObj = { ...minObj, height: minObj.height + image.height + 10 };
      copyColumnArr[minIndex] = minObj;
    });
    setcolumnArr(copyColumnArr);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        padding: "0% 10%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        {dynamicHeightImagesData.map((imgObj, i) => (
          <div
            style={{ position: "absolute" }}
            ref={(imageRef) => (imagesRef.current[i] = imageRef)}
          >
            <img height={imgObj.height} src={imgObj.url} width={imgObj.width} />
          </div>
        ))}
      </div>
    </div>
  );
};

// export default PintrestLayout;
export default PintrestLayoutWithJs;
