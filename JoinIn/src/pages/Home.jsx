import { getAllPosts, getAllAccounts} from "../api"
import {useEffect, useState} from "react";

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
            {posts.map((posts) => {
                return (
                    <>
                        <h2>{posts.title}</h2>
                        <p>{posts.content}</p>
                        <p>By: {posts.author}</p>
                    </>
                )
            })}
        </>
    );
}