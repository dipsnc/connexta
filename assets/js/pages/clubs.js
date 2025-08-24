class ClubsPage {
    constructor() {
        this.name = 'clubs';
        this.filters = {
            search: '',
            category: ''
        };
    }

    render(params) {
        const pageContent = document.getElementById('page-content');
        const clubs = app.state.getClubs(this.filters);
        
        pageContent.innerHTML = `
            <!-- Header -->
            <div class="bg-white border-b border-gray-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">🏛️ Clubs</h1>
                        <p class="mt-2 text-gray-600">Explore student clubs and organizations</p>
                    </div>
                </div>
            </div>

            <!-- Filters -->
            <div class="bg-gray-50 border-b border-gray-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="md:col-span-2">
                            <input type="text" id="search-input" placeholder="Search clubs..." 
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                   value="${this.filters.search}">
                        </div>
                        <div>
                            <select id="category-filter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                <option value="">All Categories</option>
                                <option value="Technology" ${this.filters.category === 'Technology' ? 'selected' : ''}>Technology</option>
                                <option value="Cultural" ${this.filters.category === 'Cultural' ? 'selected' : ''}>Cultural</option>
                                <option value="Business" ${this.filters.category === 'Business' ? 'selected' : ''}>Business</option>
                                <option value="Sports" ${this.filters.category === 'Sports' ? 'selected' : ''}>Sports</option>
                                <option value="Arts" ${this.filters.category === 'Arts' ? 'selected' : ''}>Arts</option>
                                <option value="Social" ${this.filters.category === 'Social' ? 'selected' : ''}>Social</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Clubs Grid -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="mb-6">
                    <p class="text-gray-600">Showing ${clubs.length} club${clubs.length !== 1 ? 's' : ''}</p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${clubs.map(club => this.renderClubCard(club)).join('')}
                </div>
                
                ${clubs.length === 0 ? `
                    <div class="text-center py-12">
                        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No Clubs Found</h3>
                        <p class="text-gray-500">Try adjusting your search or filters to find clubs.</p>
                    </div>
                ` : ''}
            </div>
        `;

        // Add event listeners
        this.setupEventListeners();
    }

    renderClubCard(club) {
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer card-hover" onclick="app.router.navigate('/clubs/${club.id}')">
                <img src="${club.coverUrl}" alt="${club.name}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            ${club.category}
                        </span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">${club.name}</h3>
                    <p class="text-gray-600 text-sm mb-4">${app.ui.truncateText(club.description, 120)}</p>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-primary hover:text-blue-700 font-medium text-sm transition-colors">
                            View Club →
                        </span>
                        <div class="text-sm text-gray-500">
                            ${club.leads.length} leader${club.leads.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', app.ui.debounce((e) => {
                this.filters.search = e.target.value;
                this.render();
            }, 300));
        }

        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filters.category = e.target.value;
                this.render();
            });
        }
    }
}
