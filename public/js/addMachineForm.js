document.addEventListener('DOMContentLoaded', function(){

    let ifIICheck = document.querySelector('#ifII');
    let ifDHCheck = document.querySelector('#ifDH');
    let ifWHCheck = document.querySelector('#ifWH');
    let ifMHCheck = document.querySelector('#ifMH');
    let ifQHCheck = document.querySelector('#ifQH');
    let ifHYHCheck = document.querySelector('#ifHYH');
    let ifYHCheck = document.querySelector('#ifYH');

    let iDateInputs = document.querySelectorAll('.iDate');
    let DHInputs = document.querySelector('.DH');
    let WHInputs = document.querySelector('.WH');
    let MHInputs = document.querySelector('.MH');
    let QHInputs = document.querySelector('.QH');
    let HYHInputs = document.querySelector('.HYH');
    let YHInputs = document.querySelector('.YH');

    ifIICheck.addEventListener('change', showIDataInputs);
    ifDHCheck.addEventListener('change', showDHInputs);
    ifWHCheck.addEventListener('change', showWHInputs);
    ifMHCheck.addEventListener('change', showMHInputs);
    ifQHCheck.addEventListener('change', showQHInputs);
    ifHYHCheck.addEventListener('change', showHYHInputs);
    ifYHCheck.addEventListener('change', showYHInputs);

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
    
    function showDHInputs(){

        if(ifDHCheck.checked == true){
            DHInputs.style.display = 'block';
        }
        else {
            DHInputs.style.display = 'none';
        }
    } 

    function showWHInputs(){

        if(ifWHCheck.checked == true){
            WHInputs.style.display = 'block';
        }
        else {
            WHInputs.style.display = 'none';
        }
    } 
    
    function showMHInputs(){

        if(ifMHCheck.checked == true){
            MHInputs.style.display = 'block';
        }
        else {
            MHInputs.style.display = 'none';
        }
    } 

    function showQHInputs(){

        if(ifQHCheck.checked == true){
            QHInputs.style.display = 'block';
        }
        else {
            QHInputs.style.display = 'none';
        }
    } 

    function showHYHInputs(){

        if(ifHYHCheck.checked == true){
            HYHInputs.style.display = 'block';
        }
        else {
            HYHInputs.style.display = 'none';
        }
    } 

    function showYHInputs(){

        if(ifHYHCheck.checked == true){
            YHInputs.style.display = 'block';
        }
        else {
            YHInputs.style.display = 'none';
        }
    } 
});