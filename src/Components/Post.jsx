import { useContext } from "react";
import { Usercontext } from "../App";
import './post.css'
import { useRef } from "react";
import uuid from "react-uuid";

function Post({setCommentList , commentList}) {
    const user = useContext(Usercontext);
    const message = useRef();

    function handleSend() {
        const id = uuid();
        const newData = [...commentList,
        {
            "id": id,
            "content": message.current.value,
            "createdAt": "just now",
            "score": 0,
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
        message.current.value = "";
        setCommentList(newData);
    }
    return (  
        <div className="post-wrapper">
            <img src={user.image.png} alt="DP" />
            <textarea name="msg" cols="30" rows="10" ref={message} placeholder="Add a comment..."></textarea>
            <button type='button' onClick={handleSend}>SEND</button>
        </div>
    );
}

export default Post;