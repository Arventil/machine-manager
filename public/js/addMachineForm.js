document.addEventListener('DOMContentLoaded', function(){

    let ifIICheck = document.querySelector('#ifII');
    let iDateInputs = document.querySelectorAll('.iDate');

    ifIICheck.addEventListener('change', showIDataInputs);

    function showIDataInputs(){

        if(ifIICheck.checked == true){
            for(let a = 0; a <iDateInputs.length; a++){
                iDateInputs[a].style.display = 'block';
            }
        }
        else {
            for(let a = 0; a <iDateInputs.length; a++){
                iDateInputs[a].style.display = 'none';
            }
        }
    }    
});