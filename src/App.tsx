import logo from "./assets/logo-nlw-expert.svg";
import NewNoteCard from "./components/NewNoteCard";
import NoteCard from "./components/NoteCard";

const note = {
  date: new Date(),
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla provident dignissimos adipisci corporis quasi id. Obcaecati fugiat rerum nostrum saepe similique quia id, non mollitia omnis aspernatur porro perspiciatis pariatur!",
};

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
          <NoteCard note={note} />
        </div>
      </div>
    </>
  );
};

export default App;
