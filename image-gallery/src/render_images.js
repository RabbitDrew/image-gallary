export const renderImages = function (parentElement, elCreator, elRender, dataArr) {
    dataArr.forEach(imgObj => {
       const imgWrapper = elCreator('div', 'img__wrapper',undefined, undefined)
       elRender(parentElement, imgWrapper)
        const img = elCreator('img', 'image', imgObj.urls.regular, imgObj.description)
         elRender(imgWrapper, img)

    });
}