function update_Progress_page() {
  const barContainer = document.getElementById("barGraph");
  barContainer.innerHTML = "";

  all_wpms.forEach((wpm, index) => {
    const barWrapper = document.createElement("div");
    barWrapper.style.textAlign = "center";

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${wpm * 3}px`;
    bar.innerHTML = `${wpm}`; 

    const label = document.createElement("div");
    label.classList.add("label");


    const gameNumber = index + 1;
    if (gameNumber % 10 == 0) {
      label.innerText = `game #${gameNumber}`;
    } else {
      label.innerText = "- - -";
    }

    barWrapper.appendChild(bar);
    barWrapper.appendChild(label);
    barContainer.appendChild(barWrapper);
  });
}
