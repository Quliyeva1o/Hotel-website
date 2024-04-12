const accordion = document.getElementById("accordion")


class FAQs {

    constructor(question, answer) {
        this.question = question
        this.answer = answer
        this.id = idCounter++;
    }
}

idCounter = 0

faq1 = new FAQs("Is it free?", "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.")


faq2 = new FAQs("How to install this template?", "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.")

faq3 = new FAQs("Where can i get help?", "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.")

faqsArr = [faq1, faq2, faq3]

function Add() {
    faqsArr.forEach(faq => {
        accordion.innerHTML += `
        <div class="accordion-item">
                            <h2 class="accordion-header" data-id="${faq.id}">
                                ${faq.question}
                               
                            </h2>
                            <div class='close' id="answer">
                               <p>
                                    ${faq.answer}
                               </p>
                            </div>
                        </div>

    ` });
    click()
}
Add()

function click() {
    const headers = document.querySelectorAll(".accordion-header")

    headers.forEach(header => {
        header.addEventListener('click', (e) => {
            e.preventDefault()
            const questId = parseInt(e.target.dataset.id);
            answer = faqsArr.find(answer => answer.id == questId)
            const answerDiv = e.target.nextElementSibling;
            if (answerDiv.classList == 'close') {
                answerDiv.classList.remove('close')
            }
            else{
                answerDiv.classList.add('close')
            }
        });
    });
}




