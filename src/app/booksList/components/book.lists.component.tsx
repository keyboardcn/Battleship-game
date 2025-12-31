import React from "react";
import { Book } from "../book.interface";
import './book.lists.component.css';
export default function BookListComponent(
    {books, selectBookItem}: {books: Array<Book>, selectBookItem: (bookId: number) => void}) {

    return (<div className="container-wrapper">
      {books.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(books[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                {Object.keys(book).map((key) => (
                  <td 
                    key={`book-${book.id}-${key}`} 
                    >{book[key]}</td>
                ))}
                <td><button onClick={() => selectBookItem(book.id)}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h2>No books available</h2>
        </div>
      )}
    </div>);
}