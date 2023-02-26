const form = document.querySelector('form');
const dollarAmountInput = document.querySelector('#dollar-amount');
const exchangeRateInput = document.querySelector('#exchange-rate');
const darkModeButton = document.querySelector('#dark-mode-btn');
const lightModeButton = document.querySelector('#light-mode-btn');
const historyList = document.querySelector('.history');

let conversionHistory = [];

// Load preferences from local storage
const preferences = JSON.parse(localStorage.getItem('preferences')) || {};

// Set the dark mode preference from local storage
if (preferences.darkMode) {
  document.body.classList.add('dark-mode');
}

// Set the exchange rate preference from local storage
if (preferences.exchangeRate) {
  exchangeRateInput.value = preferences.exchangeRate;
}

// Convert dollar to TND and display the result
function convertDollarToTND() {
  const dollarAmount = dollarAmountInput.value;
  const exchangeRate = exchangeRateInput.value;
  const tndAmount = dollarAmount * exchangeRate;
  const resultText = `${dollarAmount} USD = ${tndAmount.toFixed(2)} TND`;
  const resultElement = document.createElement('p');
  resultElement.textContent = resultText;
  form.appendChild(resultElement);
  conversionHistory.push(resultText);
  saveConversionHistory();
}

// Save the conversion history to local storage
function saveConversionHistory() {
  localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
}

const clearHistoryButton = document.querySelector('#clear-history-btn');

function clearConversionHistory() {
  conversionHistory = [];
  saveConversionHistory();
  historyList.innerHTML = '';
}

clearHistoryButton.addEventListener('click', clearConversionHistory);


// Load the conversion history from local storage and display it
function loadConversionHistory() {
  const savedHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];
  conversionHistory = savedHistory;
  for (let i = 0; i < savedHistory.length; i++) {
    const historyItem = document.createElement('li');
    historyItem.textContent = savedHistory[i];
    historyList.appendChild(historyItem);
  }
}

// Switch to dark mode
function switchToDarkMode() {
  document.body.classList.add('dark-mode');
  preferences.darkMode = true;
  localStorage.setItem('preferences', JSON.stringify(preferences));
}

// Switch to light mode
function switchToLightMode() {
  document.body.classList.remove('dark-mode');
  preferences.darkMode = false;
  localStorage.setItem('preferences', JSON.stringify(preferences));
}

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  convertDollarToTND();
});

// Load the conversion history when the page loads
loadConversionHistory();

// Add event listeners for the dark and light mode buttons
darkModeButton.addEventListener('click', switchToDarkMode);
lightModeButton.addEventListener('click', switchToLightMode);
