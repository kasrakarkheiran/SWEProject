import { getAllPosts, getAllAccounts, getFilteredPosts} from "../api"
import {useEffect, useState} from "react";
import axios from "axios";
// components
import { usePostsContext } from '../hooks/usePostsContext'
import {useAuthContext} from '../hooks/useAuthContext'

import PostForm from "../components/PostForm.jsx"
import PostDetails from "../components/PostDetails.jsx";
import { PostCard } from "../components/PostCard.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Search, X, Filter } from 'lucide-react';
import '../styles/home.css'

export function Home() {
    const {posts, dispatch} = usePostsContext()

    // Fetch data
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        category : '',
        eventStartDate : '',
        eventEndDate : ''
    });

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/posts/', {
                headers: {
                    //'Authorization' : `Bearer ${user.token}`
                }
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({type: 'SET_POSTS', payload: json})
            }
        }
        fetchPosts();
    }, [dispatch])

    const fetchFilteredPosts = async (filterObj = null) => {
        setLoading(true);
        try {
            const params = filterObj || filters;
            //Query String
            const queryParams = new URLSearchParams();
            if (params.category) queryParams.append('category', params.category);
            if (params.eventStartDate) queryParams.append('eventStartDate', params.eventStartDate);
            if (params.eventEndDate) queryParams.append('eventEndDate' , params.eventEndDate);
            const response = await getFilteredPosts(queryParams);
        }
        catch(error){
            console.error("Error fetching posts Home page: ", error)
        }
        finally{
            setLoading(false);
        }
    }


    //handling filter changes:
    const handleCategoryChange = (e) => {
        setFilters(prev => ({
            ...prev,
            category: e.target.value
        }));
    }
    const handleStartDateChange = (e) =>{
        setFilters(prev => ({
            ...prev,
            eventStartDate: e.target.value
        }));
    }

    const handleEndDateChange = (e) => {
        setFilters(prev => ({
            ...prev,
            eventEndDate: e.target.value
        }));
    }

    const handleApplyFilters = () => {
        fetchFilteredPosts(filters)
    }

    const handleClearFilters = () =>{
            const clearedFilters = {
                category: '',
                eventStartDate: '',
                eventEndDate: ''
            };
            setFilters(clearedFilters)
            fetchFilteredPosts(clearedFilters)
    }


    return (
        <div className="home-container">
            <Navbar />

            {/* Hero Section */}
            <section className="home-hero">
                <div className="hero-content">
                <h1 className="hero-title">Find Your Next Game</h1>
                <p className="hero-subtitle">Discover casual sports events near you and join players who want to have fun</p>
                </div>
            </section>

            <div className="home-content">
                {/* Filter Section */}
                <div className="filters-section">
                <div className="filters-header">
                    <h2 className="filters-title">
                    <Filter size={24} />
                    Find Events
                    </h2>
                    <p className="filters-subtitle">Filter events by sport, date, or both</p>
                </div>

                <div className="filters-grid">
                    {/* Category Filter */}
                    <div className="filter-group">
                    <label htmlFor="category" className="filter-label">
                        Sport Category
                    </label>
                    <select
                        id="category"
                        value={filters.category}
                        onChange={handleCategoryChange}
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

                    {/* Event Date Range Filter */}
                    <div className="filter-group filter-group-span">
                    <label className="filter-label">
                        Event Date Range
                    </label>
                    <div className="date-range-inputs">
                        <input
                        type="date"
                        value={filters.eventStartDate}
                        onChange={handleStartDateChange}
                        className="filter-date-input"
                        placeholder="Start date"
                        />
                        <span className="date-separator">→</span>
                        <input
                        type="date"
                        value={filters.eventEndDate}
                        onChange={handleEndDateChange}
                        className="filter-date-input"
                        placeholder="End date"
                        />
                    </div>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="filter-buttons">
                    <button
                    onClick={handleApplyFilters}
                    className="btn-apply-filters"
                    >
                    <Search size={18} />
                    Apply Filters
                    </button>

                    <button
                    onClick={handleClearFilters}
                    className="btn-clear-filters"
                    >
                    <X size={18} />
                    Clear Filters
                    </button>
                </div>
                </div>

                {/* Posts Display Section */}
                <div className="posts-section">
                {loading && (
                    <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading events...</p>
                    </div>
                )}

                {!loading && posts.length === 0 && (
                    <div className="empty-state">
                    <Search size={48} />
                    <h3>No Events Found</h3>
                    <p>Try adjusting your filters to find more casual sports events</p>
                    </div>
                )}

                {!loading && posts.length > 0 && (
                    <>
                    <div className="posts-header">
                        <h2 className="posts-title">Available Events</h2>
                        <p className="posts-count">{posts.length} event{posts.length !== 1 ? 's' : ''} found</p>
                    </div>

                    <div className="posts-grid">
                        {posts.map((post) => (
                        <div key={post._id} className="post-item">
                            <PostCard post={post} />
                        </div>
                        ))}
                    </div>
                    </>
                )}
                </div>
            </div>
        </div>
    );
}