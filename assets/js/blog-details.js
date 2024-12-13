// blog-details.js
async function fetchBlogDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        console.log("---->",urlParams);
        
        const myParam = urlParams.get('id')
        console.log("jhjgj",myParam);
        ;
        const response = await fetch(`http://0.0.0.0:3000/api/blog-posts/detail/${myParam}`);
        const data = await response.json();
        
        // Helper function to safely set element content
        function safeSetContent(elementId, content, attribute = 'textContent') {
            const element = document.getElementById(elementId);
            if (element) {
                if (attribute === 'textContent') {
                    element.textContent = content;
                } else if (attribute === 'src') {
                    element.src = content;
                }
            } else {
                console.warn(`Element with id '${elementId}' not found`);
            }
        }

        // Safely set page content
        safeSetContent('page-title', data.title);
        safeSetContent('main-image', data.mainImage || '/assets/images/resource/news-19.jpg', 'src');
        safeSetContent('blog-title', data.title);
        
        // Author details
        if (data.author) {
            safeSetContent('author-avatar', data.author.avatar, 'src');
            safeSetContent('author-name', `By ${data.author.name}`);
        }
        
        // Publish date
        if (data.publishDate) {
            const publishDate = new Date(data.publishDate);
            safeSetContent('publish-date', publishDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            }));
        }

        // Populate blog content dynamically
        const contentContainer = document.getElementById('blog-content');
        if (contentContainer) {
            contentContainer.innerHTML = ''; // Clear existing content
            if (data.blocks && Array.isArray(data.blocks)) {
                data.blocks.forEach(block => {
                    let element;
                    switch(block.type) {
                        case 'paragraph':
                            element = document.createElement('p');
                            element.textContent = block.content;
                            break;
                        case 'heading':
                            element = document.createElement('h3');
                            element.textContent = block.content;
                            break;
                        case 'list':
                            element = document.createElement('ul');
                            element.className = 'blog-detail_list';
                            if (block.listItems && Array.isArray(block.listItems)) {
                                block.listItems.forEach(item => {
                                    const li = document.createElement('li');
                                    li.innerHTML = `<i class="fa-solid fa-check fa-fw"></i>${item}`;
                                    element.appendChild(li);
                                });
                            }
                            break;
                        case 'quote':
                            element = document.createElement('blockquote');
                            element.innerHTML = `
                                <i class="icon-quote-1"></i>
                                ${block.content}
                            `;
                            break;
                        default:
                            return; // Skip unknown block types
                    }
                    if (element) {
                        contentContainer.appendChild(element);
                    }
                });
            }
        }

        // Populate tags
        const tagsContainer = document.getElementById('post-tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = ''; // Clear existing tags
            if (data.tags && Array.isArray(data.tags)) {
                data.tags.forEach(tag => {
                    const tagLink = document.createElement('a');
                    tagLink.href = '#';
                    tagLink.textContent = tag;
                    tagsContainer.appendChild(tagLink);
                });
            }
        }

        // Populate categories
        const categoriesContainer = document.getElementById('blog-categories');
        if (categoriesContainer) {
            categoriesContainer.innerHTML = ''; // Clear existing categories
            if (data.categories && Array.isArray(data.categories)) {
                data.categories.forEach(category => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = '#';
                    a.textContent = category;
                    li.appendChild(a);
                    categoriesContainer.appendChild(li);
                });
            }
        }

        // Populate related posts
        const relatedPostsContainer = document.getElementById('related-posts');
        if (relatedPostsContainer) {
            relatedPostsContainer.innerHTML = ''; // Clear existing posts
            if (data.relatedPosts && Array.isArray(data.relatedPosts)) {
                data.relatedPosts.forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.className = 'post';
                    postDiv.innerHTML = `
                        <div class="thumb">
                            <a href="blog-detail.html">
                                <img src="${post.mainImage}" alt="">
                            </a>
                        </div>
                        <h6><a href="blog-detail.html">${post.title}</a></h6>
                        <div class="post-date">
                            <i class="fa-regular fa-calendar fa-fw"></i> 
                            ${new Date(post.publishDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                            })}
                        </div>
                    `;
                    relatedPostsContainer.appendChild(postDiv);
                });
            }
        }

        // Update comments count
        const commentsCountElement = document.getElementById('comments-count');
        if (commentsCountElement) {
            commentsCountElement.textContent = `${data.comments ? data.comments.length : 0} Comments`;
        }
    } catch (error) {
        console.error('Error fetching blog details:', error);
        
        // Optional: Display error message to user
        const contentContainer = document.getElementById('blog-content');
        if (contentContainer) {
            contentContainer.innerHTML = `
                <div style="color: red; text-align: center;">
                    <p>Unable to load blog content. Please try again later.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        }
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchBlogDetails);