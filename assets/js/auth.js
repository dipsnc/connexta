class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Load existing session
        this.currentUser = app.state.getSession();
        this.updateUI();
        
        // Set up event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login button
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.showLoginModal());
        }

        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    showLoginModal() {
        const modalContent = `
            <div class="p-6">
                <div class="text-center mb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Choose Your Role</h3>
                    <p class="text-sm text-gray-600">Select your role to access Connexta</p>
                </div>
                
                <div class="space-y-4">
                    <button id="login-student" class="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                        <div class="text-left">
                            <div class="font-semibold">Student</div>
                            <div class="text-sm opacity-90">View events, join discussions, read notices</div>
                        </div>
                    </button>
                    
                    <button id="login-manager" class="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 transform hover:scale-105">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        <div class="text-left">
                            <div class="font-semibold">Club Manager</div>
                            <div class="text-sm opacity-90">Create events, post notices, manage content</div>
                        </div>
                    </button>
                </div>
                
                <div class="mt-6 text-center">
                    <button id="cancel-login" class="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        `;

        app.ui.showModal(modalContent).then(() => {
            // Modal closed
        });

        // Add event listeners to modal buttons
        setTimeout(() => {
            const studentBtn = document.getElementById('login-student');
            const managerBtn = document.getElementById('login-manager');
            const cancelBtn = document.getElementById('cancel-login');

            if (studentBtn) {
                studentBtn.addEventListener('click', () => this.login('student'));
            }
            if (managerBtn) {
                managerBtn.addEventListener('click', () => this.login('manager'));
            }
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => app.ui.hideModal());
            }
        }, 100);
    }

    login(role) {
        // Create user session
        this.currentUser = {
            role: role,
            name: role === 'student' ? 'Student User' : 'Club Manager',
            email: role === 'student' ? 'student@university.edu' : 'manager@university.edu',
            loginTime: new Date().toISOString()
        };

        // Save session
        app.state.setSession(this.currentUser);

        // Update UI
        this.updateUI();

        // Close modal
        app.ui.hideModal();

        // Show success feedback
        app.ui.confetti();
        app.ui.showToast(`Logged in as ${role === 'student' ? 'Student' : 'Club Manager'}`, 'success');

        // Trigger any role-specific UI updates
        this.onRoleChange();
    }

    logout() {
        // Clear session
        this.currentUser = null;
        app.state.clearSession();

        // Update UI
        this.updateUI();

        // Show feedback
        app.ui.showToast('Logged out successfully', 'info');

        // Trigger any role-specific UI updates
        this.onRoleChange();
    }

    updateUI() {
        const loginBtn = document.getElementById('login-btn');
        const userInfo = document.getElementById('user-info');
        const userRole = document.getElementById('user-role');

        if (this.currentUser) {
            // User is logged in
            if (loginBtn) loginBtn.classList.add('hidden');
            if (userInfo) {
                userInfo.classList.remove('hidden');
                if (userRole) {
                    userRole.innerHTML = `
                        <span class="role-pill ${this.currentUser.role}">
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                            </svg>
                            ${this.currentUser.role === 'student' ? 'Student' : 'Club Manager'}
                        </span>
                    `;
                }
            }
        } else {
            // User is not logged in
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (userInfo) userInfo.classList.add('hidden');
        }
    }

    onRoleChange() {
        // Update any role-specific UI elements
        this.updateRoleBasedUI();
        
        // Trigger page refresh if needed
        if (app.router && app.router.currentRoute) {
            app.router.navigate(app.router.currentRoute);
        }
    }

    updateRoleBasedUI() {
        // Show/hide manager-only buttons
        const managerOnlyElements = document.querySelectorAll('[data-role="manager"]');
        const studentOnlyElements = document.querySelectorAll('[data-role="student"]');

        managerOnlyElements.forEach(element => {
            if (this.currentUser && this.currentUser.role === 'manager') {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        });

        studentOnlyElements.forEach(element => {
            if (this.currentUser && this.currentUser.role === 'student') {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        });
    }

    // Access control methods
    isLoggedIn() {
        return this.currentUser !== null;
    }

    isStudent() {
        return this.currentUser && this.currentUser.role === 'student';
    }

    isManager() {
        return this.currentUser && this.currentUser.role === 'manager';
    }

    canCreateEvent() {
        return this.isManager();
    }

    canEditEvent(event) {
        return this.isManager();
    }

    canDeleteEvent(event) {
        return this.isManager();
    }

    canPostNotice() {
        return this.isManager();
    }

    canJoinDiscussion() {
        return this.isLoggedIn();
    }

    canCreateDiscussion() {
        return this.isLoggedIn();
    }

    // Get current user info
    getCurrentUser() {
        return this.currentUser;
    }

    // Get user display name
    getUserDisplayName() {
        if (!this.currentUser) return 'Guest';
        return this.currentUser.name;
    }

    // Get user role display name
    getRoleDisplayName() {
        if (!this.currentUser) return 'Guest';
        return this.currentUser.role === 'student' ? 'Student' : 'Club Manager';
    }

    // Check if user has permission for specific action
    hasPermission(action) {
        switch (action) {
            case 'create_event':
            case 'edit_event':
            case 'delete_event':
            case 'post_notice':
                return this.isManager();
            case 'view_events':
            case 'join_discussion':
            case 'create_discussion':
            case 'view_notices':
                return this.isLoggedIn();
            default:
                return false;
        }
    }

    // Require authentication for protected actions
    requireAuth(action) {
        if (!this.hasPermission(action)) {
            if (!this.isLoggedIn()) {
                app.ui.showToast('Please log in to access this feature', 'warning');
                this.showLoginModal();
                return false;
            } else {
                app.ui.showToast('You do not have permission for this action', 'error');
                return false;
            }
        }
        return true;
    }
}
