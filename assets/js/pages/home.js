class HomePage {
    constructor() {
        this.name = 'home';
    }

    render(params) {
        const pageContent = document.getElementById('page-content');
        const events = app.state.getEvents().slice(0, 3); // Get 3 trending events
        
        pageContent.innerHTML = `
            <!-- Hero Section -->
            <section class="relative bg-gradient-to-br from-blue-50 to-purple-50 py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center">
                        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Welcome to 
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Connexta
                            </span>
                        </h1>
                        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Your one-stop platform for campus events, clubs, and community connections. 
                            Discover exciting opportunities and stay connected with your university community.
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <button id="hero-login-student" class="btn-primary px-8 py-4 text-lg font-semibold rounded-lg text-white">
                                <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                                Join as Student
                            </button>
                            <button id="hero-login-manager" class="btn-secondary px-8 py-4 text-lg font-semibold rounded-lg text-white">
                                <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                                Join as Manager
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="py-16 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
                        <p class="text-lg text-gray-600">Discover all the features that make Connexta the perfect campus companion</p>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">Events</h3>
                            <p class="text-gray-600">Discover and join exciting campus events, workshops, and activities</p>
                        </div>
                        
                        <div class="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">Clubs</h3>
                            <p class="text-gray-600">Explore student clubs and organizations that match your interests</p>
                        </div>
                        
                        <div class="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div class="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">Discussions</h3>
                            <p class="text-gray-600">Engage in meaningful discussions and connect with fellow students</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Trending Events Section -->
            <section class="py-16 bg-gray-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-3xl font-bold text-gray-900">Trending Events</h2>
                        <a href="#/events" class="text-primary hover:text-blue-700 font-medium transition-colors">
                            View All Events →
                        </a>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-6">
                        ${events.map(event => this.renderEventCard(event)).join('')}
                    </div>
                    
                    ${events.length === 0 ? `
                        <div class="text-center py-12">
                            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">No Events Yet</h3>
                            <p class="text-gray-500">Check back soon for exciting campus events!</p>
                        </div>
                    ` : ''}
                </div>
            </section>

            <!-- Stats Section -->
            <section class="py-16 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div class="text-3xl font-bold text-primary mb-2">${app.state.getEvents().length}</div>
                            <div class="text-gray-600">Total Events</div>
                        </div>
                        <div>
                            <div class="text-3xl font-bold text-secondary mb-2">${app.state.getClubs().length}</div>
                            <div class="text-gray-600">Active Clubs</div>
                        </div>
                        <div>
                            <div class="text-3xl font-bold text-accent mb-2">${app.state.getNotices().length}</div>
                            <div class="text-gray-600">Announcements</div>
                        </div>
                        <div>
                            <div class="text-3xl font-bold text-warning mb-2">500+</div>
                            <div class="text-gray-600">Active Users</div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Add event listeners
        this.setupEventListeners();
    }

    renderEventCard(event) {
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src="${event.image}" alt="${event.title}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            ${event.category}
                        </span>
                        <span class="text-sm text-gray-500">${app.ui.formatDate(event.date)}</span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">${event.title}</h3>
                    <p class="text-gray-600 text-sm mb-4">${app.ui.truncateText(event.description, 100)}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">
                            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            ${event.location}
                        </span>
                        <a href="#/events/${event.id}" class="text-primary hover:text-blue-700 font-medium text-sm transition-colors">
                            Learn More →
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Hero CTA buttons
        const studentBtn = document.getElementById('hero-login-student');
        const managerBtn = document.getElementById('hero-login-manager');

        if (studentBtn) {
            studentBtn.addEventListener('click', () => {
                app.auth.login('student');
            });
        }

        if (managerBtn) {
            managerBtn.addEventListener('click', () => {
                app.auth.login('manager');
            });
        }
    }
}
