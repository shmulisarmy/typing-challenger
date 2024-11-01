current_level = new Level(1);
on_level_change();

window.addEventListener("load", function(){
    current_level.setup();
});


window.addEventListener("keydown", global_keyboard_event);