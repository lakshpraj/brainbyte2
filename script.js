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
        { date: 24, type: "holiday", title: "Thanksgiving Break" }
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

    // Initialize the dashboard
    function initDashboard() {
        renderAssignments('all');
        renderNotices();
        renderFaculty();
        renderCalendar();
        setupEventListeners();
    }

    // Render assignments based on subject filter
    function renderAssignments(subject) {
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
        noticesList.innerHTML = '';
        
        notices.forEach(notice => {
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
        const today = new Date();
        const currentDate = today.getDate();
        
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
            calendarHTML += `<div class="calendar-date"></div>`;
        }
        
        // Add days of the month
        const daysInMonth = 30; // November has 30 days
        for (let day = 1; day <= daysInMonth; day++) {
            const event = calendarEvents.find(e => e.date === day);
            let dateClass = "calendar-date";
            
            if (event) {
                dateClass += ` ${event.type}`;
            }
            
            if (day === currentDate) {
                dateClass += " today";
            }
            
            calendarHTML += `<div class="${dateClass}" data-date="${day}">${day}</div>`;
        }
        
        calendarHTML += '</div>';
        calendarView.innerHTML = calendarHTML;
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
            renderAssignments(document.querySelector('.subject-tab.active').getAttribute('data-subject'));
            
            // Update progress indicator
            updateProgressIndicator();
            
            // Show notification
            showNotification('Assignment marked as complete!', 'success');
        }
    }

    // Update progress indicator
    function updateProgressIndicator() {
        const totalAssignments = assignments.length;
        const completedAssignments = assignments.filter(a => a.status === 'completed').length;
        const progressPercentage = Math.round((completedAssignments / totalAssignments) * 100);
        
        document.querySelector('.progress-fill').style.width = `${progressPercentage}%`;
        document.querySelector('.progress-indicator span').textContent = `${progressPercentage}% Complete`;
        
        // Update stats cards
        document.querySelectorAll('.stat-info h3')[0].textContent = assignments.filter(a => a.status === 'pending').length;
        document.querySelectorAll('.stat-info h3')[1].textContent = completedAssignments;
    }

    // Show notification
    function showNotification(message, type) {
        // In a real app, this would show a toast notification
        console.log(`${type}: ${message}`);
        alert(message);
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
        closeModal.addEventListener('click', closeAIModal);
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === aiModal) {
                closeAIModal();
            }
        });
        
        // Send message in AI modal
        sendBtn.addEventListener('click', sendAIMessage);
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
        
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
        document.querySelector('.join-course-btn').addEventListener('click', function() {
            showNotification('Course invite link copied to clipboard! Share with students to join.', 'info');
        });
    }

    // Handle AI question
    function handleAIQuestion(question) {
        let response = '';
        
        switch(question) {
            case 'homework':
                const pending = assignments.filter(a => a.status === 'pending').length;
                response = `You have ${pending} pending assignments. The most urgent is "${assignments.find(a => a.status === 'pending')?.title}" due ${formatDate(assignments.find(a => a.status === 'pending')?.dueDate)}.`;
                break;
            case 'deadline':
                const nextAssignment = assignments
                    .filter(a => a.status === 'pending')
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
                response = `Your next deadline is "${nextAssignment?.title}" for ${nextAssignment?.course}, due on ${formatDate(nextAssignment?.dueDate)}.`;
                break;
            case 'notices':
                const pinnedNotices = notices.filter(n => n.pinned);
                response = `You have ${pinnedNotices.length} important pinned notices. "${pinnedNotices[0]?.title}" - ${pinnedNotices[0]?.summary}`;
                break;
            default:
                response = "I can help you with pending assignments, deadlines, notices, and more. What would you like to know?";
        }
        
        // Display response in modal
        const modalBody = document.querySelector('.ai-modal-body');
        modalBody.innerHTML = `
            <div class="ai-message ai-response">
                <p>${response}</p>
            </div>
        `;
    }

    // Open AI modal
    function openAIModal() {
        aiModal.classList.add('active');
        aiInput.focus();
    }

    // Close AI modal
    function closeAIModal() {
        aiModal.classList.remove('active');
        aiInput.value = '';
    }

    // Send AI message
    function sendAIMessage() {
        const message = aiInput.value.trim();
        if (!message) return;
        
        const modalBody = document.querySelector('.ai-modal-body');
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'ai-message';
        userMessage.innerHTML = `<p><strong>You:</strong> ${message}</p>`;
        modalBody.appendChild(userMessage);
        
        // Simulate AI response (in a real app, this would be an API call)
        setTimeout(() => {
            const aiResponse = document.createElement('div');
            aiResponse.className = 'ai-message ai-response';
            
            let responseText = '';
            if (message.toLowerCase().includes('homework') || message.toLowerCase().includes('assignment')) {
                const pending = assignments.filter(a => a.status === 'pending');
                responseText = `You have ${pending.length} pending assignments. I recommend starting with "${pending[0]?.title}" which is due soonest.`;
            } else if (message.toLowerCase().includes('notice') || message.toLowerCase().includes('announcement')) {
                responseText = `There are ${notices.length} active notices. "${notices[0]?.title}" was posted on ${formatDate(notices[0]?.date)}.`;
            } else if (message.toLowerCase().includes('calendar') || message.toLowerCase().includes('schedule')) {
                responseText = `Your next important date is on Nov 15 for the Data Structures project submission. Don't forget Thanksgiving break starts on Nov 23.`;
            } else {
                responseText = `I understand you're asking about "${message}". I can help you with assignments, deadlines, notices, and academic scheduling. Could you be more specific?`;
            }
            
            aiResponse.innerHTML = `<p><strong>AI Assistant:</strong> ${responseText}</p>`;
            modalBody.appendChild(aiResponse);
            modalBody.scrollTop = modalBody.scrollHeight;
        }, 1000);
        
        aiInput.value = '';
    }

    // Initialize the dashboard
    initDashboard();
});
