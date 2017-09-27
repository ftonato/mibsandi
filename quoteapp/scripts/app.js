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
    var text = document.querySelector('.text')
    , author = document.querySelector('.author');

    text.innerHTML = data.text;
    author.innerHTML = data.author;
  };

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
