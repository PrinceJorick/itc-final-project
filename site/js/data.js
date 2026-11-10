/* ==========================================================================
   data.js: all pre-written content used by the interactive features.
   Loaded first on every page. Nothing here talks to the internet.
   ========================================================================== */

/* The site name lives here, in one place. Change it and every page updates
   (nav.js copies it into the page title and every [data-site-name] element). */
var SITE_NAME = "OJT to Offer";


/* --------------------------------------------------------------------------
   Action verbs for the bullet helper, grouped by what you did.
   -------------------------------------------------------------------------- */
var actionVerbs = {
  "Built or created": ["Built", "Created", "Designed", "Developed", "Programmed", "Produced", "Prototyped", "Launched"],
  "Led or organized": ["Led", "Organized", "Coordinated", "Facilitated", "Managed", "Headed", "Mobilized", "Planned"],
  "Improved": ["Improved", "Streamlined", "Simplified", "Upgraded", "Redesigned", "Automated", "Optimized", "Reduced"],
  "Researched or analyzed": ["Researched", "Analyzed", "Evaluated", "Surveyed", "Tested", "Measured", "Investigated", "Documented"],
  "Communicated or helped": ["Presented", "Trained", "Tutored", "Assisted", "Supported", "Wrote", "Promoted", "Represented"],
  "Achieved": ["Won", "Earned", "Achieved", "Completed", "Delivered", "Raised", "Placed", "Exceeded"]
};


/* --------------------------------------------------------------------------
   Skill keywords for the job-fit checker (entry-level PH roles).
   "aliases" are other ways a job post may write the same skill.
   -------------------------------------------------------------------------- */
