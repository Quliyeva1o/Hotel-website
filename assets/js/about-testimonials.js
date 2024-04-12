const testSlider = document.querySelector(".test-slider-content");
const addBtnTest = document.getElementById("add-employee")
const testImg = document.getElementById("test-image")
const testFullName = document.getElementById("test-full-name")
const testComment = document.getElementById("test-comment")
const testPosition = document.getElementById("test-position")
const addTestBtn = document.getElementById("add-test")
const testModal = document.getElementById("test-modal")
const closeTest = document.getElementById("close-test")
const testReadModal = document.getElementById("test-read-modal")

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
    testdeleteFun();
    testReadFunc()

}


function renderEmployeesHTML(employe) {
    return `
<div class="item">
<div class="testimonial"><div class="img mr-3">
                <img src="${employe.imgSrc}" alt="Image" class="img-fluid">
            </div>
            <div class="author">
            <div class="d-flex align-items-center">
                
                <div class="justify-content-between d-flex w-100 align-items-center">
                <div class="text">
                    <strong class="d-block">${employe.fullName}</strong>
                    <span>${employe.position}</span>
                </div>
                

                <div>
               
                 <a href="#" class="deltes" data-id="${employe.id}"> del</a></div></div>
            </div>
        </div>
    <blockquote>

        <p>${employe.comment}</p>
        <a class="link" id="read" data-id="${employe.id}"> Read more</a>
    </blockquote>
   
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


function testdeleteFun() {
    deleteBtns = document.querySelectorAll('.deltes')
    deleteBtns.forEach(delBtn => {
        delBtn.addEventListener('click', (e) => {
            e.preventDefault();
            tarId = parseInt(e.target.dataset.id)
            delId = employesArr.findIndex(delId => delId.id == tarId)


            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    employesArr.splice(delId, 1)
                    testSlider.innerHTML = "";
                    renderEmployees(employesArr)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Employee has been deleted.",
                        icon: "success"
                    });
                }
            });
        })

    })
}


function testReadFunc() {
    const readBtns = document.querySelectorAll('#read');

    readBtns.forEach(readBtn => {
        readBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const employeee = employesArr.find(employee => employee.id === parseInt(readBtn.dataset.id));
            testReadModal.classList.replace('d-none', 'd-flex');
            testReadModal.innerHTML = `
                <div class="item">
                    <div class="testimonial">
                        <blockquote>
                            <p>${employeee.comment}</p>
                        </blockquote>
                        <div class="author">
                            <div class="d-flex align-items-center">
                                <div class="img mr-3">
                                    <img src="${employeee.imgSrc}" alt="Image" class="img-fluid">
                                </div>
                                <div class="justify-content-between d-flex w-100 align-items-center">
                                    <div class="text">
                                        <strong class="d-block">${employeee.fullName}</strong>
                                        <span>${employeee.position}</span>
                                    </div>
                                    <div><a href="#" class="close" data-id="${employeee.id}">close</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const closeBtn = testReadModal.querySelector('.close');
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                testReadModal.classList.replace('d-flex', 'd-none');
            });
        });
    });
}



addBtnTest.addEventListener('click', (e) => {
    e.preventDefault()
    testModal.classList.replace('d-none', 'd-flex')

})
closeTest.addEventListener('click', (e) => {
    e.preventDefault()
    testModal.classList.replace('d-flex', 'd-none')

})


function addFun() {
    addTestBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if (testFullName.value == "") {
            testFullName.nextElementSibling.classList.replace('d-none', 'd-flex')
        }
        if (testPosition.value == "") {
            testPosition.nextElementSibling.classList.replace('d-none', 'd-flex')
        }
        if (testComment.value == "") {
            testComment.nextElementSibling.classList.replace('d-none', 'd-flex')
        }
        if (testImg.value == "") {
            testImg.nextElementSibling.classList.replace('d-none', 'd-flex')
        }
        else {
            const newEmployee = new empleyees(testFullName.value, testPosition.value, testComment.value, testImg.value)
            employesArr.push(newEmployee)
            testSlider.innerHTML = ""
            renderEmployees(employesArr)
            console.log(employesArr);

            testModal.classList.replace('d-flex', 'd-none')
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Employe Added Successfully!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
    testFullName.addEventListener('keyup', () => {
        testFullName.nextElementSibling.classList.replace('d-flex', 'd-none')
    })
    testComment.addEventListener('keyup', () => {
        testComment.nextElementSibling.classList.replace('d-flex', 'd-none')
    })
    testPosition.addEventListener('keyup', () => {
        testPosition.nextElementSibling.classList.replace('d-flex', 'd-none')
    })
    testImg.addEventListener('keyup', () => {
        testImg.nextElementSibling.classList.replace('d-flex', 'd-none')
    })
}


renderEmployees(employesArr)
addFun()

