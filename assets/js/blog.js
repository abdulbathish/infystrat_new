// Add this script to your HTML file or in a separate JS file
document.addEventListener('DOMContentLoaded', function () {
    console.log("Initializing blog post fetch...");
    
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const paginationInfo = document.getElementById('pagination-info'); // Optional: For pagination display

    // API Base URL
    const API_BASE_URL = 'http://localhost:3000/api/blog-posts/';

    // Fetch blog posts from API
    async function fetchBlogPosts() {
        try {
            const response = await fetch(`${API_BASE_URL}`);
            console.log('Raw response:', response);
            
            // Check if the response is ok
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Parsed data:', data);

            // Check different possible response structures
            let blogPosts;
            if (Array.isArray(data)) {
                // If response is directly an array of posts
                blogPosts = data;
            } else if (data.blogPosts) {
                // If response has a blogPosts property
                blogPosts = data.blogPosts;
            } else {
                throw new Error('Unexpected data structure');
            }

            console.log('Processed blog posts:', blogPosts);
            renderBlogPosts(blogPosts);
            
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            // Display error message to the user
            blogPostsContainer.innerHTML = `
                <div class="error-message">
                    Unable to load blog posts. Please try again later.
                    Error: ${error.message}
                </div>
            `;
        }
    }

    // Render blog posts to the existing HTML structure
    function renderBlogPosts(posts) {
        // Validate posts input
        if (!Array.isArray(posts)) {
            console.error('Invalid posts data:', posts);
            blogPostsContainer.innerHTML = 'No blog posts available.';
            return;
        }

        // Clear existing content
        blogPostsContainer.innerHTML = posts.map(post => {
            // Provide default values to prevent undefined errors
            const title = post.title || 'Untitled Post';
            const mainImage = post.mainImage || '/path/to/default-image.jpg';
            const authorName = post.author?.name || 'Anonymous';
            const readTime = post.readTime || 5;
            const uniqueId = post.uniqueId || post._id || '';

            return `
                <div class="news-block_one col-lg-4 col-md-6 col-sm-12">
                    <div class="news-block_one-inner">
                        <div class="news-block_one-image">
                            <a href="news-detail.html?id=${uniqueId}">
                                <img src="${mainImage}" alt="${title}" />
                            </a>
                        </div>
                        <div class="news-block_one-content">
                            <div class="news-block_one-time">
                                By ${authorName} <span>${readTime} min read</span>
                            </div>
                            <h5 class="news-block_one-title">
                                <a href="news-detail.html?id=${uniqueId}">${title}</a>
                            </h5>
                            <a class="news-block_one-more" href="news-detail.html?id=${uniqueId}">
                                Read more <i class="fa-solid fa-plus fa-fw"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Initial fetch when page loads
    fetchBlogPosts();
});