var skillKeywords = [
  /* IT and programming */
  { name: "HTML", category: "IT", aliases: ["HTML5"] },
  { name: "CSS", category: "IT", aliases: ["CSS3"] },
  { name: "JavaScript", category: "IT", aliases: ["JS"] },
  { name: "Python", category: "IT", aliases: [] },
  { name: "Java", category: "IT", aliases: [] },
  { name: "C++", category: "IT", aliases: [] },
  { name: "C#", category: "IT", aliases: [] },
  { name: "PHP", category: "IT", aliases: [] },
  { name: "SQL", category: "IT", aliases: ["MySQL", "PostgreSQL"] },
  { name: "Git", category: "IT", aliases: ["GitHub", "version control"] },
  { name: "React", category: "IT", aliases: ["ReactJS"] },
  { name: "Node.js", category: "IT", aliases: ["NodeJS"] },
  { name: "Networking", category: "IT", aliases: ["TCP/IP", "LAN"] },
  { name: "Technical support", category: "IT", aliases: ["tech support", "IT support", "help desk", "helpdesk"] },
  { name: "Troubleshooting", category: "IT", aliases: ["troubleshoot"] },
  { name: "Hardware repair", category: "IT", aliases: ["computer repair"] },
  { name: "Linux", category: "IT", aliases: ["Ubuntu"] },
  { name: "Cybersecurity", category: "IT", aliases: ["information security"] },
  { name: "Data analysis", category: "IT", aliases: ["data analytics"] },
  { name: "Power BI", category: "IT", aliases: [] },
  { name: "UI/UX design", category: "IT", aliases: ["UI design", "UX design", "user experience"] },
  { name: "Figma", category: "IT", aliases: [] },
  { name: "Web development", category: "IT", aliases: ["web developer"] },
  { name: "Software testing", category: "IT", aliases: ["QA testing", "quality assurance"] },
  { name: "Cloud computing", category: "IT", aliases: ["AWS", "Azure"] },

  /* Office and admin */
  { name: "Microsoft Excel", category: "Admin", aliases: ["Excel", "MS Excel", "spreadsheets"] },
  { name: "Microsoft Word", category: "Admin", aliases: ["MS Word"] },
  { name: "PowerPoint", category: "Admin", aliases: ["MS PowerPoint"] },
  { name: "Google Workspace", category: "Admin", aliases: ["Google Sheets", "Google Docs", "G Suite"] },
  { name: "MS Office", category: "Admin", aliases: ["Microsoft Office", "Microsoft 365"] },
  { name: "Data entry", category: "Admin", aliases: ["encoding", "encoder"] },
  { name: "Filing", category: "Admin", aliases: ["records management"] },
  { name: "Typing", category: "Admin", aliases: ["typing speed", "WPM"] },
  { name: "Scheduling", category: "Admin", aliases: ["calendar management"] },
  { name: "Bookkeeping", category: "Admin", aliases: [] },
  { name: "Inventory", category: "Admin", aliases: ["inventory management"] },
  { name: "Documentation", category: "Admin", aliases: ["report writing"] },
  { name: "Email management", category: "Admin", aliases: [] },
  { name: "Accounting", category: "Admin", aliases: [] },
  { name: "Payroll", category: "Admin", aliases: [] },

  /* BPO and customer service */
  { name: "Customer service", category: "BPO", aliases: ["customer support", "client service"] },
  { name: "English communication", category: "BPO", aliases: ["English proficiency", "fluent in English", "excellent English"] },
  { name: "Verbal communication", category: "BPO", aliases: ["oral communication"] },
  { name: "Written communication", category: "BPO", aliases: ["writing skills"] },
  { name: "Call handling", category: "BPO", aliases: ["inbound calls", "outbound calls", "phone support"] },
  { name: "Chat support", category: "BPO", aliases: ["live chat"] },
  { name: "Email support", category: "BPO", aliases: [] },
  { name: "CRM", category: "BPO", aliases: ["Salesforce", "Zendesk", "HubSpot"] },
  { name: "Night shift", category: "BPO", aliases: ["shifting schedule", "graveyard shift", "rotating shifts"] },
  { name: "Active listening", category: "BPO", aliases: [] },
  { name: "Problem solving", category: "BPO", aliases: ["problem-solving"] },
  { name: "Sales", category: "BPO", aliases: ["upselling"] },
  { name: "Technical account", category: "BPO", aliases: ["tech account"] },

  /* Marketing and communication */
  { name: "Social media", category: "Marketing", aliases: ["social media management", "Facebook", "TikTok", "Instagram"] },
  { name: "Content writing", category: "Marketing", aliases: ["copywriting", "content creation"] },
  { name: "Canva", category: "Marketing", aliases: [] },
  { name: "Graphic design", category: "Marketing", aliases: ["layout design"] },
  { name: "Adobe Photoshop", category: "Marketing", aliases: ["Photoshop"] },
  { name: "Adobe Illustrator", category: "Marketing", aliases: ["Illustrator"] },
  { name: "Video editing", category: "Marketing", aliases: ["Premiere Pro", "CapCut"] },
  { name: "SEO", category: "Marketing", aliases: ["search engine optimization"] },
  { name: "Digital marketing", category: "Marketing", aliases: ["online marketing"] },
  { name: "Market research", category: "Marketing", aliases: [] },
  { name: "Event planning", category: "Marketing", aliases: ["event management"] },
  { name: "Public speaking", category: "Marketing", aliases: ["presentation skills"] },
  { name: "Photography", category: "Marketing", aliases: [] },

  /* Engineering and technical */
  { name: "AutoCAD", category: "Engineering", aliases: ["CAD"] },
  { name: "SolidWorks", category: "Engineering", aliases: [] },
  { name: "MATLAB", category: "Engineering", aliases: [] },
  { name: "Arduino", category: "Engineering", aliases: [] },
  { name: "Electrical wiring", category: "Engineering", aliases: ["wiring"] },
  { name: "PLC programming", category: "Engineering", aliases: ["PLC"] },
  { name: "Quality control", category: "Engineering", aliases: ["QC", "quality inspection"] },
  { name: "Safety standards", category: "Engineering", aliases: ["occupational safety", "OSH"] },
  { name: "Technical drawing", category: "Engineering", aliases: ["drafting"] },
  { name: "Project management", category: "Engineering", aliases: ["project planning"] },
  { name: "Surveying", category: "Engineering", aliases: [] },
  { name: "Preventive maintenance", category: "Engineering", aliases: ["maintenance"] },
  { name: "Lean manufacturing", category: "Engineering", aliases: ["5S", "Six Sigma"] },

  /* Soft skills (employers list these in almost every post) */
  { name: "Teamwork", category: "Soft skill", aliases: ["team player", "collaboration", "collaborative"] },
  { name: "Leadership", category: "Soft skill", aliases: ["leading"] },
  { name: "Time management", category: "Soft skill", aliases: ["meet deadlines", "deadline-driven"] },
  { name: "Attention to detail", category: "Soft skill", aliases: ["detail-oriented", "keen eye for detail"] },
  { name: "Adaptability", category: "Soft skill", aliases: ["flexible", "adaptable"] },
  { name: "Critical thinking", category: "Soft skill", aliases: ["analytical skills", "analytical"] },
  { name: "Willingness to learn", category: "Soft skill", aliases: ["eager to learn", "trainable", "quick learner"] },
  { name: "Multitasking", category: "Soft skill", aliases: ["multi-tasking"] },
  { name: "Work ethic", category: "Soft skill", aliases: ["hardworking", "reliable"] },
  { name: "Interpersonal skills", category: "Soft skill", aliases: ["people skills"] }
];


