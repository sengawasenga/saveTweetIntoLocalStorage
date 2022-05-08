
/* 
    Hey guys, thank you for looking up my script file, this is your homie Marcel Senga...
    I'm really excited to get started, so what are we waiting for ? 😜
*/


// ALL ABOUT VARIABLES

const tweetList = document.querySelector('.tweet-list')
const localStorageContent = localStorage.getItem('tweets')
const alertPopup = document.querySelector('.alert-popup');



// ALL ABOUT EVENT LISTENERS

eventListeners()

function eventListeners () {
    document.getElementById('tweet-form').addEventListener('submit', addTweet)

    document.querySelector('.tweet-list').addEventListener('click', removeTweet)

    document.addEventListener('DOMContentLoaded', renderTweetOnReload)

    document.querySelector('.alert-popup button.okay').addEventListener('click', closePopup);
}




// ALL ABOUT FUNCTIONS

// adding a new tweet function
function addTweet(e) {
    // prevent default form behavior
    e.preventDefault()

    // let's get what the user submited
    const tweet = document.getElementById('tweet').value

    // let's create a new tweet element
    createTweet(tweet)

    // saving it into the local storage
    saveIntoLocalStorage(tweet)

    // activating the popup
    alertPopup.classList.add('active')

    // clearing the form
    this.reset()

}

// creating new tweet on the DOM
function createTweet(tweet) {
    const newTweet = document.createElement('div')
    newTweet.className = 'tweet'
    newTweet.innerHTML = `
                                <div>${tweet}</div>
                                <div>
                                    <a class="remove"><i class="bi bi-trash"></i></a>
                                </div>
                            `
    tweetList.appendChild(newTweet)
}


// removing a tweet function
function removeTweet(e) {
    // removing the parent from the DOM
    if (e.target.classList.contains('bi-trash')) {
        e.target.parentElement.parentElement.parentElement.remove()
    }

    // deleting the tweet from the local storage
    deleteTweet(e.target.parentElement.parentElement.previousElementSibling.textContent)

}

// saving tweets into the local storage
function saveIntoLocalStorage(tweet) {
    let tweets = getTweetFronLS()

    // add the tweet into the table
    tweets.push(tweet)

    // save the tweet into the local storage
    localStorage.setItem('tweets', JSON.stringify(tweets))
    
}

// render every tweets from the local storage on reload
function renderTweetOnReload() {
    getTweetFronLS().forEach(tweet => {
        createTweet(tweet)
    });
}

function getTweetFronLS() {
    let tweets
    const tweetsLS = localStorage.getItem('tweets');
    // Get the values, if null is returned then we create an empty array
    if(tweetsLS === null) {
        tweets = [];
   } else {
        tweets = JSON.parse( tweetsLS ); 
   }
   return tweets;
}


// deleting the tweet from the local storage
function deleteTweet(tweet) {
    let tweets = getTweetFronLS()

    tweets.forEach((tweetLS, i) => {
        if (tweet === tweetLS) {
            tweets.splice(i, 1)
        }
    });

    console.log(tweets);
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// closing the alert-popup
function closePopup() {
    alertPopup.classList.remove('active');
}