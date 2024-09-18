class Level{

    constructor(levelNumber){
        this.construct(levelNumber);
    }

    construct(levelNumber){
        this.levelNumber = levelNumber;
        this.sentence = sentences[level_upto - 1];
        console.log({sentence: this.sentence});
        this.sentence_array = Array.from(this.sentence);
        console.log({sentence_array: this.sentence_array});
        this.letterUpTo = 0;
        this.started = false;
        this.start_time;
        this.correct_letter_count = 0;
        this.incorrect_letter_count = 0;
        this.wpm_interval;
        this.handle_keydown = this.handle_keydown.bind(this);
        this.time_paused_for = 0;
        /**
         * @type {{[key: string]: number}}
         */
        this.missed_letters = {};
    }

    next(){
        level_upto++;
        this.construct(level_upto);
        current_level.setup();
        on_level_change();
    }

    restart(){
        this.construct(level_upto);
        current_level.setup();
        on_level_change();
    }
    

    start(){
        this.started = true;
        this.start_time = new Date();
        window.addEventListener("keydown", this.handle_keydown)

        this.wpm_interval = setInterval(this.update_wpm.bind(this), 100)


    }

    update_wpm(){
        document.querySelector(".wpm").textContent = (this.calculate_wpm() - this.time_paused_for).toFixed(0) + " wpm";
    }

    end(){
        clearInterval(this.wpm_interval);
        window.removeEventListener("keydown", this.handle_keydown);
        this.started = false;
        show_level_buttons();
        this.remove_progress_bar();

        all_wpms.push(this.calculate_wpm());
        update_Progress_page();
    }

    handle_keydown(e){
        e.preventDefault();
        const key = e.key;
        const sentence_element = document.querySelector(".sentence");
        if (ignore_letters.includes(key)){
            return
        }
    
        if (key == "Backspace"){
            if (this.letterUpTo > 0){
                this.letterUpTo--;
                sentence_element.children[this.letterUpTo].classList.remove("correct");
                sentence_element.children[this.letterUpTo].classList.remove("incorrect");
            }
            return
        }
        
        if (key == this.sentence_array[this.letterUpTo]){
            this.correct_letter_count++;
            sentence_element.children[this.letterUpTo].classList.add("correct");
        } else {
            this.incorrect_letter_count++; 
            sentence_element.children[this.letterUpTo].classList.add("incorrect");
            const missed_letter = this.sentence_array[this.letterUpTo];
            this.missed_letters[missed_letter] = (this.missed_letters[missed_letter] || 0) + 1;
            console.table(this.missed_letters)
        }
        this.letterUpTo++;
    
        if (this.letterUpTo == this.sentence_array.length){
            this.end();
        }
        this.update_progress();
    }

    calculate_wpm(){
        const end_time = new Date();
        const time_diff = (end_time - this.start_time) / 1000;
        const wpm = ((this.correct_letter_count - this.incorrect_letter_count) / 5) / (time_diff / 60);
        return wpm;
    }

    update_progress(){
        document.querySelector("progress").value = this.letterUpTo;
    }

    setup() {
        console.log("in setup_level")
        this.display_level();
        document.querySelector(".wpm").textContent = "press any key to start";
        this.sentence_dom_element = SentenceComponent(this.sentence_array);
        document.querySelector(".sentence").parentElement.replaceChild(this.sentence_dom_element, document.querySelector(".sentence"));
        this.letterUpTo = 0;
        hide_level_buttons();
        document.querySelector("#progres-shower").innerHTML = `
            <progress min="0" max="${this.sentence_array.length}" value="0"></progress>
        `;
    }

    remove_progress_bar(){
        document.querySelector("#progres-shower").innerHTML = "";
    }


    display_level(){
        document.querySelector("#level-display").textContent = `Level ${this.levelNumber}`
    }

    static goto_level(level_number){
        level_upto = level_number;
        current_level.construct(level_upto);
        current_level.setup();
        on_level_change();
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    pause(){
        this.pause_start_time = new Date();
        clearInterval(this.wpm_interval);
        window.removeEventListener("keydown", this.handle_keydown);
        this.paused = true;
    }

    resume(){
        const time_paused_for = new Date() - this.pause_start_time;
        this.totoal_pause_time += time_paused_for;
        this.wpm_interval = setInterval(this.update_wpm.bind(this), 100);
        window.addEventListener("keydown", this.handle_keydown);
        this.paused = false;
    }
    

    
    
}