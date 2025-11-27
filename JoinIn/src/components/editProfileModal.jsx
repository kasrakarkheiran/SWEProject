import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {updateAccount} from '../api'
import '../styles/EditProfileModal.css';

export const EditProfileModal = ({user, isOpen, onClose, onSave, setWaitingForVerification }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: ''
      });
      setFormError(null);
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
      const updatedUser = {
        name: formData.name,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      };

      const oldEmail = user.email;

      const response = await updateAccount(user.email, updatedUser);

      if(response.status == 200){
        onSave(updatedUser);
        onClose();
        if (oldEmail !== formData.email) {
          setWaitingForVerification(true);
        }
      } else {
        setFormError(response);
      }
      
    } catch (err) {
      console.error('Error updating profile:', err);
      
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
          </div>

          <div className="edit-profile-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          {formError && <div className="error">
          {formError}
          </div>}
        </form>
      </div>
    </div>
  );
}