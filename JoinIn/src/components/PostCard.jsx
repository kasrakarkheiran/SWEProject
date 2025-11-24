import { updateEvents, getOneAccount } from "../api";
import { useAuthContext } from "../hooks/useAuthContext"
import { useState, useEffect } from "react";
import { Calendar, Tag, User, Heart, LogIn } from 'lucide-react';
import '../styles/postcard.css'

export const PostCard = ({post}) => {
    const { user, dispatch } = useAuthContext();
    const [loading, setLoading] = useState(false);


    let isJoined = Boolean(user?.events?.includes(post._id));

    async function handleJoin(){
        setLoading(true);

        // const events = user.events;
        // console.log("user events: ", events)

        // events.push(post._id);
        // console.log("user events: ", events)
        
        // await updateEvents(user.email, events);
        // console.log("this is the user: ", user.email);
        
        // dispatch({ type: "UPDATE_USER", payload: user });
        // localStorage.setItem("user", JSON.stringify(user));        
        
        // isJoined = user?.events?.includes(post._id);
        // {console.log("HandleJoinCalled:" , isJoined)}
        try{
            const updatedEvents = [...(user.events||[]), post._id];
            await updateEvents(user.email, updatedEvents);
            //I AM UPDATING HERE
            let freshUser;
            try{
                freshUser = await getOneAccount(user.email);
            }
            catch(error){
                console.log("getting fresh user failed: ", error);
                freshUser = {...user, events: updatedEvents}
            }
            dispatch({type: "UPDATE_USER", payload: freshUser});
            localStorage.setItem("user", JSON.stringify(freshUser))
        }catch(e){
            console.log("failed to join event ",e)
            
        }finally{
            setLoading(false)
        }
    }

    async function handleLeave(){
        setLoading(true);
        console.log("this is the user: ", user.email);
        {console.log("handleLeaveCalled:" , isJoined)}
        isJoined = user?.events?.includes(post);
        setLoading(false);
    }

    return (
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