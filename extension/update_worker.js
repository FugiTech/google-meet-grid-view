function getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function markNoteOpened() {
    chrome.storage.sync.set({noteAlreadyOpened: true}, function () {
    });
}

const updateUrl = 'https://simonemarullo.github.io/gridview/1.50/';


// [1, 2,..., 100] splits users into 100 different cohorts
var allCohorts = Array(100).fill().map((x, i) => i + 1);

function openNoteIfNeeded(limit) {
    // This function opens the note if the user is in the correct cohort
    // and they have not seen the note already.
    chrome.storage.sync.get(['cohort', 'noteAlreadyOpened'], function (result) {
        console.log('cohort from storage is ' + result.cohort);
        console.log('noteAlreadyOpened from storage is ' + result.noteAlreadyOpened);

        // cohort is sticky
        const cohort = result.cohort || getRandomValue(allCohorts);
        chrome.storage.sync.set({cohort: cohort}, function () {
            console.log('cohort is set to ' + cohort);
        });

        console.log('target cohort is between 0 and', limit);

        if (!result.noteAlreadyOpened && cohort <= limit) {
            console.log('opening marketing note');
            markNoteOpened();
            chrome.tabs.create({url: updateUrl});
        }
    });
}



// This needs to have CORS enabled
const bucketUrl = 'https://mutessynctest.s3-us-west-1.amazonaws.com/test.json';

function fetchAndOpenNoteIfNeeded() {
    fetch(bucketUrl)
        .then(response => response.json())
        .then(json => {
                console.log('parsed json', json)
                openNoteIfNeeded(json.upperBound);
            }
        );
}

chrome.alarms.create("myAlarm", {delayInMinutes: 0.1, periodInMinutes: 0.1});
console.log('alarm set');
chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log(alarm);
    fetchAndOpenNoteIfNeeded();
});
