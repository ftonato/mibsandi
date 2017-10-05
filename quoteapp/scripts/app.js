(function() {
  'use strict';

  var app = {
    isLoading: true,
    selectedQuotes: [],
    spinner: document.querySelector('.loader'),
    lastId: 0
  };

  document.getElementById('reload').addEventListener('click', function() {
    // Refresh all of the quotes
    //app.updateQuotes();
  });

  // TODO add update card method here
  app.updateQuoteCard = function(data) {
    //var quote = app.getRandomQuote()
    var text = document.querySelector('.text')
    , author = document.querySelector('.author');

    text.innerHTML = data.text;
    author.innerHTML = data.author;
  };

  // use fetch to save locally all quotes from /data.json
  // used to save in localStorage
  app.updateQuotes = function() {
    fetch('/data.json')
      .then(quotes => quotes.json())
      .then(quotes => app.selectedQuotes = quotes)
      .catch(error => app.selectedQuotes = [initialQuote])
      // .then(quotes => localStorage.setItem('quotes', quotes), localStorage.setItem('quotes' [initialQuote]))
  }

  /* if app has no quotes, return default quote
   * if app has only one quote, return that
   * if app has quotes, return some quote with different id than lastId
   */
  app.getRandomQuote = function() {
    if(app.selectedQuotes.length === 0) return initialQuote;
    if(app.selectedQuotes.length === 1) return app.selectedQuotes[0];

    var randomIndex = Math.floor(Math.random() * (quotes.length - 1));
    return quotes[randomIndex].id !== lastId ? quotes[randomIndex] : app.getRandomQuote();
  }

  /*
   * Fake quote data that is presented when the user first uses the app
   */
  var initialQuote = {
    text: 'The future of advertising is the Internet.',
    author: 'Bill Gates'
  };
  // TODO uncomment line below to test app with fake data
  // app.updateQuoteCard(initialQuote);

  // TODO add startup code here

  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('./service-worker.js').then(function() { console.log('Service Worker Registered'); });
  }
})();
