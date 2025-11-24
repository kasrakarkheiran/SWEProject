import '../styles/myEventsCard.css';

export const MyEventCard = ({ event, onEdit, onDelete, loading = false }) => {
  return (
    <div className="my-event-card">
      <div className="my-event-header">
        <h3 className="my-event-title">{event.title}</h3>
        <span className="my-event-badge">Created</span>
      </div>
      <p className="my-event-description">{event.description}</p>
      <p className="my-event-info">📍 {event.location || 'Location TBA'}</p>
      <p className="my-event-info">📅 {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
      <p className="my-event-category">🏷️ {event.category}</p>
      <p className="my-event-author">👤 By: {event.author}</p>
      <p className="my-event-participants">👥 {event.participants?.length || 0} people joined</p>
      
      <div className="my-event-actions">
        <button 
          className="btn-edit" 
          onClick={() => onEdit(event._id)}
          disabled={loading}
        >
          {loading ? 'Editing...' : 'Edit'}
        </button>
        <button 
          className="btn-delete" 
          onClick={() => onDelete(event._id)}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}