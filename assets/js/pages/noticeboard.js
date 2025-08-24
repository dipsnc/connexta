class NoticeboardPage {
    constructor() {
        this.name = 'noticeboard';
    }

    render(params) {
        const pageContent = document.getElementById('page-content');
        const notices = app.state.getNotices();
        
        pageContent.innerHTML = `
            <!-- Header -->
            <div class="bg-white border-b border-gray-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">Notice Board</h1>
                            <p class="mt-2 text-gray-600">Official announcements and important updates</p>
                        </div>
                        <div class="mt-4 md:mt-0">
                            <button id="post-notice-btn" data-role="manager" class="hidden bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Post Notice
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Notices List -->
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="space-y-6">
                    ${notices.map(notice => this.renderNoticeCard(notice)).join('')}
                </div>
                
                ${notices.length === 0 ? `
                    <div class="text-center py-12">
                        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No Notices Yet</h3>
                        <p class="text-gray-500">Check back soon for important announcements.</p>
                    </div>
                ` : ''}
            </div>
        `;

        // Add event listeners
        this.setupEventListeners();
        
        // Update role-based UI
        app.auth.updateRoleBasedUI();
    }

    renderNoticeCard(notice) {
        const priorityColors = {
            high: 'bg-red-100 text-red-800 border-red-200',
            medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            low: 'bg-green-100 text-green-800 border-green-200'
        };

        const priorityLabels = {
            high: 'High Priority',
            medium: 'Medium Priority',
            low: 'Low Priority'
        };

        return `
            <div class="bg-white rounded-lg shadow-md border-l-4 ${priorityColors[notice.priority]} p-6">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">${notice.title}</h3>
                            <div class="flex items-center space-x-4 text-sm text-gray-500">
                                <span>By ${notice.author}</span>
                                <span>•</span>
                                <span>${app.ui.formatDate(notice.date)}</span>
                                <span>•</span>
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[notice.priority]}">
                                    ${priorityLabels[notice.priority]}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            ${notice.category}
                        </span>
                    </div>
                </div>
                
                <div class="prose max-w-none">
                    <p class="text-gray-700 leading-relaxed">${notice.content}</p>
                </div>
                
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4 text-sm text-gray-500">
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Posted ${app.ui.formatDate(notice.date)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Post notice button
        const postNoticeBtn = document.getElementById('post-notice-btn');
        if (postNoticeBtn) {
            postNoticeBtn.addEventListener('click', () => this.showPostNoticeModal());
        }
    }

    showPostNoticeModal() {
        if (!app.auth.requireAuth('post_notice')) return;

        const modalContent = `
            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Post Official Notice</h3>
                <form id="post-notice-form">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Notice Title</label>
                            <input type="text" name="title" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select name="category" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                <option value="">Select Category</option>
                                <option value="Academic">Academic</option>
                                <option value="Administrative">Administrative</option>
                                <option value="Infrastructure">Infrastructure</option>
                                <option value="Events">Events</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <select name="priority" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                <option value="">Select Priority</option>
                                <option value="high">High Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="low">Low Priority</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <textarea name="content" required rows="6" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Write your official notice here..."></textarea>
                        </div>
                    </div>
                    
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" onclick="app.ui.hideModal()" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Post Notice
                        </button>
                    </div>
                </form>
            </div>
        `;

        app.ui.showModal(modalContent);

        // Handle form submission
        setTimeout(() => {
            const form = document.getElementById('post-notice-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.createNotice();
                });
            }
        }, 100);
    }

    createNotice() {
        const form = document.getElementById('post-notice-form');
        if (!app.ui.validateForm(form)) return;

        const formData = app.ui.getFormData(form);
        const noticeData = {
            ...formData,
            author: app.auth.getUserDisplayName()
        };

        const newNotice = app.state.addNotice(noticeData);
        
        app.ui.hideModal();
                        app.ui.success('Notice posted successfully!');
        
        // Refresh the page
        this.render();
    }
}
