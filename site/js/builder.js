/* ==========================================================================
   builder.js: the resume builder page.
   1. Draft data (load, save to localStorage, empty draft)
   2. Form: repeatable entries (add/remove), filling the form from the draft
   3. Live preview of the resume (Classic and Modern templates)
   4. Toolbar: template switch, No experience toggle, sample, clear, PDF
   5. Bullet helper (rule-based sentence builder)
   6. Job-fit checker (keyword matching against skillKeywords in data.js)
   ========================================================================== */

var STORAGE_KEY = "resumeDraft";
var draft;            /* the resume being edited (shape matches resumeDraft) */
var saveTimer = null; /* used to wait a moment after typing before saving */

/* Settings for each repeatable section: which fields an entry has */
var SECTIONS = {
  education: {
    singular: "Education",
    fields: [
      { key: "school", label: "School", placeholder: "Batangas State University – Alangilan" },
      { key: "degree", label: "Degree or program", placeholder: "BS Computer Science" },
      { key: "years", label: "Years", placeholder: "2025 – Present" },
      { key: "honors", label: "Honors (optional)", placeholder: "Dean's Lister" }
    ],
    bullets: false
  },
  projects: {
    singular: "Project",
    fields: [
      { key: "title", label: "Project title", placeholder: "Canteen Inventory Web App" },
      { key: "tools", label: "Tools used", placeholder: "HTML, CSS, JavaScript" }
    ],
    bullets: true
  },
  organizations: {
    singular: "Organization",
    fields: [
      { key: "org", label: "Organization", placeholder: "Junior IT Society" },
      { key: "role", label: "Your role", placeholder: "Secretary" },
      { key: "years", label: "Years", placeholder: "2025 – Present" }
    ],
    bullets: true
  },
  experience: {
    singular: "Experience",
    fields: [
      { key: "company", label: "Company or client", placeholder: "ABC Trading" },
      { key: "position", label: "Position", placeholder: "OJT – IT Support" },
      { key: "years", label: "Dates", placeholder: "June – July 2026" }
    ],
    bullets: true
  },
  certifications: {
    singular: "Certification",
    fields: [
      { key: "name", label: "Certificate or award", placeholder: "IT Essentials" },
      { key: "issuer", label: "Issued by", placeholder: "Cisco Networking Academy" },
      { key: "year", label: "Year", placeholder: "2026" }
    ],
    bullets: false
  }
};


/* 1. DRAFT DATA ---------------------------------------------------------- */

/* A blank resume, with one empty entry where students usually start */
function emptyDraft() {
  return {
    personal: { fullName: "", email: "", phone: "", city: "", linkedin: "", portfolio: "" },
    objective: "",
    education: [{ school: "", degree: "", years: "", honors: "" }],
    projects: [{ title: "", tools: "", bullets: [] }],
    organizations: [{ org: "", role: "", years: "", bullets: [] }],
    experience: [],
    skills: { technical: [], soft: [] },
    certifications: [],
    template: "classic",
    noExperience: false
  };
}

/* Make a copy that doesn't share arrays with the original */
function copyData(data) {
  return JSON.parse(JSON.stringify(data));
}

/* Fill in anything missing so older or broken saves still work */
function normalizeDraft(data) {
  var clean = emptyDraft();
  if (!data || typeof data !== "object") {
    return clean;
  }
  if (data.personal) {
    for (var key in clean.personal) {
      clean.personal[key] = String(data.personal[key] || "");
    }
  }
  clean.objective = String(data.objective || "");
  for (var section in SECTIONS) {
    if (Array.isArray(data[section])) {
      clean[section] = data[section].map(function (entry) {
        var item = {};
        SECTIONS[section].fields.forEach(function (field) {
          item[field.key] = String((entry && entry[field.key]) || "");
        });
        if (SECTIONS[section].bullets) {
          item.bullets = Array.isArray(entry && entry.bullets) ? entry.bullets.map(String) : [];
        }
        return item;
      });
    }
  }
  if (data.skills) {
    clean.skills.technical = Array.isArray(data.skills.technical) ? data.skills.technical.map(String) : [];
    clean.skills.soft = Array.isArray(data.skills.soft) ? data.skills.soft.map(String) : [];
  }
  clean.template = data.template === "modern" ? "modern" : "classic";
  clean.noExperience = data.noExperience === true;
  return clean;
}

