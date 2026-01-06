// server.js
// Simple hackathon‑ready backend for Academic Collaboration Platform

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- DATABASE ----------------
mongoose.connect('mongodb://127.0.0.1:27017/uniconnect',{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>console.log('MongoDB Connected'));

// ---------------- SCHEMAS ----------------

const UserSchema = new mongoose.Schema({
  name:String,
  role:{ type:String, enum:['student','faculty'] },
  course:String,
  section:String
});

const AssignmentSchema = new mongoose.Schema({
  title:String,
  subject:String,
  deadline:Date,
  course:String,
  section:String,
  completedBy:[String] // student names
});

const NoticeSchema = new mongoose.Schema({
  title:String,
  description:String,
  pinned:Boolean,
  course:String,
  section:String,
  createdAt:{ type:Date, default:Date.now }
});

const FacultySchema = new mongoose.Schema({
  name:String,
  subject:String,
  email:String,
  photo:String
});

// ---------------- MODELS ----------------
const User = mongoose.model('User',UserSchema);
const Assignment = mongoose.model('Assignment',AssignmentSchema);
const Notice = mongoose.model('Notice',NoticeSchema);
const Faculty = mongoose.model('Faculty',FacultySchema);

// ---------------- ROUTES ----------------

// Create user (student/faculty)
app.post('/api/users', async(req,res)=>{
  const user = await User.create(req.body);
  res.json(user);
});

// Create assignment
app.post('/api/assignments', async(req,res)=>{
  const assignment = await Assignment.create(req.body);
  res.json(assignment);
});

// Get assignments by course & section
app.get('/api/assignments', async(req,res)=>{
  const { course, section } = req.query;
  const data = await Assignment.find({ course, section });
  res.json(data);
});

// Mark assignment completed
app.post('/api/assignments/complete', async(req,res)=>{
  const { assignmentId, studentName } = req.body;
  await Assignment.findByIdAndUpdate(assignmentId,{ $push:{ completedBy:studentName }});
  res.json({ message:'Assignment marked completed' });
});

// Create notice
app.post('/api/notices', async(req,res)=>{
  const notice = await Notice.create(req.body);
  res.json(notice);
});

// Get notices
app.get('/api/notices', async(req,res)=>{
  const { course, section } = req.query;
  const notices = await Notice.find({ course, section }).sort({ pinned:-1, createdAt:-1 });
  res.json(notices);
});

// Faculty directory
app.get('/api/faculty', async(req,res)=>{
  const faculty = await Faculty.find();
  res.json(faculty);
});

// ---------------- AI DEMO ROUTES ----------------

// AI summary (mock)
app.post('/api/ai/summary',(req,res)=>{
  const { text } = req.body;
  res.json({ summary: text.slice(0,60) + '...' });
});

// AI chatbot demo
app.post('/api/ai/chat',(req,res)=>{
  const { question } = req.body;
  let answer = 'Please check dashboard';
  if(question.includes('deadline')) answer = 'Next deadline is tomorrow';
  if(question.includes('pending')) answer = 'You have 2 assignments pending';
  res.json({ answer });
});

// ---------------- SERVER ----------------
app.listen(5000,()=>console.log('Server running on port 5000'));

