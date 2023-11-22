import './DeleteModal.css'

function DeleteModal({HandleClose, handleDelete}) {
    return (
        <div className="delete-modal">
            <div className="dialog-box">
                <h2>Delete Comment</h2>
                <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className='del-btns'>
                    <button className='delete-cancel' onClick={()=>HandleClose(false)}>No,Cancel</button>
                    <button className='delete-yes' onClick={handleDelete}>Yes,Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;