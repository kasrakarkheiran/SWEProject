import { getAllPosts, getAllAccounts} from "../api"
import {useEffect, useState} from "react";

// components
import PostForm from "../components/PostForm.jsx"
import PostDetails from "../components/PostDetails.jsx";
import { PostCard } from "../components/PostCard.jsx";

export function Home() {
    
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        async function loadAllPosts(){
            let allPosts = await getAllPosts();
            setPosts(allPosts);
        }
        loadAllPosts();
    }, []);

    return (
        <>
            <h1>HOME</h1>
            {/*<PostForm/>*/}
            {posts.map((posts) => {
                return (
                    <div>
                        <PostCard post = {posts}/>
                    </div>
                    // <>
                    // <div className="post">
                    //     <h2>{posts.title}</h2>
                    //     <p>{posts.content}</p>
                    //     <p>By: {posts.author}</p>
                    // </div>
                        
                    //     {/*delete button
                    //     <PostDetails key={posts._id} post={posts}/>*/}
                    // </>
                )
            })}
            
        </>
    );
}