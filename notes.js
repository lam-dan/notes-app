const fs = require('fs');
const chalk = require('chalk');

const addNote = (title,body) => {

    const notes = loadNotes()
    //filter method takes each object from duplicateNotes and runs a function on each
    //if it finds the note.title belongs to the title, it will return true and keep that individual note in the new array called duplicate
    //else it will return false with empty array

    //finds the first value found and return it's value
    const duplicateNote = notes.find((note) => note.title === title)

    //checks to see if array is empty and pushes note, else since array contains duplicate it will do nothing.
    if (!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }

}

const removeNote = (title) => {
    const notes =  loadNotes();
    //filter method runs this method on each note and returns true when matches happen
    //in this case, when the title of the object is not equal to the title passed through, it is when we want to return true, since these are
    //the notes we want to keep. We are filtering out title matches.
    const notesToKeep = notes.filter( (note) => note.title !== title)

    if(notesToKeep.length === notes.length){        
        console.log(chalk.red.inverse("No note found!"))
    }else{
        console.log(chalk.green.inverse("Note removed!"))
    }
    //saves new note object without the filtered title
    saveNotes(notesToKeep);
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    console.log(chalk.green.inverse("Your notes..."));

    const notes = loadNotes();

    notes.forEach( (note)=> {
        console.log(chalk.green.inverse(note.title));
    })
}

const readNotes = (title) => {

    const notes = loadNotes();
    const note = notes.find( (note) => note.title === title)
 
    if(note){
        console.log(chalk.green.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red("Note not found"))
    }
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}