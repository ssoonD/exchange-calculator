const rate = {
    data: [],
};

// api json 파일 불러옴
/*
{
	"result": "success",
	"documentation": "https://www.exchangerate-api.com/docs/free",
	"terms_of_use": "https://www.exchangerate-api.com/terms",
	"time_last_update_unix": 1585872397,
	"time_last_update_utc": "Fri, 02 Apr 2020 00:06:37 +0000",
	"time_next_update_unix": 1585959987,
	"time_next_update_utc": "Sat, 03 Apr 2020 00:26:27 +0000",
	"time_eol_unix": 0,
	"base_code": "USD",
	"rates": {
		"USD": 1,
		"AED": 3.67,
		"ARS": 64.51,
		"AUD": 1.65,
		"CAD": 1.42,
		"CHF": 0.97,
		"CLP": 864.53,
		"CNY": 7.1,
		"EUR": 0.919,
		"GBP": 0.806,
		"HKD": 7.75,
		"...": 7.85,
		"...": 1.31,
		"...": 7.47, etc. etc.
	}
}
*/
function getRate() {
    return fetch(`https://open.exchangerate-api.com/v6/latest`)
        .then((response) => response.json())
        .then((json) => json.rates);
}

function exchangeMoney(rate) {
    const serverSelect = document.querySelector(".server-choice");
    const customerSelect = document.querySelector(".customer-choice");
    const serverInput = document.querySelector(".server-price");
    const customerInput = document.querySelector(".customer-price");
    const rates = (rate.data[customerSelect.value] / rate.data[serverSelect.value]).toFixed(5);
    const rateText = document.querySelector(".rate-text");
    rateText.innerText = `1 ${customerSelect.value} = ${rates} ${serverSelect.value}`;
    serverInput.value = (customerInput.value * rates).toFixed(2);
}

function onChangeClick(rate) {
    const serverSelect = document.querySelector(".server-choice");
    const customerSelect = document.querySelector(".customer-choice");
    const tmp = customerSelect.value;
    customerSelect.value = serverSelect.value;
    serverSelect.value = tmp;
    exchangeMoney(rate);
}

function setEventListreners(rate) {
    const serverSelect = document.querySelector(".server-choice");
    const customerSelect = document.querySelector(".customer-choice");
    const serverInput = document.querySelector(".server-price");
    const customerInput = document.querySelector(".customer-price");
    const changeButton = document.querySelector(".exchange-image");
    serverSelect.addEventListener("change", () => exchangeMoney(rate));
    customerSelect.addEventListener("change", () => exchangeMoney(rate));
    serverInput.addEventListener("input", () => exchangeMoney(rate));
    customerInput.addEventListener("input", () => exchangeMoney(rate));
    changeButton.addEventListener("click", () => onChangeClick(rate));
}

function init() {
    getRate()
        .then((items) => {
            rate.data = items;
            setEventListreners(rate);
        })
        .catch(console.log());
}

init();