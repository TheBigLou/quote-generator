// Create constants that will be populated with valaues below by grabbing the elements in the HTML file by their IDs
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []; // use let because we'll change the value of this when we fetch the quotes below

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    showLoadingSpinner();
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
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Show new quote from backup file in case API is down
function newOfflineQuote() {
    const offQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    authorText.textContent = quote.author;
    quoteText.textContent = quote.text;
}

// Get quotes from API and store locally
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
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