/* Read the saved draft (localStorage can be blocked, so use try/catch) */
function loadDraft() {
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return normalizeDraft(JSON.parse(saved));
    }
  } catch (error) {
    /* Storage blocked or data unreadable: start fresh */
  }
  return emptyDraft();
}

/* Save right now and tell the user */
function saveDraft() {
  var status = document.getElementById("save-status");
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    status.textContent = "Saved on this device";
  } catch (error) {
    status.textContent = "Couldn't save. Your browser may be blocking storage.";
  }
}

/* Save shortly after the user stops typing */
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveDraft, 300);
}

/* True if the user has typed anything at all */
function draftHasContent() {
  var text = collectResumeText();
  return text.replace(/\s/g, "").length > 0;
}


/* 2. FORM ---------------------------------------------------------------- */

/* Small helper: create an element with a class and text */
function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (text !== undefined && text !== null) {
    node.textContent = text;
  }
  return node;
}

/* Draw all entries of one repeatable section (e.g. every project) */
function renderEntries(section) {
  var list = document.getElementById(section + "-list");
  var config = SECTIONS[section];
  list.innerHTML = "";

  draft[section].forEach(function (entry, index) {
    var box = el("div", "entry");
    var head = el("div", "entry-head");
    head.appendChild(el("p", "entry-title", config.singular + " " + (index + 1)));

    var removeBtn = el("button", "btn btn-quiet btn-small", "Remove");
    removeBtn.type = "button";
    removeBtn.setAttribute("data-remove", section);
    removeBtn.setAttribute("data-index", index);
    removeBtn.setAttribute("aria-label", "Remove " + config.singular.toLowerCase() + " " + (index + 1));
    head.appendChild(removeBtn);
    box.appendChild(head);

    var grid = el("div", "field-grid");
    config.fields.forEach(function (field) {
      var id = section + "-" + index + "-" + field.key;
      var wrap = el("div", "field");
      var label = el("label", "", field.label);
      label.setAttribute("for", id);
      var input = el("input");
      input.type = "text";
      input.id = id;
      input.placeholder = field.placeholder;
      input.value = entry[field.key];
      input.setAttribute("data-section", section);
      input.setAttribute("data-index", index);
      input.setAttribute("data-key", field.key);
      wrap.appendChild(label);
      wrap.appendChild(input);
      grid.appendChild(wrap);
    });
    box.appendChild(grid);

    if (config.bullets) {
      var bulletId = section + "-" + index + "-bullets";
      var bulletWrap = el("div", "field");
      var bulletLabel = el("label", "", "Bullet points (one per line)");
      bulletLabel.setAttribute("for", bulletId);
      var textarea = el("textarea");
      textarea.id = bulletId;
      textarea.rows = 3;
      textarea.placeholder = "Start with an action verb: Built…, Led…, Organized…";
      textarea.value = entry.bullets.join("\n");
      textarea.setAttribute("data-section", section);
      textarea.setAttribute("data-index", index);
      textarea.setAttribute("data-key", "bullets");
      bulletWrap.appendChild(bulletLabel);
      bulletWrap.appendChild(textarea);
      box.appendChild(bulletWrap);
    }

    list.appendChild(box);
  });
}

