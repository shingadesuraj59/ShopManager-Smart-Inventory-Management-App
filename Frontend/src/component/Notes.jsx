import React, { useState, useEffect } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    productName: '',
    quantity: '',
    note: ''
  });

  // Load saved notes from localStorage when component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem('productNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('productNotes', JSON.stringify(notes));
  }, [notes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value
    });
  };

  const addNote = () => {
    if (newNote.productName.trim() && newNote.quantity.trim()) {
      const noteWithDate = {
        ...newNote,
        date: new Date().toLocaleString()
      };
      setNotes([...notes, noteWithDate]);
      setNewNote({
        productName: '',
        quantity: '',
        note: ''
      });
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Notes</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="productName"
            value={newNote.productName}
            onChange={handleInputChange}
            placeholder="Product name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="quantity"
            value={newNote.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <textarea
          name="note"
          value={newNote.note}
          onChange={handleInputChange}
          placeholder="Additional notes (optional)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          rows="3"
        />
        <button 
          onClick={addNote}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200"
        >
          Add Note
        </button>
      </div>
      
      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No notes yet. Add your first note above.</p>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{note.productName}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{note.date}</span>
                  <button 
                    onClick={() => deleteNote(index)}
                    className="text-red-500 hover:text-red-700 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-1"><span className="font-medium">Quantity:</span> {note.quantity}</p>
              {note.note && <p className="text-gray-600"><span className="font-medium">Note:</span> {note.note}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
