import { getAllPosts, getAllAccounts, getFilteredPosts} from "../api"
import {useEffect, useState} from "react";
import axios from "axios";
// components
import PostForm from "../components/PostForm.jsx"
import PostDetails from "../components/PostDetails.jsx";
import { PostCard } from "../components/PostCard.jsx";

export function Home() {
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        category : '',
        eventStartDate : '',
        eventEndDate : ''
    });

    //Fetching posts
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
            setPosts(response);
        }
        catch(error){
            console.error("Error fetching posts Home page: ", error)
        }
        finally{
            setLoading(false);
        }
    }




    useEffect(() => {
        async function loadAllPosts(){
            let allPosts = await getAllPosts();
            setPosts(allPosts);
        }
        loadAllPosts();
    }, []);


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
        <>
            {/* <h1>HOME</h1>
            {posts.map((posts) => {
                return (
                    <div>
                        <PostCard post = {posts}/>
                    </div>
                    // <>
                    // <div className="post">
                    //     <h2>{posts.title}</h2>
                    //     <p>{posts.content}</p>
                    //     <p>By: {posts.author}</p>
                    // </div>
                        
                    //     {delete button
                    //     <PostDetails key={posts._id} post={posts}/>}
                    // </>
                )
            })}  */}
              <h1>HOME</h1>

            {/* Filter Section */}
            <div style={{ 
                padding: '20px', 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                marginBottom: '20px',
                backgroundColor: '#f9f9f9'
            }}>
                <h3>Filter Posts</h3>
                
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    
                    {/* Category Filter */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Category
                        </label>
                        <select 
                            value={filters.category}
                            onChange={handleCategoryChange}
                            style={{
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        >
                            <option value="">All Categories</option>
                            <option value="Basketball">Basketball</option>
                            <option value="Soccer">Soccer</option>
                            <option value="Tennis">Tennis</option>
                            <option value="Volleyball">Volleyball</option>
                            <option value="Football">Football</option>
                        </select>
                    </div>

                    {/* Event Date Range Filter */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Event Date Range
                        </label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input 
                                type="date"
                                value={filters.eventStartDate}
                                onChange={handleStartDateChange}
                                style={{
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            />
                            <span>to</span>
                            <input 
                                type="date"
                                value={filters.eventEndDate}
                                onChange={handleEndDateChange}
                                style={{
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                            onClick={handleApplyFilters}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Apply Filters
                        </button>
                        
                        <button 
                            onClick={handleClearFilters}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts Display Section */}
            {loading && <p>Loading posts...</p>}
            
            {!loading && posts.length === 0 && (
                <p>No posts found. Try adjusting your filters.</p>
            )}

            {!loading && posts.map((post) => {
                return (
                    <div key={post._id}>
                        <PostCard post={post}/>
                    </div>
                )
            })}
        </>
    );
}