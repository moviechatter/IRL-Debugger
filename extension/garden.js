function updatePopupPosition() {
  var popup = document.getElementById("home");
  if (popup) {
    popup.style.top = (22 + document.scrollY) + "px";
  }
}

let expanded = false;
const popup = document.createElement("div");
popup.id = "home";
// document.body.addEventListener('click', (e) => {
//   if (e.target !== popup && e.target.parentNode !== popup) {
//     safe = false;
//   }
// });
popup.style.all = 'unset';
popup.className = "moviechat-popup";
popup.style.overflow = 'hidden';
popup.style.position = 'fixed';
popup.style.top = '22px';
popup.style.right = '25px';
popup.style.width = '260px';
popup.style.height = '300px';
popup.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
popup.style.zIndex = '99999';
popup.style.overflowY = 'scroll';
popup.style.borderRadius = '20px';
popup.style.zIndex = "10000";
updatePopupPosition();
document.addEventListener('scroll', updatePopupPosition);

const expandIcon = document.createElement("img");
expandIcon.src = "https://storage.googleapis.com/moviechat-c0e74.appspot.com/OnboardingPhotos/plant.png?GoogleAccessId=firebase-adminsdk-q4vi2%40moviechat-c0e74.iam.gserviceaccount.com&Expires=1893456000&Signature=E0NrmmbJv466f%2ByCa46SNyyWo8smL7f2RnFTSzsxnBV2lokT70dxvahbODubr8hMTnLmnuTRHltr11%2FTU6bKRNaS1kRrxXJEqliw2hqpJugyFbXBaEyNKveDvMQPFSWg3D1wlUEitu5WKZIBlrR6XETCzD%2Ff4Cy9rRpaAM1jwhq1LHlcRqrxD7EOK1UGXXZF7aNWbRRiTcBJ2q1QpXgGAEZG%2BeOrIH0MmVFZs6ND7kyp3G1B2PDkCFYMOMNUgc7IUtzdIC9OCF3Z32oaEpRClEaAgv7gooqzdzrtCEPBxrteFT50JMwB4ohA8Q6xBSWNhzU5rS64l3ctp%2FbFPdU2BQ%3D%3D";
expandIcon.style.width = '40px';
expandIcon.style.height = '40px';
expandIcon.style.position = 'absolute';
expandIcon.style.left = '10px';
expandIcon.style.top = '5px';
const expandArrow = document.createElement("img");
expandArrow.src = "https://storage.googleapis.com/moviechat-c0e74.appspot.com/OnboardingPhotos/white_arrow.png?GoogleAccessId=firebase-adminsdk-q4vi2%40moviechat-c0e74.iam.gserviceaccount.com&Expires=1893456000&Signature=diKieGJHGxAESrkqMXyBTSx2Lk2%2FrdCZRaJ3nldsLbnKpU913DQGRmYmwmecmmrykpiNMTlsvBM9h5AxAXJE4obZXTf%2Fp1YDr8dKPhsaEBE4B9RHfy6MR2KwiWsUDpVhQ89k2h7jIudoDIjzrEG6ZZxz309FpoMVHWCYRgHdtonRfS83W9%2BVmR2F9ro%2Ba8uxfdON5E4TkdojQZaQXZfj93ceeW%2BXTIzGleJBfrxlppJHY0zVUwW6bdfePWlqbDf9bGh0vkwjuBFrYy7iD2f2fcze7pXLbX152P3VcJxMhERjV6pp%2BR8lH8jrT0d%2FTwe%2BXiRQQ%2B%2FJYOj3aoU04Uc16A%3D%3D";
expandArrow.style.width = '8px';
expandArrow.style.height = '27px';
expandArrow.style.position = 'absolute';
expandArrow.style.left = '1px';
expandArrow.style.top = "11.5px";

const expandDiv = document.createElement("div");
expandDiv.id = "expand-div";
expandDiv.className = "moviechat-popup";
expandDiv.style.all = 'unset';
expandDiv.style.position = 'fixed';
expandDiv.style.width = '50px';
expandDiv.style.height = '50px';
expandDiv.style.borderRadius = '10%';
expandDiv.style.right = '320px';
expandDiv.style.top = '60px';
expandDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
expandDiv.style.zIndex = '99999';
expandDiv.style.cursor = 'pointer';
expandDiv.addEventListener("mousedown", function(e) {
  e.preventDefault();
});
expandDiv.addEventListener('click', function() {
  if (expanded) {
    let expandedX = 0;
    let rotation = 360;
    let popupExpandInterval = setInterval(function() {
      expandedX += 10;
      rotation -= 11.613;
      popup.style.transform = `translateX(${expandedX}px)`;
      expandDiv.style.transform = `translateX(${expandedX}px)`;
      expandIcon.style.transform = `rotate(${rotation}deg)`;
      expandArrow.style.transform = `rotate(${rotation/2}deg)`;
      if (expandedX >= 310) {
        clearInterval(popupExpandInterval);
      }
    }, 3);
    expanded = !expanded;
  } else {
    let expandedX = 310;
    let rotation = 0;
    let popupCollapseInterval = setInterval(function() {
      expandedX -= 10;
      rotation += 11.613;
      popup.style.transform = `translateX(${expandedX}px)`;
      expandDiv.style.transform = `translateX(${expandedX}px)`;
      expandIcon.style.transform = `rotate(${rotation}deg)`;
      expandArrow.style.transform = `rotate(${rotation/2}deg)`;
      if (expandedX <= 0) {
        clearInterval(popupCollapseInterval);
      }
    }, 3);
    expanded = !expanded;
  }
});

