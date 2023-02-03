// Quote generator DOM
const quoteContainer = document.getElementById("quote-container");
console.log(quoteContainer)
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader")

// Show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Quote generator****

let apiQuotes = [];

// to show new quote
function newQuote(){
    //to make it pick random quotte
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // assign value from Dom
    authorText.textContent = quote.author;
    quoteText.textContent = quote.text

    // check if author field is blank and replace with 'Unknown'
    if (!quote.author) {
        authorText.textContent = "Unknown"
    }
    else{
        quoteText.textContent = quote.text 
    }

    // Check quote lenght to determine styling
    if (quote.text.lenght > 50){
        quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote")
        }
        quoteText.textContent = quote.text;
    // Stop Loader, Show Quote
    complete();
    }   

// Get quotes from API using Async Fetch
async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes"
    try{
        const response = await fetch (apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // to get errors
        console.log("whoops, no quote available", error)
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// event listner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);








// while the browser loads
getQuotes()




// To access from local storage, (comment out the above)

// function newQuote(){
//     //to make it pick random quotte
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }


// //on load
// newQuote()