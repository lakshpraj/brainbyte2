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
