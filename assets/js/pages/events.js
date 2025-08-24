class EventsPage {
    constructor() {
        this.name = 'events';
        this.filters = {
            search: '',
            category: '',
            clubId: ''
        };
    }

    render(params) {
        const pageContent = document.getElementById('page-content');
        const events = app.state.getEvents(this.filters);
        const hotEvents = app.state.getHotEvents(4);
        const clubs = app.state.getClubs();
        
        pageContent.innerHTML = `
            <!-- Header -->
            <div class="bg-white border-b border-gray-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">🎉 Events</h1>
                            <p class="mt-2 text-gray-600">Discover and join exciting campus events</p>
                        </div>
                        <div class="mt-4 md:mt-0">
                            <button id="create-event-btn" data-role="manager" class="hidden bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                Create Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Trending/Hot Events Section -->
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 py-8">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">🔥 Trending Events</h2>
                    <div class="flex overflow-x-auto space-x-4 pb-4">
                        ${hotEvents.map(event => this.renderHotEventCard(event)).join('')}
                    </div>
                </div>
            </div>

            <!-- Filters -->
            <div class="bg-gray-50 border-b border-gray-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="md:col-span-2">
                            <input type="text" id="search-input" placeholder="Search events..." 
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                   value="${this.filters.search}"
                                   aria-label="Search events">
                        </div>
                        <div>
                            <select id="category-filter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" aria-label="Filter by category">
                                <option value="">All Categories</option>
                                <option value="Workshop" ${this.filters.category === 'Workshop' ? 'selected' : ''}>Workshop</option>
                                <option value="Seminar" ${this.filters.category === 'Seminar' ? 'selected' : ''}>Seminar</option>
                                <option value="Fest" ${this.filters.category === 'Fest' ? 'selected' : ''}>Fest</option>
                                <option value="Hackathon" ${this.filters.category === 'Hackathon' ? 'selected' : ''}>Hackathon</option>
                                <option value="Cultural" ${this.filters.category === 'Cultural' ? 'selected' : ''}>Cultural</option>
                                <option value="Sports" ${this.filters.category === 'Sports' ? 'selected' : ''}>Sports</option>
                                <option value="Other" ${this.filters.category === 'Other' ? 'selected' : ''}>Other</option>
                            </select>
                        </div>
                        <div>
                            <select id="club-filter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" aria-label="Filter by club">
                                <option value="">All Clubs</option>
                                ${clubs.map(club => `
                                    <option value="${club.id}" ${this.filters.clubId === club.id.toString() ? 'selected' : ''}>${club.name}</option>
                                `).join('')}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Events List -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="mb-6">
                    <p class="text-gray-600">Showing ${events.length} event${events.length !== 1 ? 's' : ''}</p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${events.map(event => this.renderEventCard(event)).join('')}
                </div>
                
                ${events.length === 0 ? `
                    <div class="text-center py-12">
                        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
                        <p class="text-gray-500">Try adjusting your search or filters to find events.</p>
                    </div>
                ` : ''}
            </div>
        `;

        // Add event listeners
        this.setupEventListeners();
        
        // Update role-based UI
        app.auth.updateRoleBasedUI();
    }

    renderHotEventCard(event) {
        const club = app.state.getClub(event.clubId);
        return `
            <div class="flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden card-hover">
                <img src="${event.posterUrl || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400'}" alt="${event.title}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            ${event.category}
                        </span>
                        <span class="text-sm text-gray-500">${app.ui.formatDate(event.dateISO)}</span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">${event.title}</h3>
                    <p class="text-gray-600 text-sm mb-3">${app.ui.truncateText(event.description, 100)}</p>
                    
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-sm text-gray-500">💬 ${event.discussionsCount} discussions</span>
                        <span class="text-sm text-gray-500">👀 ${event.views} views</span>
                    </div>
                    
                    ${club ? `
                        <div class="flex items-center justify-between mb-3">
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                ${club.name}
                            </span>
                        </div>
                    ` : ''}
                    
                                         <button onclick="app.router.navigate('/events/${event.id}')" class="text-primary hover:text-blue-700 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                         View Details →
                     </button>
                </div>
            </div>
        `;
    }

    renderEventCard(event) {
        const isManager = app.auth.isManager();
        const club = app.state.getClub(event.clubId);
        
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden card-hover">
                <img src="${event.posterUrl || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400'}" alt="${event.title}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            ${event.category}
                        </span>
                        <span class="text-sm text-gray-500">${app.ui.formatDate(event.dateISO)}</span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">${event.title}</h3>
                    <p class="text-gray-600 text-sm mb-4">${app.ui.truncateText(event.description, 120)}</p>
                    
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-sm text-gray-500">💬 ${event.discussionsCount} discussions</span>
                        <span class="text-sm text-gray-500">👀 ${event.views} views</span>
                    </div>
                    
                    ${club ? `
                        <div class="flex items-center justify-between mb-4">
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                ${club.name}
                            </span>
                        </div>
                    ` : ''}
                    
                                         <div class="flex items-center justify-between">
                         <button onclick="app.router.navigate('/events/${event.id}')" class="text-primary hover:text-blue-700 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                             View Details →
                         </button>
                         ${isManager ? `
                             <div class="flex space-x-2">
                                 <button onclick="app.pages.events.editEvent(${event.id})" class="text-gray-500 hover:text-blue-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" aria-label="Edit event">
                                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                     </svg>
                                 </button>
                                 <button onclick="app.pages.events.deleteEvent(${event.id})" class="text-gray-500 hover:text-red-600 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" aria-label="Delete event">
                                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                     </svg>
                                 </button>
                             </div>
                         ` : ''}
                     </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Search input with debouncing
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', app.ui.debounce((e) => {
                this.filters.search = e.target.value;
                this.render();
            }, 250));
        }

        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filters.category = e.target.value;
                this.render();
            });
        }

        // Club filter
        const clubFilter = document.getElementById('club-filter');
        if (clubFilter) {
            clubFilter.addEventListener('change', (e) => {
                this.filters.clubId = e.target.value;
                this.render();
            });
        }

        // Create event button
        const createEventBtn = document.getElementById('create-event-btn');
        if (createEventBtn) {
            createEventBtn.addEventListener('click', () => this.showCreateEventModal());
        }
    }

    showCreateEventModal() {
        if (!app.auth.requireAuth('create_event')) return;

        const clubs = app.state.getClubs();
        const modalContent = `
            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Create New Event</h3>
                <form id="create-event-form">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                            <input type="text" name="title" id="event-title" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                            <select name="category" id="event-category" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                <option value="">Select Category</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Fest">Fest</option>
                                <option value="Hackathon">Hackathon</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Sports">Sports</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                            <input type="date" name="dateISO" id="event-date" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Club *</label>
                            <select name="clubId" id="event-club" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                <option value="">Select Club</option>
                                ${clubs.map(club => `
                                    <option value="${club.id}">${club.name}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                            <textarea name="description" id="event-description" required rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Poster URL</label>
                            <input type="url" name="posterUrl" id="event-poster" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="https://example.com/image.jpg">
                        </div>
                    </div>
                    
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" onclick="app.ui.hideModal()" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        `;

        app.ui.showModal(modalContent);

        // Handle form submission
        setTimeout(() => {
            const form = document.getElementById('create-event-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.createEvent();
                });
            }
        }, 100);
    }

    createEvent() {
        const form = document.getElementById('create-event-form');
        if (!app.ui.validateForm(form)) return;

        const formData = app.ui.getFormData(form);
        
        // Validate date
        if (!app.ui.validateEventDate(formData.dateISO)) {
            app.ui.showFieldError(document.getElementById('event-date'), 'Event date must be today or in the future');
            return;
        }

        const eventData = {
            ...formData,
            clubId: parseInt(formData.clubId),
            posterUrl: formData.posterUrl || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400'
        };

        const newEvent = app.state.addEvent(eventData);
        
        app.ui.hideModal();
        app.ui.success('Event created successfully!');
        app.ui.confetti();
        
        // Refresh the page
        this.render();
    }

    editEvent(eventId) {
        if (!app.auth.requireAuth('edit_event')) return;
        
        const event = app.state.getEvent(eventId);
        if (!event) {
            app.ui.error('Event not found');
            return;
        }

        // For now, just show a toast - full edit functionality can be added later
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
                    <button onclick="app.pages.events.confirmDeleteEvent(${eventId})" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
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
            this.render();
        } else {
            app.ui.error('Failed to delete event');
        }
    }
}
