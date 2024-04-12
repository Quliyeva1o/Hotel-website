const testSlider = document.querySelector(".test-slider-content");
const addBtnTest = document.getElementById("add-employee")
const testImg = document.getElementById("test-image")
const testFullName = document.getElementById("test-full-name")
const testComment = document.getElementById("test-comment")
const testPosition = document.getElementById("test-position")
const addTestBtn = document.getElementById("add-test")
const testModal = document.getElementById("test-modal")


class empleyees {
    constructor(fullName, position, comment, imgSrc) {
        this.fullName = fullName
        this.position = position
        this.comment = comment
        this.imgSrc = imgSrc
        this.id = employeeId++
    }
}
employeeId = 0

employe1 = new empleyees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_1.jpg")
employe2 = new empleyees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_2.jpg")
employe3 = new empleyees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_3.jpg")
employe4 = new empleyees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_4.jpg")
employe5 = new empleyees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_1.jpg")
employe6 = new empleyees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_2.jpg")
employe7 = new empleyees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_3.jpg")
employe8 = new empleyees("John Doe", "Creative Director", "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.", "https://preview.colorlib.com/theme/hotell/images/person_4.jpg")

employesArr = [employe1, employe2, employe3, employe4, employe5, employe6, employe7, employe8]


function renderEmployees(array) {
    testSlider.innerHTML = "";
    array.forEach(employe => {
        testSlider.innerHTML += renderEmployeesHTML(employe);
    });
    deleteFun()
  
}


function renderEmployeesHTML(employe) {
    return `
<div class="item">
<div class="testimonial">
    <span class="icon-quote-left"> <i class="fa-solid fa-quote-left"></i></span>
    <blockquote>
        <p>${employe.comment}</p>
    </blockquote>
    <div class="author">
        <div class="d-flex align-items-center">
            <div class="img mr-3">
                <img src="${employe.imgSrc}" alt="Image" class="img-fluid">
            </div>
            <div class="justify-content-between d-flex w-100 align-items-center">
            <div class="text">
                <strong class="d-block">${employe.fullName}</strong>
                <span>${employe.position}</span>
            </div>
            <div> <a href="#" class="del" data-id="${employe.id}"> del</a></div></div>
        </div>
    </div>
</div>
</div>
`
}

const testNext = document.querySelector(".test-next")
const testPrev = document.querySelector(".test-prev")

testNext.addEventListener("click", () => {
    const itemWidth = testSlider.querySelector('.item').offsetWidth;
    testSlider.scrollBy({ left: itemWidth, behavior: "smooth" });
    if (testSlider.scrollLeft + testSlider.offsetWidth >= testSlider.scrollWidth) {
        testSlider.scrollTo({ left: 0, behavior: "smooth" });
    }
});

testPrev.addEventListener("click", () => {
    const itemWidth = testSlider.querySelector('.item').offsetWidth;
    testSlider.scrollBy({ left: -itemWidth, behavior: "smooth" });
    if (testSlider.scrollLeft === 0) {
        testSlider.scrollTo({ left: testSlider.scrollWidth, behavior: "smooth" });
    }
});


function deleteFun() {
    deleteBtns = document.querySelectorAll('.del')
    deleteBtns.forEach(delBtn => {
        delBtn.addEventListener('click', (e) => {
            e.preventDefault();
            tarId = parseInt(e.target.dataset.id)
            delId = employesArr.findIndex(delId => delId.id == tarId)
            employesArr.splice(delId, 1)
            console.log(employesArr);
            testSlider.innerHTML = "";
            renderEmployees(employesArr)
        })

    })
}


addBtnTest.addEventListener('click', (e) => {
    e.preventDefault()
    testModal.classList.replace('d-none', 'd-flex')

})

function addFun() {
    addTestBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const newEmployee = new empleyees(testFullName.value, testPosition.value, testComment.value, testImg.value)
        employesArr.push(newEmployee)
        testSlider.innerHTML = ""
        renderEmployees(employesArr)
        console.log(employesArr);
        testModal.classList.replace('d-flex', 'd-none')
    })

}


renderEmployees(employesArr)
addFun()