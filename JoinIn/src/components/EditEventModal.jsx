import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/editEventModal.css';
import { updatePost } from '../api';

export const EditEventModal = ({ post, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    location: '',
    eventDate: '',
    capacity: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (post && isOpen) {
      // Format date for input field (YYYY-MM-DD)
      const eventDate = post.eventDate 
        ? new Date(post.eventDate).toISOString().split('T')[0]
        : '';
      
      setFormData({
        location: post.location || '',
        eventDate: eventDate,
        capacity: post.capacity || '',
        category: post.category || ''
      });
      setError('');
    }
  }, [post, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Only send the fields we're editing, server will preserve the rest
      const updateData = {
        location: formData.location || null,
        eventDate: formData.eventDate ? new Date(formData.eventDate) : post.eventDate,
        capacity: formData.capacity ? Number(formData.capacity) : null,
        category: formData.category || post.category
      };

      const response = await updatePost(post._id, updateData);
      
      if (response && (response.status === 200 || response.status === 201)) {
        onSave(response.data);
        onClose();
      } else {
        setError('Failed to update event');
      }
    } catch (err) {
      console.error('Error updating event:', err);
      setError(err.response?.data?.message || 'Error updating event');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="edit-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className="edit-modal-title">Edit Event</h2>

        <form onSubmit={handleSubmit} className="edit-event-form">
          {error && <div className="edit-error-message">{error}</div>}

          <div className="edit-form-group">
            <label htmlFor="category" className="edit-form-label">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="edit-form-input"
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

          <div className="edit-form-group">
            <label htmlFor="eventDate" className="edit-form-label">Event Date</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="edit-form-input"
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="location" className="edit-form-label">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Community Park"
              className="edit-form-input"
            />
          </div>

          <div className="edit-form-group">
            <label htmlFor="capacity" className="edit-form-label">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
              placeholder="Max participants"
              className="edit-form-input"
            />
          </div>

          <div className="edit-modal-actions">
            <button type="button" className="edit-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="edit-btn-save" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
