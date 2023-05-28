function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      // console.log(document.querySelector(".video-player__video-container"));
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.querySelector("body"), {
      attributes: true,
      childList: true,
      subtree: true
    });
  });
}

function dataURLToBlob(dataURL) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function formatBugsList(list) {
  const countMap = {};
  const result = [];

  for (let item of list) {
    countMap[item] = (countMap[item] || 0) + 1;
  }

  for (let item in countMap) {
    const count = countMap[item];
    const formattedItem = item.charAt(0).toUpperCase() + item.slice(1);
    const pluralizedItem = count === 1 ? formattedItem : `${count} ${formattedItem}s`;
    result.push(pluralizedItem);
  }

  return result.join(', ') + ' detected';
}

async function getPesticidePrescription(prompt) {
  try {
    const response = await fetch(`https://us-central1-moviechat-c0e74.cloudfunctions.net/returnPesticides?prompt=${prompt}`);
    const data = await response.json();
    
    console.log(data);
    administerPesticide(data.pesticide, data.amount);
  } catch (error) {
    console.log(error);
  }
}

function bugAlert(list) {
  const bugAlertsContainer = document.getElementById("bug-alerts-container");
  if (list.length === 0) {
    return;
  } else {
    const bugAlertString = formatBugsList(list);
    getPesticidePrescription(bugAlertString);

    const bugAlertDiv = document.createElement("div");
    bugAlertDiv.style.position = "relative";
    bugAlertDiv.style.width = "100%";
    bugAlertDiv.style.height = "40px";
    bugAlertDiv.style.backgroundColor = "gray";
    bugAlertDiv.style.display = "flex";
    bugAlertDiv.style.justifyContent = "center";
    bugAlertDiv.style.alignItems = "center";
    bugAlertDiv.style.flexDirection = "row";
    bugAlertDiv.style.zIndex = "9999";
    bugAlertDiv.style.borderRadius = "20px";
    bugAlertDiv.style.paddingLeft = "10px";
    bugAlertDiv.style.paddingRight = "10px";
    bugAlertDiv.style.marginBottom = "4px";
    bugAlertDiv.style.marginTop = "4px";
    bugAlertDiv.style.overflowX = "scroll";
    bugAlertDiv.style.whiteSpace = "nowrap";

    const bugAlertIcon = document.createElement("img");
    bugAlertIcon.src = "https://storage.googleapis.com/moviechat-c0e74.appspot.com/OnboardingPhotos/warning.png?GoogleAccessId=firebase-adminsdk-q4vi2%40moviechat-c0e74.iam.gserviceaccount.com&Expires=1893456000&Signature=4KnEdjNgCKlaXeXZhRFzoOEu0QQcDEmY7ApedVhj%2B3%2Ba%2F5r%2BuMy6d4rlOxBVI4G2EksT68owL0ex4rKkbMVKuaVBJBnZD0gZLJlJokfGERbCQ%2FmnGNG4ivVfoN8iLOhS9LsalgFIWLl9Tx9KfV2FpU6LNHuTJ3m4D%2FUEBdnTM8mamzlnhHx7LXy%2BFKobHWEgHrpsPxElf2gjquEpSL%2BJYzLwvtBUnFeiboS5VD1v2mBK2NLC%2FDyMwhPhlIWhATJIZkXwJQdI2SIRw%2FY2ZuY1ev2oBaY81Itsw0CZU069JAkzcuoP%2BcQDYuNaWUdHMFxkCJYXpLLDTcnoBT49QosFRQ%3D%3D";
    bugAlertIcon.style.width = "26px";
    bugAlertIcon.style.height = "26px";
    bugAlertIcon.style.marginRight = "4px";
    
    const bugAlertText = document.createElement("p");
    bugAlertDiv.appendChild(bugAlertIcon);
    bugAlertDiv.appendChild(bugAlertText);

    bugAlertText.style.color = "#FFFFFF";
    bugAlertText.style.fontSize = "12px";
    bugAlertText.style.fontWeight = "regular";
    bugAlertText.style.textAlign = "center";
    bugAlertText.textContent = bugAlertString;
    bugAlertText.style.display = "inline-block";
    bugAlertText.style.overflowX = "hidden";
    bugAlertText.style.textOverflow = "ellipsis";

    bugAlertsContainer.prepend(bugAlertDiv);
  }
}

function capture() {
  var canvas = document.createElement('canvas'); 
  const videoObjectContainer = document.querySelector(".video-ref");
  console.log(videoObjectContainer);
  const videoObject = videoObjectContainer.querySelector("video");
  canvas.width = videoObject.offsetWidth;
  canvas.height = videoObject.offsetHeight;
  canvas.getContext('2d').drawImage(videoObject, 0, 0, 1200, 600);  
  const dataUrl = canvas.toDataURL('image/png');
  const base64Image = dataUrl.split(',')[1];

  const url = "https://detect.roboflow.com/pest-dc2xk/3";
  const apiKey = "X6xhkN3QnJV2ttNzmX9U";

  fetch(`${url}?api_key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: base64Image,
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Request failed with status code " + response.status);
    }
  }).then(function (data) {
    console.log(data.predictions);
    let bugsList = data.predictions.map(prediction => prediction.class);
    bugAlert(bugsList);
  }).catch(function (error) {
    console.log(error.message);
  });
}

waitForElm(".video-player__container").then(async (elm) => {
  console.log("video detected");
  if (location.href.split("/")[2] === "www.twitch.tv" && location.href.split("/")[3] === "squid_is_streaming") {
    const bugAlertsContainer = document.createElement("div");
    var container = document.querySelector(".video-player__container");

    bugAlertsContainer.id = "bug-alerts-container";
    bugAlertsContainer.style.position = "absolute";
    bugAlertsContainer.style.bottom = "50px";
    bugAlertsContainer.style.right = "10px";
    bugAlertsContainer.style.width = "300px";
    bugAlertsContainer.style.height = "300px";
    bugAlertsContainer.style.display = "flex";
    bugAlertsContainer.style.flexDirection = "column-reverse";
    bugAlertsContainer.style.overflowY = "scroll";

    container.appendChild(bugAlertsContainer);
    const bugDetectInterval = setInterval(() => {
      try {
        capture();
      } catch (error) {
        console.log(error);
      }
    }, 15000);
    // try {
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    //   capture();
    //   // getLiveBingo();
    // } catch (error) {
    //   console.log(error);
    // }
  }
});