/* Put the whole draft into the form (used on load, sample, and clear) */
function fillForm() {
  for (var key in draft.personal) {
    document.getElementById(key).value = draft.personal[key];
  }
  document.getElementById("objective").value = draft.objective;
  document.getElementById("skills-technical").value = draft.skills.technical.join(", ");
  document.getElementById("skills-soft").value = draft.skills.soft.join(", ");
  for (var section in SECTIONS) {
    renderEntries(section);
  }
  var radio = document.querySelector('input[name="template"][value="' + draft.template + '"]');
  if (radio) {
    radio.checked = true;
  }
  document.getElementById("no-experience").checked = draft.noExperience;
  applyNoExperience();
  updateBulletTargets();
}

/* Turn "Excel, Python ,  Canva" into ["Excel", "Python", "Canva"] */
function splitList(text) {
  return text.split(",").map(function (item) {
    return item.trim();
  }).filter(function (item) {
    return item !== "";
  });
}

/* Any typing in the form updates the draft, the preview, and the save */
function handleFormInput(event) {
  var target = event.target;

  if (target.hasAttribute("data-personal")) {
    draft.personal[target.id] = target.value;
  } else if (target.id === "objective") {
    draft.objective = target.value;
  } else if (target.id === "skills-technical") {
    draft.skills.technical = splitList(target.value);
  } else if (target.id === "skills-soft") {
    draft.skills.soft = splitList(target.value);
  } else if (target.hasAttribute("data-section")) {
    var section = target.getAttribute("data-section");
    var index = Number(target.getAttribute("data-index"));
    var key = target.getAttribute("data-key");
    if (key === "bullets") {
      draft[section][index].bullets = target.value.split("\n").map(function (line) {
        return line.trim();
      }).filter(function (line) {
        return line !== "";
      });
    } else {
      draft[section][index][key] = target.value;
      if (section === "projects" || section === "organizations") {
        updateBulletTargets();
      }
    }
  } else {
    return; /* inputs that aren't part of the resume (bullet helper, job post) */
  }

  renderPreview();
  scheduleSave();
}

/* "+ Add" and "Remove" buttons inside the form */
function handleFormClick(event) {
  var addBtn = event.target.closest("[data-add]");
  var removeBtn = event.target.closest("[data-remove]");

  if (addBtn) {
    var section = addBtn.getAttribute("data-add");
    addEntry(section);
    /* Move focus to the first box of the new entry */
    var newIndex = draft[section].length - 1;
    var firstField = SECTIONS[section].fields[0].key;
    document.getElementById(section + "-" + newIndex + "-" + firstField).focus();
  }

  if (removeBtn) {
    var removeSection = removeBtn.getAttribute("data-remove");
    var index = Number(removeBtn.getAttribute("data-index"));
    draft[removeSection].splice(index, 1);
    renderEntries(removeSection);
    updateBulletTargets();
    renderPreview();
    saveDraft();
    /* Keep keyboard focus nearby: on the section's Add button */
    document.querySelector('[data-add="' + removeSection + '"]').focus();
  }
}

/* Add one blank entry to a section */
function addEntry(section) {
  var entry = {};
  SECTIONS[section].fields.forEach(function (field) {
    entry[field.key] = "";
  });
  if (SECTIONS[section].bullets) {
    entry.bullets = [];
  }
  draft[section].push(entry);
  renderEntries(section);
  updateBulletTargets();
  renderPreview();
  saveDraft();
}


/* 3. LIVE PREVIEW -------------------------------------------------------- */

/* Is every field in this entry empty? (empty entries are not printed) */
function isEntryEmpty(entry) {
  for (var key in entry) {
    if (key === "bullets" ? entry.bullets.length > 0 : entry[key].trim() !== "") {
      return false;
    }
  }
  return true;
}

/* One resume section with a heading, e.g. "PROJECTS" */
function previewSection(title) {
  var section = el("section", "resume-section");
  section.appendChild(el("h2", "", title));
  return section;
}

