import { books } from "../../data/books";
import CoverGrid from "../CoverGrid/CoverGrid";
import CoverTile from "../CoverGrid/CoverTile";

function Bookshelf() {
  if (books.length === 0) return null;

  return (
    <div className="w-full">
      <CoverGrid variant="books">
        {books.map((book) => (
          <CoverTile
            key={book.slug}
            ratio="portrait"
            title={book.title}
            subtitle={book.author}
            note={book.note}
            cover={book.cover}
            href={book.href}
          />
        ))}
      </CoverGrid>
    </div>
  );
}

export default Bookshelf;
