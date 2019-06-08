document.addEventListener('DOMContentLoaded', function(){
    const deleteButtons = document.querySelectorAll('.delete');
    const cancelButtons = document.querySelectorAll('.cancel');

    for(let a = 0; a < deleteButtons.length; a++){
        deleteButtons[a].addEventListener('click', showDeleteDiv);
        cancelButtons[a].addEventListener('click', hideDeleteDiv);
    }

    function showDeleteDiv(){
        let machineId = this.id.substring(1);
        let deleteDiv = document.querySelector('#d' + machineId);

        deleteDiv.style.display = 'block';
    }

    function hideDeleteDiv(){
        let machineId = this.id.substring(1);
        let deleteDiv = document.querySelector('#d' + machineId);

        deleteDiv.style.display = 'none';
    }

})