/* One item: bold title on the left, dates on the right, details below */
function previewItem(title, subtitle, dates, bullets) {
  var item = el("div", "resume-item");
  var head = el("div", "resume-item-head");
  head.appendChild(el("span", "resume-item-title", title));
  if (dates) {
    head.appendChild(el("span", "resume-item-dates", dates));
  }
  item.appendChild(head);
  if (subtitle) {
    item.appendChild(el("p", "resume-item-sub", subtitle));
  }
  if (bullets && bullets.length) {
    var list = el("ul");
    bullets.forEach(function (text) {
      list.appendChild(el("li", "", text));
    });
    item.appendChild(list);
  }
  return item;
}

/* Build each section of the resume from the draft */
function buildEducation() {
  var items = draft.education.filter(function (e) { return !isEntryEmpty(e); });
  if (!items.length) { return null; }
  var section = previewSection("Education");
  items.forEach(function (e) {
    var sub = [e.degree, e.honors].filter(Boolean).join(" · ");
    section.appendChild(previewItem(e.school || "School", sub, e.years));
  });
  return section;
}

function buildProjects() {
  var items = draft.projects.filter(function (e) { return !isEntryEmpty(e); });
  if (!items.length) { return null; }
  var section = previewSection("Projects");
  items.forEach(function (e) {
    section.appendChild(previewItem(e.title || "Project", e.tools ? "Tools: " + e.tools : "", "", e.bullets));
  });
  return section;
}

function buildOrganizations() {
  var items = draft.organizations.filter(function (e) { return !isEntryEmpty(e); });
  if (!items.length) { return null; }
  var section = previewSection("Organizations and Leadership");
  items.forEach(function (e) {
    section.appendChild(previewItem(e.org || "Organization", e.role, e.years, e.bullets));
  });
  return section;
}

function buildExperience() {
  var items = draft.experience.filter(function (e) { return !isEntryEmpty(e); });
  if (!items.length) { return null; }
  var section = previewSection("Experience");
  items.forEach(function (e) {
    section.appendChild(previewItem(e.position || "Position", e.company, e.years, e.bullets));
  });
  return section;
}

function buildSkills() {
  var tech = draft.skills.technical;
  var soft = draft.skills.soft;
  if (!tech.length && !soft.length) { return null; }
  var section = previewSection("Skills");
  if (tech.length) {
    var p1 = el("p");
    p1.appendChild(el("strong", "", "Technical: "));
    p1.appendChild(document.createTextNode(tech.join(", ")));
    section.appendChild(p1);
  }
  if (soft.length) {
    var p2 = el("p");
    p2.appendChild(el("strong", "", "Soft skills: "));
    p2.appendChild(document.createTextNode(soft.join(", ")));
    section.appendChild(p2);
  }
  return section;
}

function buildCertifications() {
  var items = draft.certifications.filter(function (e) { return !isEntryEmpty(e); });
  if (!items.length) { return null; }
  var section = previewSection("Certifications and Awards");
  var list = el("ul");
  items.forEach(function (e) {
    var line = e.name || "Certificate";
    if (e.issuer) { line += ", " + e.issuer; }
    if (e.year) { line += " (" + e.year + ")"; }
    list.appendChild(el("li", "", line));
  });
  section.appendChild(list);
  return section;
}

/* Redraw the whole preview. Order changes in "No experience yet" mode. */
function renderPreview() {
  var preview = document.getElementById("resume-preview");
  preview.className = "resume resume-" + draft.template;
  preview.innerHTML = "";

  /* Header: name and contact line */
  var header = el("header", "resume-header");
  header.appendChild(el("h1", "resume-name", draft.personal.fullName || "Your Name"));
  var p = draft.personal;
  var contact = [p.city, p.phone, p.email, p.linkedin, p.portfolio].filter(Boolean).join("  |  ");
  header.appendChild(el("p", "resume-contact", contact || "City · Mobile number · Email"));
  preview.appendChild(header);

  if (draft.objective.trim()) {
    var objective = previewSection("Objective");
    objective.appendChild(el("p", "", draft.objective.trim()));
    preview.appendChild(objective);
  }

  var order;
  if (draft.noExperience) {
    /* Emphasize what students have: projects and orgs come first */
    order = [buildProjects, buildOrganizations, buildEducation, buildSkills, buildCertifications];
  } else {
    order = [buildEducation, buildExperience, buildProjects, buildOrganizations, buildSkills, buildCertifications];
  }

  var added = 0;
  order.forEach(function (build) {
    var section = build();
    if (section) {
      preview.appendChild(section);
      added++;
    }
  });

  if (!added && !draft.objective.trim()) {
    preview.appendChild(el("p", "resume-empty resume-section", "Start filling in the form, or press Load sample, and your resume will appear here."));
  }
}


