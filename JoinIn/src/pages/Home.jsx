import {useState} from "react";
import { PostDetailsModal } from "../components/PostDetailsModal.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { PostCard } from "../components/PostCard.jsx";
import { PostFilters } from "../components/PostFilter.jsx";
import { usePosts } from "../hooks/usePosts.jsx";
import '../styles/home.css';

export function Home() {
    const {
        posts,
        loading,
        filters,
        updateFilter,
        fetchFilteredPosts,
        clearFilters
    } = usePosts();

    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminDelete, setAdminDelete] = useState(false);

    return (
        <div className="home-container">
            <Navbar />

            <section className="home-hero">
                <div className="hero-content">
                    <h1 className="hero-title">Find Your Next Game</h1>
                    <p className="hero-subtitle">
                        Discover casual sports events near you
                    </p>
                </div>
            </section>

            <div className="home-content">

                <PostFilters
                    filters={filters}
                    onChange={updateFilter}
                    onApply={() => fetchFilteredPosts()}
                    onClear={clearFilters}
                />

                <div className="posts-section">
                    {loading && (
                        <div className="loading-state">
                            <div className="loading-spinner"></div>
                            <p>Loading events...</p>
                        </div>
                    )}

                    {!loading && posts.length === 0 && (
                        <div className="empty-state">
                            <h3>No Events Found</h3>
                            <p>Try changing your filters</p>
                        </div>
                    )}

                    {!loading && posts.length > 0 && (
                        <>
                            <div className="posts-header">
                                <h2 className="posts-title">Available Events</h2>
                                <p className="posts-count">
                                    {posts.length} event{posts.length !== 1 ? "s" : ""} found
                                </p>
                            </div>

                            <div className="posts-grid">
                                {posts.map((post) => (
                                    <div key={post._id} className="post-item" onClick={() => {
                                        setSelectedPost(post);
                                        setIsModalOpen(true);
                                    }}>
                                    <PostCard post={post} setAdminDelete={setAdminDelete}/>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <PostDetailsModal post={selectedPost} isOpen={isModalOpen} adminDelete={adminDelete} onDelete={() => fetchFilteredPosts(null)} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
}
