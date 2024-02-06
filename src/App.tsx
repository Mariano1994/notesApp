import logo from "./assets/logo-nlw-expert.svg";
import NewNoteCard from "./components/NewNoteCard";
import NoteCard from "./components/NoteCard";

const App = () => {
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
          <NewNoteCard />

          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
        </div>
      </div>
    </>
  );
};

export default App;
