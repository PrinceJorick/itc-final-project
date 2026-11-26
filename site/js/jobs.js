/* ==========================================================================
   jobs.js: "Jobs to search for" on the builder page.
   1. Roles: entry-level jobs and the degrees and skills that point to them
   2. Matching: score each role against the resume (no page changes here)
   3. Search links: JobStreet, Indeed, OnlineJobs.ph, Kalibrr, LinkedIn
   4. Rendering, offline note, and the hook builder.js calls

   Everything runs in the browser. Nothing is fetched or sent: the links only
   open each site's own search page when the student clicks one.
   Uses from builder.js: draft, el(), mentionsSkill(). From data.js: skillKeywords.
   ========================================================================== */

/* 1. ROLES ---------------------------------------------------------------
   degree: a pattern for the Education "Degree or program" field.
   skills: names from skillKeywords in data.js (their aliases count too).
   search: the words sent to the job sites. */
var JOB_ROLES = [
  { title: "Junior Software Developer", search: "junior software developer",
    degree: /computer science|\bbs ?cs\b|computer engineering|\bbs ?cpe\b|information systems/i,
    skills: ["Java", "Python", "C++", "C#", "JavaScript", "PHP", "Node.js", "Git", "SQL"] },
  { title: "Junior Web Developer", search: "junior web developer",
    degree: /computer science|\bbs ?cs\b|information technology|\bbs ?it\b|information systems/i,
    skills: ["HTML", "CSS", "JavaScript", "PHP", "Web development", "SQL", "Git"] },
  { title: "Frontend Developer", search: "junior frontend developer",
    degree: null,
    skills: ["React", "JavaScript", "HTML", "CSS", "UI/UX design", "Figma"] },
  { title: "IT Support Specialist", search: "IT support specialist",
    degree: /information technology|\bbs ?it\b|computer science|\bbs ?cs\b|computer engineering|electronics/i,
    skills: ["Technical support", "Troubleshooting", "Hardware repair", "Networking", "MS Office", "Linux"] },
  { title: "Network Support Technician", search: "network technician",
    degree: /information technology|\bbs ?it\b|computer engineering|electronics/i,
    skills: ["Networking", "Linux", "Cybersecurity", "Cloud computing"] },
  { title: "QA Tester", search: "QA tester",
    degree: /computer science|\bbs ?cs\b|information technology|\bbs ?it\b|information systems/i,
    skills: ["Software testing", "Documentation", "SQL", "Attention to detail"] },
  { title: "Junior Data Analyst", search: "junior data analyst",
    degree: /statistics|mathematics|economics|computer science|information systems/i,
    skills: ["Data analysis", "Python", "SQL", "Power BI", "Microsoft Excel"] },
  { title: "UI/UX Design Intern", search: "UI UX designer intern",
    degree: /multimedia|fine arts|interactive|computer science|information technology/i,
    skills: ["UI/UX design", "Figma", "Graphic design", "Adobe Photoshop", "Adobe Illustrator"] },
  { title: "Graphic Designer", search: "junior graphic designer",
    degree: /multimedia|fine arts|visual communication|advertising/i,
    skills: ["Graphic design", "Canva", "Adobe Photoshop", "Adobe Illustrator", "Video editing", "Photography"] },
  { title: "Digital Marketing Assistant", search: "digital marketing assistant",
    degree: /marketing|communication|business administration|\bbsba\b|advertising/i,
    skills: ["Social media", "Digital marketing", "Content writing", "SEO", "Canva", "Video editing", "Market research"] },
  { title: "Content Writer", search: "content writer",
    degree: /communication|journalism|english|literature/i,
    skills: ["Content writing", "Written communication", "SEO", "Social media"] },
  { title: "Customer Service Representative", search: "customer service representative",
    degree: null,
    skills: ["Customer service", "English communication", "Verbal communication", "Call handling", "Chat support", "Email support", "CRM"] },
  { title: "Technical Support Representative", search: "technical support representative",
    degree: /information technology|\bbs ?it\b|computer science|\bbs ?cs\b/i,
    skills: ["Technical account", "Technical support", "Troubleshooting", "Customer service", "Call handling"] },
  { title: "Administrative Assistant", search: "administrative assistant",
    degree: /office administration|business administration|\bbsba\b|\bbsoa\b/i,
    skills: ["Microsoft Excel", "Microsoft Word", "MS Office", "Google Workspace", "Scheduling", "Filing", "Email management"] },
  { title: "Data Entry Clerk", search: "data entry",
    degree: null,
    skills: ["Data entry", "Typing", "Microsoft Excel", "Google Workspace"] },
  { title: "Accounting Assistant", search: "accounting assistant",
    degree: /accountancy|accounting|\bbsa\b|management accounting/i,
    skills: ["Accounting", "Bookkeeping", "Payroll", "Microsoft Excel"] },
  { title: "CAD Drafter", search: "CAD drafter",
    degree: /civil engineering|mechanical engineering|architecture/i,
    skills: ["AutoCAD", "SolidWorks", "Technical drawing", "Surveying"] },
  { title: "Electronics Technician", search: "electronics technician",
    degree: /electronics|\bece\b|electrical|computer engineering/i,
    skills: ["Arduino", "PLC programming", "Electrical wiring", "MATLAB", "Preventive maintenance"] },
  { title: "Quality Control Inspector", search: "quality control inspector",
    degree: /industrial engineering|mechanical engineering|chemical engineering|manufacturing/i,
    skills: ["Quality control", "Lean manufacturing", "Safety standards"] }
];

