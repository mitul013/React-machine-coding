import { useState } from "react";

const CommentList = ({ commentList, onDelete, onInsert }) => {
  return commentList.map((comment) => (
    <CommentItem
      key={comment.id}
      comment={comment}
      onDelete={onDelete}
      onInsert={onInsert}
    />
  ));
};

const CommentItem = ({ comment, onDelete, onInsert }) => {
  const [hide, setHide] = useState(true);
  const [isEdit, setisEdit] = useState(false);
  const [value, setValue] = useState("");

  const onCommentClick = (e, comment) => {
    setHide(!hide);
    e.stopPropagation();
  };

  const insertComment = (value, id) => {
    if (value) onInsert(value, id);
    setValue("");
    setisEdit(false);
  };

  return (
    <div
      key={comment.id}
      className="comment-item"
      onClick={(e) => onCommentClick(e, comment)}
    >
      <p>
        {comment.comment}{" "}
        <span
          onClick={(e) => {
            e.stopPropagation();
            onDelete(comment.id);
          }}
        >
          {" "}
          Delete
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            setisEdit((p) => !p);
          }}
        >
          {" "}
          {!isEdit ? "Edit" : "close"}
        </span>
      </p>
      {isEdit ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => insertComment(value, comment.id)}
        />
      ) : null}
      {!hide ? (
        <div className="sublist">
          {comment.items ? (
            <CommentList
              commentList={comment.items}
              onDelete={onDelete}
              onInsert={onInsert}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default CommentList;
