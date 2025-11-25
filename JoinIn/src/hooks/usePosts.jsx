import { useState, useEffect } from "react";
import { getAllPosts, getFilteredPosts } from "../api";

export function usePosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        category: "",
        eventStartDate: "",
        eventEndDate: ""
    });

    // Load all posts once
    useEffect(() => {
        fetchAllPosts();
    }, []);

    // Fetch all posts
    async function fetchAllPosts() {
        setLoading(true);
        try {
            const data = await getAllPosts();
            setPosts(data);
        } finally {
            setLoading(false);
        }
    }

    // Fetch filtered posts
    async function fetchFilteredPosts(customFilters = filters) {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams(
                Object.fromEntries(
                    Object.entries(customFilters).filter(([_, v]) => v)
                )
            );
            const data = await getFilteredPosts(queryParams);
            setPosts(data);
        } finally {
            setLoading(false);
        }
    }

    // Generic filter change handler
    function updateFilter(name, value) {
        setFilters(prev => ({ ...prev, [name]: value }));
    }

    // Reset filters
    function clearFilters() {
        const cleared = {
            category: "",
            eventStartDate: "",
            eventEndDate: ""
        };
        setFilters(cleared);
        fetchFilteredPosts(cleared);
    }

    return {
        posts,
        loading,
        filters,
        updateFilter,
        fetchFilteredPosts,
        clearFilters
    };
}
