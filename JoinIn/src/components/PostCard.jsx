

export function PostCard({post}){
    return (
        <div className="post">   
            <h1>{post.title}</h1>
            <h2>{post.description}</h2>
            <p>By: {post.author}</p>
        </div>
    )
}