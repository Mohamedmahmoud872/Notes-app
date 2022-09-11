const fs = require('fs');
const chalk = require('chalk');

const readNote = (title) => {
    const notes = loadNotes();
    const found = notes.find((note) => note.title === title);
    if(found){
        console.log(chalk.green.inverse(found.title));
        console.log(found.body);
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
};


const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.title === title);

    debugger

    if(duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added'));
    }else {
        console.log(chalk.red.inverse('Note title alredy exist'));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const oldLength = notes.length;
    const matchingNote = notes.filter((note) => note.title !== title);
    const newLength = matchingNote.length;
    if(oldLength === newLength) {
        console.log(chalk.red.inverse('There is no note with this title'));
    }else {
        saveNotes(matchingNote);
        console.log(chalk.green.inverse('Note removed'));
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green('Your Notes:'));
    notes.forEach(note => {
        console.log(note.title);
    });
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
};

module.exports = {
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
};