class AppState {
    constructor() {
        this.data = {
            events: [],
            clubs: [],
            notices: [],
            discussions: {},
            userSessions: {}
        };
        this.loadData();
    }

    // Mock data for initial seeding
    getMockData() {
        return {
            events: [
                {
                    id: 1,
                    title: "Tech Innovation Summit 2025",
                    description: "Join us for a day of cutting-edge technology discussions, workshops, and networking opportunities. Learn about the latest trends in AI, machine learning, and software development from industry experts.",
                    dateISO: "2025-09-15T09:00:00Z",
                    category: "Workshop",
                    clubId: 1,
                    posterUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400",
                    views: 245,
                    discussionsCount: 12,
                    createdAtISO: "2025-08-01T10:00:00Z",
                    updatedAtISO: "2025-08-15T14:30:00Z",
                    createdByRole: "manager"
                },
                {
                    id: 2,
                    title: "Cultural Fest 2025",
                    description: "Celebrate diversity through music, dance, and art performances from around the world. Experience traditional and contemporary cultural expressions.",
                    dateISO: "2025-09-22T18:00:00Z",
                    category: "Cultural",
                    clubId: 2,
                    posterUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
                    views: 189,
                    discussionsCount: 8,
                    createdAtISO: "2025-08-05T16:00:00Z",
                    updatedAtISO: "2025-08-10T11:20:00Z",
                    createdByRole: "manager"
                },
                {
                    id: 3,
                    title: "Startup Pitch Competition",
                    description: "Showcase your innovative business ideas and compete for funding and mentorship opportunities. Network with investors and successful entrepreneurs.",
                    dateISO: "2025-09-08T14:00:00Z",
                    category: "Hackathon",
                    clubId: 3,
                    posterUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
                    views: 156,
                    discussionsCount: 15,
                    createdAtISO: "2025-07-28T09:00:00Z",
                    updatedAtISO: "2025-08-20T13:45:00Z",
                    createdByRole: "manager"
                },
                {
                    id: 4,
                    title: "Annual Sports Meet 2025",
                    description: "Annual inter-college sports competition featuring athletics, football, basketball, and more. Compete for glory and represent your college.",
                    dateISO: "2025-09-28T08:00:00Z",
                    category: "Sports",
                    clubId: 4,
                    posterUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
                    views: 312,
                    discussionsCount: 6,
                    createdAtISO: "2025-08-12T12:00:00Z",
                    updatedAtISO: "2025-08-25T10:15:00Z",
                    createdByRole: "manager"
                },
                {
                    id: 5,
                    title: "AI & Machine Learning Seminar",
                    description: "Deep dive into artificial intelligence and machine learning concepts. Hands-on workshops with real-world applications and case studies.",
                    dateISO: "2025-09-12T10:00:00Z",
                    category: "Seminar",
                    clubId: 1,
                    posterUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
                    views: 178,
                    discussionsCount: 22,
                    createdAtISO: "2025-08-08T14:00:00Z",
                    updatedAtISO: "2025-08-18T16:30:00Z",
                    createdByRole: "manager"
                },
                {
                    id: 6,
                    title: "Coding Bootcamp Weekend",
                    description: "Intensive weekend coding bootcamp covering web development, mobile apps, and cloud computing. Perfect for beginners and intermediate developers.",
                    dateISO: "2025-09-19T09:00:00Z",
                    category: "Workshop",
                    clubId: 1,
                    posterUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400",
                    views: 134,
                    discussionsCount: 9,
                    createdAtISO: "2025-08-15T11:00:00Z",
                    updatedAtISO: "2025-08-22T15:20:00Z",
                    createdByRole: "manager"
                },
                {
                    id: 7,
                    title: "Music & Arts Festival",
                    description: "A celebration of creativity featuring live music performances, art exhibitions, poetry readings, and interactive workshops.",
                    dateISO: "2025-09-25T16:00:00Z",
                    category: "Cultural",
                    clubId: 2,
                    posterUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
                    views: 267,
                    discussionsCount: 11,
                    createdAtISO: "2025-08-03T13:00:00Z",
                    updatedAtISO: "2025-08-16T12:45:00Z",
                    createdByRole: "manager"
                },
                {
                    id: 8,
                    title: "Basketball Championship Finals",
                    description: "Witness the thrilling finals of the inter-college basketball championship. Cheer for your team and enjoy the competitive spirit.",
                    dateISO: "2025-09-30T19:00:00Z",
                    category: "Sports",
                    clubId: 4,
                    posterUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400",
                    views: 423,
                    discussionsCount: 18,
                    createdAtISO: "2025-08-20T08:00:00Z",
                    updatedAtISO: "2025-08-28T17:30:00Z",
                    createdByRole: "manager"
                }
            ],
            clubs: [
                {
                    id: 1,
                    name: "Computer Science Club",
                    description: "A community of tech enthusiasts focused on programming, AI, and software development. We organize hackathons, coding workshops, and tech talks to help students build their technical skills.",
                    category: "Technology",
                    coverUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400",
                    leads: [
                        { name: "Alex Chen", roleTitle: "President" },
                        { name: "Sarah Kim", roleTitle: "Vice President" }
                    ]
                },
                {
                    id: 2,
                    name: "Cultural Society",
                    description: "Promoting cultural diversity through arts, music, and traditional performances. We celebrate different cultures and organize cultural festivals, dance competitions, and art exhibitions.",
                    category: "Cultural",
                    coverUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
                    leads: [
                        { name: "Priya Sharma", roleTitle: "Cultural Secretary" },
                        { name: "Marcus Johnson", roleTitle: "Events Coordinator" }
                    ]
                },
                {
                    id: 3,
                    name: "Entrepreneurship Club",
                    description: "Fostering innovation and business acumen through workshops and startup initiatives. We help students develop entrepreneurial skills and connect with industry mentors.",
                    category: "Business",
                    coverUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
                    leads: [
                        { name: "David Park", roleTitle: "Club President" },
                        { name: "Emily Rodriguez", roleTitle: "Program Director" }
                    ]
                },
                {
                    id: 4,
                    name: "Sports Council",
                    description: "Organizing sports events and promoting physical fitness among students. We manage inter-college tournaments, fitness programs, and sports workshops.",
                    category: "Sports",
                    coverUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
                    leads: [
                        { name: "Michael Thompson", roleTitle: "Sports Secretary" },
                        { name: "Lisa Wang", roleTitle: "Tournament Director" }
                    ]
                },
                {
                    id: 5,
                    name: "Robotics Society",
                    description: "Building the future through robotics and automation. We design, build, and program robots for competitions and research projects.",
                    category: "Technology",
                    coverUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
                    leads: [
                        { name: "Ryan Zhang", roleTitle: "Technical Lead" },
                        { name: "Sophie Anderson", roleTitle: "Project Manager" }
                    ]
                },
                {
                    id: 6,
                    name: "Literary Club",
                    description: "Celebrating the power of words through poetry, creative writing, and literary discussions. We host writing workshops, poetry slams, and book clubs.",
                    category: "Cultural",
                    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
                    leads: [
                        { name: "Isabella Martinez", roleTitle: "Literary Secretary" },
                        { name: "James Wilson", roleTitle: "Creative Director" }
                    ]
                },
                {
                    id: 7,
                    name: "Photography Circle",
                    description: "Capturing moments and telling stories through the lens. We organize photo walks, workshops, and exhibitions to develop photography skills.",
                    category: "Arts",
                    coverUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
                    leads: [
                        { name: "Emma Davis", roleTitle: "Photography Lead" },
                        { name: "Carlos Mendez", roleTitle: "Events Coordinator" }
                    ]
                },
                {
                    id: 8,
                    name: "Environmental Club",
                    description: "Promoting sustainability and environmental awareness on campus. We organize tree planting drives, recycling initiatives, and environmental workshops.",
                    category: "Social",
                    coverUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
                    leads: [
                        { name: "Green Team", roleTitle: "Environmental Coordinators" },
                        { name: "Sustainability Committee", roleTitle: "Program Leaders" }
                    ]
                }
            ],
            notices: [
                {
                    id: 1,
                    title: "Fall Semester Welcome Announcement",
                    body: "Welcome to the Fall Semester 2025! Classes begin on September 1st, 2025. All academic activities will commence as scheduled. Students are advised to check their course schedules and attend orientation sessions. Important updates will be shared through the student portal.",
                    category: "General",
                    postedAtISO: "2025-08-25T09:00:00Z",
                    postedBy: { name: "University Administration", role: "Admin" },
                    pinned: true
                },
                {
                    id: 2,
                    title: "Library Extended Hours for Study Week",
                    body: "The main library will have extended hours during study week (Sep 8-15) from 7 AM to 11 PM. Additional study spaces have been allocated in the student center and computer labs. Please maintain quiet study environment and respect the extended hours policy.",
                    category: "Exam",
                    postedAtISO: "2025-09-05T14:30:00Z",
                    postedBy: { name: "Library Services", role: "Admin" },
                    pinned: false
                },
                {
                    id: 3,
                    title: "Campus WiFi Maintenance Schedule",
                    body: "Scheduled maintenance on campus WiFi will occur on September 8th from 2 AM to 6 AM. Intermittent connectivity is expected during this period. Students are advised to download any required materials beforehand. The IT team will provide updates on the status page.",
                    category: "Update",
                    postedAtISO: "2025-09-07T11:15:00Z",
                    postedBy: { name: "IT Services", role: "Admin" },
                    pinned: false
                },
                {
                    id: 4,
                    title: "New Campus Dress Code Policy",
                    body: "Effective immediately, all students must adhere to the new dress code policy. Business casual attire is required for all academic buildings and events. This includes collared shirts, appropriate footwear, and professional appearance. Violations will result in warnings and potential disciplinary action.",
                    category: "Rule",
                    postedAtISO: "2025-08-28T16:45:00Z",
                    postedBy: { name: "Student Council", role: "StudentCouncil" },
                    pinned: true
                },
                {
                    id: 5,
                    title: "Placement Drive: Tech Companies Registration Open",
                    body: "Registration for the upcoming placement drive is now open. Top tech companies including Google, Microsoft, Amazon, and local startups will be participating. Students in their final year can register through the placement portal. Deadline for registration is September 15th. Prepare your resumes and portfolio.",
                    category: "Placement",
                    postedAtISO: "2025-08-30T10:20:00Z",
                    postedBy: { name: "Placement Cell", role: "Admin" },
                    pinned: true
                },
                {
                    id: 6,
                    title: "Cultural Fest 2025: Call for Performers",
                    body: "The annual cultural fest is seeking performers for various events including music, dance, drama, and art exhibitions. Auditions will be held on September 12th and 13th. Interested students should register with the Cultural Society. This is a great opportunity to showcase your talents and represent your college.",
                    category: "General",
                    postedAtISO: "2025-09-02T13:00:00Z",
                    postedBy: { name: "Priya Sharma", role: "ClubManager" },
                    pinned: false
                },
                {
                    id: 7,
                    title: "Exam Schedule for Semester 1",
                    body: "The examination schedule for Semester 1 has been finalized. All exams will be conducted in the main auditorium and designated classrooms. Students must carry their ID cards and arrive 30 minutes before the exam time. The detailed schedule is available on the student portal. No electronic devices are allowed in the examination hall.",
                    category: "Exam",
                    postedAtISO: "2025-08-25T15:30:00Z",
                    postedBy: { name: "Academic Office", role: "Admin" },
                    pinned: false
                },
                {
                    id: 8,
                    title: "Holiday: Labor Day Celebrations",
                    body: "The university will remain closed on September 1st, 2025, for Labor Day celebrations. A special ceremony will be organized at 8 AM in the main campus ground. All students and staff are invited to participate. Cultural programs will follow the ceremony.",
                    category: "Holiday",
                    postedAtISO: "2025-08-20T12:00:00Z",
                    postedBy: { name: "University Administration", role: "Admin" },
                    pinned: false
                },
                {
                    id: 9,
                    title: "Campus Safety Guidelines",
                    body: "Important safety guidelines for all students: Always carry your ID card, report suspicious activities to security, use designated parking areas, and follow COVID-19 protocols. Emergency contact numbers are displayed in all buildings. Your safety is our priority.",
                    category: "Rule",
                    postedAtISO: "2025-08-22T09:45:00Z",
                    postedBy: { name: "Campus Security", role: "Admin" },
                    pinned: false
                },
                {
                    id: 10,
                    title: "Sports Meet Registration Deadline Extended",
                    body: "Due to popular demand, the registration deadline for the annual sports meet has been extended to September 20th. Events include athletics, football, basketball, cricket, and indoor games. Winners will receive certificates and trophies. Register now to secure your spot!",
                    category: "General",
                    postedAtISO: "2025-09-03T17:30:00Z",
                    postedBy: { name: "Michael Thompson", role: "ClubManager" },
                    pinned: false
                }
            ],
            discussions: {
                1: [
                    {
                        id: 1,
                        eventId: 1,
                        authorRole: "student",
                        authorName: "John Doe",
                        content: "Looking forward to the AI workshop! Anyone interested in forming a study group?",
                        upvotes: 5,
                        createdAtISO: "2025-09-01T10:30:00Z",
                        replies: [
                            {
                                id: 1,
                                postId: 1,
                                authorRole: "student",
                                authorName: "Jane Smith",
                                content: "Count me in! I'm particularly interested in machine learning.",
                                upvotes: 3,
                                createdAtISO: "2025-09-01T11:15:00Z"
                            },
                            {
                                id: 2,
                                postId: 1,
                                authorRole: "manager",
                                authorName: "Tech Club Manager",
                                content: "Great initiative! We'll have some additional resources available during the workshop.",
                                upvotes: 7,
                                createdAtISO: "2025-09-01T14:20:00Z"
                            }
                        ]
                    },
                    {
                        id: 2,
                        eventId: 1,
                        authorRole: "student",
                        authorName: "Mike Johnson",
                        content: "What programming languages will be covered in the workshop?",
                        upvotes: 2,
                        createdAtISO: "2025-09-02T09:45:00Z",
                        replies: []
                    }
                ],
                3: [
                    {
                        id: 1,
                        eventId: 3,
                        authorRole: "student",
                        authorName: "Sarah Wilson",
                        content: "This is exactly what I need for my startup idea! Any tips for preparing the pitch?",
                        upvotes: 8,
                        createdAtISO: "2025-08-30T16:00:00Z",
                        replies: [
                            {
                                id: 1,
                                postId: 1,
                                authorRole: "manager",
                                authorName: "Entrepreneurship Club Manager",
                                content: "Focus on your unique value proposition and have clear financial projections ready!",
                                upvotes: 12,
                                createdAtISO: "2025-08-30T17:30:00Z"
                            }
                        ]
                    }
                ]
            }
        };
    }

