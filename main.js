const root = document.querySelector('body');

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
                createCards(nfts, next, previous);
            })
            .then(function() {
                getFavoris();
            })
            .catch(function(error) {
                console.log(error);
            });
    } catch (e) {
        console.log(e);
    }
}

async function unNft() {
    try {
        const url = `https://awesome-nft-app.herokuapp.com/nft/${id}`;

        fetch(url)
            .then((resp) => resp.json())
            .then(function(unNft) {
                createCard(unNft);
            })
            .catch(function(error) {
                console.log(error);
            });
    } catch (e) {
        console.log(e);
    }
}

async function carousel() {
    try {
        const url = 'https://awesome-nft-app.herokuapp.com/';

        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                let nfts = data.assets;
                createCardsCarousel(nfts);
            })
            .then(function() {
                getFavoris();
            })
            .catch(function(error) {
                console.log(error);
            });
    } catch (e) {
        console.log(e);
    }
}

function createElement(tag, config, parent = null) {
    const {
        text,
        classe,
        color,
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
    if (!parent) {
        root.appendChild(element);
    } else {
        parent.appendChild(element);
    }
    return element;
}

function createCards(data, next, previous) {
    const divNfts = createElement('div', {
        classe: 'nfts',
        display: 'flex',
        flexFlow: 'wrap',
        placeContent: 'space-evenly'
    });
    data.forEach(el => {
        if (root.classList.contains('home')) {
            mySelect = createElement('option', {
                text: `<select id="listOfCreator" name="creators">
            <option value="${el.creator.username}" >${el.creator.username}</option>
    </select>`,
            }, myListOfcreator);

            mySelectNumberOfSale = createElement('option', {
                text: `<select id="listOfSale" name="sales">
            <option value="${el.sales}" >${el.sales}</option>
    </select>`,
            }, myListOfSales);
        }
        myCard = createElement('article', {
            width: '30%',
            display: 'flex',
            flexFlow: 'column',
            placeContent: 'space-between'
        }, divNfts);
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
            text: 'En savoir plus',
            href: `/nft.html?id=${el.id}`,
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
    createElement('button', {
        text: 'Précedent',
        event: `nfts(${previous})`
    }, divNfts);
    createElement('button', {
        text: 'Suivant',
        event: `nfts(${next})`
    }, divNfts);
}

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

function createCardsCarousel(data) {
    data.slice(0, 10).forEach(el => {
        myCard = createElement('article', {
            width: '30%',
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
            text: 'En savoir plus',
            href: `/nft.html?id=${el.id}`,
            role: "button"
        }, myCardFooter);
        // createElement('p', {
        //     classe: 'like',
        //     event: `favorisNft(fav_${el.id})`,
        //     identifiant: `fav_${el.id}`,
        //     margin: '0',
        //     text: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
        // }, myCardFooter);
    })
}

function createCardsFav(data) {
    data.forEach((el, index) => {
        console.log(el.image);
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
            text: 'En savoir plus',
            href: `/nft.html?id=${el.id}`,
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
console.log(favoris);

// function favorisNft(nft) {
//     // console.log(nft.namedItem("id"));
//     nft = nft.getAttribute("id");
//     let bool = 0;
//     favoris.forEach(function(element) {
//         if (element == nft) {
//             bool = 1;
//             let index_favoris = favoris.indexOf(element);
//             favoris.splice(index_favoris, 1);
//         }
//     })

//     if (bool == 0) {
//         favoris.push(nft);
//         document.querySelector(`#${nft} svg`).style.fill = "black";
//         document.querySelector(`#${nft}`).classList.add("favoris");

//     } else {
//         document.querySelector(`#${nft} svg`).style.fill = "none";
//         document.querySelector(`#${nft}`).classList.remove("favoris");
//         document.querySelector(`#${nft}`).parentNode.parentNode.style.display = "none";

//     }
//     localStorage.setItem('like', JSON.stringify(favoris));
//     console.log(favoris);
// }

function favorisNft(id, image, name) {
    let nft = {
        id: id,
        image: image,
        name: name
    }

    let bool = 0;
    favoris.forEach(function(element) {
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
    console.log(favoris);
}

function getFavoris() {
    if (localStorage.getItem('like')) {
        let fav = localStorage.getItem('like');
        favoris = JSON.parse(fav);
        console.log(favoris);
        favoris.forEach(function(element) {
            if (document.querySelector(`#fav_${element.id} svg`)) {
                document.querySelector(`#fav_${element.id}`).classList.add('favoris');
                document.querySelector(`#fav_${element.id} svg`).style.fill = "black";
            }
        })
    };
}

function favorisNftFav(id, image, name) {
    let nft = {
        id: id,
        image: image,
        name: name
    }

    favoris.forEach(function(element) {
        if (element.id == nft.id) {
            let index_favoris = favoris.indexOf(element);
            favoris.splice(index_favoris, 1);
        }
    });

    document.querySelector(`#fav_${nft.id} svg`).style.fill = "none";
    document.querySelector(`#fav_${nft.id}`).classList.remove("favoris");
    document.querySelector(`#fav_${nft.id}`).parentNode.parentNode.style.display = "none";

    localStorage.setItem('like', JSON.stringify(favoris));
    console.log(favoris);
}