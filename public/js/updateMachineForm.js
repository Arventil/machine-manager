document.addEventListener('DOMContentLoaded', function(){
    const deleteButton = document.querySelector('#delete');

    deleteButton.addEventListener('click', function(){
        let confirmationOfDeleting = confirm("Wybrałeś opcję usnięcia maszyny.\nOperacja ta usunie z pamięci wszelkie dane dot. danej maszyny (przeglądy, dane obsługi, itd.).\nOperacja ta nie może być cofnięta.\nJeśli chcesz kontynuować usuwanie maszyny naciśnij przycisk \"ok\".\nW przeciwnym razie naciśnij przycisk \"Anuluj\". ");

        if(confirmationOfDeleting == false){
            location.reload();
        }
    })
})