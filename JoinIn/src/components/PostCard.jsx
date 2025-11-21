import {format} from 'date-fns'
import PostDetails from './PostDetails'

export function PostCard({post}){
    return (
        <div className="post">   
            <h1>{post.title}</h1>
            <h2>{post.description}</h2>
            <p>Date: {post.eventDate}</p>
            <p>Category: {post.category}</p>
            <p>By: {post.author}</p>
            {/*<PostDetails key={post._id} post={post}/>*/}
        </div>
    )
}