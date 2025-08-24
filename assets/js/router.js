class Router {
    constructor() {
        this.routes = {
            '/home': 'home',
            '/events': 'events',
            '/events/:id': 'eventDetail',
            '/clubs': 'clubs',
            '/clubs/:id': 'clubDetail',
            '/noticeboard': 'noticeboard',
            '/about': 'about'
        };
        this.currentRoute = null;
        this.currentParams = {};
    }

    init() {
        // Handle initial route
        this.handleRoute();
        
        // Listen for hash changes
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });
    }

    handleRoute() {
        const hash = window.location.hash || '#/home';
        const path = hash.substring(1); // Remove the #
        
        // Find matching route
        const route = this.findRoute(path);
        
        if (route) {
            this.currentRoute = route.path;
            this.currentParams = route.params;
            this.loadPage(route.handler, route.params);
        } else {
            // 404 - redirect to home
            this.navigate('/home');
        }
    }

    findRoute(path) {
        // Check exact matches first
        if (this.routes[path]) {
            return {
                path: path,
                handler: this.routes[path],
                params: {}
            };
        }

        // Check parameterized routes
        for (const routePath in this.routes) {
            const match = this.matchRoute(routePath, path);
            if (match) {
                return {
                    path: routePath,
                    handler: this.routes[routePath],
                    params: match
                };
            }
        }

        return null;
    }

    matchRoute(routePath, currentPath) {
        const routeParts = routePath.split('/');
        const currentParts = currentPath.split('/');

        if (routeParts.length !== currentParts.length) {
            return null;
        }

        const params = {};

        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
                // Parameter
                const paramName = routeParts[i].substring(1);
                params[paramName] = currentParts[i];
            } else if (routeParts[i] !== currentParts[i]) {
                // Static part doesn't match
                return null;
            }
        }

        return params;
    }

    loadPage(handler, params) {
        // Show loading
        app.ui.showLoading();

        // Update navigation highlighting
        this.updateNavigation();

        // Load the page
        setTimeout(() => {
            try {
                if (app.pages[handler]) {
                    app.pages[handler].render(params);
                } else {
                    console.error(`Page handler '${handler}' not found`);
                    this.show404();
                }
            } catch (error) {
                console.error('Error loading page:', error);
                this.show404();
            } finally {
                app.ui.hideLoading();
            }
        }, 100);
    }

    show404() {
        const pageContent = document.getElementById('page-content');
        pageContent.innerHTML = `
            <div class="min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-6xl font-bold text-gray-300 mb-4">404</h1>
                    <h2 class="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
                    <p class="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
                    <a href="#/home" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Go Home
                    </a>
                </div>
            </div>
        `;
    }

    navigate(path) {
        window.location.hash = path;
    }

    updateNavigation() {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'bg-primary', 'bg-opacity-10');
            link.classList.add('text-gray-700');
        });

        // Add active class to current route
        const currentPath = this.currentRoute;
        const activeLink = document.querySelector(`[href="#${currentPath}"]`);
        if (activeLink) {
            activeLink.classList.remove('text-gray-700');
            activeLink.classList.add('text-primary');
            if (activeLink.classList.contains('mobile-nav-link')) {
                activeLink.classList.add('bg-primary', 'bg-opacity-10');
            }
        }
    }

    setupNavigation() {
        // Add click handlers to navigation links
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    this.navigate(href.substring(1));
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });

        // Mobile navigation setup
        this.setupMobileNavigation();

        // Update initial navigation state
        this.updateNavigation();
    }

    setupMobileNavigation() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
        const mobileNavClose = document.getElementById('mobile-nav-close');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.openMobileMenu();
            });
        }

        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        if (mobileNavOverlay) {
            mobileNavOverlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    openMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav');
        const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
        
        if (mobileNav) {
            mobileNav.classList.add('open');
        }
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.remove('hidden');
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav');
        const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
        
        if (mobileNav) {
            mobileNav.classList.remove('open');
        }
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.add('hidden');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    // Get current route info
    getCurrentRoute() {
        return {
            path: this.currentRoute,
            params: this.currentParams
        };
    }

    // Get route parameters
    getParams() {
        return this.currentParams;
    }

    // Get a specific parameter
    getParam(name) {
        return this.currentParams[name];
    }

    // Check if current route matches pattern
    isRoute(pattern) {
        return this.currentRoute === pattern;
    }

    // Check if current route starts with pattern
    isRouteStartsWith(pattern) {
        return this.currentRoute && this.currentRoute.startsWith(pattern);
    }
}
