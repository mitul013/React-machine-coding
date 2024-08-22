import CommentList from "./comment/CommentList";
import useComment from "./comment/useComment";
const AppComment = () => {
  const data = [
    {
      id: 1,
      comment: "Hello How are you?",
      items: [
        {
          id: 2,
          comment: "I'm good",
          items: [
            {
              id: 12,
              comment: "i dont know",
            },
            {
              id: 11,
              comment: "i hahahah haha",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      comment: "Hello ?",
      items: [
        {
          id: 4,
          comment: "I'm not good",
        },
      ],
    },
  ];
  const { tree, deleteComment, insertComment } = useComment(data);
  return (
    <CommentList
      commentList={tree}
      onDelete={deleteComment}
      onInsert={insertComment}
    />
  );
};

export default AppComment;
