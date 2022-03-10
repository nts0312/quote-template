const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];

//show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
//condition for null author
if (!quote.author) {
    authorText.textContent = "Unknown"
} else {
     authorText.textContent = quote.author;
}
//check code length to determine styling

if(quote.text.length >120) {
    quoteText.classList.add('long-quote');

} else {
    quoteText.classList.remove('long-quote');
}
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        console.log(error);
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//EVENT LISTENERS
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click',tweetQuote);

//Onload
getQuotes();
