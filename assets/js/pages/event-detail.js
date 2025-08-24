class EventDetailPage {
    constructor() {
        this.name = 'eventDetail';
        this.discussionSort = 'new'; // 'new' or 'top'
    }

    render(params) {
        const eventId = params.id;
        const event = app.state.getEvent(eventId);
        
        if (!event) {
            this.show404();
            return;
        }

        // Increment views on mount
        app.state.incrementEventViews(eventId);
        
        const discussions = app.state.getDiscussions(eventId, this.discussionSort);
        const club = app.state.getClub(event.clubId);
        const pageContent = document.getElementById('page-content');
        
        pageContent.innerHTML = `
            <!-- Back Button -->
            <div class="bg-white border-b border-gray-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div class="flex items-center justify-between">
                        <a href="#/events" class="inline-flex items-center text-primary hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                            Back to Events
                        </a>
                        ${app.auth.isManager() ? `
                            <div class="flex space-x-2">
                                <button onclick="app.pages.eventDetail.editEvent(${event.id})" class="text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" aria-label="Edit event">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </button>
                                <button onclick="app.pages.eventDetail.deleteEvent(${event.id})" class="text-gray-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" aria-label="Delete event">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>

            <!-- Event Details -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="grid lg:grid-cols-3 gap-8">
                    <!-- Main Content -->
                    <div class="lg:col-span-2">
                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="${event.posterUrl || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400'}" alt="${event.title}" class="w-full h-64 object-cover">
                            <div class="p-6">
                                <div class="flex items-center justify-between mb-4">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        ${event.category}
                                    </span>
                                    ${club ? `
                                        <a href="#/clubs/${club.id}" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
                                            ${club.name}
                                        </a>
                                    ` : ''}
                                </div>
                                
                                <h1 class="text-3xl font-bold text-gray-900 mb-4">${event.title}</h1>
                                <p class="text-gray-600 mb-6">${event.description}</p>
                                
                                <div class="grid md:grid-cols-2 gap-4 mb-6">
                                    <div class="flex items-center">
                                        <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <span class="text-gray-700">${app.ui.formatDate(event.dateISO)}</span>
                                    </div>
                                    <div class="flex items-center">
                                        <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                        <span class="text-gray-700">👀 ${event.views} views</span>
                                    </div>
                                </div>
                                
                                <div class="flex items-center justify-between mb-6">
                                    <div class="flex items-center space-x-4">
                                        <span class="text-gray-700">💬 ${event.discussionsCount} discussions</span>
                                        <span class="text-gray-700">Created by ${event.createdByRole === 'manager' ? 'Club Manager' : 'Student'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Sidebar -->
                    <div class="lg:col-span-1">
                        <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Event Info</h3>
                            <div class="space-y-3">
                                <div>
                                    <span class="text-sm text-gray-500">Category</span>
                                    <p class="text-sm font-medium text-gray-900">${event.category}</p>
                                </div>
                                ${club ? `
                                    <div>
                                        <span class="text-sm text-gray-500">Organizing Club</span>
                                        <p class="text-sm font-medium text-gray-900">${club.name}</p>
                                    </div>
                                ` : ''}
                                <div>
                                    <span class="text-sm text-gray-500">Created</span>
                                    <p class="text-sm font-medium text-gray-900">${app.ui.formatDate(event.createdAtISO)}</p>
                                </div>
                                ${event.updatedAtISO !== event.createdAtISO ? `
                                    <div>
                                        <span class="text-sm text-gray-500">Last Updated</span>
                                        <p class="text-sm font-medium text-gray-900">${app.ui.formatDate(event.updatedAtISO)}</p>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Discussion Section -->
                <div class="mt-8">
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-gray-900">💬 Discussion</h2>
                            <div class="flex items-center space-x-4">
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm text-gray-600">Sort by:</span>
                                    <button id="sort-new" class="text-sm px-3 py-1 rounded ${this.discussionSort === 'new' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}" onclick="app.pages.eventDetail.setSort('new')">
                                        New
                                    </button>
                                    <button id="sort-top" class="text-sm px-3 py-1 rounded ${this.discussionSort === 'top' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}" onclick="app.pages.eventDetail.setSort('top')">
                                        Top
                                    </button>
                                </div>
                                ${app.auth.isLoggedIn() ? `
                                    <button id="new-discussion-btn" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                        New Post
                                    </button>
                                ` : `
                                    <button onclick="app.auth.showLoginModal()" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                                        Login to Post
                                    </button>
                                `}
                            </div>
                        </div>
                        
                        <div id="discussions-container">
                            ${this.renderDiscussions(discussions)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        this.setupEventListeners(eventId);
        
        // Update role-based UI
        app.auth.updateRoleBasedUI();
    }

    setSort(sortBy) {
        this.discussionSort = sortBy;
        this.render({ id: app.router.getParam('id') });
    }

    renderDiscussions(discussions) {
        if (discussions.length === 0) {
            return `
                <div class="text-center py-8">
                    <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">No discussions yet</h3>
                    <p class="text-gray-500">Be the first to start a conversation!</p>
                </div>
            `;
        }

        return discussions.map(discussion => `
            <div class="border-b border-gray-200 pb-6 mb-6 last:border-b-0">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span class="text-white text-sm font-medium">${discussion.authorName.charAt(0)}</span>
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center space-x-2 mb-2">
                            <span class="text-sm font-medium text-gray-900">${discussion.authorName}</span>
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${discussion.authorRole === 'manager' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}">
                                ${discussion.authorRole === 'manager' ? 'Club Manager' : 'Student'}
                            </span>
                            <span class="text-sm text-gray-500">${app.ui.formatDate(discussion.createdAtISO)}</span>
                        </div>
                        <p class="text-gray-700 mb-3">${discussion.content}</p>
                        
                        <div class="flex items-center space-x-4 mb-3">
                            <button onclick="app.pages.eventDetail.upvoteDiscussion(${discussion.id})" class="flex items-center space-x-1 text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" aria-label="Upvote discussion">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                                </svg>
                                <span class="text-sm">${discussion.upvotes}</span>
                            </button>
                            ${app.auth.isLoggedIn() ? `
                                <button onclick="app.pages.eventDetail.showReplyForm(${discussion.id})" class="text-primary hover:text-blue-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                    Reply
                                </button>
                            ` : ''}
                        </div>
                        
                        ${discussion.replies && discussion.replies.length > 0 ? `
                            <div class="ml-4 space-y-3">
                                ${discussion.replies.map(reply => `
                                    <div class="flex items-start space-x-3">
                                        <div class="flex-shrink-0">
                                            <div class="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                                <span class="text-gray-700 text-xs font-medium">${reply.authorName.charAt(0)}</span>
                                            </div>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-center space-x-2 mb-1">
                                                <span class="text-sm font-medium text-gray-900">${reply.authorName}</span>
                                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${reply.authorRole === 'manager' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}">
                                                    ${reply.authorRole === 'manager' ? 'Club Manager' : 'Student'}
                                                </span>
                                                <span class="text-sm text-gray-500">${app.ui.formatDate(reply.createdAtISO)}</span>
                                            </div>
                                            <p class="text-gray-700 text-sm mb-2">${reply.content}</p>
                                            <button onclick="app.pages.eventDetail.upvoteReply(${discussion.id}, ${reply.id})" class="flex items-center space-x-1 text-gray-500 hover:text-blue-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" aria-label="Upvote reply">
                                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                                                </svg>
                                                <span>${reply.upvotes}</span>
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners(eventId) {
        // New discussion button
        const newDiscussionBtn = document.getElementById('new-discussion-btn');
        if (newDiscussionBtn) {
            newDiscussionBtn.addEventListener('click', () => this.showNewDiscussionForm(eventId));
        }
    }

    upvoteDiscussion(discussionId) {
        if (!app.auth.isLoggedIn()) {
            app.auth.showLoginModal();
            return;
        }

        const eventId = app.router.getParam('id');
        const success = app.state.upvoteDiscussion(eventId, discussionId, 'user');
        
        if (success) {
            this.render({ id: eventId });
        }
    }

    upvoteReply(discussionId, replyId) {
        if (!app.auth.isLoggedIn()) {
            app.auth.showLoginModal();
            return;
        }

        const eventId = app.router.getParam('id');
        const success = app.state.upvoteReply(eventId, discussionId, replyId, 'user');
        
        if (success) {
            this.render({ id: eventId });
        }
    }

    showNewDiscussionForm(eventId) {
        if (!app.auth.requireAuth('create_discussion')) return;

        const modalContent = `
            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">New Discussion Post</h3>
                <form id="new-discussion-form">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                        <textarea name="content" id="discussion-content" required rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Share your thoughts about this event..."></textarea>
                    </div>
                    
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" onclick="app.ui.hideModal()" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        `;

        app.ui.showModal(modalContent);

        // Handle form submission
        setTimeout(() => {
            const form = document.getElementById('new-discussion-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.createDiscussion(eventId);
                });
            }
        }, 100);
    }

    createDiscussion(eventId) {
        const form = document.getElementById('new-discussion-form');
        if (!app.ui.validateForm(form)) return;

        const formData = app.ui.getFormData(form);
        const discussionData = {
            authorName: app.auth.getUserDisplayName(),
            content: formData.content
        };

        app.state.addDiscussion(eventId, discussionData);
        
        app.ui.hideModal();
        app.ui.success('Discussion post created!');
        
        // Refresh the page
        this.render({ id: eventId });
    }

    showReplyForm(discussionId) {
        if (!app.auth.requireAuth('join_discussion')) return;

        const modalContent = `
            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Reply to Discussion</h3>
                <form id="reply-form">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Your Reply *</label>
                        <textarea name="content" id="reply-content" required rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Write your reply..."></textarea>
                    </div>
                    
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" onclick="app.ui.hideModal()" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                            Reply
                        </button>
                    </div>
                </form>
            </div>
        `;

        app.ui.showModal(modalContent);

        // Handle form submission
        setTimeout(() => {
            const form = document.getElementById('reply-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.createReply(discussionId);
                });
            }
        }, 100);
    }

    createReply(discussionId) {
        const form = document.getElementById('reply-form');
        if (!app.ui.validateForm(form)) return;

        const formData = app.ui.getFormData(form);
        const replyData = {
            authorName: app.auth.getUserDisplayName(),
            content: formData.content
        };

        const eventId = app.router.getParam('id');
        app.state.addReply(eventId, discussionId, replyData);
        
        app.ui.hideModal();
        app.ui.success('Reply posted!');
        
        // Refresh the page
        this.render({ id: eventId });
    }

    editEvent(eventId) {
        if (!app.auth.requireAuth('edit_event')) return;
        
        app.ui.toast('Edit functionality coming soon!', 'info');
    }

    deleteEvent(eventId) {
        if (!app.auth.requireAuth('delete_event')) return;
        
        const event = app.state.getEvent(eventId);
        if (!event) {
            app.ui.error('Event not found');
            return;
        }

        const modalContent = `
            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Delete Event</h3>
                <p class="text-gray-600 mb-6">Are you sure you want to delete "${event.title}"? This action cannot be undone.</p>
                
                <div class="flex justify-end space-x-3">
                    <button onclick="app.ui.hideModal()" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                        Cancel
                    </button>
                    <button onclick="app.pages.eventDetail.confirmDeleteEvent(${eventId})" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                        Delete Event
                    </button>
                </div>
            </div>
        `;

        app.ui.showModal(modalContent);
    }

    confirmDeleteEvent(eventId) {
        const success = app.state.deleteEvent(eventId);
        
        app.ui.hideModal();
        
        if (success) {
            app.ui.success('Event deleted successfully');
            app.router.navigate('/events');
        } else {
            app.ui.error('Failed to delete event');
        }
    }

    show404() {
        const pageContent = document.getElementById('page-content');
        pageContent.innerHTML = `
            <div class="min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-6xl font-bold text-gray-300 mb-4">404</h1>
                    <h2 class="text-2xl font-semibold text-gray-600 mb-4">Event Not Found</h2>
                    <p class="text-gray-500 mb-8">The event you're looking for doesn't exist.</p>
                    <a href="#/events" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                        Back to Events
                    </a>
                </div>
            </div>
        `;
    }
}
