const  createElements = function (parentElement, elCreator, elRender, imgUrl, alt) {
    const modalSection = elCreator('section', 'main-modal', undefined, undefined) 
        elRender(parentElement, modalSection)  
    const modalWrapper = elCreator('div', 'modal__wrapper', undefined, undefined)
        elRender(modalSection, modalWrapper)
    /*img - wrapper*/
    const modalImgWrapper = elCreator ('div', 'modal-img__wrapper', undefined, undefined)
        elRender (modalWrapper, modalImgWrapper)
        const image = elCreator('img', 'modal-img', imgUrl, alt)
            elRender (modalImgWrapper, image)
    /*title - wrapper*/
    const modalDescWrapper = elCreator ('div', 'modal-desc', undefined, undefined)
        elRender (modalWrapper, modalDescWrapper)
        let modalTitle = elCreator ('h2', 'desc-title', undefined, undefined)
        if (alt === 'null') {
            modalTitle.textContent = "Image"
        }else {
            modalTitle.textContent = alt
        }
            elRender(modalDescWrapper, modalTitle) 
}

const closeModalWindow = function (modalSection) {    
    modalSection.classList.add('main-modal--close');
    setTimeout(() => {
        modalSection.remove(); 
    }, 285);
}

const addModalCloseHandler = function (modalSection) {
    modalSection.addEventListener('click', (event) => {
        if (event.target === modalSection) {
            closeModalWindow(modalSection);         }
    });
}

export function createModalWindow(parentElement, elCreator, elRender) {
    const images = document.querySelectorAll('.image');

    images.forEach(img => {
        img.addEventListener('click', () => {
            const linkImage = img.src;
            const imgDesc = img.alt;
            createElements(parentElement, elCreator, elRender, linkImage, imgDesc);
            
            const modalSection = document.querySelector('.main-modal');
            if (modalSection) {
                addModalCloseHandler(modalSection); 
            }
        });
    });     
}

//add scroll behaviour
// fix close on the bg
//adopt size of picture