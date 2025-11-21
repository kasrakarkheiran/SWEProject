import { getAllPosts, getAllAccounts} from "../api"
import {useEffect, useState} from "react";

// components
import { usePostsContext } from '../hooks/usePostsContext'
import {useAuthContext} from '../hooks/useAuthContext'

import PostForm from "../components/PostForm.jsx"
import PostDetails from "../components/PostDetails.jsx";
import { PostCard } from "../components/PostCard.jsx";

export function Home() {
    const {posts, dispatch} = usePostsContext()
    const {user} = useAuthContext()

    // Fetch data
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/posts/', {
                headers: {
                    //'Authorization' : `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({type: 'SET_POSTS', payload: json})
            }
        }
        
        if (user) {
            fetchPosts()
        }

    // Empty array only fetches once. Declare dependencies/external function in dependency array
    }, [dispatch, user])

    return (
        <div>
            <h1>HOME</h1>
            <PostForm/>
            <div>
                {posts && posts.map((post) => (
                    <PostCard key={post._id} post={post}/>
                    ))}
            </div>

        </div>
    );
}