/* 4. TOOLBAR ------------------------------------------------------------- */

/* Show or hide the Experience section for "No experience yet" */
function applyNoExperience() {
  document.getElementById("experience-section").hidden = draft.noExperience;
  document.getElementById("no-exp-note").hidden = !draft.noExperience;
}

function setupToolbar() {
  /* Template switch */
  var radios = document.querySelectorAll('input[name="template"]');
  radios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      draft.template = radio.value;
      renderPreview();
      saveDraft();
    });
  });

  /* No experience yet */
  document.getElementById("no-experience").addEventListener("change", function (event) {
    draft.noExperience = event.target.checked;
    applyNoExperience();
    renderPreview();
    saveDraft();
  });

  /* Load sample data for the demo */
  document.getElementById("load-sample").addEventListener("click", function () {
    if (draftHasContent() && !confirm("Replace your current resume with the sample? Your own entries will be lost.")) {
      return;
    }
    draft = normalizeDraft(copyData(sampleResume));
    fillForm();
    renderPreview();
    saveDraft();
  });

  /* Clear everything, after confirming */
  document.getElementById("clear-all").addEventListener("click", function () {
    if (!confirm("Clear your whole resume? This can't be undone.")) {
      return;
    }
    draft = emptyDraft();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      /* Nothing to remove if storage is blocked */
    }
    fillForm();
    renderPreview();
    document.getElementById("save-status").textContent = "Cleared";
  });

  /* Download PDF: the browser's print dialog with print.css (Save as PDF).
     The page title becomes the suggested file name. */
  document.getElementById("download-pdf").addEventListener("click", function () {
    var originalTitle = document.title;
    var name = draft.personal.fullName.trim();
    if (name) {
      var parts = name.split(/\s+/);
      var last = parts.pop();
      document.title = last + "_" + parts.join("_") + "_Resume";
    }
    window.print();
    document.title = originalTitle;
  });
}


/* 5. BULLET HELPER ------------------------------------------------------- */

/* Fill the verb dropdown from actionVerbs, grouped by category */
function setupVerbSelect() {
  var select = document.getElementById("bh-verb");
  for (var group in actionVerbs) {
    var optgroup = document.createElement("optgroup");
    optgroup.label = group;
    actionVerbs[group].forEach(function (verb) {
      var option = el("option", "", verb);
      option.value = verb;
      optgroup.appendChild(option);
    });
    select.appendChild(optgroup);
  }
  select.value = "Developed";
}

/* Remove a final period and extra spaces from what the user typed */
function tidy(text) {
  return text.trim().replace(/\.+$/, "");
}

/* Build: "Developed X using Y, resulting in Z." */
function buildBullet() {
  var verb = document.getElementById("bh-verb").value;
  var what = tidy(document.getElementById("bh-what").value);
  var tool = tidy(document.getElementById("bh-tool").value);
  var result = tidy(document.getElementById("bh-result").value);
  if (!what) {
    return "";
  }
  var sentence = verb + " " + what;
  if (tool) {
    sentence += " using " + tool;
  }
  if (result) {
    sentence += ", resulting in " + result;
  }
  return sentence + ".";
}

