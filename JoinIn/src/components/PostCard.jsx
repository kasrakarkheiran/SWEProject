import { updateEvents } from "../api";
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react";

export const PostCard = ({post}) => {
    const {user} = useAuthContext();
    const [loading, setLoading] = useState(false);
    
    let isJoined = user?.events?.includes(post._id);

    async function handleJoin(){
        setLoading(true);
        const events = user.events;
        events.push(post._id);
        await updateEvents(user.email, events);
        isJoined = user?.events?.includes(post._id);
        {console.log("HandleJoinCalled:" , isJoined)}
        setLoading(false);
    }

    async function handleLeave(){
        setLoading(true);
        const events = user.events;
        const index = events.indexOf(post._id);
        if (index > -1) {
            events.splice(index, 1);
            await updateEvents(user.email, events);
        }
        isJoined = user?.events?.includes(post._id);
        {console.log("handleLeaveCalled:" , isJoined)}
        setLoading(false);
    }

    return (
        <div className="post">   
            <h1>{post.title}</h1>
            <h2>{post.description}</h2>
            <p>Date: {post.eventDate}</p>
            <p>Category: {post.category}</p>
            <p>By: {post.author}</p>
            {/* <button onClick={handleJoin}>Join</button>
            <button onClick={handleLeave}>Leave</button> */}
            
            <button
                onClick={isJoined ? handleLeave : handleJoin}
                style={{
                    background: isJoined ? "#C62828" : "#2E7D32",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "6px",
                }}
            >
                {isJoined 
                    ? "Leave" 
                    : "Join"}
            </button>
        </div>
    )
}