popup.style.transform = `translateX(310px)`;
expandDiv.style.transform = `translateX(310px)`;

expandDiv.appendChild(expandIcon);
expandDiv.appendChild(expandArrow);
document.body.appendChild(expandDiv);
document.body.appendChild(popup);

const garden = document.createElement("img");
garden.id = "garden";
garden.src = "https://storage.googleapis.com/moviechat-c0e74.appspot.com/OnboardingPhotos/garden.png?GoogleAccessId=firebase-adminsdk-q4vi2%40moviechat-c0e74.iam.gserviceaccount.com&Expires=1893456000&Signature=QqMHn2b5r0ofg%2FPc65CefcXuiO43t4gzWUU5nPEyQeN%2FzqenYQwSwGCF3GM7IbHoEABm40w0hxdVLMcamw4KOt0XITys3aObqV7JOtAID7FCaA6%2BUbMg37TWVHZaO7D7WDwWMk5q2K1KGVlGMhyN51x8KD%2F2nYX8CS8x3uFg%2BxgvtuLY4zSeq7Wrr%2FXDq39E6dUWNrSGWXamSvVc%2FfzVAL5l6sn1n9rgQo5v8VSFULz6xwmTXTQzfELQ8aoo0BZDqsA2ES9%2FcW6WhUDhqzQDAGwnOJqqCcrV%2F9%2FOkd5L0A7Uc52wWMWYnsufp882dAhW3PT%2B54WeYIsFDEISVn73IA%3D%3D";
popup.appendChild(garden);

async function administerPesticide(pesticide, amount) {
  const expandDiv = document.getElementById("expand-div");
  const randomInt = Math.floor(Math.random() * 3) + 1;

  const expandAlert = document.createElement("div");
  expandAlert.style.position = "fixed";
  expandAlert.style.borderRadius = "4px";
  expandAlert.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  expandAlert.style.width = "300px";
  expandAlert.style.height = "30px";
  expandAlert.style.padding = "4px";
  expandAlert.textContent = `Administering ${amount} oz. of ${pesticide} in garden #${randomInt}`;
  expandAlert.style.transform = `translateY(-50px)`;
  expandAlert.style.display = "flex";
  expandAlert.style.alignItems = "center";
  expandAlert.style.justifyContent = "center";
  expandAlert.style.whiteSpace = "nowrap";

  expandAlert.style.transform = `translateX(-300px)`;

  expandDiv.appendChild(expandAlert);

  const sprayAnimation = document.createElement("div");
  sprayAnimation.style.position = "fixed";
  sprayAnimation.style.width = "140px";
  sprayAnimation.style.height = "80px";
  sprayAnimation.style.padding = "5px";
  sprayAnimation.style.display = "flex";
  sprayAnimation.style.alignItems = "center";
  sprayAnimation.style.justifyContent = "center";
  sprayAnimation.style.flexDirection = "row";
  sprayAnimation.style.top = "14px";
  sprayAnimation.style.right = "10px";
  sprayAnimation.style.zIndex = "100000";

  switch (randomInt) {
    case 1:
      sprayAnimation.style.top = "26px";
      break;
    case 2:
      sprayAnimation.style.top = "134px";
      break;
    case 3:
      sprayAnimation.style.top = "230px";
      break;
    default:
      sprayAnimation.style.top = "14px";
      break;
  }

  const sprayGif = document.createElement("img");
  sprayGif.src = "https://storage.googleapis.com/moviechat-c0e74.appspot.com/OnboardingPhotos/spray.gif?GoogleAccessId=firebase-adminsdk-q4vi2%40moviechat-c0e74.iam.gserviceaccount.com&Expires=1893456000&Signature=FWPNDCal%2BWH3IMwpIDD%2FyjtkMolyE%2FoyWh%2B%2BOvXS%2FiSkiiJSlrVSzG5veYfekqWb8gh6dIphphk432t83K0h5izJVkuj%2FSGSdQQn8Xq77pcIaDI1CdWtJv%2BETzwIgMvP4U4kKVdMobAaGPsJ%2FPCZHeF2XfZ%2F5bHpFpp5N5kLUdMHPSju2hElPzNca1Llg5rKtB87tnVC8K6SgJYe0iiIupsB5jTprnMvyPFJUPPJIYDNRgPD7ZmRxVY3JIyxXHpwfzogkAzeKcqfCGL3OHgowjzWS8FPYDrzkFFiUKzwOYFS4RRqMw%2BXGUdEpjF9XD2xCK7oH6GqPTaeQG6vUd6t0g%3D%3D";
  sprayGif.style.width = "70px";
  sprayGif.style.height = "70px";
  sprayGif.style.marginRight = "4px";

  const sprayText = document.createElement("p");
  sprayText.textContent = `x ${amount}`;
  sprayText.style.color = "black";
  sprayText.style.fontSize = "26px";
  sprayText.style.fontWeight = "bold";

  sprayAnimation.appendChild(sprayGif);
  sprayAnimation.appendChild(sprayText);

  popup.appendChild(sprayAnimation);

  await new Promise(resolve => setTimeout(resolve, 5000));
  expandAlert.remove();
  sprayAnimation.remove();
}