import { Calendar, Tag, User, Heart } from 'lucide-react';
import '../styles/SubscribeCard.css';
import { updateEvents, getOneAccount } from "../api";
import { useAuthContext } from "../hooks/useAuthContext"
import { useState, useEffect } from "react";

export const SubscribedEventCard = ({event}) => {

    const{ user, dispatch} = useAuthContext();
    const [loading, setLoading] = useState(false);

    async function handleLeave(id){
        setLoading(true);
        // console.log("user events before: ", user.events);
        // const events = user.events;
        // const updatedEvents = events.filter(item => item !== id);
        // console.log("updated events: ", updatedEvents)
        // await updateEvents(user.email, updatedEvents);

        // dispatch({type:"UPDATE_USER", payload: user});
        // localStorage.setItem("user", JSON.stringify(user));
        // console.log("Updated user: ", user);
        try{
          const updatedEvents = (user.events || []).filter((e) => e !== id);

          await updateEvents(user.email, updatedEvents)

          let freshUser;
          try
          {
            freshUser = await getOneAccount(user.email);
            console.log("FreshUserAttempt")
          }
          catch(e)
          {
            freshUser = {...user, events: updatedEvents};
            console.log("FreshUserAttemptError", err)
          }

          dispatch({type: "UPDATED_USER", payload: freshUser})
          localStorage.setItem("user", JSON.stringify(freshUser));

        }
        catch(err)
        {
          console.error("Failed to leave event: ", err);
        }
        finally
        {
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
      <button 
        className="btn-leave" 
        onClick={() => handleLeave(event._id)}
        disabled={loading}
      >
        {loading ? 'Leaving...' : 'Leave Event'}
      </button>
    </div>
  );
}