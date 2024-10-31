const ignore_letters = ["Alt", "Control", "Shift", "Meta", "Arrow", "Enter", "Escape"];
const sentences = [
    "The sunset painted the sky with hues of orange and pink as the day came to a close.",
    "Have you ever wondered what lies beyond the stars?",
    "The scent of freshly brewed coffee filled the air, making the morning feel alive.",
    "What books have inspired you the most throughout your life?",
    "How do you define success in your personal journey?",
];

let level_upto = 1;




function show_level_buttons(){
    return


    const next_level_button = document.querySelector(".next");
    next_level_button.style.display = "block";
    next_level_button.textContent = "Next level";
    next_level_button.onclick = function(){
        next_level_button.style.display = "none";
        current_level.next();
    }
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