import React, {useState} from 'react';
import { Book } from '../book.interface';
import './book.item.component.css';

interface BookListComponentProps {
    book: Book;
    onEditBook: (book: Book) => void;
}

export default function BookItemComponent({ book, onEditBook }: BookListComponentProps) {
    const [editableBook, setEditableBook] = useState<Book>(book);
    return (
    <div className="book-item-container">
        {book && 
            Object.entries(book).map(([key, value]) => (
                <div className='input-box' key={key}>
                    <label htmlFor={`book-${key}`}>{key}:</label>
                    <input 
                        id={`book-${key}`} 
                        type="text" 
                        value={value} 
                        onChange={(e) => setEditableBook({...editableBook, [key]: e.target.value})}
                    />
                </div>
            ))
        }
        <div className='input-box'>
            <button onClick={() => onEditBook(editableBook)}>Save</button>

        </div>
    </div>
    );
}