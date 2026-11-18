/* ==========================================================================
   backup.js: download, restore, or delete everything Simula saved.
   Used on the builder and About pages. Simula keeps data only in this
   browser (localStorage), so clearing browser data would erase it; a
   backup file lets the visitor keep it or move it to another device.
   Buttons opt in with data-backup="download" | "restore" | "erase".
   Nothing is uploaded: the file is made and read inside the browser.
   ========================================================================== */

/* Every localStorage key the site uses, and what it holds (shown on About) */
var BACKUP_KEYS = ["resumeDraft", "simulaCards", "starAnswer", "checklistProgress", "simula-theme"];

function backupStatus(text) {
  var spots = document.querySelectorAll("[data-backup-status]");
  for (var i = 0; i < spots.length; i++) {
    spots[i].textContent = text;
  }
}

/* Collect the saved values into one object */
function collectBackup() {
  var data = {};
  for (var i = 0; i < BACKUP_KEYS.length; i++) {
    var value = localStorage.getItem(BACKUP_KEYS[i]);
    if (value !== null) {
      data[BACKUP_KEYS[i]] = value;
    }
  }
  return { app: "simula", version: 1, exportedAt: new Date().toISOString(), data: data };
}

/* Save the backup as a .json file using a temporary download link */
function downloadBackup() {
  try {
    var backup = collectBackup();
    if (!Object.keys(backup.data).length) {
      backupStatus("Nothing saved yet, so there's nothing to back up.");
      return;
    }
    var blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "simula-backup-" + backup.exportedAt.slice(0, 10) + ".json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
    backupStatus("Backup downloaded. Keep the file somewhere safe.");
  } catch (error) {
    backupStatus("Couldn't make a backup. Your browser may be blocking storage.");
  }
}

/* Read a chosen backup file and put its values back, then reload */
function restoreBackup(file, button) {
  if (!file) {
    return;
  }
  button.classList.add("is-busy");
  backupStatus("Restoring…");
  var reader = new FileReader();
  reader.onload = function () {
    try {
      var backup = JSON.parse(reader.result);
      if (!backup || backup.app !== "simula" || typeof backup.data !== "object") {
        throw new Error("not a Simula backup");
      }
      BACKUP_KEYS.forEach(function (key) {
        if (typeof backup.data[key] === "string") {
          localStorage.setItem(key, backup.data[key]);
        }
      });
      backupStatus("Restored. Reloading…");
      setTimeout(function () { location.reload(); }, 400);
    } catch (error) {
      button.classList.remove("is-busy");
      backupStatus("That file isn't a Simula backup. Choose the .json file you downloaded.");
    }
  };
  reader.onerror = function () {
    button.classList.remove("is-busy");
    backupStatus("Couldn't read that file.");
  };
  reader.readAsText(file);
}

/* Delete everything, after asking */
function eraseAll() {
  if (!confirm("Delete your resume, cards, STAR draft, and checklist from this browser? This can't be undone.")) {
    return;
  }
  try {
    BACKUP_KEYS.forEach(function (key) {
      localStorage.removeItem(key);
    });
    backupStatus("Everything was deleted from this browser.");
    setTimeout(function () { location.reload(); }, 600);
  } catch (error) {
    backupStatus("Couldn't delete. Your browser may be blocking storage.");
  }
}

function setupBackup() {
  var buttons = document.querySelectorAll("[data-backup]");
  for (var i = 0; i < buttons.length; i++) {
    (function (button) {
      var action = button.getAttribute("data-backup");
      if (action === "download") {
        button.addEventListener("click", downloadBackup);
      } else if (action === "erase") {
        button.addEventListener("click", eraseAll);
      } else if (action === "restore") {
        /* A hidden file picker; the visible button opens it */
        var picker = document.createElement("input");
        picker.type = "file";
        picker.accept = ".json,application/json";
        picker.hidden = true;
        picker.setAttribute("aria-label", "Backup file");
        button.after(picker);
        button.addEventListener("click", function () { picker.click(); });
        picker.addEventListener("change", function () {
          restoreBackup(picker.files[0], button);
          picker.value = "";
        });
      }
    })(buttons[i]);
  }
}

document.addEventListener("DOMContentLoaded", setupBackup);
