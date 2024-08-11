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

  return { tree, setTree, updateCommentVisibility };
};

export default useComment;
