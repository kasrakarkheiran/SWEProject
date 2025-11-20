import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"


const PostForm = () => {
    const {user} = useAuthContext()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        //default action is to refresh page
        e.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return
        }

        const description = content;
        const author = user.email
        const dateCreated = new Date();

        const post = {title, description, content, author, dateCreated};

        const response = await fetch('/posts/create', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        //  ----- error handling
        // Read raw response text first so we can handle non-JSON responses
        const text = await response.text();
        let json = null;
        try {
            json = text ? JSON.parse(text) : null;
        } catch (err) {
            console.error('Failed to parse JSON from server response:', err, 'raw:', text);
        }

        if (!response.ok){
            setError(json?.error ?? text ?? 'Something went wrong');
        }
        // ------

        if (response.ok){
            setTitle('');
            setContent('');
            setError(null);
            console.log('new post added', json ?? text);

        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Post</h3>
            <label>Post Title:</label>
            <input 
                type="text"
                onChange={(e)=> setTitle(e.target.value)}
                value={title}
            />
            <label>Post Content:</label>
            <input 
                type="text"
                onChange={(e)=> setContent(e.target.value)}
                value={content}
            />
            <button>Add post</button>
            {error && <div className="error">{error}</div>}
            
        </form>
    )
}

export default PostForm;