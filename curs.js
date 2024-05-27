

document.addEventListener('DOMContentLoaded', function() {
    const rates = {};
    const elementRSD = document.querySelector('[data-value="RSD"]');
    const inputFrom = document.querySelector('#inputFrom');
    const resultTo = document.querySelector('#resultTo');
    const selectFrom = document.querySelector('#selectFrom');
    const selectTo = document.querySelector('#selectTo');

    getCurrencies();

    async function getCurrencies() {
        try {
            const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
            const data = await response.json();

            rates.RSD = data.Valute.RSD;
            console.log(rates);

            elementRSD.textContent = rates.RSD.Value.toFixed(2);

            if (rates.RSD.Value > rates.RSD.Previous) {
                elementRSD.classList.add('top');
            } else {
                elementRSD.classList.add('bottom');
            }

           
            if (selectFrom.value === 'RUB') {
                selectTo.value = 'RSD';
            } else if (selectFrom.value === 'RSD') { 
                selectTo.value = 'RUB';
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    function convertCurrency() {
        const inputValue = parseFloat(inputFrom.value);
        if (isNaN(inputValue)) {
            resultTo.value = "Invalid input!";
            return;
        }

        if (selectFrom.value === 'RUB' && selectTo.value === 'RSD') {
            resultTo.value = (inputValue / rates.RSD.Value).toFixed(2);
        } else if (selectFrom.value === 'RSD' && selectTo.value === 'RUB') {
            resultTo.value = (inputValue * rates.RSD.Value).toFixed(2);
        } else {
            resultTo.value = "Invalid conversion!";
        }
    }

//    функция конвертации
    selectFrom.onchange = function() {
        if (this.value === 'RUB') {
            selectTo.value = 'RSD';
        } else if (this.value === 'RSD') {
            selectTo.value = 'RUB';
        }
        convertCurrency();
    };

    inputFrom.oninput = convertCurrency;
    selectTo.onchange = convertCurrency;
});