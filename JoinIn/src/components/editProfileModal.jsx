import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {updateAccount} from '../api'
import '../styles/EditProfileModal.css';

export const EditProfileModal = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: ''
      });
    }
  }, [user]);

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

    try {
      // If changing password, validate current password is provided
      if (formData.newPassword && !formData.currentPassword) {
        alert('Please enter your current password to change it');
        setLoading(false);
        return;
      }

      const updatedUser = {
        name: formData.name,
        email: formData.email,
      };

      // Only include password fields if user is changing password
      if (formData.currentPassword && formData.newPassword) {
        updatedUser.currentPassword = formData.currentPassword;
        updatedUser.newPassword = formData.newPassword;
      }

      // Call your API to update user profile
       //const response = await updateAccount(user.email, updatedUser);
      
      // For now, simulate success
      //onSave(updatedUser);
      alert('Profile updated successfully!');
      onClose();
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-profile-overlay" onClick={onClose}>
      <div className="edit-profile-content" onClick={(e) => e.stopPropagation()}>
        <div className="edit-profile-header">
          <h2 className="edit-profile-title">Edit Profile</h2>
          <button className="edit-profile-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label htmlFor="edit-name" className="form-label">Name</label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-email" className="form-label">Email</label>
            <input
              type="email"
              id="edit-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-divider">
            <span>Change Password (Optional)</span>
          </div>

          <div className="form-group">
            <label htmlFor="current-password" className="form-label">Current Password</label>
            <input
              type="password"
              id="current-password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter current password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="new-password" className="form-label">New Password</label>
            <input
              type="password"
              id="new-password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter new password"
            />
            <p className="password-hint">Leave blank to keep current password</p>
          </div>

          <div className="edit-profile-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}