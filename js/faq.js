const faqItems = document.querySelectorAll(".faq-item");

const toggleFaq = (item) => {
    const answer = item.querySelector(".faq-answer");
    const button = item.querySelector(".faq-question-btn i");

    faqItems.forEach(otherItem => {
        const otherAnswer = otherItem.querySelector(".faq-answer");
        const otherButton = otherItem.querySelector(".faq-question-btn i");
        if (otherItem !== item) {
            otherAnswer.classList.remove("faq-answer--active");
            otherButton.classList.remove("fa-caret-up");
            otherButton.classList.add("fa-caret-down");
        }
    });

    answer.classList.toggle("faq-answer--active");
    button.classList.toggle("fa-caret-down");
    button.classList.toggle("fa-caret-up");
};

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => toggleFaq(item));
});
