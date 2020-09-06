function setArrLocalStorage(itemName = 'newsData', arrJSON) {
  const arr = JSON.stringify(arrJSON);
  localStorage.setItem(itemName, arr);
}

function getArrLocalStorage(itemName = 'newsData') {
  const newsData = JSON.parse(localStorage.getItem(itemName));
  console.log(newsData);
  return newsData;
}

module.exports = { setArrLocalStorage, getArrLocalStorage };
