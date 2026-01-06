// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Sample data for assignments
    const assignments = [
        { id: 1, title: "Binary Search Tree Implementation", subject: "cs", dueDate: "2023-11-15", status: "pending", course: "Data Structures" },
        { id: 2, title: "Calculus Integration Problems", subject: "math", dueDate: "2023-11-12", status: "pending", course: "Calculus II" },
        { id: 3, title: "Lab Report: Optics Experiment", subject: "physics", dueDate: "2023-11-10", status: "pending", course: "Physics Lab" },
        { id: 4, title: "Linked List Operations", subject: "cs", dueDate: "2023-11-05", status: "completed", course: "Data Structures" },
        { id: 5, title: "Differential Equations", subject: "math", dueDate: "2023-11-03", status: "completed", course: "Calculus II" },
        { id: 6, title: "Physics Simulation Code", subject: "physics", dueDate: "2023-11-01", status: "completed", course: "Physics Lab" }
    ];

    // Sample data for notices
    const notices = [
        { id: 1, title: "Midterm Exam Schedule Released", date: "2023-11-05", course: "All Courses", pinned: true, summary: "AI Summary: Midterm exams scheduled for Dec 10-15. Check portal for your timetable." },
        { id: 2, title: "Data Structures Lab Canceled", date: "2023-11-04", course: "CS-201", pinned: false, summary: "AI Summary: Tomorrow's lab session canceled. Next lab will cover AVL trees." },
        { id: 3, title: "Last Date for Project Submission", date: "2023-11-03", course: "MA-102", pinned: false, summary: "AI Summary: Calculus II projects due Nov 20. Submit to department office." },
        { id: 4, title: "Thanksgiving Break Announcement", date: "2023-11-02", course: "All Courses", pinned: true, summary: "AI Summary: College closed Nov 23-26 for Thanksgiving break." }
    ];

    // Sample data for faculty
    const faculty = [
        { id: 1, name: "Dr. Sarah Johnson", subject: "Data Structures", email: "sjohnson@university.edu", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        { id: 2, name: "Prof. Michael Chen", subject: "Calculus II", email: "mchen@university.edu", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
        { id: 3, name: "Dr. Emma Williams", subject: "Physics Lab", email: "ewilliams@university.edu", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" }
    ];

    // Calendar events
    const calendarEvents = [
        { date: 10, type: "event", title: "Physics Lab Submission" },
        { date: 12, type: "event", title: "Calculus Assignment Due" },
        { date: 15, type: "event", title: "Data Structures Project" },
        { date: 23, type: "holiday", title: "Thanksgiving Break" },
        { date: 24, type: "holiday", title: "Thanksgiving Break" },
        { date: 6, type: "event", title: "Today's Deadline" }
    ];

    // DOM Elements
    const assignmentsList = document.querySelector('.assignments-list');
    const noticesList = document.querySelector('.notices-list');
    const facultyList = document.querySelector('.faculty-list');
    const calendarView = document.querySelector('.calendar-view');
    const subjectTabs = document.querySelectorAll('.subject-tab');
    const aiOptions = document.querySelectorAll('.ai-option');
    const aiModal = document.getElementById('aiModal');
    const closeModal = document.querySelector('.close-modal');
    const sendBtn = document.querySelector('.send-btn');
    const aiInput = document.querySelector('.ai-modal-input input');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-indicator span');
    const statCards = document.querySelectorAll('.stat-info h3');

    // Initialize the dashboard
    function initDashboard() {
        renderAssignments('all');
        renderNotices();
        renderFaculty();
        renderCalendar();
        updateProgressIndicator();
        setupEventListeners();
        updateWelcomeMessage();
    }

    // Update welcome message with dynamic data
    function updateWelcomeMessage() {
        const pendingCount = assignments.filter(a => a.status === 'pending').length;
        const newNotices = notices.length;
        const welcomeText = document.querySelector('.welcome-text p');
        if (welcomeText) {
            welcomeText.innerHTML = `You have <span class="highlight">${pendingCount} pending assignments</span> and <span class="highlight">${newNotices} new notices</span> today.`;
        }
    }

    // Render assignments based on subject filter
    function renderAssignments(subject) {
        if (!assignmentsList) return;
        
        assignmentsList.innerHTML = '';
        
        const filteredAssignments = subject === 'all' 
            ? assignments 
            : assignments.filter(a => a.subject === subject);
        
        filteredAssignments.forEach(assignment => {
            const assignmentElement = document.createElement('div');
            assignmentElement.className = `assignment-item ${assignment.status}`;
            assignmentElement.innerHTML = `
                <div class="assignment-info">
                    <h4>${assignment.title}</h4>
                    <div class="assignment-meta">
                        <span class="assignment-subject">${assignment.course}</span>
                        <span><i class="far fa-calendar"></i> Due: ${formatDate(assignment.dueDate)}</span>
                    </div>
                </div>
                <div class="assignment-actions">
                    ${assignment.status === 'pending' 
                        ? `<button class="complete-btn" data-id="${assignment.id}">Mark Complete</button>` 
                        : `<i class="fas fa-check-circle completed-check"></i>`}
                </div>
            `;
            assignmentsList.appendChild(assignmentElement);
        });
        
        // Add event listeners to complete buttons
        document.querySelectorAll('.complete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                markAssignmentComplete(id);
            });
        });
    }

    // Render notices
    function renderNotices() {
        if (!noticesList) return;
        
        noticesList.innerHTML = '';
        
        // Sort notices: pinned first, then by date
        const sortedNotices = [...notices].sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return new Date(b.date) - new Date(a.date);
        });
        
        sortedNotices.forEach(notice => {
            const noticeElement = document.createElement('div');
            noticeElement.className = `notice-item ${notice.pinned ? 'pinned' : ''}`;
            noticeElement.innerHTML = `
                <div class="notice-header">
                    <div class="notice-title">${notice.title}</div>
                    <div class="notice-date">${formatDate(notice.date)}</div>
                </div>
                <div class="notice-summary">
                    <i class="fas fa-robot"></i> ${notice.summary}
                </div>
                <div class="notice-course">${notice.course}</div>
            `;
            noticesList.appendChild(noticeElement);
        });
    }

    // Render faculty directory
    function renderFaculty() {
        if (!facultyList) return;
        
        facultyList.innerHTML = '';
        
        faculty.forEach(person => {
            const facultyElement = document.createElement('div');
            facultyElement.className = 'faculty-card';
            facultyElement.innerHTML = `
                <div class="faculty-photo">
                    <img src="${person.photo}" alt="${person.name}">
                </div>
                <div class="faculty-info">
                    <h4>${person.name}</h4>
                    <div class="faculty-subject">${person.subject}</div>
                    <div class="faculty-contact">${person.email}</div>
                </div>
            `;
            facultyList.appendChild(facultyElement);
        });
    }

    // Render academic calendar
    function renderCalendar() {
        if (!calendarView) return;
        
        const today = new Date();
        const currentDate = today.getDate();
        const currentMonth = today.getMonth() + 1; // November = 11
        
        // Generate calendar dates (November 2023 as example)
        let calendarHTML = '<div class="calendar-grid">';
        
        // Day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            calendarHTML += `<div class="calendar-day">${day}</div>`;
        });
        
        // Calculate starting day (Nov 1, 2023 is a Wednesday)
        const startOffset = 3; // Wednesday is index 3 (0 = Sunday)
        
        // Add empty cells for days before the 1st
        for (let i = 0; i < startOffset; i++) {
            calendarHTML += `<div class="calendar-date empty"></div>`;
        }
        
        // Add days of the month
        const daysInMonth = 30; // November has 30 days
        for (let day = 1; day <= daysInMonth; day++) {
            const event = calendarEvents.find(e => e.date === day);
            let dateClass = "calendar-date";
            
            if (event) {
                dateClass += ` ${event.type}`;
            }
            
            if (day === currentDate && currentMonth === 11) {
                dateClass += " today";
            }
            
            calendarHTML += `<div class="${dateClass}" data-date="${day}">
                ${day}
                ${event ? `<div class="event-tooltip">${event.title}</div>` : ''}
            </div>`;
        }
        
        // Add empty cells for remaining days
        const totalCells = 42; // 6 rows * 7 columns
        const filledCells = startOffset + daysInMonth;
        for (let i = filledCells; i < totalCells; i++) {
            calendarHTML += `<div class="calendar-date empty"></div>`;
        }
        
        calendarHTML += '</div>';
        calendarView.innerHTML = calendarHTML;
        
        // Add event listeners to calendar dates
        document.querySelectorAll('.calendar-date:not(.empty)').forEach(dateEl => {
            dateEl.addEventListener('click', function() {
                const date = this.getAttribute('data-date');
                const event = calendarEvents.find(e => e.date == date);
                if (event) {
                    showNotification(`Event on Nov ${date}: ${event.title}`, 'info');
                } else {
                    showNotification(`No events scheduled for Nov ${date}`, 'info');
                }
            });
        });
    }

    // Format date to readable string
    function formatDate(dateString) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Mark assignment as complete
    function markAssignmentComplete(id) {
        const assignment = assignments.find(a => a.id === id);
        if (assignment) {
            assignment.status = 'completed';
            
            // Update UI
            const activeSubject = document.querySelector('.subject-tab.active').getAttribute('data-subject');
            renderAssignments(activeSubject);
            
            // Update progress indicator
            updateProgressIndicator();
            
            // Update welcome message
            updateWelcomeMessage();
            
            // Show notification
            showNotification(`"${assignment.title}" marked as complete!`, 'success');
        }
    }

    // Update progress indicator
    function updateProgressIndicator() {
        const totalAssignments = assignments.length;
        const completedAssignments = assignments.filter(a => a.status === 'completed').length;
        const progressPercentage = Math.round((completedAssignments / totalAssignments) * 100);
        
        // Update progress bar
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        // Update progress text
        if (progressText) {
            progressText.textContent = `${progressPercentage}% Complete`;
        }
        
        // Update stats cards
        if (statCards.length >= 2) {
            statCards[0].textContent = assignments.filter(a => a.status === 'pending').length;
            statCards[1].textContent = completedAssignments;
        }
    }

    // Show notification
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Close button event
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Subject tabs for filtering assignments
        subjectTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                subjectTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                const subject = this.getAttribute('data-subject');
                renderAssignments(subject);
            });
        });
        
        // AI Assistant options
        aiOptions.forEach(option => {
            option.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                handleAIQuestion(question);
                openAIModal();
            });
        });
        
        // AI Modal
        if (closeModal) {
            closeModal.addEventListener('click', closeAIModal);
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === aiModal) {
                closeAIModal();
            }
        });
        
        // Send message in AI modal
        if (sendBtn && aiInput) {
            sendBtn.addEventListener('click', sendAIMessage);
            aiInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendAIMessage();
                }
            });
        }
        
        // Nav link interactions
        document.querySelectorAll('.nav-links li').forEach(link => {
            link.addEventListener('click', function() {
                document.querySelectorAll('.nav-links li').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // In a real app, this would navigate to different sections
                const section = this.querySelector('span').textContent;
                showNotification(`Navigating to ${section} section`, 'info');
            });
        });
        
        // Join course button
        const joinCourseBtn = document.querySelector('.join-course-btn');
        if (joinCourseBtn) {
            joinCourseBtn.addEventListener('click', function() {
                // Simulate copying invite link
                navigator.clipboard.writeText('https://edusync.edu/course/join/CS201-A')
                    .then(() => {
                        showNotification('Course invite link copied to clipboard! Share with students to join.', 'success');
                    })
                    .catch(() => {
                        showNotification('Course invite link: https://edusync.edu/course/join/CS201-A', 'info');
                    });
            });
        }
        
        // Course group clicks
        document.querySelectorAll('.course-group').forEach(group => {
            group.addEventListener('click', function() {
                const courseName = this.querySelector('h4').textContent;
                showNotification(`Opening ${courseName} course page`, 'info');
            });
        });
        
        // View all buttons
        document.querySelectorAll('.view-all').forEach(button => {
            button.addEventListener('click', function() {
                const section = this.closest('.notice-board, .faculty-directory');
                const title = section.querySelector('h2').textContent;
                showNotification(`Showing all ${title}`, 'info');
            });
        });
        
        // Calendar navigation
        document.querySelectorAll('.calendar-btn').forEach(button => {
            button.addEventListener('click', function() {
                const monthSpan = this.closest('.calendar-nav').querySelector('span');
                const currentMonth = monthSpan.textContent;
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                               'July', 'August', 'September', 'October', 'November', 'December'];
                let currentIndex = months.indexOf(currentMonth.split(' ')[0]);
                
                if (this.querySelector('.fa-chevron-left')) {
                    currentIndex = (currentIndex - 1 + 12) % 12;
                } else {
                    currentIndex = (currentIndex + 1) % 12;
                }
                
                monthSpan.textContent = `${months[currentIndex]} 2023`;
                showNotification(`Switched to ${months[currentIndex]} calendar`, 'info');
            });
        });
        
        // Notification bell
        const notificationBell = document.querySelector('.notification');
        if (notificationBell) {
            notificationBell.addEventListener('click', function() {
                showNotification('You have 3 new notifications', 'info');
                // Reset notification count
                const countEl = this.querySelector('.notification-count');
                if (countEl) {
                    countEl.textContent = '0';
                    countEl.style.display = 'none';
                }
            });
        }
    }

    // Handle AI question
    function handleAIQuestion(question) {
        let response = '';
        
        switch(question) {
            case 'homework':
                const pending = assignments.filter(a => a.status === 'pending');
                const urgent = pending.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
                response = `You have ${pending.length} pending assignments. The most urgent is <strong>"${urgent?.title}"</strong> for ${urgent?.course}, due on <strong>${formatDate(urgent?.dueDate)}</strong>.`;
                break;
            case 'deadline':
                const nextAssignment = assignments
                    .filter(a => a.status === 'pending')
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
                response = `Your next deadline is <strong>"${nextAssignment?.title}"</strong> for ${nextAssignment?.course}, due on <strong>${formatDate(nextAssignment?.dueDate)}</strong>.`;
                break;
            case 'notices':
                const pinnedNotices = notices.filter(n => n.pinned);
                const latestNotice = notices.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
                response = `You have <strong>${pinnedNotices.length} pinned notices</strong> and <strong>${notices.length} total notices</strong>. Latest: <strong>"${latestNotice?.title}"</strong> - ${latestNotice?.summary}`;
                break;
            default:
                response = "I can help you with pending assignments, deadlines, notices, and more. What would you like to know?";
        }
        
        // Display response in modal
        const modalBody = document.querySelector('.ai-modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="ai-message ai-response">
                    <p>${response}</p>
                </div>
            `;
        }
    }

    // Open AI modal
    function openAIModal() {
        if (aiModal) {
            aiModal.classList.add('active');
            if (aiInput) {
                aiInput.focus();
            }
        }
    }

    // Close AI modal
    function closeAIModal() {
        if (aiModal) {
            aiModal.classList.remove('active');
            if (aiInput) {
                aiInput.value = '';
            }
        }
    }

    // Send AI message
    function sendAIMessage() {
        if (!aiInput) return;
        
        const message = aiInput.value.trim();
        if (!message) return;
        
        const modalBody = document.querySelector('.ai-modal-body');
        if (!modalBody) return;
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'ai-message';
        userMessage.innerHTML = `<p><strong>You:</strong> ${message}</p>`;
        modalBody.appendChild(userMessage);
        
        // Clear input
        aiInput.value = '';
        
        // Simulate AI thinking
        const thinkingMessage = document.createElement('div');
        thinkingMessage.className = 'ai-message ai-response';
        thinkingMessage.innerHTML = `<p><i class="fas fa-spinner fa-spin"></i> Thinking...</p>`;
        modalBody.appendChild(thinkingMessage);
        modalBody.scrollTop = modalBody.scrollHeight;
        
        // Simulate AI response (in a real app, this would be an API call)
        setTimeout(() => {
            thinkingMessage.remove();
            
            const aiResponse = document.createElement('div');
            aiResponse.className = 'ai-message ai-response';
            
            let responseText = '';
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('homework') || lowerMessage.includes('assignment')) {
                const pending = assignments.filter(a => a.status === 'pending');
                responseText = `You have <strong>${pending.length} pending assignments</strong>. I recommend starting with <strong>"${pending[0]?.title}"</strong> which is due on <strong>${formatDate(pending[0]?.dueDate)}</strong>.`;
            } else if (lowerMessage.includes('notice') || lowerMessage.includes('announcement')) {
                const latest = notices.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
                responseText = `There are <strong>${notices.length} active notices</strong>. The latest is <strong>"${latest?.title}"</strong> posted on <strong>${formatDate(latest?.date)}</strong>.`;
            } else if (lowerMessage.includes('calendar') || lowerMessage.includes('schedule')) {
                const nextEvent = calendarEvents.sort((a, b) => a.date - b.date).find(e => e.date >= new Date().getDate());
                responseText = `Your next important date is on <strong>Nov ${nextEvent?.date}</strong> for <strong>${nextEvent?.title}</strong>. Don't forget Thanksgiving break starts on Nov 23.`;
            } else if (lowerMessage.includes('faculty') || lowerMessage.includes('professor')) {
                const prof = faculty[Math.floor(Math.random() * faculty.length)];
                responseText = `You can contact <strong>${prof.name}</strong> (${prof.subject}) at <strong>${prof.email}</strong>. Office hours are usually posted on the course page.`;
            } else {
                responseText = `I understand you're asking about <strong>"${message}"</strong>. I can help you with assignments, deadlines, notices, faculty contacts, and academic scheduling. Could you be more specific about what you need?`;
            }
            
            aiResponse.innerHTML = `<p><strong>AI Assistant:</strong> ${responseText}</p>`;
            modalBody.appendChild(aiResponse);
            modalBody.scrollTop = modalBody.scrollHeight;
        }, 1500);
    }

    // Add CSS for notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification-toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: var(--radius);
            padding: 1rem 1.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 10000;
            border-left: 4px solid var(--primary-color);
        }
        
        .notification-toast.show {
            transform: translateX(0);
        }
        
        .notification-toast.success {
            border-left-color: var(--success-color);
        }
        
        .notification-toast.info {
            border-left-color: var(--accent-color);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .notification-toast.success .notification-content i {
            color: var(--success-color);
        }
        
        .notification-toast.info .notification-content i {
            color: var(--accent-color);
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--gray-color);
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .event-tooltip {
            display: none;
            position: absolute;
            background: var(--dark-color);
            color: white;
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            white-space: nowrap;
            z-index: 100;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .calendar-date:hover .event-tooltip {
            display: block;
        }
        
        .calendar-date.empty {
            background: transparent;
            cursor: default;
        }
        
        .calendar-date.empty:hover {
            background: transparent;
        }
        
        @media (max-width: 768px) {
            .notification-toast {
                left: 20px;
                right: 20px;
                min-width: auto;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(notificationStyles);

    // Initialize the dashboard
    initDashboard();
});
