class ClubDetailPage {
    constructor() {
        this.name = 'clubDetail';
    }

    render(params) {
        const clubId = params.id;
        const club = app.state.getClub(clubId);
        
        if (!club) {
            this.show404();
            return;
        }

        const events = app.state.getClubEvents(clubId);
        const pageContent = document.getElementById('page-content');
        
        pageContent.innerHTML = `
            <!-- Back Button -->
            <div class="bg-white border-b border-gray-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div class="flex items-center justify-between">
                        <a href="#/clubs" class="inline-flex items-center text-primary hover:text-blue-700 transition-colors">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                            Back to Clubs
                        </a>
                        <button id="edit-club-btn" data-role="manager" class="hidden bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Edit Club Info
                        </button>
                    </div>
                </div>
            </div>

            <!-- Club Details -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="grid lg:grid-cols-3 gap-8">
                    <!-- Main Content -->
                    <div class="lg:col-span-2">
                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="${club.coverUrl}" alt="${club.name}" class="w-full h-64 object-cover">
                            <div class="p-6">
                                <div class="flex items-center justify-between mb-4">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                        ${club.category}
                                    </span>
                                </div>
                                
                                <h1 class="text-3xl font-bold text-gray-900 mb-4">${club.name}</h1>
                                <p class="text-gray-600 mb-6">${club.description}</p>
                                
                                <div class="mb-6">
                                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Managed by</h3>
                                    <div class="space-y-2">
                                        ${club.leads.map(lead => `
                                            <div class="flex items-center">
                                                <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                                                    ${lead.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p class="text-sm font-medium text-gray-900">${lead.name}</p>
                                                    <p class="text-xs text-gray-500">${lead.roleTitle}</p>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Sidebar -->
                    <div class="lg:col-span-1">
                        <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">Club Info</h3>
                            <div class="space-y-3">
                                <div>
                                    <span class="text-sm text-gray-500">Category</span>
                                    <p class="text-sm font-medium text-gray-900">${club.category}</p>
                                </div>
                                <div>
                                    <span class="text-sm text-gray-500">Leaders</span>
                                    <p class="text-sm font-medium text-gray-900">${club.leads.length}</p>
                                </div>
                                <div>
                                    <span class="text-sm text-gray-500">Events</span>
                                    <p class="text-sm font-medium text-gray-900">${events.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Events Section -->
                <div class="mt-8">
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">🎉 Upcoming & Recent Events by ${club.name}</h2>
                        
                        ${events.length > 0 ? `
                            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                ${events.map(event => this.renderEventCard(event)).join('')}
                            </div>
                        ` : `
                            <div class="text-center py-8">
                                <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <h3 class="text-lg font-medium text-gray-900 mb-2">No Events Yet</h3>
                                <p class="text-gray-500">This club hasn't organized any events yet.</p>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners(clubId);
        app.auth.updateRoleBasedUI();
    }

    renderEventCard(event) {
        return `
            <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer" onclick="app.router.navigate('/events/${event.id}')">
                <div class="flex items-center justify-between mb-2">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        ${event.category}
                    </span>
                    <span class="text-sm text-gray-500">${app.ui.formatDate(event.dateISO)}</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">${event.title}</h3>
                <p class="text-gray-600 text-sm mb-3">${app.ui.truncateText(event.description, 100)}</p>
                
                <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>💬 ${event.discussionsCount} discussions</span>
                    <span>👀 ${event.views} views</span>
                </div>
                
                <span class="text-primary hover:text-blue-700 font-medium text-sm transition-colors">
                    View Event →
                </span>
            </div>
        `;
    }

    setupEventListeners(clubId) {
        const editClubBtn = document.getElementById('edit-club-btn');
        if (editClubBtn) {
            editClubBtn.addEventListener('click', () => {
                this.showEditClubModal(clubId);
            });
        }
    }

    showEditClubModal(clubId) {
        const club = app.state.getClub(clubId);
        if (!club) return;

        const modalContent = `
            <div class="p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">Edit Club Information</h2>
                <form id="edit-club-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea 
                            name="description" 
                            rows="4" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        >${club.description}</textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                        <input 
                            type="url" 
                            name="coverUrl" 
                            value="${club.coverUrl}"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        >
                    </div>
                    <div class="flex justify-end space-x-3 pt-4">
                        <button type="button" onclick="app.ui.hideModal()" class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        `;

        app.ui.showModal(modalContent);

        const form = document.getElementById('edit-club-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateClub(clubId);
        });
    }

    updateClub(clubId) {
        const form = document.getElementById('edit-club-form');
        const formData = app.ui.getFormData(form);
        
        if (app.ui.validateForm(form)) {
            const updatedClub = app.state.updateClub(clubId, {
                description: formData.description,
                coverUrl: formData.coverUrl
            });

            if (updatedClub) {
                app.ui.hideModal();
                app.ui.success('Club information updated successfully!');
                app.ui.confetti();
                this.render({ id: clubId });
            } else {
                app.ui.error('Failed to update club information');
            }
        }
    }

    show404() {
        const pageContent = document.getElementById('page-content');
        pageContent.innerHTML = `
            <div class="min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-6xl font-bold text-gray-300 mb-4">404</h1>
                    <h2 class="text-2xl font-semibold text-gray-600 mb-4">Club Not Found</h2>
                    <p class="text-gray-500 mb-8">The club you're looking for doesn't exist.</p>
                    <a href="#/clubs" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Back to Clubs
                    </a>
                </div>
            </div>
        `;
    }
}
