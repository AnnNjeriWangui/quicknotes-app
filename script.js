// 1. Select elements
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all");

// 2. localStorage helpers
const STORAGE_KEY = "quicknotes";

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (e) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// 3. The notes array (each note is an object)
let notes = loadNotes();

// 4. Count function
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
}

// 5. Rebuild the list from the array
function render() {
  notesList.textContent = "";   // clear the list
  updateCount();

  const term = searchInput.value.trim().toLowerCase();
  const visible = notes.filter(n => n.text.toLowerCase().includes(term));

  if (notes.length > 0 && visible.length === 0) {
    const li = document.createElement("li");
    li.className = "empty-message";
    li.textContent = "No notes match your search.";
    notesList.appendChild(li);
    return;
  }

  visible.forEach(note => {
    const li = document.createElement("li");
    li.className = "note category-" + note.category;

    const text = document.createElement("p");
    text.textContent = note.text;           // textContent, never innerHTML

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const label = document.createElement("span");
    label.className = "category-label";
    label.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete-btn";
    del.textContent = "Delete";
    del.addEventListener("click", () => deleteNote(note.id));

    meta.append(label, date, del);
    li.append(text, meta);
    notesList.appendChild(li);
  });
}

// 6. Delete a note
function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  saveNotes();
  render();
}

// 7. Add a note with validation
const MAX_LENGTH = 200;

function addNote(event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  });

  saveNotes();
  noteInput.value = "";
  render();
}

// 8. Event listeners
form.addEventListener("submit", addNote);
searchInput.addEventListener("input", render);

clearAllBtn.addEventListener("click", () => {
  if (notes.length === 0) return;
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

// 9. Initial render
render();