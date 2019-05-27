document.addEventListener('DOMContentLoaded', () => {

    let notes = document.querySelectorAll(".noteButton");

    for(let a=0; a < notes.length; a++) {
        notes[a].addEventListener('click', showHideNote);
    }

    function showHideNote() {
        let noteDiv = document.querySelector(".b" + this.id);

        if(noteDiv.style.display == 'none') {
            noteDiv.style.display = "block";
        }
        else{
            noteDiv.style.display = "none";
        }
    }
})