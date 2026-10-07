# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, file them under Personal, Work or Study, search through them and delete the ones you no longer need. Everything is saved in your browser with localStorage, so your notes are still there after a refresh.

## Features

- Add notes with a category (Personal, Work or Study)
- Each note shows its text, category label, date and time
- Validation: empty notes and notes over 200 characters show an error
- Delete individual notes
- Live, case-insensitive search with a "No notes match your search." message
- Note count for zero, one and many notes
- Notes persist across page refreshes (localStorage)
- Clear all notes with a confirmation prompt
- Responsive layout that stacks the form on screens 600px wide or narrower

## Run locally

1. Clone the repository: `git clone https://github.com/AnnNjeriWangui/quicknotes-app.git`
2. Open the `quicknotes-app` folder.
3. Open `index.html` in your browser.

No build step or installation is needed.

## What I learned

- How to build semantic HTML and link a label to its input with `for` and `id`.
- How to keep data in an array of objects and rebuild the page with `render()`, using `createElement` and `textContent` so user text is never treated as HTML.
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`.
- How to use Flexbox and a `@media (max-width: 600px)` rule for small screens.
- How to make small, clear Git commits as each feature is finished.