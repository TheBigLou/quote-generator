// Create constants that will be populated with valaues below by grabbing the elements in the HTML file by their IDs
const quoteContainer = document.getElementById('quote-constainer');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');

let apiQuotes = []; // use let because we'll change the value of this when we fetch the quotes below

// Show new quote
function newQuote() {
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check for author and replace with 'Unknown' if needed
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // If quote is long, apply different CSS class to shrink it
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote"); // adds this class to the element
    } else {
        quoteText.classList.remove("long-quote"); // need to remove it for the next quote as appropriate
    }
    quoteText.textContent = quote.text;
}

// Show new quote from backup file in case API is down
function newOfflineQuote() {
    const offQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    authorText.textContent = quote.author;
    quoteText.textContent = quote.text;
}

// Get quotes from API and store locally
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

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}%0A-${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); // open twitter in a new tab with quote ready to tweet
}

// Event listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// On page load, fetch quotes
getQuotes();