const ignore_letters = ["Alt", "Control", "Shift", "Meta", "Arrow", "Enter", "Escape"];
const sentences = [
    "The sunset painted the sky with hues of orange and pink as the day came to a close.",
    "Have you ever wondered what lies beyond the stars?",
    "The scent of freshly brewed coffee filled the air, making the morning feel alive.",
    "What books have inspired you the most throughout your life?",
    "How do you define success in your personal journey?",
];

let level_upto = 1;


function SentenceComponent(sentence_array){
    const sentence_element = document.createElement("div");
    sentence_element.classList.add("sentence");
    for (const word of sentence_array){
        const word_element = document.createElement("span");
        word_element.textContent = word;
        sentence_element.appendChild(word_element);
    }
    return sentence_element;
}


function show_level_buttons(){
    const post_level_buttons = document.querySelector(".post_level_buttons");
    post_level_buttons.style.display = "block";
    return;



    const next_level_button = document.querySelector(".next");
    next_level_button.style.display = "block";
    next_level_button.textContent = "Next level";
    next_level_button.onclick = function(){
        next_level_button.style.display = "none";
        current_level.next();
    }
}

function hide_level_buttons(){
    const post_level_buttons = document.querySelector(".post_level_buttons");
    post_level_buttons.style.display = "none";
}

const global_keyboard_event = (e) => {
    current_level.start();
    current_level.handle_keydown(e);
    window.removeEventListener("keydown", global_keyboard_event);
}

function on_level_change(){
    document.querySelector(".wpm").textContent = "press any key to start";
    show_level_buttons();
    window.addEventListener("keydown", global_keyboard_event);
}


const all_wpms = [
]