/* --------------------------------------------------------------------------
   Interview question bank. category: intro | behavioral | technical | closing
   -------------------------------------------------------------------------- */
var interviewQuestions = [
  {
    id: "q1", category: "intro",
    question: "Tell me about yourself.",
    tip: "Keep it to about one minute: who you are now (course, year), one or two things you've done that fit the job, and why you're applying. This is not your life story.",
    sampleAnswer: "I'm a third-year Computer Science student at Batangas State University. Last semester I led a team of four that built a web-based inventory system for our college canteen, which cut their weekly stock count from two hours to about thirty minutes. I enjoy turning messy processes into simple tools, so this IT support internship is a good fit for me."
  },
  {
    id: "q2", category: "intro",
    question: "What do you know about our company?",
    tip: "Read the company's website and recent posts before the interview. Mention what they do, who they serve, and one thing that made you want to apply.",
    sampleAnswer: "I know you provide customer support for telecom clients in Asia and the US, and that you opened your Batangas site last year. I also saw on your page that you run a training program for new graduates, which is a big reason I applied."
  },
  {
    id: "q3", category: "intro",
    question: "Why did you choose your course?",
    tip: "Be honest, then connect it to the job. Interviewers want to see that you made a choice and grew from it, even if your reasons changed.",
    sampleAnswer: "I first chose Information Technology because I liked fixing our family computer. In college I found out I enjoy explaining tech to people even more, so I joined our org's tutoring program. That's why a help desk role makes sense to me."
  },
  {
    id: "q4", category: "intro",
    question: "Describe yourself in three words.",
    tip: "Pick three words you can back up with a quick example each. Avoid empty words like \"perfectionist.\"",
    sampleAnswer: "Organized, curious, and dependable. As our org's secretary, I kept minutes for every meeting for a full year, and members used them to settle decisions later."
  },
  {
    id: "q5", category: "intro",
    question: "Walk me through your resume.",
    tip: "Go in order and pick the highlights. Spend more time on the parts that match the job post.",
    sampleAnswer: "I'll start with my studies: I'm a BS Accountancy student with a 1.75 average. My strongest experience is as treasurer of our Junior Philippine Institute of Accountants chapter, where I handled the budget for three events. I also completed a short Excel course online, which I used to build our org's expense tracker."
  },
  {
    id: "q6", category: "behavioral",
    question: "Tell me about a time you worked in a team.",
    tip: "Use the STAR method: Situation, Task, Action, Result. Focus on what YOU did, not just what the group did.",
    sampleAnswer: "In our Systems Analysis class, our group had three weeks to build a booking app (Situation). I was in charge of the database and keeping the team on schedule (Task). I set up a shared task board and short check-ins every Monday (Action). We submitted two days early and got the highest grade in the section (Result)."
  },
  {
    id: "q7", category: "behavioral",
    question: "Tell me about a conflict in a group project and how you handled it.",
    tip: "Pick a real but mild conflict. Show that you stayed calm, listened, and found a fair solution. Never blame a groupmate by name.",
    sampleAnswer: "Two members wanted completely different designs for our thesis poster. I suggested we each make a quick draft and ask our adviser to pick. We combined the best parts of both, and both members felt heard."
  },
  {
    id: "q8", category: "behavioral",
    question: "How do you handle pressure or tight deadlines?",
    tip: "Give a real example where you planned, prioritized, and delivered. Show a method, not just \"I work well under pressure.\"",
    sampleAnswer: "During finals week I had two projects and three exams. I listed every task with its deadline, did the hardest one first each morning, and asked my groupmates to split the slides. I submitted everything on time and passed all three exams."
  },
  {
    id: "q9", category: "behavioral",
    question: "Tell me about a mistake you made and what you learned.",
    tip: "Choose a small, real mistake, own it, and spend most of your answer on how you fixed it and what you do differently now.",
    sampleAnswer: "For an org event, I forgot to confirm the venue a week before, and we almost lost the room. I called the admin office that day and got it back. Since then I keep a checklist with confirmation dates for every event I handle."
  },
  {
    id: "q10", category: "behavioral",
    question: "Describe a time you showed leadership.",
    tip: "Leadership doesn't need a title. Show a time you took initiative, guided others, or made a decision.",
    sampleAnswer: "When our class rep got sick before our department's sportsfest, I volunteered to coordinate our section. I made a sign-up sheet, assigned roles, and set two practice schedules. Our section placed second in the cheer competition."
  },
  {
    id: "q11", category: "behavioral",
    question: "What are your strengths and weaknesses?",
    tip: "For the strength, give one with proof. For the weakness, name a real one and what you're doing about it. Avoid fake weaknesses like \"I work too hard.\"",
    sampleAnswer: "My strength is explaining things clearly. I tutor first-year students in programming every Saturday. My weakness is public speaking in big groups, so I joined our school's Toastmasters-style club and now volunteer to present in class."
  },
  {
    id: "q12", category: "technical",
    question: "Tell me about a project you're proud of.",
    tip: "Pick one project and explain the problem, your role, the tools you used, and the result. Be ready for follow-up questions on any tool you mention.",
    sampleAnswer: "I'm proud of the attendance system I built for our org using Google Sheets and Apps Script. Members scan a QR code, and the sheet records the time. It replaced paper sign-ins and saved our secretary about an hour every meeting."
  },
  {
    id: "q13", category: "technical",
    question: "How do you learn a new tool or skill quickly?",
    tip: "Show you have a method: free courses, documentation, practice projects, asking for help. Give a recent example.",
    sampleAnswer: "When our class needed Figma, I watched the official beginner tutorials, then redesigned our org's Facebook page banner as practice. Within a week I was making the wireframes for our group's app."
  },
  {
    id: "q14", category: "technical",
    question: "A customer is angry because their problem is still not fixed. What do you do?",
    tip: "Common in BPO interviews. Show empathy first, then action: listen, apologize for the experience, restate the problem, explain the next step, and follow up.",
    sampleAnswer: "First I'd let them explain without interrupting, then apologize for the trouble and repeat the problem back so they know I understood. I'd check their account history, explain exactly what I'll do next and by when, and make sure to follow up."
  },
  {
    id: "q15", category: "technical",
    question: "How would you troubleshoot a computer that won't connect to the internet?",
    tip: "Go step by step from simple to complex. Interviewers want to hear a logical process, not a perfect answer.",
    sampleAnswer: "I'd start simple: check if other devices can connect, then check the cable or Wi-Fi connection, restart the router and computer, and run the network troubleshooter. If it still fails, I'd check the IP settings and drivers, and write down each step in case I need to escalate."
  },
  {
    id: "q16", category: "technical",
    question: "How would you manage several tasks with the same deadline?",
    tip: "Show prioritization: check what matters most, ask your supervisor when unsure, and communicate early if something may be late.",
    sampleAnswer: "I'd list the tasks, ask which one has the biggest impact if it's late, and start there. If I see a task might slip, I'd tell my supervisor early instead of on the deadline."
  },
  {
    id: "q17", category: "closing",
    question: "Why should we hire you?",
    tip: "Match two or three of your strengths to what the job post asks for, with proof. End with your eagerness to learn.",
    sampleAnswer: "Your post asks for strong Excel skills, attention to detail, and teamwork. I built our org's budget tracker in Excel, I was in charge of checking every receipt as treasurer, and I've led group projects that finished early. I'm also eager to learn your systems quickly."
  },
  {
    id: "q18", category: "closing",
    question: "What is your expected salary?",
    tip: "Research first: check salary ranges for the same role and city on job sites and in similar job posts. Give a range, not one number, and say you're open to discussing the full package. For OJT, ask whether there is an allowance instead.",
    sampleAnswer: "Based on similar entry-level postings in Batangas, I'm expecting a range of about [your researched range] a month. I'm open to discussing it, since I'm also looking at the training and growth opportunities this role offers."
  },
  {
    id: "q19", category: "closing",
    question: "Where do you see yourself in five years?",
    tip: "Show ambition that fits the company: growing skills, taking on more responsibility. Avoid saying you plan to leave or go abroad soon.",
    sampleAnswer: "In five years I'd like to be someone the team relies on for technical problems, maybe leading a small team or training new hires. I'd like to grow that here."
  },
  {
    id: "q20", category: "closing",
    question: "Are you willing to work on shifting schedules or night shift?",
    tip: "Common for BPO roles. Answer honestly. If yes, show you've thought about it (sleep, commute). If you have limits, say them politely now.",
    sampleAnswer: "Yes. I understand the role supports clients in different time zones. I've already checked the commute from my home at night, and I'm used to adjusting my schedule from my OJT."
  },
  {
    id: "q21", category: "closing",
    question: "Do you have any questions for us?",
    tip: "Always say yes. Ask about training, what success looks like in the first three months, or the team. Avoid asking about salary or leave first.",
    sampleAnswer: "Yes, thank you. What does a typical first month look like for someone in this role? And what do your best new hires usually do differently?"
  },
  {
    id: "q22", category: "closing",
    question: "When can you start?",
    tip: "Be clear and realistic. If you still need pre-employment documents, give yourself time to get them.",
    sampleAnswer: "I can start two weeks after receiving the offer. That gives me time to complete my NBI clearance and other pre-employment requirements."
  }
];


