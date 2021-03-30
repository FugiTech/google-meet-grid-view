const getChromeStorage = async function (keys) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(keys, function (value) {
        resolve(value);
      });
    } catch (ex) {
      resolve({});
    }
  });
};

const setChromeStorage = async function (obj) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set(obj, function () {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
};


const launchUrl = 'https://simonemarullo.github.io/google-meet-grid-view/1.50/';

const log = (obj) => console.log("mutesync-integration", obj);

const JSON_URL = 'https://simonemarullo.github.io/google-meet-grid-view/1.50/assets/rollout.json';

const ALARM = "Rollout";

const getOrSetRolloutValue = async () => {
    let { rolloutValue } = await getChromeStorage(["rolloutValue"]);

    if (rolloutValue === undefined) {
        const rolloutValue = Math.random();
        await setChromeStorage({ rolloutValue });
    }

    return rolloutValue;
};

const launchRolloutTabIfNeeded = async () => {
    chrome.alarms.clearAll();

    const { hasOpenedRollout } = await getChromeStorage(["hasOpenedRollout"]);
    if (hasOpenedRollout) {
        return;
    }
    try {
        const results = await fetch(JSON_URL);
        const { upperBound } = await results.json();
        const rolloutValue = await getOrSetRolloutValue();
        log({ rolloutValue, upperBound, launchUrl });
        if (rolloutValue <= upperBound) {
            await setChromeStorage({ hasOpenedRollout: true });
            chrome.tabs.create({ url: launchUrl });
            return;
        }

        chrome.alarms.create(ALARM, { delayInMinutes: 60 });
    } catch (e) {
        log({ e });
    }
};

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM) {
        log("Rollout Alarm");
        launchRolloutTabIfNeeded();
    }
});

chrome.runtime.onInstalled.addListener(function () {
    log("Updated");
    launchRolloutTabIfNeeded();
});

chrome.runtime.onStartup.addListener(() => {
    log("Startup");
    launchRolloutTabIfNeeded();
});

