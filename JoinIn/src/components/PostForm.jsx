import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { usePostsContext} from "../hooks/usePostsContext"

const PostForm = () => {
    const {dispatch} = usePostsContext()
    const {user} = useAuthContext()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('')
    const [eventDate, setEventDate] = useState('');
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

        const post = {title, 
                    description, 
                    content, 
                    author, 
                    category, 
                    eventDate, 
                    dateCreated};

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
            setCategory('')
            setEventDate('')
            setError(null);
            console.log('new post added', json ?? text);

            // If server returned JSON payload, dispatch it; otherwise skip dispatch
            if (json) dispatch({type: 'CREATE_POST', payload: json});
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
            <label>Event Date:</label>
            <input 
                type="date"
                onChange={(e)=> setEventDate(e.target.value)}
                value={eventDate}
                />
            <label>Choose a category:</label>
            <select
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                >
                <option value="Soccer">Soccer</option>
                <option value="Football">Football</option>
                <option value="Tag">Tag</option>
                <option value="Wrestling">Wrestling</option>
            </select>
            <button>Add post</button>
            {error && <div className="error">{error}</div>}
            
        </form>
    )
}

export default PostForm;