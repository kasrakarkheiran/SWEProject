import { Calendar, Tag, User, Heart } from 'lucide-react';
import '../styles/SubscribeCard.css';
import { updateEvents, getOneAccount, updatePost } from "../api";
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react";

export const SubscribedEventCard = ({event, onLeave}) => {

    const{ user, dispatch} = useAuthContext();
    const [loading, setLoading] = useState(false);

    // check if current user is the event creator
    const isEventHost = user.myEvents.indexOf(event._id) !== -1;

    async function handleLeave(id){
        setLoading(true);
        try{
            const events = user?.events || [];
            const updatedEvents = events.filter(item => item !== id);

            // update backend
            await updateEvents(user.email, updatedEvents);

            // Try to fetch fresh user from backend
            let freshUser;
            try{
                freshUser = await getOneAccount(user.email);
            }catch(err){
                // fallback to local update if fetch fails
                freshUser = {...user, events: updatedEvents};
            }

            // update global context and localStorage
            dispatch({type:"UPDATE_USER", payload: freshUser});
            localStorage.setItem("user", JSON.stringify(freshUser));

            // notify parent (Profile) to remove item from subscribed list so UI updates immediately
            if (typeof onLeave === 'function') onLeave(id);

        }catch(error){
            console.error("Failed to leave event: ", error);
        }finally{
            setLoading(false);
        }
    }

  return (
      <div className="subscribed-card">
      <div className="subscribed-header">
        <h3 className="subscribed-title">{event.title}</h3>
        <span className="subscribed-badge">Joined</span>
      </div>
      <p className="subscribed-info">📍 {event.location || 'Location TBA'}</p>
      <p className="subscribed-info">📅 {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
      <p className="subscribed-category">🏷️ {event.category}</p>
      <p className="subscribed-participants">👥 {event.participants?.length || 0} people joined</p>
      {isEventHost ? (
        <p className="host-message">You are the event host</p>
      ) : (
        <button 
          className="btn-leave" 
          onClick={(e) => {
            e.stopPropagation();
            handleLeave(event._id);}}
          disabled={loading}
        >
          {loading ? 'Leaving...' : 'Leave Event'}
        </button>
      )}
    </div>
  );
}