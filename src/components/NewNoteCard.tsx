const NewNoteCard = () => {
  return (
    <div className="rounded-md bg-slate-700 p-5 space-y-3">
      <span className="text-sm font-medium text-slate-200">add notes</span>
      <p className="text-sm leading-6 text-slate-400">
        Record an audio note that will be converted to text automatically.
      </p>
    </div>
  );
};

export default NewNoteCard;
