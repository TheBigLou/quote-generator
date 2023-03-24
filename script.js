let apiQuotes = []; // use let because we'll change the value of this when we fetch the quotes below

// Show new quote from API
function newQuote() {
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
}

// Show new quote from backup file in case API is down
function newOfflineQuote() {
    const offQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(offQuote);
}

// Get quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl); // when we call the function, first it tries to fetch the response from constant apiUrl, then saves that as the response constant (JSON string). We use async await here to ensure we don't save the response constant until after getting the response from the fetch
        apiQuotes = await response.json(); // turn the response JSON string into an apiQuotes global variable JSON object
        newQuote();
    } catch (error) {
        // handle error when not getting a quote back from API by using local quote store
        newOfflineQuote();
    }
}

// On page load, fetch quotes
getQuotes();