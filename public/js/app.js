const cotacoesForm = document.querySelector('form');
const mainMessage = document.querySelector('h3');
const price = document.querySelector('#price');
const priceOpen = document.querySelector('#price_open');
const dayHigh = document.querySelector('#day_high');
const dayLow = document.querySelector('#day_low');

cotacoesForm.addEventListener('submit', (event)=>{
    mainMessage.innerText = 'Buscando ...';
    //evita que a página seja recarregada
    event.preventDefault();
    const ativo = document.querySelector('#codAtivo').value;
    if(!ativo){
        mainMessage.innerText = 'O ativo deve ser informado.';
        return;
    }
    fetch(`/cotacoes?ativo=${ativo}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                mainMessage.innerText = `Algo deu errado`;
                price.innerText = `${data.error.message} | código ${data.error.code}`
            }else{
                mainMessage.innerText = `Ativo : ${data.symbol}`;
                price.innerText = `Preço fechamento : ${data.price}` ;
                priceOpen.innerText = `Preço abertura : ${data.price_open}`;
                dayHigh.innerText = `Maior alta dia : ${data.day_high}`;
                dayLow.innerText = `Menor baixa dia : ${data.day_low}`;
            }
        });
    });
});