function updateBulletOutput() {
  var output = document.getElementById("bh-sentence");
  var sentence = buildBullet();
  output.textContent = sentence || "Fill in what you built or did to see your bullet.";
  output.classList.toggle("is-empty", !sentence);
}

/* List every project and organization in the "Add it to" dropdown */
function updateBulletTargets() {
  var select = document.getElementById("bh-target");
  var previous = select.value;
  select.innerHTML = "";

  draft.projects.forEach(function (entry, i) {
    var option = el("option", "", "Project: " + (entry.title || "Project " + (i + 1)));
    option.value = "projects:" + i;
    select.appendChild(option);
  });
  draft.organizations.forEach(function (entry, i) {
    var option = el("option", "", "Organization: " + (entry.org || "Organization " + (i + 1)));
    option.value = "organizations:" + i;
    select.appendChild(option);
  });
  if (!select.options.length) {
    var none = el("option", "", "A new project (none yet)");
    none.value = "new";
    select.appendChild(none);
  }
  /* Keep the same choice selected if it still exists */
  for (var i = 0; i < select.options.length; i++) {
    if (select.options[i].value === previous) {
      select.value = previous;
    }
  }
}

function insertBullet() {
  var status = document.getElementById("bh-status");
  var sentence = buildBullet();
  if (!sentence) {
    status.textContent = "First, fill in what you built or did.";
    document.getElementById("bh-what").focus();
    return;
  }

  var choice = document.getElementById("bh-target").value;
  if (choice === "new") {
    addEntry("projects");
    choice = "projects:0";
  }
  var parts = choice.split(":");
  var section = parts[0];
  var index = Number(parts[1]);

  draft[section][index].bullets.push(sentence);
  document.getElementById(section + "-" + index + "-bullets").value = draft[section][index].bullets.join("\n");
  renderPreview();
  saveDraft();

  var label = document.getElementById("bh-target").selectedOptions[0].textContent;
  status.textContent = "Added to " + label + ".";
}

function setupBulletHelper() {
  setupVerbSelect();
  ["bh-verb", "bh-what", "bh-tool", "bh-result"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", updateBulletOutput);
  });
  document.getElementById("bh-insert").addEventListener("click", insertBullet);
  updateBulletOutput();
}


/* 6. JOB-FIT CHECKER ----------------------------------------------------- */

var SAMPLE_POSTING = "IT Support Intern (OJT) – Batangas City\n" +
  "We are looking for a 3rd or 4th year IT or CS student for a 300-hour OJT.\n" +
  "Qualifications:\n" +
  "- Basic troubleshooting of computers and printers\n" +
  "- Knowledge of networking (LAN, Wi-Fi setup) is a plus\n" +
  "- Familiar with MS Office, especially Excel\n" +
  "- Good English communication and customer service skills\n" +
  "- Team player, willing to learn, and has good time management\n" +
  "- Experience with HTML, CSS, or JavaScript is an advantage";

