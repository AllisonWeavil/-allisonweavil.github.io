document.addEventListener('DOMContentLoaded', function () {
    const imgArray = document.querySelectorAll('.gallery-image');
    let lastClickedImage = null;

    imgArray.forEach(image => {
        image.addEventListener('click', function () {
            toggleImageSize(image);
        });
    });

    function toggleImageSize(clickedImage) {
        
        if (lastClickedImage && lastClickedImage !== clickedImage) {
            lastClickedImage.classList.remove('big');
        }

       
        clickedImage.classList.toggle('big');
        
        
        lastClickedImage = clickedImage;
    }
});

const imgArray = document.querySelectorAll('.gallery-image');
let lastClickedImage = null;

imgArray.forEach(image => {
    image.addEventListener('click', function () {
        toggleImageSize(image);

       
    });
});