var MIN_SCORE = 3;   /* a degree alone, or at least two skill signals */
var MAX_ROLES = 6;


/* 2. MATCHING ------------------------------------------------------------ */

function findSkill(name) {
  for (var i = 0; i < skillKeywords.length; i++) {
    if (skillKeywords[i].name === name) { return skillKeywords[i]; }
  }
  return null;
}

/* Pull the parts of the resume that count as evidence. The objective is left
   out on purpose: it says what the student wants, not what they have done. */
function resumeEvidence(data) {
  var work = [];
  ["projects", "experience", "organizations"].forEach(function (section) {
    (data[section] || []).forEach(function (entry) {
      for (var field in entry) {
        work.push(field === "bullets" ? (entry.bullets || []).join(" ") : entry[field]);
      }
    });
  });
  /* Certificate names only: issuers like "Cisco Networking Academy" would
     otherwise count as the skill "Networking" */
  (data.certifications || []).forEach(function (c) { work.push(c.name); });
  return {
    degrees: (data.education || []).map(function (e) { return (e.degree || "").trim(); }).filter(Boolean),
    listed: data.skills.technical.concat(data.skills.soft).join(", "),
    work: work.join(" \n ")
  };
}

/* Score every role. Degree +3, a skill on the Skills list +2, a skill that
   only shows up in projects, experience, orgs, or certificates +1.
   Returns the best roles, highest score first, with the reasons. */
function matchJobs(data) {
  var ev = resumeEvidence(data);
  var results = [];

  JOB_ROLES.forEach(function (role, order) {
    var score = 0;
    var degree = "";
    var listed = [];
    var shown = [];

    if (role.degree) {
      for (var i = 0; i < ev.degrees.length; i++) {
        if (role.degree.test(ev.degrees[i])) { degree = ev.degrees[i]; score += 3; break; }
      }
    }
    role.skills.forEach(function (name) {
      var skill = findSkill(name);
      if (!skill) { return; }
      if (mentionsSkill(ev.listed, skill)) { listed.push(name); score += 2; }
      else if (mentionsSkill(ev.work, skill)) { shown.push(name); score += 1; }
    });

    if (score >= MIN_SCORE) {
      results.push({ role: role, score: score, order: order, degree: degree, listed: listed, shown: shown });
    }
  });

  results.sort(function (a, b) { return b.score - a.score || a.order - b.order; });
  return results.slice(0, MAX_ROLES);
}


