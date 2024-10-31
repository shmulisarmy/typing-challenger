function SentenceComponent(sentence_array){
    const sentence_element = document.createElement("div");
    sentence_element.classList.add("sentence");
    for (const word of sentence_array){
        const word_element = document.createElement("span");
        word_element.classList.add("letter");
        word_element.textContent = word;
        sentence_element.appendChild(word_element);
    }
    return sentence_element;
}
