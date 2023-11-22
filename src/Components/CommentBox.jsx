import ReplyBox from './ReplyBox';
import './commentbox.css';
import { useState, useContext } from 'react';
import { Usercontext } from '../App';
import { findNode } from './findNode';

function CommentBox({parentId,id,upvotes, user, postAt, commentMsg, replies, replyTo = "", HandleDelete , commentList , setCommentList}) {

    const [upvotesCur, setUpvotesCur] = useState(upvotes);
    const [isReply, setisReply] = useState(false);
    const [isUpdate, setisUpdate] = useState(false);
    const userContext = useContext(Usercontext)
    const [commentText, setCommentText] = useState(commentMsg);


    function handleEdit(e) {
        const editedText = e.target.value.replace(replyTo + " ,", "")
        setCommentText(editedText);
    }
    
    function handleUpdate(){
        const newData = [...commentList];
        for(let i = 0;i<newData.length;i++){
            const node = findNode(id,newData[i]);
            if(node){
                node.content = commentText;
            }
        }

        setCommentList(newData);
        setisUpdate(false);
    }

    return (
        <div className="comment-wrapper">
            <div className='comment-main'>
                <div className="upvote-btn">
                    <i className="fa-solid fa-plus" onClick={() => setUpvotesCur((prev) => prev + 1)}></i>
                    <p>{upvotesCur}</p>
                    <i className="fa-solid fa-minus" onClick={() => setUpvotesCur((prev) => prev - 1)}></i>
                </div>
                <div className='comment-body'>
                    <div className='comment-head'>
                        <div className="profile">
                            <img src={user.image.png} alt="" />
                            <p className="name">{user.username}</p>
                            {(userContext.username === user.username) && <span>you</span>}
                            <p className='postedat'>{postAt}</p>
                        </div>
                        <div className="reply-btn">
                            {(userContext.username === user.username) ?
                                <>
                                    <span className='reply-delete' onClick={()=>HandleDelete(id,parentId)}><i className="fa-solid fa-trash"></i> Delete</span>
                                    <span onClick={() => setisUpdate(true)}><i className="fa-solid fa-pen"></i> Edit</span>
                                </>
                                :
                                <span onClick={() => setisReply(true)}><i className="fa-solid fa-reply"></i> Reply</span>
                            }
                        </div>
                    </div>
                    {
                        isUpdate ?
                            <div className="edit-box">
                                <textarea defaultValue={replyTo?replyTo + " ," + commentText : commentText} onInput={handleEdit}></textarea>
                                <button onClick={handleUpdate}>Update</button>
                            </div>
                            :
                            <p className='comment-msg'>
                                <span>
                                    <span className='replyTo'>{replyTo}</span><span>{commentText}</span>
                                </span>
                            </p>
                    }
                </div>
            </div>
            <div className="reply-wrapper">
                {replies}
                {isReply && <ReplyBox commentId = {id} setisReply={setisReply} replyTo={user.username} HandleDelete={HandleDelete} commentList = {commentList} setCommentList = {setCommentList}/>}
            </div>
        </div>
    );
}

export default CommentBox;