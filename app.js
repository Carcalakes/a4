// Dummy database for users
let users = [];
let loggedInUser = null;
let userStocks = {};
let userBalance = {};

// Default balance of $1000 for each user
const initialBalance = 1000;

// When login form is submitted
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    loggedInUser = username; // No need to check if the user exists
    userBalance[loggedInUser] = initialBalance;  // Set initial balance
    userStocks[loggedInUser] = {};  // Initialize empty portfolio for the user
    alert(`${username} logged in`);
    window.location.assign('market.html');  // Redirect to market page
});

// When signup form is submitted
document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('newUsername').value;
    users.push({ username: username });
    loggedInUser = username;
    userBalance[loggedInUser] = initialBalance;
    userStocks[loggedInUser] = {};
    alert(`${username} signed up`);
    window.location.assign('market.html');  // Redirect to market page
});

// Buy stock function
function buyStock(stockName, stockPrice) {
    if (!loggedInUser) return alert("Please log in first!");
    
    // Check if the user has enough balance
    if (userBalance[loggedInUser] >= stockPrice) {
        // Deduct balance
        userBalance[loggedInUser] -= stockPrice;

        // Add stock to user's portfolio
        userStocks[loggedInUser][stockName] = (userStocks[loggedInUser][stockName] || 0) + 1;

        // Update portfolio and balance
        updatePortfolio();
        alert(`You bought 1 share of ${stockName} for $${stockPrice}`);
    } else {
        alert("Insufficient balance!");
    }
}

// Update portfolio and balance display
function updatePortfolio() {
    const portfolioList = document.getElementById('stockList');
    const balanceDisplay = document.getElementById('balance');
    portfolioList.innerHTML = '';
    
    if (userStocks[loggedInUser]) {
        for (const [stock, quantity] of Object.entries(userStocks[loggedInUser])) {
            const li = document.createElement('li');
            li.textContent = `${stock}: ${quantity} shares`;
            portfolioList.appendChild(li);
        }
    }

    balanceDisplay.textContent = userBalance[loggedInUser];
}

// Logout function
function logout() {
    loggedInUser = null;
    alert("You have logged out");
}
