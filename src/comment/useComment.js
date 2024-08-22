import { useState } from "react";
const useComment = (data) => {
  const [tree, setTree] = useState(data);

  const updateCommentVisibility = (id, tree = data) => {
    for (let item of tree) {
      if (item.id == id) {
        item.hide = !item?.hide;
      } else {
        updateCommentVisibility(id, item.items);
      }
    }
  };

  const insertComment = (value, id) => {
    let newComment = {
      id: Math.random() * 1000,
      comment: value,
      items: [],
    };
    const helper = (id, tree) => {
      let result = [];
      for (let i = 0; i < tree.length; i++) {
        const item = tree[i];
        if (item.id == id) {
          let updatedItem = { ...item };
          updatedItem.items.push(newComment);
          result = [...result, updatedItem];
        } else if (item?.items?.length) {
          result = [...result, { ...item, items: [...helper(id, item)] }];
        } else {
          result.push(item);
        }
      }
      return result;
    };
    setTree(helper(id, tree));
  };

  const deleteComment = (id) => {
    const helper = (id, tree) => {
      let result = [];

      for (let i = 0; i < tree.length; i++) {
        let item = tree[i];
        if (item.id != id) {
          if (item?.items?.length) {
            result = [
              ...result,
              { ...item, items: [...helper(id, item.items)] },
            ];
          } else {
            result.push(item);
          }
        }
      }
      return result;
    };
    let updatedTree = helper(id, tree);
    setTree(updatedTree);
  };

  return { tree, setTree, deleteComment, insertComment };
};

export default useComment;
