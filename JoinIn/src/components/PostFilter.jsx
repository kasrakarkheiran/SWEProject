import { Search, X, Filter } from "lucide-react";

export function PostFilters({ filters, onChange, onApply, onClear }) {
    return (
        <div className="filters-section">
            <div className="filters-header">
                <h2 className="filters-title">
                    <Filter size={24} />
                    Find Events
                </h2>
                <p className="filters-subtitle">Filter events by sport or date</p>
            </div>

            <div className="filters-grid">
                
                {/* Category */}
                <div className="filter-group">
                    <label className="filter-label">Sport Category</label>
                    <select
                        value={filters.category}
                        onChange={(e) => onChange("category", e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Sports</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Soccer">Soccer</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Volleyball">Volleyball</option>
                        <option value="Football">Football</option>
                        <option value="Badminton">Badminton</option>
                        <option value="Pickleball">Pickleball</option>
                        <option value="Cricket">Cricket</option>
                    </select>
                </div>

                {/* Date Range */}
                <div className="filter-group filter-group-span">
                    <label className="filter-label">Event Date Range</label>

                    <div className="date-range-inputs">
                        <input
                            type="date"
                            value={filters.eventStartDate}
                            onChange={(e) => onChange("eventStartDate", e.target.value)}
                            className="filter-date-input"
                        />
                        <span className="date-separator">→</span>
                        <input
                            type="date"
                            value={filters.eventEndDate}
                            onChange={(e) => onChange("eventEndDate", e.target.value)}
                            className="filter-date-input"
                        />
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="filter-buttons">
                <button onClick={onApply} className="btn-apply-filters">
                    <Search size={18} />
                    Apply Filters
                </button>

                <button onClick={onClear} className="btn-clear-filters">
                    <X size={18} />
                    Clear Filters
                </button>
            </div>
        </div>
    );
}
