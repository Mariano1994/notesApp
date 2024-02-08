import { useState } from "react";
import logo from "./assets/logo-nlw-expert.svg";
import NewNoteCard from "./components/NewNoteCard";
import NoteCard from "./components/NoteCard";

interface Note {
  id: string;
  date: Date;
  content: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }
    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];
    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  return (
    <>
      <div className="mx-auto max-w-6xl my-12 space-y-6">
        <img src={logo} alt="nlw expert" />

        <form className="w-full">
          <input
            type="text"
            placeholder="Search in your notes..."
            className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder: text-slate-500"
          />
        </form>
        <div className="h-px bg-slate-700" />

        <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
          <NewNoteCard onNoteCreated={onNoteCreated} />
          {notes.map((note) => (
            <NoteCard note={note} key={note.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