/* --------------------------------------------------------------------------
   Pre-employment checklist. Sources for every fact are in SOURCES.md.
   ra11261Free = the fee is waived once for first-time jobseekers (RA 11261).
   -------------------------------------------------------------------------- */
var checklistItems = [
  {
    id: "brgy-cert",
    name: "Barangay Certification (First-Time Jobseeker) and Oath of Undertaking",
    whereToGet: "Your barangay hall",
    requirements: "Proof that you live in the barangay (reports say at least 6 months) and a valid ID. You sign an Oath of Undertaking at the barangay. If you are under 18, a parent or guardian signs it too.",
    cost: "Free",
    ra11261Free: true,
    steps: [
      "Go to your barangay hall and ask for a First-Time Jobseeker certification under RA 11261.",
      "Bring a valid ID and proof of address.",
      "Sign the Oath of Undertaking.",
      "Make photocopies. You'll show this certification to every agency so your other documents are free."
    ],
    link: "https://lawphil.net/statutes/repacts/ra2019/ra_11261_2019.html"
  },
  {
    id: "psa",
    name: "PSA Birth Certificate",
    whereToGet: "A PSA Civil Registry System (CRS) outlet, or PSA's official online request service",
    requirements: "A valid ID. Check PSA's site for current appointment rules before you go.",
    cost: "₱155 per copy at PSA outlets (PSA Citizen's Charter). Online delivery costs more.",
    ra11261Free: true,
    steps: [
      "Check psa.gov.ph for the nearest CRS outlet and appointment rules.",
      "Fill out the birth certificate request form.",
      "Show your valid ID (and your barangay certification to waive the fee once).",
      "Keep the original safe; give employers a photocopy unless they ask for the original."
    ],
    link: "https://psa.gov.ph/"
  },
  {
    id: "nbi",
    name: "NBI Clearance",
    whereToGet: "Register online at clearance.nbi.gov.ph, then visit an NBI branch for your photo and fingerprints",
    requirements: "Two valid IDs and an online appointment. First-time jobseekers bring their barangay certification.",
    cost: "₱130 clearance fee plus a small payment-channel fee (check the NBI site for the current total)",
    ra11261Free: true,
    steps: [
      "Create an account on clearance.nbi.gov.ph and fill in your details.",
      "Choose a branch and appointment date.",
      "Pay online, or choose the first-time jobseeker option if available and bring your barangay certification.",
      "Go to the branch on your schedule for photo and fingerprints. If you have a \"HIT\", you'll be asked to come back on a later date."
    ],
    link: "https://clearance.nbi.gov.ph/"
  },
  {
    id: "police",
    name: "Police Clearance",
    whereToGet: "Apply online through the PNP National Police Clearance System, then visit your local police station",
    requirements: "Valid IDs and an online appointment. Check the PNP site for the current list.",
    cost: "Check with the agency (free once under RA 11261)",
    ra11261Free: true,
    steps: [
      "Register on the National Police Clearance System website.",
      "Book an appointment at your chosen police station.",
      "Bring your IDs and barangay certification on the day for photo and fingerprints."
    ],
    link: "https://pnpclearance.ph/"
  },
  {
    id: "brgy-clearance",
    name: "Barangay Clearance",
    whereToGet: "Your barangay hall",
    requirements: "Valid ID and proof of residency. Some employers ask for this on top of NBI and police clearances.",
    cost: "Varies by barangay (free once under RA 11261)",
    ra11261Free: true,
    steps: [
      "Ask at the barangay hall for a barangay clearance for employment.",
      "Show your barangay first-time jobseeker certification to waive the fee."
    ],
    link: "https://lawphil.net/statutes/repacts/ra2019/ra_11261_2019.html"
  },
  {
    id: "tin",
    name: "TIN (Tax Identification Number)",
    whereToGet: "BIR, usually through your employer using BIR Form 1902 on BIR's online registration system (ORUS)",
    requirements: "A valid ID. Your employer's HR usually handles this after you're hired, so ask them first.",
    cost: "Free under RA 11261. Check with BIR if you apply on your own.",
    ra11261Free: true,
    steps: [
      "Ask HR if they will register your TIN for you (most employers do).",
      "If you need to apply yourself, use BIR's Online Registration and Update System (ORUS).",
      "Never get a second TIN. Having more than one is not allowed."
    ],
    link: "https://orus.bir.gov.ph/"
  },
  {
    id: "sss",
    name: "SSS Number",
    whereToGet: "Apply online on the SSS website, then set up your My.SSS account",
    requirements: "An active email address. You may need to submit a birth certificate or ID to finish your registration.",
    cost: "No registration fee (check with SSS)",
    ra11261Free: false,
    steps: [
      "Go to sss.gov.ph and choose the online SS number application.",
      "Check your email for your SS number and My.SSS activation.",
      "Submit any missing documents online or at a branch so your record is complete."
    ],
    link: "https://www.sss.gov.ph/"
  },
  {
    id: "philhealth",
    name: "PhilHealth Number (PIN)",
    whereToGet: "A PhilHealth office, or through your employer",
    requirements: "A filled-out PhilHealth Member Registration Form (PMRF) and a valid ID.",
    cost: "No registration fee (check with PhilHealth)",
    ra11261Free: false,
    steps: [
      "Download and fill out the PMRF from philhealth.gov.ph.",
      "Submit it with a valid ID at a PhilHealth office, or give it to HR after you're hired."
    ],
    link: "https://www.philhealth.gov.ph/"
  },
  {
    id: "pagibig",
    name: "Pag-IBIG MID Number",
    whereToGet: "Online registration through the official Pag-IBIG Fund website, or through your employer",
    requirements: "Your personal details and a valid ID.",
    cost: "No registration fee (check with Pag-IBIG Fund)",
    ra11261Free: false,
    steps: [
      "Start from pagibigfund.gov.ph to find the official online registration.",
      "Save your Registration Tracking Number (RTN).",
      "Use the RTN to get your permanent 12-digit MID number."
    ],
    link: "https://www.pagibigfund.gov.ph/"
  },
  {
    id: "medical",
    name: "Medical Certificate",
    whereToGet: "A public hospital (free certificate under RA 11261), or the clinic your employer names",
    requirements: "Some employers require specific tests (for example, chest X-ray or drug test).",
    cost: "Certificate is free at public hospitals once under RA 11261; lab tests are not covered",
    ra11261Free: true,
    steps: [
      "Ask the employer which tests and which clinic they accept.",
      "If a public hospital is accepted, bring your barangay certification to waive the certificate fee."
    ],
    link: "https://lawphil.net/statutes/repacts/ra2019/ra_11261_2019.html"
  },
  {
    id: "tor",
    name: "Transcript of Records (TOR) or Certificate of Grades",
    whereToGet: "Your school registrar",
    requirements: "Clearance from your school and a request form.",
    cost: "Free once under RA 11261 if your school is a state college or university (like BatStateU); private schools set their own fees",
    ra11261Free: true,
    steps: [
      "Request at the registrar early; it can take days or weeks.",
      "Ask if they need your barangay certification to waive the fee."
    ],
    link: "https://lawphil.net/statutes/repacts/ra2019/ra_11261_2019.html"
  },
  {
    id: "photos",
    name: "ID photos (2×2 and 1×1)",
    whereToGet: "Any photo studio",
    requirements: "Plain background, formal top. Get a few extra copies.",
    cost: "Varies; not covered by RA 11261",
    ra11261Free: false,
    steps: [
      "Wear a collared top and keep your hair neat.",
      "Ask for a soft copy too; online applications often need one."
    ],
    link: ""
  },
  {
    id: "resume-copies",
    name: "Printed resume copies",
    whereToGet: "Print your resume from the builder on this site",
    requirements: "One clean page on short (Letter) or A4 bond paper.",
    cost: "Printing cost only",
    ra11261Free: false,
    steps: [
      "Build your resume in the Resume Builder and click Download PDF.",
      "Print three to five copies and keep them flat in a folder or envelope."
    ],
    link: "builder.html"
  }
];


