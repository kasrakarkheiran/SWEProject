import {useAuthContext} from "../hooks/useAuthContext";

import React, { useState } from 'react';
import { User, Calendar, Plus, Heart } from 'lucide-react';
import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/PostCard";
import { SubscribedEventCard } from "../components/ProfileSubscribeCard";
import { MyEventCard } from "../components/myEventsCard";
import { PostDetailsModal } from "../components/PostDetailsModal";
import { EditEventModal } from "../components/EditEventModal";
import '../styles/profile.css';
import { useEffect } from "react";
import { getSubscribedEvents, createPost, getMyEvents, deletePost } from "../api";


export function Profile() {
  const {user, dispatch} = useAuthContext();
  const [activeTab, setActiveTab] = useState('account');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    category: '',
    location: '',
    capacity: ''
  });

  const [subscribed, setSubscribed] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    // re-run whenever user object changes (email or their events/subscriptions change)
    if(!user?.email){
      setSubscribed([]);
      return;
    }

    let mounted = true;
    async function subscribeSetter(){
      try {
        const response = await getSubscribedEvents(user.email);
        if(mounted){
          setSubscribed(response || []);
        }
      } catch(err){
        console.error("Failed fetching subscribed events: ", err);
      }
    }
    subscribeSetter();
    return () => {
      mounted = false;
    };
  },[user])
  
  useEffect(()=>{
    // re-run whenever user changes to pick up new/removed my events without a manual refresh
    if(!user?.email){
      setEvents([]);
      return;
    }

    let mounted = true;
    async function eventSetter(){
      try {
        const response = await getMyEvents(user.email);
        if(mounted){
          setEvents(response || []);
        }
      } catch(err){
        console.error("Failed fetching subscribed events: ", err);
      }
    }
    eventSetter();
    return () => {
      mounted = false;
    };
  },[user])


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('You must be logged in to create an event');

    const post = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      // convert date-string (from <input type="date">) to an ISO date string; server converts to Date
      eventDate: formData.eventDate ? new Date(formData.eventDate) : null,
      dateCreated: new Date(),
      author: user.name,
      // include creator email so server can update the account document
      creatorEmail: user.email,
      location: formData.location || null,
      capacity: formData.capacity ? Number(formData.capacity) : null,
      participants: []
    };

    try{
      const res = await createPost(post);
      // axios returns a response object; success if status in 200s
      if (res && res.status >= 200 && res.status < 300) {
        // server returned created post document
        const created = res.data;

        // optimistic update: add new post id to local user context so UI updates immediately
        const newId = created && (created._id || created.insertedId);
        if (newId) {
          const idStr = typeof newId === 'string' ? newId : newId.toString();
          const updatedUser = {
            ...user,
            events: Array.isArray(user?.events) ? [...user.events, idStr] : [idStr],
            myEvents: Array.isArray(user?.myEvents) ? [...user.myEvents, idStr] : [idStr]
          };
          dispatch({ type: 'UPDATE_USER', payload: updatedUser });
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        // update local `events` state so My Events shows the newly created event immediately
        if (created) {
          setEvents(prev => Array.isArray(prev) ? [...prev, created] : [created]);
          // if creator is automatically a participant, also add to subscribed list so "Subscribed" tab shows it
          setSubscribed(prev => Array.isArray(prev) ? [...prev, created] : [created]);
        }

        // clear form
        setFormData({
          title: '',
          description: '',
          eventDate: '',
          category: '',
          location: '',
          capacity: ''
        });

        console.log('Event created', created);
      } else {
        console.error('Create post failed', res);
        alert('Failed to create event');
      }
    }catch(err){
      console.error('Error creating post', err);
      alert('Error creating event');
    }
  };

  return (
        <div className="profile-container">
      <Navbar />
      
      <div className="profile-content">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-header-info">
            <h1 className="profile-name">My Profile</h1>
            <p className="profile-subtitle">Manage your account and activities</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tabs-container">
          <div className="tabs-nav">
            <button
              className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <User size={20} />
              Account Information
            </button>
            <button
              className={`tab-button ${activeTab === 'myEvents' ? 'active' : ''}`}
              onClick={() => setActiveTab('myEvents')}
            >
              <Calendar size={20} />
              My Events
            </button>
            <button
              className={`tab-button ${activeTab === 'createEvent' ? 'active' : ''}`}
              onClick={() => setActiveTab('createEvent')}
            >
              <Plus size={20} />
              Create Event
            </button>
            <button
              className={`tab-button ${activeTab === 'subscribed' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscribed')}
            >
              <Heart size={20} />
              Subscribed To
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Account Information Tab */}
            {activeTab === 'account' && (
              <div className="tab-pane active">
                <div className="account-card">
                  <h2 className="tab-title">Account Information</h2>
                  <div className="account-info-grid">
                    <div className="account-field">
                      <label className="field-label">Email</label>
                      <p className="field-value">{user.email}</p>
                    </div>
                    <div className="account-field">
                      <label className="field-label">Username</label>
                      <p className="field-value">{user.name}</p>
                    </div>
                    <div className="account-field">
                      <label className="field-label">Member Since</label>
                      <p className="field-value">
                        {user.dateCreated
                          ? new Date(user.dateCreated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                          : 'Date unavailable'}
                      </p>
                    </div>
                    <div className="account-field">
                      <label className="field-label">Events Created</label>
                      <p className="field-value">{user.myEvents.length}</p>
                    </div>
                  </div>
                  <button className="btn-edit">Edit Profile</button>
                </div>
              </div>
            )}

            {/* My Events Tab */}
            {activeTab === 'myEvents' && (
              <div className="tab-pane active">
                <h2 className="tab-title">My Events</h2>
                <div className="events-grid">
                  {events.map((post) => (
                      <div key={post._id} className="post-item" onClick={() => {
                        setSelectedPost(post);
                        setIsModalOpen(true);
                      }}>
                        <MyEventCard 
                          event={post}
                          onEdit={(id) => {
                            const postToEdit = events.find(p => p._id === id);
                            setEditingPost(postToEdit);
                            setIsEditModalOpen(true);
                          }}
                          onDelete={async () => {
                            try{
                              // call backend to delete post and remove references
                              const res = await deletePost(post._id);
                              if (res && (res.status === 200 || res.status === 202 || res.status === 204)){
                                // remove from local events list
                                setEvents(prev => prev.filter(p => p._id !== post._id));

                                // also remove from subscribed list so subscribed tab is in sync
                                setSubscribed(prev => prev.filter(p => p._id !== post._id));

                                // remove from current user context arrays and localStorage
                                const updatedUser = {
                                  ...user,
                                  events: (user.events || []).filter(id => id !== post._id),
                                  myEvents: (user.myEvents || []).filter(id => id !== post._id)
                                };
                                dispatch({ type: 'UPDATE_USER', payload: updatedUser });
                                localStorage.setItem('user', JSON.stringify(updatedUser));
                              } else {
                                console.error('Failed to delete post', res);
                                alert('Failed to delete event');
                              }
                            }catch(err){
                              console.error('Delete event error', err);
                              alert('Error deleting event');
                            }
                          }} 
                        />
                      </div>
                      ))}
                </div>
                {/* Placeholder for empty state */}
                {events.length === 0 && (
                  <div className="empty-state">
                    <p>No events created yet. Start by creating your first event!</p>
                  </div>
                )}
              </div>
            )}

            {/* Create Event Tab */}
            {activeTab === 'createEvent' && (
              <div className="tab-pane active">
                <h2 className="tab-title">Create Event</h2>
                <form onSubmit={handleFormSubmit} className="create-event-form">
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">Event Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      placeholder="Enter event title (e.g., Tuesday Basketball)"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      placeholder="Describe your event, skill level, what to bring, etc."
                      className="form-textarea"
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="category" className="form-label">Category</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleFormChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select a sport</option>
                        <option value="basketball">Basketball</option>
                        <option value="soccer">Soccer</option>
                        <option value="volleyball">Volleyball</option>
                        <option value="tennis">Tennis</option>
                        <option value="badminton">Badminton</option>
                        <option value="frisbee">Frisbee</option>
                        <option value="pickleball">Pickleball</option>
                        <option value="cricket">Cricket</option>
                        <option value="baseball">Baseball</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="eventDate" className="form-label">Event Date</label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleFormChange}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="location" className="form-label">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleFormChange}
                        className="form-input"
                        placeholder="e.g., Community Park"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="capacity" className="form-label">Capacity</label>
                      <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleFormChange}
                        className="form-input"
                        min="1"
                        placeholder="Max participants"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-submit">Create Event</button>
                </form>
              </div>
            )}

            {/* Subscribed To Tab */}
            {activeTab === 'subscribed' && (
              <div className="tab-pane active">
                <h2 className="tab-title">Subscribed Events</h2>
                <div className="events-grid">
                    {subscribed.map((post) => (
                      <div key={post._id} className="post-item" onClick={() => {
                        setSelectedPost(post);
                        setIsModalOpen(true);
                      }}>
                        <SubscribedEventCard event={post} onLeave={() => {
                          setSubscribed(prev => prev.filter(p => p._id !== post._id));
                        }} />
                      </div>
                      ))}
                </div>
                {/* Placeholder for empty state */}
                {subscribed.length === 0 && (
                  <div className="empty-state">
                    <p>You haven't subscribed to any events yet. Go to home to find events!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <PostDetailsModal post={selectedPost} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} />
        <EditEventModal 
          post={editingPost} 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedPost) => {
            // Update the event in the local events list
            setEvents(prev => prev.map(p => p._id === updatedPost._id ? updatedPost : p));
            alert('Event updated successfully');
          }}
        />
      </div>
    </div>
  );
}