import { useContext, useRef } from 'react';
import './ReplyBox.css';
import { Usercontext } from '../App';
import uuid from 'react-uuid';
import { findNode } from './findNode';

function ReplyBox({ commentId, setisReply, replyTo, commentList, setCommentList }) {
    const message = useRef();
    const user = useContext(Usercontext);

    function handleReply() {
        setisReply(false);
        const id = uuid();
        const newData = [...commentList];

        for(let i = 0;i<newData.length;i++){
            const node = findNode(commentId,newData[i]);
            if(node){
                node.replies = [...node.replies,
                    {
                        "id": id,
                        "content": message.current.value.replace("@" + replyTo + " ,",""),
                        "createdAt": "just now",
                        "score": 0,
                        "replyingTo": replyTo,
                        "user": {
                            "image": { 
                              "png": user.image.png,
                              "webp": user.image.webp
                            },
                            "username": user.username
                        },
                        "replies": []
                    }
                    ]
            }
        }

        setCommentList(newData);
    }
    return (
        <div className="replybox-wrapper">
            <img src={user.image.png} alt="DP" />
            <textarea name="msg" cols="30" rows="10" ref={message} defaultValue={"@" + replyTo + " , "}></textarea>
            <button type='button' onClick={handleReply}>REPLY</button>
        </div>
    );
}

export default ReplyBox;