    // Load data from localStorage or use mock data
    loadData() {
        try {
            const stored = localStorage.getItem('connexta_data');
            if (stored) {
                this.data = JSON.parse(stored);
            } else {
                this.data = this.getMockData();
                this.saveData();
            }
        } catch (error) {
            console.error('Error loading data:', error);
            this.data = this.getMockData();
        }
    }

    // Save data to localStorage
    saveData() {
        try {
            localStorage.setItem('connexta_data', JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    // Event methods
    getEvents(filters = {}) {
        let events = [...this.data.events];
        
        if (filters.category) {
            events = events.filter(event => event.category === filters.category);
        }
        
        if (filters.search) {
            const search = filters.search.toLowerCase();
            events = events.filter(event => 
                event.title.toLowerCase().includes(search) ||
                event.description.toLowerCase().includes(search)
            );
        }
        
        if (filters.clubId) {
            events = events.filter(event => event.clubId === parseInt(filters.clubId));
        }
        
        if (filters.status) {
            events = events.filter(event => event.status === filters.status);
        }
        
        return events.sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
    }

    getHotEvents(limit = 4) {
        const events = [...this.data.events];
        return events
            .map(event => ({
                ...event,
                popularityScore: (event.views * 0.6) + (event.discussionsCount * 0.4)
            }))
            .sort((a, b) => b.popularityScore - a.popularityScore)
            .slice(0, limit);
    }

    getEvent(id) {
        return this.data.events.find(event => event.id === parseInt(id));
    }

    addEvent(event) {
        event.id = Math.max(...this.data.events.map(e => e.id), 0) + 1;
        event.views = 0;
        event.discussionsCount = 0;
        event.createdAtISO = new Date().toISOString();
        event.updatedAtISO = new Date().toISOString();
        event.createdByRole = app.auth.isManager() ? "manager" : "student";
        this.data.events.push(event);
        this.saveData();
        return event;
    }

    updateEvent(id, updates) {
        const index = this.data.events.findIndex(event => event.id === parseInt(id));
        if (index !== -1) {
            this.data.events[index] = { 
                ...this.data.events[index], 
                ...updates,
                updatedAtISO: new Date().toISOString()
            };
            this.saveData();
            return this.data.events[index];
        }
        return null;
    }

    deleteEvent(id) {
        const index = this.data.events.findIndex(event => event.id === parseInt(id));
        if (index !== -1) {
            this.data.events.splice(index, 1);
            // Also delete associated discussions
            delete this.data.discussions[id];
            this.saveData();
            return true;
        }
        return false;
    }

    incrementEventViews(id) {
        const event = this.getEvent(id);
        if (event) {
            event.views++;
            this.saveData();
        }
    }

    // Club methods
    getClubs(filters = {}) {
        let clubs = [...this.data.clubs];
        
        if (filters.category) {
            clubs = clubs.filter(club => club.category === filters.category);
        }
        
        if (filters.search) {
            const search = filters.search.toLowerCase();
            clubs = clubs.filter(club => 
                club.name.toLowerCase().includes(search) ||
                club.description.toLowerCase().includes(search)
            );
        }
        
        return clubs;
    }

    getClub(id) {
        return this.data.clubs.find(club => club.id === parseInt(id));
    }

    updateClub(id, updates) {
        const index = this.data.clubs.findIndex(club => club.id === parseInt(id));
        if (index !== -1) {
            this.data.clubs[index] = { ...this.data.clubs[index], ...updates };
            this.saveData();
            return this.data.clubs[index];
        }
        return null;
    }

    getClubEvents(clubId) {
        return this.data.events.filter(event => event.clubId === parseInt(clubId));
    }

    // Notice methods
    getNotices(filters = {}) {
        let notices = [...this.data.notices];
        
        if (filters.category) {
            notices = notices.filter(notice => notice.category === filters.category);
        }
        
        if (filters.search) {
            const search = filters.search.toLowerCase();
            notices = notices.filter(notice => 
                notice.title.toLowerCase().includes(search) ||
                notice.body.toLowerCase().includes(search)
            );
        }
        
        // Sort by pinned first (if enabled), then by posted date
        if (filters.showPinnedFirst !== false) {
            notices.sort((a, b) => {
                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;
                return new Date(b.postedAtISO) - new Date(a.postedAtISO);
            });
        } else {
            notices.sort((a, b) => new Date(b.postedAtISO) - new Date(a.postedAtISO));
        }
        
        return notices;
    }

    addNotice(notice) {
        notice.id = Math.max(...this.data.notices.map(n => n.id), 0) + 1;
        notice.postedAtISO = new Date().toISOString();
        notice.postedBy = {
            name: app.auth.isManager() ? "Club Manager" : "Student Council",
            role: app.auth.isManager() ? "ClubManager" : "StudentCouncil"
        };
        notice.pinned = false;
        this.data.notices.push(notice);
        this.saveData();
        return notice;
    }

    updateNotice(id, updates) {
        const index = this.data.notices.findIndex(notice => notice.id === parseInt(id));
        if (index !== -1) {
            this.data.notices[index] = { ...this.data.notices[index], ...updates };
            this.saveData();
            return this.data.notices[index];
        }
        return null;
    }

    deleteNotice(id) {
        const index = this.data.notices.findIndex(notice => notice.id === parseInt(id));
        if (index !== -1) {
            this.data.notices.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    }

    toggleNoticePin(id) {
        const notice = this.data.notices.find(n => n.id === parseInt(id));
        if (notice) {
            notice.pinned = !notice.pinned;
            this.saveData();
            return notice;
        }
        return null;
    }

    canEditNotice(notice) {
        if (!app.auth.isLoggedIn()) return false;
        if (app.auth.isManager()) {
            return notice.postedBy.role === "ClubManager";
        }
        return false;
    }

    // Discussion methods
    getDiscussions(eventId, sortBy = 'new') {
        const discussions = this.data.discussions[eventId] || [];
        
        if (sortBy === 'top') {
            return discussions.sort((a, b) => b.upvotes - a.upvotes);
        } else {
            return discussions.sort((a, b) => new Date(b.createdAtISO) - new Date(a.createdAtISO));
        }
    }

    addDiscussion(eventId, discussion) {
        if (!this.data.discussions[eventId]) {
            this.data.discussions[eventId] = [];
        }
        
        discussion.id = Math.max(...this.data.discussions[eventId].map(d => d.id), 0) + 1;
        discussion.eventId = parseInt(eventId);
        discussion.createdAtISO = new Date().toISOString();
        discussion.upvotes = 0;
        discussion.replies = discussion.replies || [];
        discussion.authorRole = app.auth.isManager() ? "manager" : "student";
        
        this.data.discussions[eventId].push(discussion);
        
        // Update event's discussion count
        const event = this.getEvent(eventId);
        if (event) {
            event.discussionsCount++;
            this.saveData();
        }
        
        return discussion;
    }

    addReply(eventId, discussionId, reply) {
        const discussion = this.data.discussions[eventId]?.find(d => d.id === discussionId);
        if (discussion) {
            reply.id = Math.max(...discussion.replies.map(r => r.id), 0) + 1;
            reply.postId = discussionId;
            reply.createdAtISO = new Date().toISOString();
            reply.upvotes = 0;
            reply.authorRole = app.auth.isManager() ? "manager" : "student";
            discussion.replies.push(reply);
            this.saveData();
            return reply;
        }
        return null;
    }

    upvoteDiscussion(eventId, discussionId, userId) {
        const discussion = this.data.discussions[eventId]?.find(d => d.id === discussionId);
        if (discussion) {
            const upvoteKey = `upvote_${eventId}_${discussionId}`;
            const hasUpvoted = localStorage.getItem(upvoteKey);
            
            if (!hasUpvoted) {
                discussion.upvotes++;
                localStorage.setItem(upvoteKey, 'true');
                this.saveData();
                return true;
            }
        }
        return false;
    }

    upvoteReply(eventId, discussionId, replyId, userId) {
        const discussion = this.data.discussions[eventId]?.find(d => d.id === discussionId);
        if (discussion) {
            const reply = discussion.replies.find(r => r.id === replyId);
            if (reply) {
                const upvoteKey = `upvote_reply_${eventId}_${discussionId}_${replyId}`;
                const hasUpvoted = localStorage.getItem(upvoteKey);
                
                if (!hasUpvoted) {
                    reply.upvotes++;
                    localStorage.setItem(upvoteKey, 'true');
                    this.saveData();
                    return true;
                }
            }
        }
        return false;
    }

    // Session management
    getSession() {
        try {
            const session = localStorage.getItem('connexta_session');
            return session ? JSON.parse(session) : null;
        } catch (error) {
            console.error('Error loading session:', error);
            return null;
        }
    }

    setSession(session) {
        try {
            localStorage.setItem('connexta_session', JSON.stringify(session));
        } catch (error) {
            console.error('Error saving session:', error);
        }
    }

    clearSession() {
        try {
            localStorage.removeItem('connexta_session');
        } catch (error) {
            console.error('Error clearing session:', error);
        }
    }

    // Development helper to reset to mock data
    reset() {
        try {
            localStorage.removeItem('connexta_data');
            this.data = this.getMockData();
            this.saveData();
            console.log('AppState reset to mock data');
            return true;
        } catch (error) {
            console.error('Error resetting data:', error);
            return false;
        }
    }
}
