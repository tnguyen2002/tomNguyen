function Before30Checklist() {
  const checklist = [
    { text: "Start a company", done: false },
    {
      text: "Give a singing/acoustic concert to my friends with at least 5 songs",
      done: false,
    },
    { text: "Go to Europe", done: false }, // example struck through
    { text: "Japan", done: true },
    { text: "Buy my entire extended family a meal", done: true },
    { text: "Go to 1 World Cup game", done: false },
    { text: "10k YouTube subscribers", done: false },
    { text: "Learn how to play an anime opening on piano", done: false },
    { text: "Go to an F1 race", done: false },
    {
      text: "Write some form of literature be it blog, book, or poetry",
      done: false,
    },
    { text: "Do 1 card magic show for my friends", done: false },
    { text: "Run a marathon", done: false },
    { text: "Write a language model completely from scratch", done: false },
    { text: "Buy my mom and dad an all expenses paid vacation", done: false },
    { text: "Become a millionaire?", done: false },
    { text: "Develop a game, be it platform or whatever", done: false },
    { text: "Deploy an app on the App Store as a side hustle", done: false },
    { text: "Be an extra in a movie releasing in theaters", done: false },
    { text: "Create a short film", done: false },
    { text: "Learn how to do a handstand push up", done: false },
    { text: "Play volleyball in a foreign country with natives", done: true },
    { text: "Average sub 15sec on 3x3 (current avg: 23)", done: false },
    { text: "Fold an origami collection", done: false },
  ];

  return (
    <div className="w-full">
      <ul className="list-none text-xl mb-2">
        {checklist.map((item, idx) => (
          <li key={idx} className="mb-2 flex items-center">
            <span className="font-bold mr-2">{idx + 1}.</span>
            <span className={item.done ? "line-through text-gray-400" : ""}>
              {item.text.toLowerCase()}
            </span>
          </li>
        ))}
        <li className="mt-4 text-gray-500 italic">
          still figuring out the rest, created in 8/2025
        </li>
      </ul>
    </div>
  );
}

export default Before30Checklist;
