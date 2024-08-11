import React, { useCallback, useState } from "react";

const data = [
  {
    id: 1,
    name: "Table",
    isChecked: false,
    items: [
      { id: 3, name: "Bar Table", isChecked: false },
      { id: 4, name: "Dining", isChecked: false },
      { id: 5, name: "Coffee Table", isChecked: false },
    ],
  },
  {
    id: 2,
    name: "Chairs",
    isChecked: false,
    items: [
      {
        id: 6,
        name: "High Chair",
        isChecked: false,
        items: [{ id: 11, name: "Foldable", isChecked: false }],
      },
      { id: 7, name: "Bar Stool", isChecked: false },
      {
        id: 8,
        name: "Office Chairs",
        isChecked: false,
        items: [
          {
            id: 9,
            name: "Executive",
            isChecked: false,
          },
          { id: 10, name: "Balance", isChecked: false },
        ],
      },
    ],
  },
];

function CheckBox({ id, name, isChecked, onCheckBoxClick }) {
  console.log({ id, name, isChecked });
  return (
    <div style={{ paddingTop: "5px" }}>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          onCheckBoxClick(id, !isChecked);
          //some kind of method
        }}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
}

function CheckBoxList({ checkBoxes, onCheckBoxClick }) {
  return checkBoxes?.map((checkbox) => {
    return (
      <div key={checkbox.id}>
        <CheckBox
          id={checkbox.id}
          name={checkbox.name}
          isChecked={checkbox.isChecked}
          onCheckBoxClick={onCheckBoxClick}
        />
        {checkbox?.items?.length ? (
          <div style={{ marginLeft: "20px" }}>
            <CheckBoxList
              checkBoxes={checkbox.items}
              onCheckBoxClick={onCheckBoxClick}
            />
          </div>
        ) : null}
      </div>
    );
  });
}

function NestedCheckBox() {
  const [items, setItems] = useState(data);

  const updateChildItems = (root, newStatus) => {
    root.isChecked = newStatus;

    root?.items?.forEach((item) => {
      updateChildItems(item, newStatus);
    });
  };

  const updateRootnode = (item) => {
    console.log({ ...item });
    let isChecked = item?.items?.every((obj) => obj.isChecked);
    item.isChecked = isChecked == undefined ? item.isChecked : isChecked;
  };

  const traverseAndUpdate = (root, targetId, newStatus) => {
    let id;
    let items;
    // console.log("===> ", root);
    if (Array.isArray(root)) {
      items = root;
    } else {
      id = root?.id;
      items = root?.items;
    }

    if (id == targetId) {
      updateChildItems(root, newStatus);
    }
    // console.log("before list --> ", items, root);
    items?.forEach((item) => {
      //   console.log("-- before item --> ", item);
      traverseAndUpdate(item, targetId, newStatus);
      //   console.log("-- after item --> ", item);
      updateRootnode(item);
    });
    // console.log("After list --> ", items, root);
  };

  const onCheckBoxClick = useCallback((items, id, newStatus) => {
    const copyItems = JSON.parse(JSON.stringify(items));
    traverseAndUpdate(copyItems, id, newStatus);
    setItems(copyItems);
  }, []);

  return (
    <CheckBoxList
      checkBoxes={items}
      onCheckBoxClick={(id, newStatus) => {
        onCheckBoxClick(items, id, newStatus);
      }}
    />
  );
}

export default NestedCheckBox;
