const blogsContainer = document.getElementById("blogs");
const blogPrevBtn = document.getElementById("blog-prev-btn");
const blogNextBtn = document.getElementById("blog-next-btn");
const blogModal = document.getElementById("blog-modal");


const blogsData = [
    { title: 'Far far away, behind the word mountains, far from the countries', imgSrc: 'assets/images/about.jpg' },
    { title: 'Far far away, behind the word mountains, far from the countries', imgSrc: 'assets/images/blog2.jpg' },
    { title: 'Far far away, behind the word mountains, far from the countries', imgSrc: 'assets/images/blog3.jpg' },
    { title: 'Far far away, behind the word mountains, far from the countries', imgSrc: 'assets/images/blog4.jpg' },
    { title: 'Far far away, behind the word mountains, far from the countries', imgSrc: 'assets/images/about.jpg' },
    { title: 'Far far away, behind the word mountains, far from the countries', imgSrc: 'assets/images/blog2.jpg' },
    { title: 'Far far away, behind the word mountains, far from the countries', imgSrc: 'assets/images/blog3.jpg' },
    { title: 'Far far away, behind the word mountains, far from the countries', imgSrc: 'assets/images/blog4.jpg' }
];



class BlogPost {
    constructor(title, imgSrc) {
        this.title = title;
        this.imgSrc = imgSrc;
        this.id = BlogPost.idCounter++;
    }
}
BlogPost.idCounter = 0;

class Blogs {
    constructor(container, prevButton, nextButton, modal) {
        this.container = container;
        this.prevButton = prevButton;
        this.nextButton = nextButton;
        this.modal = modal;
        this.blogs = [];

        this.prevButton.addEventListener("click", this.scrollPrev.bind(this));
        this.nextButton.addEventListener("click", this.scrollNext.bind(this));
    }

    addBlog(title, imgSrc) {
        const blog = new BlogPost(title, imgSrc);
        this.blogs.push(blog);
        this.renderBlog(blog);
    }

    renderBlog(blog) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML = `
            <div>
                <div class="image">
                    <img src="${blog.imgSrc}" alt="">
                    <div class="content">
                        <span class="icon-pencil"><i class="fa-solid fa-pencil" data-id="${blog.id}"></i></span>
                        <h3>${blog.title}</h3>
                        <a href="">read more</a>
                    </div>
                </div>
            </div>`;
        this.container.appendChild(box);
    }

    scrollPrev() {
        const boxWidth = this.container.querySelector('.box').offsetWidth;
        this.container.scrollBy({ left: -boxWidth, behavior: "smooth" });
    }

    scrollNext() {
        const boxWidth = this.container.querySelector('.box').offsetWidth;
        const maxScrollLeft = this.container.scrollWidth - this.container.clientWidth;
        const currentScrollLeft = this.container.scrollLeft;

        if (currentScrollLeft + boxWidth >= maxScrollLeft) {
            this.container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            this.container.scrollBy({ left: boxWidth, behavior: "smooth" });
        }
    }

    openEditModal(blogId) {
        const blog = this.blogs.find(blog => blog.id === blogId);
        if (blog) {
            this.modal.classList.replace('d-none', 'd-flex');
            this.modal.innerHTML = `
                <div>
                    <div class="image">
                        <img src="${blog.imgSrc}">
                    </div>
                    <div class="update d-flex ">
                        <div class="d-flex flex-column w-100 "><input type="text" value="${blog.title}" class="form-control" data-blogid="${blog.id}" id="inp">
                        <span class="blogmodalerr d-none">input should not be empty!</span></div>
                        <a href="#" class="edit">edit</a>
                        <a href="#" class="cancel">cancel</a>
                    </div>
                </div>`;


            const errsp = this.modal.querySelector('.blogmodalerr');
            const editButton = this.modal.querySelector('.edit');
            const cancelButton = this.modal.querySelector('.cancel');
            const input = this.modal.querySelector('input[type="text"]');
            editButton.addEventListener('click', (e) => {
                const inp = this.modal.querySelector('#inp');
                e.preventDefault();
                if (inp.value == "") {
                    errsp.classList.replace('d-none', 'd-flex')
                }

                else {
                    const newTitle = input.value;
                    this.modal.classList.replace('d-flex', 'd-none');
                    blog.title = newTitle;
                    this.updateBlogTitle(blogId, newTitle);
                    this.renderBlog(blog);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Edited Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            });
            cancelButton.addEventListener('click', (e) => {
                e.preventDefault()
                this.modal.classList.replace('d-flex', 'd-none');
            })
        }
    }

    updateBlogTitle(blogId, newTitle) {
        const blogBox = this.container.querySelector(`.box .content [data-id="${blogId}"]`).closest('.box');
        blogBox.querySelector('h3').textContent = newTitle;
    }
}


const blogs = new Blogs(blogsContainer, blogPrevBtn, blogNextBtn, blogModal);

function createBlogs(blogsData) {
    blogsData.forEach(blog => {
        blogs.addBlog(blog.title, blog.imgSrc);
    });
}


createBlogs(blogsData);

const iconPencils = document.querySelectorAll('.icon-pencil');
iconPencils.forEach(iconPencil => {
    iconPencil.addEventListener('click', (e) => {
        e.preventDefault();
        const blogId = parseInt(e.target.dataset.id);
        blogs.openEditModal(blogId);
    });
});
