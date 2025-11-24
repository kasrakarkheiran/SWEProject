import {useAuthContext} from "../hooks/useAuthContext";

import React, { useState } from 'react';
import { User, Calendar, Plus, Heart } from 'lucide-react';
import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/PostCard";
import { SubscribedEventCard } from "../components/ProfileSubscribeCard";
import '../styles/profile.css';
import { useEffect } from "react";
import { getSubscribedEvents } from "../api";


export function Profile() {
  const {user, dispatch} = useAuthContext();
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    category: ''
  });

  const [subscribed, setSubscribed] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(()=>{
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
  },[user?.email])


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Event Created:', formData);
    // Add your API call here to create event
    setFormData({
      title: '',
      description: '',
      eventDate: '',
      category: ''
    });
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
                      <p className="field-value">January 2025</p>
                    </div>
                    <div className="account-field">
                      <label className="field-label">Events Created</label>
                      <p className="field-value">5</p>
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
                  {//EVENTS GO HERE
                  }
                </div>
                {/* Placeholder for empty state */}
                <div className="empty-state">
                  <p>No events created yet. Start by creating your first event!</p>
                </div>
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
                        <div key={post._id} className="post-item">
                            <SubscribedEventCard event={post} />
                        </div>
                        ))}
                </div>
                {/* Placeholder for empty state */}
                <div className="empty-state">
                  <p>You haven't subscribed to any events yet. Go to home to find events!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}