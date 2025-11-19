
import { useAuthContext } from '../hooks/useAuthContext'


const PostDetails = ({post}) => {
    const {user} = useAuthContext()

    const handleClick = async () => {
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
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
       </div>
       

    )
}

export default PostDetails