/* 3. SEARCH LINKS --------------------------------------------------------
   Indeed and LinkedIn handle extra words well, so they also get the
   student's strongest matching skill. The smaller boards get the title only,
   since extra words there often return no results. */
function searchLinks(match) {
  var words = match.role.search;
  var skill = match.listed[0] || match.shown[0];
  var withSkill = skill && words.toLowerCase().indexOf(skill.toLowerCase()) === -1 ? words + " " + skill : words;
  var slug = words.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return [
    { name: "JobStreet", url: "https://ph.jobstreet.com/" + encodeURIComponent(slug) + "-jobs" },
    { name: "Indeed", url: "https://ph.indeed.com/jobs?" + new URLSearchParams({ q: withSkill, l: "Philippines" }) },
    { name: "OnlineJobs.ph", url: "https://www.onlinejobs.ph/jobseekers/jobsearch?" + new URLSearchParams({ jobkeyword: words }) },
    { name: "Kalibrr", url: "https://www.kalibrr.com/home/te/" + encodeURIComponent(words) },
    { name: "LinkedIn", url: "https://www.linkedin.com/jobs/search/?" + new URLSearchParams({ keywords: withSkill, location: "Philippines" }) }
  ];
}


/* 4. RENDERING ----------------------------------------------------------- */

var lastJobsKey = null;

function jobCard(match) {
  var card = el("li", "job-card");
  card.appendChild(el("h3", "", match.role.title));

  var reasons = el("ul", "job-reasons");
  if (match.degree) { reasons.appendChild(el("li", "", "Your degree: " + match.degree)); }
  if (match.listed.length) { reasons.appendChild(el("li", "", "Skills you listed: " + match.listed.join(", "))); }
  if (match.shown.length) { reasons.appendChild(el("li", "", "Shown in your projects or experience: " + match.shown.join(", "))); }
  card.appendChild(el("p", "label", "Why it may fit"));
  card.appendChild(reasons);

  card.appendChild(el("p", "label", "Search openings on"));
  var links = el("ul", "job-links");
  searchLinks(match).forEach(function (site) {
    var a = el("a", "btn btn-secondary btn-small", site.name);
    a.href = site.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.appendChild(el("span", "visually-hidden", " (search results for " + match.role.title + ", opens in a new tab)"));
    var li = el("li");
    li.appendChild(a);
    links.appendChild(li);
  });
  card.appendChild(links);
  return card;
}

/* Called by builder.js after every change to the draft */
function updateJobMatches() {
  var list = document.getElementById("jobs-list");
  var status = document.getElementById("jobs-status");
  if (!list || !status || !draft) { return; }

  var matches = matchJobs(draft);
  var hasContent = draftHasContent();
  /* Only redraw when the result changes, so typing doesn't rebuild the cards */
  var key = JSON.stringify([hasContent, matches.map(function (m) { return [m.role.title, m.degree, m.listed, m.shown]; })]);
  if (key === lastJobsKey) { return; }
  lastJobsKey = key;

  list.innerHTML = "";
  matches.forEach(function (m) { list.appendChild(jobCard(m)); });
  list.hidden = !matches.length;

  if (matches.length) {
    status.textContent = matches.length === 1 ? "1 role to look into." : matches.length + " roles to look into.";
  } else if (hasContent) {
    status.textContent = "No clear matches yet. Add your degree, list your technical skills, or name the tools you used in your projects.";
  } else {
    status.textContent = "Add your degree, skills, or projects, and roles to search for will show up here.";
  }
}

/* navigator.onLine can't promise the job sites are reachable, so this note
   only says links need the internet; it never blocks them */
function updateOnlineNote() {
  var note = document.getElementById("jobs-offline");
  if (note) { note.hidden = navigator.onLine !== false; }
}

window.addEventListener("online", updateOnlineNote);
window.addEventListener("offline", updateOnlineNote);
document.addEventListener("DOMContentLoaded", updateOnlineNote);
