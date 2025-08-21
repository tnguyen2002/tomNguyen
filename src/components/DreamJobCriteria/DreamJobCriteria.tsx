function DreamJobCriteria() {
  const mustHaves = [
    {
      text: "code",
    },
    { text: "diet" },
    {
      text: "exercise",
    },
  ];

  return (
    <div className="flex flex-col w-full items-start text-left">
      <div className="text-xl mb-2">
        {mustHaves.map((item, idx) => (
          <div key={idx} className="mb-1 sm:mb-2 flex items-start">
            <span className="font-bold mr-2 pt-0.5">{idx + 1}.</span>
            <span>{item.text.toLowerCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DreamJobCriteria;
