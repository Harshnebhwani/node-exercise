const weatherForm = document.querySelector('form');
const inputBox = document.querySelector('input');
const forecast = document.querySelector('#forecast');
const errorMsg = document.querySelector('#errorMsg');

function fetchCallback(search)
{
    fetch('/weather?address='+search).then((response) => {
        response.json().then( (data) => {
            if(data.error)
            {
                errorMsg.textContent = data.error
            }else{
                errorMsg.textContent = data.location
                forecast.textContent = data.forecast
            }
        });
    });
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    errorMsg.textContent = 'Loading...';
    forecast.textContent = '';

    const location = inputBox.value;

    if(location)
    {
        fetchCallback(location)
    }else{
        errorMsg.textContent = 'Please enter value';
    }
})