/* Escape characters like + . # so they match literally in a pattern */
function escapeForPattern(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Case-insensitive, whole-word match. Letters, numbers, + and # count as
   part of a word, so "Java" doesn't match "JavaScript" and "C" doesn't
   match "C++". */
function containsTerm(text, term) {
  var pattern = new RegExp("(^|[^a-z0-9+#])" + escapeForPattern(term) + "(?=$|[^a-z0-9+#])", "i");
  return pattern.test(text);
}

/* Does the text mention this skill (by name or any alias)? */
function mentionsSkill(text, skill) {
  var terms = [skill.name].concat(skill.aliases);
  for (var i = 0; i < terms.length; i++) {
    if (containsTerm(text, terms[i])) {
      return true;
    }
  }
  return false;
}

/* All the words on the resume, in one string */
function collectResumeText() {
  var parts = [draft.objective];
  for (var key in draft.personal) {
    if (key !== "email") { parts.push(draft.personal[key]); }
  }
  for (var section in SECTIONS) {
    draft[section].forEach(function (entry) {
      for (var field in entry) {
        parts.push(field === "bullets" ? entry.bullets.join(" ") : entry[field]);
      }
    });
  }
  parts.push(draft.skills.technical.join(", "));
  parts.push(draft.skills.soft.join(", "));
  return parts.join(" \n ");
}

/* Fill a chip list with skill names */
function fillChips(listId, skills, chipClass) {
  var list = document.getElementById(listId);
  list.innerHTML = "";
  if (!skills.length) {
    list.appendChild(el("li", "muted small", "None"));
    return;
  }
  skills.forEach(function (skill) {
    list.appendChild(el("li", "chip " + chipClass, skill.name));
  });
}

function checkJobFit() {
  var posting = document.getElementById("jf-posting").value;
  var results = document.getElementById("jf-results");
  var tips = document.getElementById("jf-tips");
  results.hidden = false;
  tips.innerHTML = "";

  /* Skills the posting asks for */
  var wanted = skillKeywords.filter(function (skill) {
    return mentionsSkill(posting, skill);
  });

  var resumeText = collectResumeText();
  var matched = wanted.filter(function (skill) {
    return mentionsSkill(resumeText, skill);
  });
  var missing = wanted.filter(function (skill) {
    return matched.indexOf(skill) === -1;
  });

  var percent = wanted.length ? Math.round((matched.length / wanted.length) * 100) : 0;
  document.getElementById("jf-percent").textContent = percent + "%";
  document.getElementById("jf-meter-fill").style.width = percent + "%";
  document.getElementById("jf-matched-count").textContent = "(" + matched.length + ")";
  document.getElementById("jf-missing-count").textContent = "(" + missing.length + ")";
  fillChips("jf-matched", matched, "chip-success");
  fillChips("jf-missing", missing, "chip-danger");

  /* Plain-language tips */
  var tipTexts = [];
  if (!posting.trim()) {
    tipTexts.push("Paste a job or OJT posting first, or press \"Use a sample posting.\"");
  } else if (!wanted.length) {
    tipTexts.push("We couldn't find skills from our list in this post. Try pasting the full description, including the qualifications.");
  } else {
    if (percent >= 70) {
      tipTexts.push("Strong match. Make sure your objective names this role, and use the same wording the post uses.");
    } else if (percent >= 40) {
      tipTexts.push("Good start. Look at the missing skills: if you've used any of them in class or org work, add them to a project bullet or your skills list.");
    } else {
      tipTexts.push("Low match for now. That's okay for OJT. Add projects, online courses, or org work that show the missing skills.");
    }
    var missingSoft = missing.filter(function (s) { return s.category === "Soft skill"; });
    if (missingSoft.length) {
      tipTexts.push("Soft skills like " + missingSoft.map(function (s) { return s.name.toLowerCase(); }).join(", ") + " are easier to believe when a bullet shows them in action, for example \"Led a team of 4…\".");
    }
    if (!draft.objective.trim()) {
      tipTexts.push("Add an objective that names this role.");
    }
  }
  tipTexts.push("Only add skills you can talk about in an interview. They will ask.");
  tipTexts.forEach(function (text) {
    tips.appendChild(el("li", "", text));
  });
}

function setupJobFit() {
  document.getElementById("jf-check").addEventListener("click", checkJobFit);
  document.getElementById("jf-sample").addEventListener("click", function () {
    document.getElementById("jf-posting").value = SAMPLE_POSTING;
    checkJobFit();
  });
}


/* START ------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  draft = loadDraft();

  var form = document.getElementById("resume-form");
  form.addEventListener("input", handleFormInput);
  form.addEventListener("click", handleFormClick);
  /* Pressing Enter in a text box shouldn't submit (reload) the page */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  setupToolbar();
  setupBulletHelper();
  setupJobFit();
  fillForm();
  renderPreview();
});
