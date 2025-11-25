import React from 'react';
import { X, Calendar, MapPin, Users, User } from 'lucide-react';
import { deletePost } from '../api';
import '../styles/postDetailsModal.css';

export const PostDetailsModal = ({ post, isOpen, onClose, adminDelete, onDelete, user }) => {
  if (!isOpen || !post) return null;

  const eventDate = post.eventDate ? new Date(post.eventDate).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }) : 'Date TBA';

  const postDelete = async () => {
    deletePost(post._id);
    onDelete();
    onClose();
  }

  const participantCount = post.participants?.length || 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">{post.title}</h2>
          <span className="modal-category">{post.category}</span>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3 className="modal-section-title">Event Details</h3>
            <div className="modal-detail-item">
              <Calendar size={18} />
              <div>
                <p className="modal-detail-label">Date</p>
                <p className="modal-detail-value">{eventDate}</p>
              </div>
            </div>
            
            <div className="modal-detail-item">
              <MapPin size={18} />
              <div>
                <p className="modal-detail-label">Location</p>
                <p className="modal-detail-value">{post.location || 'Location TBA'}</p>
              </div>
            </div>

            <div className="modal-detail-item">
              <Users size={18} />
              <div>
                <p className="modal-detail-label">Capacity</p>
                <p className="modal-detail-value">{post.capacity ? `${post.capacity}` : `No Max Participants`}</p>
              </div>
            </div>

            <div className="modal-detail-item">
              <User size={18} />
              <div>
                <p className="modal-detail-label">Host</p>
                <p className="modal-detail-value">{post.author || 'Unknown'}</p>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Description</h3>
            <p className="modal-description">{post.description}</p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Participants ({participantCount})</h3>
            <div className="modal-participants-list">
              {post.participants && post.participants.length > 0 ? (
                post.participants.map((participant, idx) => (
                  <div key={idx} className="modal-participant-item">
                    <div className="modal-participant-avatar">
                      {typeof participant === 'string' 
                        ? participant.charAt(0).toUpperCase() 
                        : participant.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <p className="modal-participant-name">
                      {typeof participant === 'string' ? participant : participant.name || 'User'}
                    </p>
                  </div>
                ))
              ) : (
                <p className="modal-empty-message">No participants yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          { !adminDelete ? <button className="modal-btn-close" onClick={onClose}>Close</button> : <button className="post-action-btn delete" onClick={postDelete}>Delete</button>}
        </div>
      </div>
    </div>
  );
};
