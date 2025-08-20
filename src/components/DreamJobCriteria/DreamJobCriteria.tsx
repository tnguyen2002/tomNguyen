function DreamJobCriteria() {
  const mustHaves = [
    {
      text: "quirky mle along the brainwaves of pipelines for generating best dating profiles, insta captions, or converting irl movies to different anime styles",
    },
    { text: "be a coding youtuber" },
    {
      text: "company with a culture of 'a little bit of slope makes up for a lot of y-intercept' - john ousterhout",
    },
  ];

  return (
    <div className="flex flex-col w-full items-start text-left">
      <div className="text-xl mb-2">
        {mustHaves.map((item, idx) => (
          <div key={idx} className="mb-1 sm:mb-2 flex items-center">
            <span className="font-bold mr-2">{idx + 1}.</span>
            <span>{item.text.toLowerCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DreamJobCriteria;
