import {useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import PostEdit from './PostEdit.jsx'

const PostDetails = ({post}) => {
    const {user} = useAuthContext()
    const [showEdit, setShowEdit] = useState(false)


    const handleClickDelete = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/posts/delete/' + post._id, {
            method: 'DELETE',
            headers: {
            }
        })
        const json = await response.json()

        if (response.ok) {
            console.log(json)
            //dispatch({type: 'DELETE_POST', payload: json})
        }
    }

    const handleClickEdit = async () => {
        setShowEdit(true);
    }
    
    return (
        /*
        <div className="post-details">
            <h4>{post.title}</h4>
            <p><strong>Title: </strong>{post.title}</p>
            <p><strong>Content: </strong>{post.content}</p>
            <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true})}</p>
        </div>
        */
       // for now it's just the delete button
       <div className="post-details">
        <span className="material-symbols-outlined" onClick={handleClickDelete}>delete</span>
        <span className="material-symbols-outlined" onClick={handleClickEdit}>edit</span>
        {showEdit && <PostEdit key={post._id} postToEdit={post}/>}
       </div>
       

    )
}

export default PostDetails