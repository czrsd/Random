function search() {
  alert("not available at the moment.");
}

let isHigher = true;
let outputNum = document.getElementById("outputNum");
let minE = document.getElementById("minNum");
minE.addEventListener("input", () => {
  if (minE.value < 0) {
    isHigher = false;
    outputNum.innerText = "Enter a higher Number!";
    return;
  } else {
    isHigher = true;
    outputNum.innerText = "";
  }
});

function genNumber() {
  let min = parseInt(document.getElementById("minNum").value);
  let max = parseInt(document.getElementById("maxNum").value);
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  if (!isHigher) {
    return;
  } else {
    outputNum.innerText = randomNumber;
  }
}

function genPass() {
  let output = document.getElementById("outputPass");
  const ml = document.getElementById("passLength");
  let length = ml.value;
  let charset = "";
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let checked = false;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checked = true;
      break;
    }
  }
  if (!checked) {
    alert("Select at least one checkbox!");
    return;
  }

  if (document.getElementById("characters").checked) {
    charset += "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  }
  if (document.getElementById("numbers").checked) {
    charset += "0123456789";
  }
  if (document.getElementById("Uppercase").checked) {
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (document.getElementById("lowercase").checked) {
    charset += "abcdefghijklmnopqrstuvwxyz";
  }

  let password = "";
  let n = charset.length;
  for (let i = 0; i < length; ++i) {
    let index = Math.floor(Math.random() * n);
    password += charset.charAt(index);
  }

  output.innerText = password;
  if (output.innerText == "") {
    genPass();
    return;
  }
}

let words;
let emojis;
let countries;

async function fetchData() {
  const response1 = await fetch("/json/words.json");
  const data1 = await response1.json();
  words = data1;

  const response2 = await fetch("/json/emojis.json");
  const data2 = await response2.json();
  emojis = data2;

  const response3 = await fetch("/json/countries.json");
  const data3 = await response3.json();
  countries = data3;
}

fetchData();

function genWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  let output = document.getElementById("outputWord");
  output.innerHTML = words[randomIndex];
}

function genEmoji() {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  let output = document.getElementById("outputEmoji");
  output.innerHTML = emojis[randomIndex];
}

function genArray() {
  const inputText = document.getElementById("exampleFormControlTextarea1").value;
  const inputArray = inputText.split(",").map((item) => {
    item = item.trim();
    if (!isNaN(item)) {
      return Number(item);
    }
    return item;
  });
  document.getElementById("outputArray").innerHTML = JSON.stringify(inputArray);
}

function genColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  document.getElementById("outputColor").value = color;
}

function genCountry() {
  const randomIndex = Math.floor(Math.random() * countries.length);
  const output = document.getElementById("outputCountry");
  output.innerHTML = countries[randomIndex];
}

setTimeout(() => {
  genNumber();
  genPass();
  genWord();
  genEmoji();
  genArray();
  genColor();
  genCountry();
}, 500);

function copy(outputid) {
  let opid = document.getElementById(outputid).innerHTML;
  navigator.clipboard.writeText(opid);
  let copystatus = document.getElementById("copystatus");
  copystatus.style.display = "block";
  setTimeout(() => {
    copystatus.style.transform = "scale(1)";
    setTimeout(() => {
      copystatus.style.transform = "scale(0)";
    }, 2400);
  }, 50);
}

//dark mode with Bootstrap

let dark = document.getElementById("dark");
let light = document.getElementById("light");
let cards = document.querySelectorAll(".JSCard");

function darkTheme() {
  dark.classList.add("hidden");
  light.classList.remove("hidden");
  cards.forEach((card) => {
    card.classList.add("text-bg-dark");
    card.classList.remove("text-bg-light");
  });
  document.body.setAttribute("data-bs-theme", "dark");
}

function lightTheme() {
  light.classList.add("hidden");
  dark.classList.remove("hidden");
  cards.forEach((card) => {
    card.classList.remove("text-bg-dark");
    card.classList.add("text-bg-light");
  });
  document.body.setAttribute("data-bs-theme", "light");
}

let options = JSON.parse(localStorage.getItem("options"));

if (!options) {
  options = {
    dark: false,
  };
  localStorage.setItem("options", JSON.stringify(options));
} else if (options.dark) {
  darkTheme();
} else {
  lightTheme();
}

dark.addEventListener("click", () => {
  darkTheme();
  options.dark = true;
  localStorage.setItem("options", JSON.stringify(options));
});

light.addEventListener("click", () => {
  lightTheme();
  options.dark = false;
  localStorage.setItem("options", JSON.stringify(options));
});
