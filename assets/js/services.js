const addBtn = document.querySelector("#add");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const addServiceBtn = document.getElementById("addService");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const iconInput = document.getElementById("iconInput");
const services = document.getElementById("services")
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const showAll = document.getElementById("show-all-btn")
const searchInputWarn = document.getElementById("search-input-warn")
const titleWarning = document.getElementById("title-warning")
const contentWarning = document.getElementById("content-warning")
const iconWarning = document.getElementById("icon-warning")
const titleCharWarning = document.getElementById("title-char-warning")
const contentCharWarning = document.getElementById("content-char-warning")
const swiperEl = document.querySelector('swiper-container')
const sortByNameSelect = document.querySelector("#sort-by-name");


class Service {
    constructor(title, content, icon) {
        this.title = title;
        this.content = content;
        this.icon = icon;
        this.id = Service.idCounter++;
        this.created_at = new Date;
    }
}
Service.idCounter = 0;
const service1 = new Service(
    'Trekking',
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'assets/images/trekking.png'
);

const service2 = new Service(
    'The Map',
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'assets/images/world-map.png'
);

const service3 = new Service(
    'Suitcase',
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'assets/images/suitcase.png'
);

const service4 = new Service(
    'Island Hoping',
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'assets/images/island.png'
);

const service5 = new Service(
    'World Round',
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'assets/images/world-map.png'
);

const service6 = new Service(
    'Travel with Plane',
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'assets/images/world-map.png'
);

const servicesArray = [service1, service2, service3, service4, service5, service6];


function addService() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const icon = iconInput.value.trim();

    if (!title || !content || !icon) {
        if (!title) titleWarning.classList.replace('d-none', 'd-block');
        if (!content) contentWarning.classList.replace('d-none', 'd-block');
        if (!icon) iconWarning.classList.replace('d-none', 'd-block');
        return;
    }
    if (title.length < 3) {
        titleCharWarning.classList.replace('d-none', 'd-block');
        return;
    }
    if (content.length < 10) {
        contentCharWarning.classList.replace('d-none', 'd-block');
        return;
    }

    const newService = new Service(title, content, icon);
    servicesArray.push(newService);
    clearInputs();
    modal.style.display = "none";
    renderServices(servicesArray);
    attachDeleteListeners();
}


function clearInputs() {
    titleInput.value = "";
    contentInput.value = "";
    iconInput.value = "";
    titleWarning.classList.replace('d-block', 'd-none');
    contentWarning.classList.replace('d-block', 'd-none');
    iconWarning.classList.replace('d-block', 'd-none');
    titleCharWarning.classList.replace('d-block', 'd-none');
    contentCharWarning.classList.replace('d-block', 'd-none');
}

function renderServices(array) {
    services.innerHTML = "";
    array.forEach(service => {
        services.innerHTML += renderServiceHTML(service);
    });
    attachDeleteListeners();
}




function renderServiceHTML(service) {
    return `
        <swiper-slide>
            <div class="box text-start w-100">
                <div class="img">
                    <img src="${service.icon}" alt="">
                </div>
                <div class="content">
                    <h5>${service.title}</h5>
                    <p>${service.content}</p>
                </div>
                <div class="learn-more">
                    <span>${service.created_at}</span>
                    <div class="d-flex links">
                        <a href="">Learn more</a>
                        <a href="#" class="del" data-id="${service.id}">Delete</a>
                    </div>
                </div>
            </div>
        </swiper-slide>
    `;

}

function attachDeleteListeners() {
    const deleteBtns = document.querySelectorAll(".del");
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const idToDelete = parseInt(this.dataset.id);
            console.log(idToDelete);
            const idx = servicesArray.findIndex(service => service.id === idToDelete);
            if (idx !== -1) {
                servicesArray.splice(idx, 1);
                renderServices(servicesArray);
            }
        });
    });
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
    clearInputs();
});

addServiceBtn.addEventListener("click", addService);

iconInput.addEventListener('keyup', () => {
    if (iconInput.value.trim() !== "") {
        iconWarning.classList.replace('d-block', 'd-none');
    }
});

contentInput.addEventListener('keyup', () => {
    if (contentInput.value.trim() !== "") {
        contentWarning.classList.replace('d-block', 'd-none');
    }
    if (contentInput.value.trim().length > 10) {
        contentCharWarning.classList.replace('d-block', 'd-none');
    }
});

titleInput.addEventListener('keyup', () => {
    if (titleInput.value.trim() !== "") {
        titleWarning.classList.replace('d-block', 'd-none');
    }
    if (titleInput.value.trim().length > 3) {
        titleCharWarning.classList.replace('d-block', 'd-none');
    }
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (searchInput.value === "") {
        searchInputWarn.classList.replace('d-none', 'd-flex');
    } else {
        services.innerHTML = "";
        const filteredServices = servicesArray.filter(service =>
            service.title.trim().toLowerCase().includes(searchInput.value.trim().toLowerCase())
        );
        filteredServices.forEach(service => {
            services.innerHTML += renderServiceHTML(service);
        });
        searchInput.value = "";
    }
});

searchInput.addEventListener('keyup', () => {
    if (searchInput.value.trim() !== "") {
        searchInputWarn.classList.replace('d-flex', 'd-none');
    }
});

showAll.addEventListener('click', (e) => {
    e.preventDefault();
    renderServices(servicesArray);
});


function nextSlide() {
    swiperEl.swiper.slideNext();
}

function prevSlide() {
    swiperEl.swiper.slidePrev();
}




renderServices(servicesArray);
attachDeleteListeners();


sortByNameSelect.addEventListener('change', function (e) {
    sortByName(this.value);
    e.preventDefault()

})

function sortByName(value) {
 let newSortArr = [...servicesArray]
    if (value == 'a-z') {
        newSortArr = newSortArr.sort((x, y) => x.title.localeCompare(y.title));
        renderServices(newSortArr)


    }
    else if (value == 'z-a') {
       
        newSortArr = newSortArr.sort((x, y) => y.title.localeCompare(x.title));
        renderServices(newSortArr)

    }
}
