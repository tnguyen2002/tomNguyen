function DreamJobCriteria() {
  const mustHaves = [
    {
      text: "be an mle",
    },
    { text: "be a coding youtuber" },
    {
      text: "in a company with a culture of 'a little bit of slope makes up for a lot of y-intercept' - john ousterhout",
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
