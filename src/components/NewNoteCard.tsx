import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

const NewNoteCard = () => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState("");

  const handleStartEditor = () => {
    setShouldShowOnboarding(false);
  };

  const handleContentChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!event.target.value) {
      setShouldShowOnboarding(true);
    }
    setContent(event.target.value);
  };

  const handleSaveNote = (event: FormEvent) => {
    event.preventDefault();
    console.log(content);

    toast.success("Note saved successfully");
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200">add notes</span>
        <p className="text-sm leading-6 text-slate-400">
          Record an audio note that will be converted to text automatically.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50">
          <Dialog.Content className="fixed overflow-hidden -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2  max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
            <Dialog.Close className="absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>
            <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5 ">
                <span className="text-sm font-medium text-slate-300">
                  Create a new note
                </span>
                {shouldShowOnboarding ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Start by{" "}
                    <button className="font=medium text-lime-400 hover:underline">
                      recording an audio note
                    </button>{" "}
                    or, if you prefer, just{" "}
                    <button
                      onClick={handleStartEditor}
                      className="font=medium text-lime-400 hover:underline"
                    >
                      {" "}
                      write a text
                    </button>
                  </p>
                ) : (
                  <div>
                    <textarea
                      onChange={handleContentChanged}
                      autoFocus
                      className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex flex-1 w-full outline-none"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-lime-400 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
              >
                <span className="text-lime-950 outline-none font-medium hover:bg-lime-500">
                  {" "}
                  Add note
                </span>{" "}
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewNoteCard;
