import { useState, createContext } from 'react';
import './App.css';
import CommentBox from './Components/CommentBox';
import DeleteModal from './Components/DeleteModal';
import data from './data.json';
import Post from './Components/Post';
import { findNode } from './Components/findNode';

export const Usercontext = createContext();

function App() {

  const repliesListGen = (data, parentId) => {
    if (data)
      return data.map((item) =>
        <CommentBox
          key={item.id}
          parentId={parentId}
          id={item.id}
          upvotes={item.score}
          user={item.user}
          postAt={item.createdAt}
          commentMsg={item.content}
          replies={repliesListGen(item.replies, item.id)}
          HandleDelete={handleDelete}
          commentList={commentList}
          setCommentList={setCommentList}
          replyTo={"@" + item.replyingTo + " "}
        />
      )
    else
      return []
  }

  const commentListGen = (data) =>
    data.map((item) =>
      <CommentBox
        key={item.id}
        id={item.id}
        parentId={item.id}
        upvotes={item.score}
        user={item.user}
        postAt={item.createdAt}
        commentMsg={item.content}
        replies={repliesListGen(item.replies, item.id)}
        HandleDelete={handleDelete}
        commentList={commentList}
        setCommentList={setCommentList}
      />
    )
  const [isdelete, setIsDelete] = useState(false);
  const [commentList, setCommentList] = useState(data.comments);
  const [temp, setTemp] = useState({ id: 0, parentId: null })

  function handleDelete(id, parentId) {
    setIsDelete(true);

    setTemp({ id: id, parentId: parentId });
  }

  function newCommentListGen() {
    let id = temp.id;
    let parentId = temp.parentId;
    let newData = [...commentList];
    for (let i = 0; i < newData.length; i++) {
      const node = findNode(parentId, newData[i]);
      if (node) {
        if (node.id != id) {
          node.replies = node.replies.filter((item) => item.id != id);
        }
        else {
          newData = newData.filter((item) => item.id != id);
        }
        break;
      }
    }
    setCommentList(newData);
    setIsDelete(false)
  }

  return (
    <Usercontext.Provider value={data.currentUser}>
      <main>
        {console.log(commentList)}
        {isdelete && <DeleteModal HandleClose={setIsDelete} handleDelete={newCommentListGen} />}
        {commentListGen(commentList)}
        <Post setCommentList={setCommentList} commentList={commentList} />
      </main>
    </Usercontext.Provider>
  )
}

export default App
