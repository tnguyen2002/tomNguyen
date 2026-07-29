import { checklist, checklistNote } from "../../data/checklist";

function Before30Checklist() {
  const doneCount = checklist.filter((item) => item.done).length;

  return (
    <div className="flex flex-col w-full items-start text-left">
      <div className="text-xl mb-2">
        <div className="mb-3 text-gray-400 text-sm tabular-nums">
          {doneCount} / {checklist.length} done
        </div>
        {checklist.map((item, idx) => (
          <div key={idx} className="mb-1 sm:mb-2 flex items-center">
            <span className="font-bold mr-2">{idx + 1}.</span>
            <span
              className={`lowercase ${
                item.done ? "line-through text-gray-400" : ""
              }`}
            >
              {item.text}
            </span>
          </div>
        ))}
        <div className="mt-2 sm:mt-4 text-gray-500 italic text-xs sm:text-base">
          {checklistNote}
        </div>
      </div>
    </div>
  );
}

export default Before30Checklist;
