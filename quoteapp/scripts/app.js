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
    var quote = app.getRandomQuote();
    app.updateQuoteCard(quote);
  });

  // TODO add toggle loading method here
  app.setLoading = function(status) {
    var status = status || false;
    var $card = document.querySelector('.phrase-card');

    if (status) {
      $card.setAttribute('hidden', true);
      app.spinner.removeAttribute('hidden', true);
      app.isLoading = true;
    } else {
      $card.removeAttribute('hidden');
      app.spinner.setAttribute('hidden', true);
      app.isLoading = false;
    }
  }

  // TODO add update card method here
  app.updateQuoteCard = function(data) {
    app.setLoading(true);
    app.lastId = data.id || 0;

    var text = document.querySelector('.text')
    , author = document.querySelector('.author');

    text.innerHTML = data.text;
    author.innerHTML = data.author;

    app.setLoading(false);
  };

  // use fetch to save locally all quotes from /data.json
  // used to save in localStorage
  app.getQuotes = function() {
    var url = 'data.json';

    // TODO add cache logic here

    // Fetch the latest data.
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var response = JSON.parse(request.response);

          app.selectedQuotes = response;
          app.saveSelectedQuotes(app.selectedQuotes);
        }
      } else {
        // Return the initial quote since no data is available.
        app.updateQuoteCard(initialQuote);
      }
    };
    request.open('GET', url);
    request.send();
  }

  // TODO add saveSelectedQuotes function here
  // Save list of quotes to localStorage.
  app.saveSelectedQuotes = function(selectedQuotes) {
    localStorage.selectedQuotes = JSON.stringify(selectedQuotes);
  };

  /* if app has no quotes, return default quote
   * if app has only one quote, return that
   * if app has quotes, return some quote with different id than lastId
   */
  app.getRandomQuote = function() {
    if(app.selectedQuotes.length === 0) return initialQuote;
    if(app.selectedQuotes.length === 1) return app.selectedQuotes[0];

    var randomIndex = Math.floor(Math.random() * app.selectedQuotes.length);
    return app.selectedQuotes[randomIndex].id !== app.lastId ? app.selectedQuotes[randomIndex] : app.getRandomQuote();
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
  app.selectedQuotes = localStorage.selectedQuotes;
  if (app.selectedQuotes) {
    app.selectedQuotes = JSON.parse(app.selectedQuotes);
    console.log('Existem dados no localStorage')

    var quote = app.getRandomQuote();
    app.updateQuoteCard(quote);
  } else {
    /* The user is using the app for the first time, or the user has not
     * saved any quotes, so show the user some fake data.
     */
    app.updateQuoteCard(initialQuote);
    app.getQuotes();
  }

  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('./service-worker.js').then(function() { console.log('Service Worker Registered'); });
  }
})();
