import { i } from "motion/react-client";

export const profile = {
  name: "Sahil Sahu",
  initials: "SS",
  role: " Web Developer",
  location: "Bhopal, India",
  email: "sahusahil480@gmail.com",
  github: "https://github.com/Sahil7898-sahu",
  linkedin: "https://www.linkedin.com/in/sahil-sahu-7a5454271/",
  summary:
    "",
};

export const navItems = [
  "Home",
  "About",
  "Education",
  "Skills",
  "Projects",
  "Events",
  "Activities",
  "Timeline",
];

export const stats = [
  { value: "7+", label: "Projects Built" },
  { value: "8+", label: "Core Skills" },
  { value: "100%", label: "Learning Mindset" },
];

export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Java",
  "Python",
  "IoT Components",
  "SAP",
  "MongoDB",
  "ESP32",
  "Arduino IDE",
  "DHT11 Sensor",
  "RFID Technology",
  "Hardware Integration",
  "UI/UX Design",
  "VS Code",
  "Problem Solving",

  
];

export const projects = [
  {
    name: "Automatted Attendance System by Face Recognition ",
    type: "Web Application",
    description:
      "Attendance Marking System is an automated attendance solution that uses Image Detection and Facial Recognition Technology to identify individuals and mark their attendance in real time.",
    stack: ["HTML", "CSS", "JavaScript", "Python", "OpenCV", "Face Recognition Library"],
    github: "https://github.com/Sahil7898-sahu/Attendance-system-by-image-detection-and-face-recognition",
  },
  {
    name: "Student Management System for Library",
    type: "Web Application",
    description:
      "A simple app concept for storing student information, marks, records, and quick search results.",
    stack: ["Python", "React", "UI Logic", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/Sahil7898-sahu/Student-Management-System-for-Libraries",
  },
  {
    name: "Smart Weather Monitoring System",
    type: "API",
    description:
      "A Smart Weather Monitoring System uses sensors and IoT technology to collect real-time weather data like temperature, humidity, and rainfall.",
    stack: ["JavaScript", "API", "Tailwind CSS", "Vite", "React", "OpenWeatherMap API", "Framer Motion"],
    github: "https://github.com/Sahil7898-sahu/Smart-Weather-Monitoring-System",
    live: "https://smart-weather-monitoring-system-pearl.vercel.app/",
  },
{

  name:"AI Brain Tumer Detection System",
  type:"Web Application",
  description:"An AI Brain Tumor Detection System is a medical application that uses artificial intelligence and machine learning algorithms to analyze brain scans and identify the presence of tumors.",
  stack:["Python","Machine Learning","Image Processing","UI Logic", "Tumer Data Set", "Kaggle"],
  github:"https://github.com/nirjalamaran/AI-Brain-Tumur-Detection-from-MRI-Image",
},
{
  name:"Library Management System",
  type:"Web Application",
  description:"A Library Management System is a software application designed to manage and organize the operations of a library, including book inventory, member management, borrowing and returning of books, and other related tasks.",
  stack:["Node.js","React", "Tailwind CSS", "MongoDB", "Express.js", "RESTful API", "CORS", "JWT Authentication"],
  github:"https://github.com/Sahil7898-sahu/Library-Management-System",
},
{
  name:"Expense Management System",
  type:"Web Application",
  description:"An Expense Management System is a software application designed to help individuals or businesses track and manage their expenses, providing features such as expense categorization, budgeting, and reporting.",
  stack:["React", "Tailwind CSS", "Lucide React", "Recharts", " Axios", "Node.js", "MongoDB","CORS", "RESTful API"],
  github:"https://github.com/Sahil7898-sahu/Expense-Management"
},


{
  name:"Currency Converter",
  type:"Web Application",
  description:"A Currency Converter is a software application that allows users to convert one currency into another based on current exchange rates, providing real-time conversion results.",
  stack:["HTML" , "CSS", "JavaScript", "Axios", "Exchange Rate API", "UI Logic", "Data Set"],        
  github:"https://github.com/Sahil7898-sahu/Currency-Converter",
 
},
{
name:"RFID Based Attendance System",
type:"Web Application",
description:"An RFID Based Attendance System is a technology-driven solution that uses Radio Frequency Identification (RFID) to automate the process of recording attendance in educational institutions, workplaces, or events.",
stack:["Python", "Arduino IDE", "RFID Technology", "Jumper wires", "ESP32","RFID Tags", "Hardware Integration", "RFID Reader", "16x2 LCD Display","5V Power Supply","i2c"],


}

];

export const technicalEvents = [
  {  id: "hackathon-1",
    title: " SISTec-RB Hackathon ",
    category: "Innovators",
    date: "07/11/2025",
    mediaType: "image",
    image: new URL("../assets/h11.jpg", import.meta.url).href,

    description:
      "Participated in SISTec RB Hackathon, applying technical skills to design and develop innovative software solutions collaboratively.",
    highlights: ["Problem solving", "Prototype building", "Presentation"],
  },

 {   id: "hackathon-2",
    
    title: "OIST Bhopal Hackathon",
    category: "Tech-manthan",
    date: "30/04/2026",
    collagename: "SISTEC",
    mediaType: "image",
    image: new URL("../assets/h1.jpeg", import.meta.url).href,

    description:
      "Participated in OIST Hackathon 2.0, building innovative solutions, improving teamwork, coding, problem-solving, and presentation skills under pressure.",
    highlights: ["Problem solving", "Project Building", "Presentation"],
  },

 {
    id: "TCS Tech Talk",
    title: "TCS Tech Talk",
    category: "Tata Consultancy Services",
    date: "12/01/2025",
    mediaType: "image",
    media: new URL("../assets/IMG_20260317_113329591.jpg", import.meta.url).href,
    image: new URL("../assets/event-workshop.png", import.meta.url).href,
    description:
      "Participated in the Tata Consultancy Services corporate talk session, gaining insights into industry trends, career opportunities, and professional development.",
    highlights: ["Modern tools", "Coding practice", "Project learning"],
  },
  
  {
    id: "seminar-tech-talk",
    title: "Sagar Samarthya",
    category: "Session",
    date: "6/04/2026",
    mediaType: "image",
    media: new URL("../assets/h4.jpeg", import.meta.url).href,
    image: new URL("../assets/event-seminar.png", import.meta.url).href,
    description:
      "Attended Sagar Samarthya Placement Session, improving aptitude, communication, interview preparation, and professional development skills.",
    highlights: ["Placement Guidence", "Career guidance", "Communication"],
  },
{
  title: "HeadStart 5.O",
  category: "Talk",
  date:"13/12/2025",
  image: new URL("../assets/Screenshot 2026-05-22 144632.png", import.meta.url).href,
  description:
    "Participated in Headstart 5.0, gaining exposure to industry trends, innovation, and technical knowledge through expert-led sessions.",
  highlights: ["Industry insights", "Networking", "Career development"],
},

{
  title: "IBM Session",
  category: "Session",
  date:"24/03/2026",
  image: new URL("../assets/IMG-20260324-WA0006.jpg", import.meta.url).href,
  description:
    "Attended IBM Session, gaining insights into the latest technologies and industry trends.",
  highlights: ["AI and Cloud Computing", "IBM skills Build"],
},




];




export const coCurricularActivities = [
  {
    id: "YI Yuva",
    title: "Young Indians YUVA ",
    category: "CII WRCM Bhopal",
    date: "22/02/2026",
    mediaType: "image",
    image: new URL("../assets/IMG_20260314_100355515.jpg", import.meta.url).href,
    description:
      "Participated in YI Yuva Exhibition, exploring antique collections and handmade items while gaining cultural and creative learning experience.",
    highlights: ["Team leadership", "Creative expression", "Event coordination"],
  },
  {
    id: "YI Co-Chairperson",
    title: "Co-Chairperson of YI YUVA ",
    category: "YI YUVA Bhopal",
    date: "15/03/2026",
    mediaType: "image",
    image: new URL("../assets/Screenshot 2026-05-22 155114.png", import.meta.url).href,
    description:
      "Served as Co-Chairperson of Yi Yuva Bhopal, contributing to event management, teamwork, leadership, and student engagement activities.",
    highlights: ["Teamwork", "Resilience", "Healthy competition"],
  },
  {
    id: "T & P",
    title: "Coorporate Crew Head ",
    category: "Training and Placement Cell",
    date: "10/05/2025",
    mediaType: "image",
    image: new URL("../assets/IMG_20250922_145433915~3.jpg", import.meta.url).href,
    description:
      "As Corporate Crew Head in the Training & Placement Cell, I coordinated industry interactions, managed teams, and supported placement activities effectively.",
    highlights: ["Community impact", "Communication", "Leadership"],
  },
  {
    id: "Sac Committee",
    title: "Student Activity Council",
  category: " T&P SAC Committee ",
    date: "11/08/2025",
    mediaType: "image",
    image: new URL("../assets/IMG_20250926_235531322~2.jpg", import.meta.url).href,
    description:
      "Active member of Student Activity Council (SAC) in the Training & Placement Committee, contributing to event management and student coordination.",
    highlights: ["Leadership", "Organization", "Peer mentoring"],
  },



 {
    id: "technical-workshop",
    title: "IIT Kanpur Workshop",
    category: "Rudras",
    date: "12/01/2025",
    mediaType: "image",
    image: new URL("../assets/h33.jpg", import.meta.url).href,
    description:
      "Gained hands-on experience in RC aircraft design and flight principles by attending RC Plane Workshop.",
    highlights: ["Modern tools", "Coding practice", "Project learning"],
  },


{

  id: "NSSO Bhopal",
  title: "NSSO Bhopal",
  category: "NSSO",
  date: "20/02/2026", 
  mediaType: "image",
  image: new URL("../assets/nsso.jpeg", import.meta.url).href,
  description:
    "Proud to receive a participation Reward from NSSO Bhopal during the 75th National Sample Survey celebration, inspiring me toward data-driven learning and growth.",
  highlights: ["Community impact", "Teamwork", "Social responsibility"],
}

];

export const timeline = [
  {
    year: "2026",
    title: "Building professional portfolio projects",
    detail: "Focusing on Java, UI/UX design, and strong project presentation.",
  },
  {
    year: "2025",
    title: "Strengthening programming fundamentals",
    detail: "Practicing JavaScript, Java, MongoDB,IoT Systems, and problem solving.",
  },
  {
    year: "Now",
    title: "Ready for Placement Opportunities",
    detail: "Looking for internships, freelance work, collaborations, and learning-focused roles.",
  },
];

export const education = [
  {
    institution: "Sagar Institute of Science Technology and Engineering Bhopal",
    place: "Bhopal, Madhya Pradesh",
    degree: "B.Tech",
    stream: "CSE - IoT",
    start: "2023",
    end: "2027",
    description:
      "Pursuing B.Tech in Computer Science and Engineering with a specialization in Internet of Things (IoT). Focused on sensors, and full-stack web integration for connected devices and Web Development.",
    achievements: [
      "Relevant coursework: Web Development, Data Structures",
      "Java, DBMS, and IoT Systems",
      "Active in IoT projects and college technical clubs",
    ],
  },
];


