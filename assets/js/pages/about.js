class AboutPage {
    constructor() {
        this.name = 'about';
    }

    render(params) {
        const pageContent = document.getElementById('page-content');
        
        pageContent.innerHTML = `
            <!-- Background Confetti Circles -->
            <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div class="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-float"></div>
                <div class="absolute top-40 right-20 w-12 h-12 bg-purple-200 rounded-full opacity-25 animate-float-delayed"></div>
                <div class="absolute bottom-32 left-1/4 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-float"></div>
                <div class="absolute top-1/2 right-1/3 w-14 h-14 bg-yellow-200 rounded-full opacity-30 animate-float-delayed"></div>
                <div class="absolute bottom-20 right-10 w-18 h-18 bg-green-200 rounded-full opacity-25 animate-float"></div>
                <div class="absolute top-1/3 left-1/2 w-10 h-10 bg-indigo-200 rounded-full opacity-20 animate-float-delayed"></div>
            </div>

            <!-- Main Content -->
            <div class="relative z-10">
                <!-- Header -->
                <div class="bg-white border-b border-gray-200">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                        <h1 class="text-4xl font-bold text-gray-900 mb-4">About Connexta</h1>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            A one-stop campus connect to discover events, clubs, and discussions.
                        </p>
                    </div>
                </div>

                <!-- Three Columns Section -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div class="grid md:grid-cols-3 gap-8">
                        <!-- Mission -->
                        <div class="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
                            <div class="text-4xl mb-4">🎯</div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-4">Mission</h3>
                            <p class="text-gray-600 leading-relaxed">
                                To create a vibrant digital ecosystem that connects students, clubs, and events seamlessly. 
                                We believe in fostering meaningful interactions and making campus life more engaging through 
                                technology that brings people together.
                            </p>
                        </div>

                        <!-- What You Can Do -->
                        <div class="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
                            <div class="text-4xl mb-4">✨</div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-4">What You Can Do</h3>
                            <ul class="text-gray-600 space-y-2">
                                <li>• Discover and join exciting campus events</li>
                                <li>• Explore diverse student clubs and organizations</li>
                                <li>• Participate in meaningful discussions</li>
                                <li>• Stay updated with official notices</li>
                                <li>• Connect with like-minded peers</li>
                            </ul>
                        </div>

                        <!-- For Club Managers -->
                        <div class="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
                            <div class="text-4xl mb-4">👥</div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-4">For Club Managers</h3>
                            <ul class="text-gray-600 space-y-2">
                                <li>• Create and manage club events</li>
                                <li>• Post official announcements</li>
                                <li>• Engage with your community</li>
                                <li>• Track event participation</li>
                                <li>• Build your club's presence</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- How It Works Timeline -->
                <div class="bg-gray-50 py-16">
                    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
                        <div class="relative">
                            <!-- Timeline Line -->
                            <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-primary"></div>
                            
                            <!-- Timeline Steps -->
                            <div class="space-y-8">
                                <div class="flex items-start">
                                    <div class="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                                        1
                                    </div>
                                    <div class="flex-1 pt-2">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Login</h3>
                                        <p class="text-gray-600">Choose your role as a Student or Club Manager to get started with personalized features.</p>
                                    </div>
                                </div>

                                <div class="flex items-start">
                                    <div class="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                                        2
                                    </div>
                                    <div class="flex-1 pt-2">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Explore Events & Clubs</h3>
                                        <p class="text-gray-600">Browse through upcoming events, discover student clubs, and find activities that interest you.</p>
                                    </div>
                                </div>

                                <div class="flex items-start">
                                    <div class="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                                        3
                                    </div>
                                    <div class="flex-1 pt-2">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Discuss & Engage</h3>
                                        <p class="text-gray-600">Join discussions, ask questions, and connect with other students and club members.</p>
                                    </div>
                                </div>

                                <div class="flex items-start">
                                    <div class="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                                        4
                                    </div>
                                    <div class="flex-1 pt-2">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Stay Connected</h3>
                                        <p class="text-gray-600">Get notified about new events, important notices, and stay updated with campus activities.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FAQ Section -->
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
                    <div class="space-y-4">
                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <button class="faq-toggle w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors" data-target="faq1">
                                <span class="font-semibold text-gray-900">How do I join a club or event?</span>
                                <svg class="w-5 h-5 text-gray-500 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div id="faq1" class="faq-content hidden px-6 pb-4">
                                <p class="text-gray-600">
                                    Simply browse through the clubs or events sections, click on any that interest you, and use the "Join" or "Register" button. 
                                    For events, you can also participate in discussions to engage with the community.
                                </p>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <button class="faq-toggle w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors" data-target="faq2">
                                <span class="font-semibold text-gray-900">Can I create events as a student?</span>
                                <svg class="w-5 h-5 text-gray-500 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div id="faq2" class="faq-content hidden px-6 pb-4">
                                <p class="text-gray-600">
                                    Currently, only Club Managers can create and manage events. However, students can participate in discussions, 
                                    join events, and engage with the community. If you're interested in becoming a Club Manager, 
                                    contact your club's leadership team.
                                </p>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <button class="faq-toggle w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors" data-target="faq3">
                                <span class="font-semibold text-gray-900">How do I stay updated with new content?</span>
                                <svg class="w-5 h-5 text-gray-500 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div id="faq3" class="faq-content hidden px-6 pb-4">
                                <p class="text-gray-600">
                                    Check the Notice Board regularly for official announcements, and browse the Events and Clubs sections 
                                    for new activities. The platform automatically shows the latest content first, so you'll always see 
                                    what's new when you visit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // FAQ Accordion functionality
        const faqToggles = document.querySelectorAll('.faq-toggle');
        
        faqToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const targetId = toggle.getAttribute('data-target');
                const content = document.getElementById(targetId);
                const icon = toggle.querySelector('svg');
                
                // Toggle the clicked item
                content.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
                
                // Close other open items
                faqToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        const otherTargetId = otherToggle.getAttribute('data-target');
                        const otherContent = document.getElementById(otherTargetId);
                        const otherIcon = otherToggle.querySelector('svg');
                        
                        otherContent.classList.add('hidden');
                        otherIcon.classList.remove('rotate-180');
                    }
                });
            });
        });
    }
}
