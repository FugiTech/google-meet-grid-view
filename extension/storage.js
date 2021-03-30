export const getChromeStorage = async function (keys) {
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

export const setChromeStorage = async function (obj) {
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