/* --------------------------------------------------------------------------
   Sample resume for the demo ("Load sample" button). Fictional student.
   -------------------------------------------------------------------------- */
var sampleResume = {
  personal: {
    fullName: "Maria Clara Santos",
    email: "maria.santos@example.com",
    phone: "0917 123 4567",
    city: "Batangas City, Batangas",
    linkedin: "linkedin.com/in/mariasantos-sample",
    portfolio: "mariasantos-sample.github.io"
  },
  objective: "Third-year BS Computer Science student seeking an IT support internship where I can use my troubleshooting and web development skills to help teams work faster.",
  education: [
    { school: "Batangas State University – Alangilan", degree: "BS Computer Science", years: "2024 – Present", honors: "Dean's Lister, 1st Sem AY 2025–2026" }
  ],
  projects: [
    {
      title: "Canteen Inventory Web App",
      tools: "HTML, CSS, JavaScript, Google Sheets",
      bullets: [
        "Developed a web-based inventory tracker using JavaScript and Google Sheets, resulting in weekly stock counts dropping from 2 hours to 30 minutes.",
        "Led a team of 4 through planning, testing, and a live demo for the canteen staff."
      ]
    },
    {
      title: "Org Attendance System",
      tools: "Google Apps Script, QR codes",
      bullets: [
        "Automated meeting sign-ins using Google Apps Script and QR codes, resulting in faster check-in for 80+ members."
      ]
    }
  ],
  organizations: [
    {
      org: "Junior Information Technology Society",
      role: "Secretary",
      years: "2025 – Present",
      bullets: [
        "Documented minutes for 20+ meetings and kept a shared archive used to settle decisions.",
        "Coordinated registration for a 150-participant coding workshop."
      ]
    }
  ],
  experience: [],
  skills: {
    technical: ["HTML", "CSS", "JavaScript", "Python", "Microsoft Excel", "Git", "Troubleshooting"],
    soft: ["Teamwork", "Time management", "Attention to detail", "Willingness to learn"]
  },
  certifications: [
    { name: "IT Essentials", issuer: "Cisco Networking Academy", year: "2025" }
  ],
  template: "classic",
  noExperience: true
};
