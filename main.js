const root = document.querySelector('body');
/**
 * It fetches the data from the API, creates the cards, gets the favorites and loads the images
 * @param page - The page number of the results to retrieve.
 */
async function nfts(page) {
    try {
        if (document.querySelector('.nfts')) {
            document.querySelector('.nfts').remove();

        }
        const url = `https://awesome-nft-app.herokuapp.com/?page=${page}`;

        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                let nfts = data.assets;
                let next = data.next;
                let previous = data.previous;
                // nfts = nfts.filter(function (val) {
                //     return val.creator.username != '';
                // })
                createCards(nfts, next, previous);
            })
            .then(function () {
                getFavoris();
            })
            .then(function () {
                loadImage();
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (e) {
        console.log(e);
    }
}

/**
 * It fetches the data from the API and then creates a card with the data
 */
async function unNft() {
    try {
        const url = `https://awesome-nft-app.herokuapp.com/nft/${id}`;

        fetch(url)
            .then((resp) => resp.json())
            .then(function (unNft) {
                createCard(unNft);
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (e) {
        console.log(e);
    }
}

/**
 * It fetches the data from the API, creates the cards and then calls the function that gets the
 * favorites
 */
async function carousel() {
    try {
        const url = 'https://awesome-nft-app.herokuapp.com/';

        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                let nfts = data.assets;
                createCardsCarousel(nfts);
            })
            .then(function () {
                getFavoris();
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (e) {
        console.log(e);
    }
}

const menu = createElement('nav', {
    placeContent: 'center',
    backgroundColor: 'rgb(0 139 139 / 10%)'
});

const myUlMenu = createElement('ul', {}, menu);
const myLiMenu1 = createElement('li', {}, myUlMenu);
const myLiMenu2 = createElement('li', {}, myUlMenu);

createElement('a', {
    href: './index.html',
    text: 'Home',
    margin: '15px 0'
}, myLiMenu1)

createElement('a', {
    href: './favoris.html',
    text: 'My wishlist',
    margin: '15px 0 '
}, myLiMenu2)

/**
 * It creates an HTML element and appends it to the DOM
 * @param tag - the tag of the element to create.
 * @param config - an object containing the parameters of the element to be created.
 * @param [parent=null] - the parent element of the element to create.
 * @returns The element that was created.
 */
function createElement(tag, config, parent = null) {
    const {
        text,
        classe,
        color,
        backgroundColor,
        href,
        role,
        event,
        margin,
        fontSize,
        display,
        width,
        placeContent,
        placeItem,
        flexFlow,
        textAlign,
        identifiant,
        loadingImage,
        placeholder,
    } = config || {};

    const element = document.createElement(tag);

    if (classe) {
        element.classList.add(classe);
    }
    if (role) {
        element.setAttribute("role", "button");
    }
    if (href) {
        element.href = href;
    }
    if (color) {
        element.style.color = color;
    }
    if (backgroundColor) {
        element.style.backgroundColor = backgroundColor;
    }
    if (text) {
        element.innerHTML = text;
    }
    if (margin) {
        element.style.margin = margin;
    }
    if (fontSize) {
        element.style.fontSize = fontSize;
    }
    if (display) {
        element.style.display = display;
    }
    if (width) {
        element.style.width = width;
    }
    if (placeItem) {
        element.style.placeItems = placeItem;
    }
    if (placeContent) {
        element.style.placeContent = placeContent;
    }
    if (flexFlow) {
        element.style.flexFlow = flexFlow;
    }
    if (textAlign) {
        element.style.textAlign = textAlign;
    }
    if (event) {
        element.setAttribute("onclick", event);
    }
    if (identifiant) {
        element.id = identifiant
    }
    if (loadingImage) {
        element.setAttribute("data-src", loadingImage);
    }
    if (placeholder) {
        element.setAttribute("placeholder", placeholder);
    }
    if (!parent) {
        root.appendChild(element);
    } else {
        parent.appendChild(element);
    }
    return element;
}

/* The above code is creating a function called createCards. The function takes in three parameters:
data, next, and previous. */
function createCards(data, next, previous) {
    createElement('option', {
        text: `<select id="listOfSale" name="sales">
    <option value="all" >All sales</option>
</select>`,
    }, myListOfSales);
    createElement('option', {
        text: `<select id="listOfCreator" name="creators">
    <option value="all" >All creators</option>
</select>`,
    }, myListOfcreator);

    /* Creating a div element with the class of nfts, and setting the display to flex, flexFlow to
       wrap, and placeContent to space-evenly. */
    const divNfts = createElement('div', {
        classe: 'nfts',
        display: 'flex',
        flexFlow: 'wrap',
        placeContent: 'space-evenly'
    });

    /* The above code is declaring two variables. */
    let mySelectNumberOfSale = [];
    let mySelectNumberOfCreator = [];

    /* Creating a card for each NFT in the data array. */
    data.forEach((el, index) => {
        if (root.classList.contains('home')) {

            mySelectNumberOfCreator.push(el.creator.username);
            mySelectNumberOfSale.push(el.sales);
            mySelectNameNft.push(el.name);
        }
        myCard = createElement('article', {
            width: '30%',
            display: 'flex',
            flexFlow: 'column',
            placeContent: 'space-between'
        }, divNfts);

        if (index == 0 || index == 1 || index == 2) {
            myImg = createElement('img', {
                classe: 'nft_img_load',
            }, myCard);
            myImg.src = el.image_url;
        } else {
            myImg = createElement('img', {
                classe: 'nft_img',
                loadingImage: el.image_url,
                backgroundColor: '#00897b'
            }, myCard);
        }

        createElement('h2', {
            text: el.name,
            margin: '10px 0 5px',
            fontSize: '24px'
        }, myCard);
        if (el.creator.username) {
            createElement('p', {
                text: `<span style="color:black">by</span> ${el.creator.username}`,
                fontSize: '16px',
                color: 'darkcyan',
                margin: '0px'
            }, myCard);
        } else {
            createElement('p', {
                text: 'anonymous creator',
                color: 'darkcyan',
                margin: '0px'
            }, myCard);
        }
        createElement('span', {
            flexFlow: 'row-reverse',
            placeItem: 'center',
            display: 'flex',
            margin: '10px 0 20px',
            classe: 'sales',
            text: `<svg style="margin-left: 5px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"/></svg> ${el.sales}`,
        }, myCard);
        myCardFooter = createElement('footer', {
            display: 'flex',
            margin: '0px  -40px -40px',
            placeItem: 'center',
            placeContent: 'space-between'
        }, myCard);
        createElement('a', {
            text: 'Learn more',
            href: `./detailNft.html?id=${el.id}`,
            role: "button"
        }, myCardFooter);
        createElement('p', {
            classe: 'like',
            event: `favorisNft(${el.id},"${el.image_url}","${el.name}")`,
            identifiant: `fav_${el.id}`,
            margin: '0',
            text: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
        }, myCardFooter);
    })
    const myButton = createElement('div', {
        display: 'flex',
        placeContent: 'center',
        width: '100%',
        margin: '30px 0 50px '
    }, divNfts)

    /* Creating a button with the text "Previous" and "Suivant" */
    createElement('button', {
        text: 'Previous',
        event: `nfts(${previous})`,
        role: 'button',
        width: 'fit-content',
        margin: '0 10px'
    }, myButton);
    createElement('button', {
        text: 'Next',
        event: `nfts(${next})`,
        role: 'button',
        width: 'fit-content',
        margin: '0 10px'
    }, myButton);

    /* The above code is filtering the array mySelectNumberOfCreator and returning only the unique
    values. */
    myUniqueCreator = mySelectNumberOfCreator.filter(function (item, pos) {
        return mySelectNumberOfCreator.indexOf(item) == pos;
    });
    /* The above code is creating a dropdown list of creators. */
    myUniqueCreator.sort().forEach(function (element) {
        if (element == '') {
            createElement('option', {
                text: `<select id="listOfCreator" name="creators">
            <option value="anonymous" >anonymous creator</option>
        </select>`,
            }, myListOfcreator);
        } else {
            createElement('option', {
                text: `<select id="listOfCreator" name="creators">
            <option value="${element}" >${element}</option>
        </select>`,
            }, myListOfcreator);
        }

    })

    /* The above code is filtering the array mySelectNumberOfSale and returning only the unique values. */
    myUniqueSales = mySelectNumberOfSale.filter(function (item, pos) {
        return mySelectNumberOfSale.indexOf(item) == pos;
    });
/* The above code is creating a dropdown list of unique sales. */
    myUniqueSales.sort(function (a, b) {
        return a - b;
    }).forEach(function (element) {
        createElement('option', {
            text: `<select id="listOfSale" name="sales">
                <option value="${element}" >${element}</option>
        </select>`,
        }, myListOfSales);
    })
}

/**
 * It creates a card with the image, name, creator, date of creation, number of sales and description
 * of the NFT
 * @param unNft - the NFT object
 */
function createCard(unNft) {
    myImg = createElement('img', {
        width: '40%'
    }, myNft);
    myImg.src = unNft.image_url;

    createElement('h1', {
        text: unNft.name,
        margin: '0 0 5px',
        width: 'calc(100% - 24px)'
    }, myHeader);
    // createElement('p', {
    //     classe: 'like',
    //     event: `favorisNft(fav_${unNft.id})`,
    //     identifiant: `fav_${unNft.id}`,
    //     margin: '0',
    //     text: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
    // }, myHeader);
    if (unNft.creator.username) {
        createElement('p', {
            text: `<span style="color:black">by</span> ${unNft.creator.username}, <span style="color:black">at</span> ${(unNft.contract.created_at).slice(0, 10)}`,
            fontSize: '16px',
            color: 'darkcyan',
            margin: '0px',
            width: '100%'
        }, myHeader);
    } else {
        createElement('p', {
            text: 'anonymous creator',
            fontSize: '16px',
            color: 'darkcyan',
            margin: '0px',
            width: '100%'
        }, myHeader);
    }
    createElement('span', {
        display: 'flex',
        placeItem: 'center',
        margin: '10px 0 20px',
        text: `<svg style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"/></svg> ${unNft.sales}`,
    }, myHeader);
    if (unNft.description) {
        createElement('p', {
            text: `<h3>Description</h3> ${unNft.description}`,
        }, myInfos)
    }
}
/**
 * It creates a card for each element of the array, and adds it to the div
 * @param data - the data to display
 */
function createCardsCarousel(data) {
    data.slice(0, 10).forEach(el => {
        myCard = createElement('article', {
            width: 'calc(25% - 20px)',
            display: 'flex',
            flexFlow: 'column',
            placeContent: 'space-between'
        }, myDiv);
        myImg = createElement('img', {
            classe: 'nft_img',
        }, myCard);
        myImg.src = el.image_url;
        createElement('h2', {
            text: el.name,
            margin: '10px 0 5px',
            fontSize: '24px'
        }, myCard);
        if (el.creator.username) {
            createElement('p', {
                text: `<span style="color:black">by</span> ${el.creator.username}`,
                fontSize: '16px',
                color: 'darkcyan',
                margin: '0px'
            }, myCard);
        } else {
            createElement('p', {
                text: 'anonymous creator',
                color: 'darkcyan',
                margin: '0px'
            }, myCard);
        }
        createElement('span', {
            flexFlow: 'row-reverse',
            placeItem: 'center',
            display: 'flex',
            margin: '10px 0 20px',
            text: `<svg style="margin-left: 5px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"/></svg> ${el.sales}`,
        }, myCard);
        myCardFooter = createElement('footer', {
            display: 'flex',
            margin: '0px  -40px -40px',
            placeItem: 'center',
            placeContent: 'space-between'
        }, myCard);
        createElement('a', {
            text: 'Learn more',
            href: `./detailNft.html?id=${el.id}`,
            role: "button"
        }, myCardFooter);
    })
}

/**
 * It creates a card for each element of the data array, and adds it to the page
 * @param data - the data to display
 */
function createCardsFav(data) {
    data.forEach((el, index) => {
        myCard = createElement('article', {
            width: '30%',
            display: 'flex',
            flexFlow: 'column',
            placeContent: 'space-between'
        }, myDiv);
        //chargement différé des images
        myImg = createElement('img', {
            classe: 'nft_img_load',
        }, myCard);
        myImg.src = el.image;

        createElement('h2', {
            text: el.name,
            margin: '10px 0 5px',
            fontSize: '24px'
        }, myCard);


        myCardFooter = createElement('footer', {
            display: 'flex',
            margin: '0px  -40px -40px',
            placeItem: 'center',
            placeContent: 'space-between'
        }, myCard);
        createElement('a', {
            text: 'Learn more',
            href: `./detailNft.html?id=${el.id}`,
            role: "button"
        }, myCardFooter);
        createElement('p', {
            classe: 'like',
            event: `favorisNftFav(${el.id},"${el.image}","${el.name}")`,
            identifiant: `fav_${el.id}`,
            margin: '0',
            text: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
        }, myCardFooter);
    })
}

let favoris = [];

/**
 * It adds or removes an NFT from the favorites list
 * @param id - the id of the NFT
 * @param image - the image of the NFT
 * @param name - The name of the NFT
 */
function favorisNft(id, image, name) {
    let nft = {
        id: id,
        image: image,
        name: name
    }

    let bool = 0;
    favoris.forEach(function (element) {
        if (element.id == nft.id) {
            bool = 1;
            let index_favoris = favoris.indexOf(element);
            favoris.splice(index_favoris, 1);
        }
    })

    if (bool == 0) {
        favoris.push(nft);
        document.querySelector(`#fav_${nft.id} svg`).style.fill = "black";
        document.querySelector(`#fav_${nft.id}`).classList.add("favoris");

    } else {
        document.querySelector(`#fav_${nft.id} svg`).style.fill = "none";
        document.querySelector(`#fav_${nft.id}`).classList.remove("favoris");

    }
    localStorage.setItem('like', JSON.stringify(favoris));
}

/**
 * It checks if there is a localStorage item called 'like', if there is, it gets the value of the item,
 * parses it to JSON, and then loops through the array of objects and adds a class and a style to the
 * element
 */
function getFavoris() {
    if (localStorage.getItem('like')) {
        let fav = localStorage.getItem('like');
        favoris = JSON.parse(fav);
        favoris.forEach(function (element) {
            if (document.querySelector(`#fav_${element.id} svg`)) {
                document.querySelector(`#fav_${element.id}`).classList.add('favoris');
                document.querySelector(`#fav_${element.id} svg`).style.fill = "black";
            }
        })
    };
}
/**
 * The favorites list NFT
 * @param id - the id of the NFT
 * @param image - the image of the NFT
 * @param name - The name of the NFT
 */
function favorisNftFav(id, image, name) {
    let nft = {
        id: id,
        image: image,
        name: name
    }

    favoris.forEach(function (element) {
        if (element.id == nft.id) {
            let index_favoris = favoris.indexOf(element);
            favoris.splice(index_favoris, 1);
        }
    });

    document.querySelector(`#fav_${nft.id} svg`).style.fill = "none";
    document.querySelector(`#fav_${nft.id}`).classList.remove("favoris");
    document.querySelector(`#fav_${nft.id}`).parentNode.parentNode.style.display = "none";

    localStorage.setItem('like', JSON.stringify(favoris));
}

/**
 * It loads the images when the user scrolls down to them
 */
function loadImage() {
    const lazyImages = document.querySelectorAll(".nft_img");

    let lazyloadTimeout;


    function lazyload() {
        if (lazyloadTimeout) {
            clearTimeout(lazyloadTimeout); //annule le délais de setTimeout précédent
        }

        lazyloadTimeout = setTimeout(function () {
            let scrollTop = window.pageYOffset;
            lazyImages.forEach(function (img) {
                if (img.parentNode.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.style.backgroundColor = "transparent";
                }
            });
            if (lazyImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
            }
        }, 50);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);

}