import { updateEvents } from "../api";
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react";
import { Calendar, Tag, User, Heart, LogIn } from 'lucide-react';
import '../styles/postcard.css'

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
        // <div className="post">   
        //     <h1>{post.title}</h1>
        //     <h2>{post.description}</h2>
        //     <p>Date: {post.eventDate}</p>
        //     <p>Category: {post.category}</p>
        //     <p>By: {post.author}</p>
        //     {/* <button onClick={handleJoin}>Join</button>
        //     <button onClick={handleLeave}>Leave</button> */}
            
        //     <button
        //         onClick={isJoined ? handleLeave : handleJoin}
        //         style={{
        //             background: isJoined ? "#C62828" : "#2E7D32",
        //             color: "white",
        //             padding: "8px 16px",
        //             borderRadius: "6px",
        //         }}
        //     >
        //         {isJoined 
        //             ? "Leave" 
        //             : "Join"}
        //     </button>
        // </div>
        <div className="post-card">
            <div className="post-header">
                <h2 className="post-title">{post.title}</h2>
                <button
                className={`post-action-btn ${isJoined ? 'joined' : ''}`}
                onClick={isJoined ? handleLeave : handleJoin}
                disabled={loading}
                >
                {isJoined ? (
                    <>
                    <Heart size={18} />
                    <span>Joined</span>
                    </>
                ) : (
                    <>
                    <LogIn size={18} />
                    <span>{loading ? 'Joining...' : 'Join Event'}</span>
                    </>
                )}
                </button>
            </div>

            <p className="post-description">{post.description}</p>

            <div className="post-details">
                <div className="detail-item">
                <Calendar size={18} />
                <span className="detail-label">Date:</span>
                <span className="detail-value">{new Date(post.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <div className="detail-item">
                <Tag size={18} />
                <span className="detail-label">Category:</span>
                <span className="detail-badge">{post.category}</span>
                </div>

                <div className="detail-item">
                <User size={18} />
                <span className="detail-label">Organized by:</span>
                <span className="detail-value">{post.author}</span>
                </div>
            </div>
        </div>
    )
}