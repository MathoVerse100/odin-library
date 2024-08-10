let myLibrary = [];
const addBook = document.querySelector(".bar:nth-child(1)");
const removeBook = document.querySelector(".bar:nth-child(2)");
const modal = document.querySelector(".modal");
const submitButton = document.querySelector(".button > button");
const form = document.querySelector(".form");
let removeIsClicked = false;


function changeToggle(toggle, toggleBall) {
    if (toggle.style.backgroundColor === "green") {
        toggle.style.backgroundColor = "red";
        toggleBall.style.marginRight = "0";
        toggleBall.style.marginLeft = "auto";
    } else {
        toggle.style.backgroundColor = "green";
        toggleBall.style.marginRight = "auto";
        toggleBall.style.marginLeft = "0";
    };
};


function Book(name, author, numberOfPages, status) {
    this.name = name;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
};


function addBookToLibrary(book) {

    myLibrary.push(book);

    const insertBook = document.createElement("div");
    insertBook.classList.add("book");

    for (let i = 0; i < 7; i++) {
        const bookContent = document.createElement("div");
        bookContent.classList.add("book-content");
        
        if (i === 0 || i === 6) {
            bookContent.classList.add("logo");
        };

        switch (i) {
            case 0:
                const logo = document.createElement("img");
                logo.src = "./images/book-icon.jpg";
                logo.alt = "Book Logo";

                bookContent.appendChild(logo);
                break;
            case 1:
                bookContent.textContent = book.name;
                break;
            case 2:
                bookContent.textContent = "Author";
                break;
            case 3:
                bookContent.textContent = book.author;
                break;
            case 4:
                bookContent.textContent = "Number of Pages";
                break;
            case 5:
                bookContent.textContent = parseInt(book.numberOfPages);
                break;
            case 6:

                const toggle = document.createElement("div");
                const toggleBall = document.createElement("div");
                const remove = document.createElement("img");

                toggle.classList.add("toggle");
                toggleBall.classList.add("toggle-ball");

                bookContent.append(toggle, remove);

                if (!book.status) {
                    toggle.style.backgroundColor = "red";
                    toggleBall.style.marginRight = "0";
                    toggleBall.style.marginLeft = "auto";
                } else {
                    toggle.style.backgroundColor = "green";
                    toggleBall.style.marginRight = "auto";
                    toggleBall.style.marginLeft = "0";
                }

                toggleBall.addEventListener("click", () => {

                    changeToggle(toggle, toggleBall);

                    const bookCopy = toggle.parentElement.parentElement;
                    bookCopy.remove();

                    if (book.status) {
                        book.status = false;
                        document.querySelector(".shelf:nth-child(4)").appendChild(bookCopy);
                    } else {
                        book.status = true;
                        document.querySelector(".shelf:nth-child(3)").appendChild(bookCopy);
                    }

                });

                toggle.appendChild(toggleBall);
                
                remove.src = "./images/delete.png";
                remove.alt = "Trash Icon";

                remove.addEventListener("click", () => {
                    
                    remove.parentElement.parentElement.remove();
                    myLibrary = myLibrary.filter(item => (item.name !== book.name || item.author !== book.author || item.numberOfPages !== book.numberOfPages || item.status !== book.status));

                });

                break;
        };

        insertBook.appendChild(bookContent);
    };

    if (book.status) {
        document.querySelector(".shelf:nth-child(3)").appendChild(insertBook);
    } else {
        document.querySelector(".shelf:nth-child(4)").appendChild(insertBook);   
    };

};


function removeBookFromLibrary() {
    const remove = document.querySelectorAll(".book-content:nth-child(7) img");
    removeIsClicked = !removeIsClicked;

    if (removeIsClicked) {

        remove.forEach((button) => {
            button.style.display = "block";
        });

    } else {

        remove.forEach((button) => {
            button.style.display = "none";
        });

    };
}


addBook.addEventListener("click", () => {

    if (removeIsClicked) {
        removeBook.dispatchEvent(new Event("click"));
    };

    modal.showModal();

});


removeBook.addEventListener("click", removeBookFromLibrary);


submitButton.addEventListener("click", () => {

    const name = form.elements["title"].value;
    const author = form.elements["author"].value;
    const numberOfPages = form.elements["number-of-pages"].value;
    const status = form.elements["status"].checked;

    if (status) {
        isToggled = true;
    };

    if (name && author && numberOfPages) {

        const newBook = new Book(name, author, numberOfPages, status);
        addBookToLibrary(newBook);

        modal.close();

    };

});

modal.addEventListener("close", () => {

    form.reset();

})

document.addEventListener("keydown", (event) => {

    if ((event.key === 'Escape' || event.key === 'Esc') && form.open) {
        
        modal.dispatchEvent(new Event("close"));

    };

});
