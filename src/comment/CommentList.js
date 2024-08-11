import { useState } from "react";

const CommentList = ({ commentList }) => {
  return commentList.map((comment) => (
    <CommentItem key={comment.id} comment={comment} />
  ));
};

const CommentItem = ({ comment }) => {
  const [hide, setHide] = useState(true);

  const onCommentClick = (e, comment) => {
    setHide(!hide);
    console.log({ comment });
    e.stopPropagation();
  };

  return (
    <div
      key={comment.id}
      className="comment-item"
      onClick={(e) => onCommentClick(e, comment)}
    >
      <p>{comment.comment}</p>
      {!hide ? (
        <div className="sublist">
          {comment.items ? <CommentList commentList={comment.items} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default CommentList;
