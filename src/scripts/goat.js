document.addEventListener('DOMContentLoaded', () => {
    let hoverImage = document.getElementById('goat');
    hoverImage.addEventListener('click', () => {
        hoverImage.setAttribute('src', './src/images/mj-third.jpg')
    })
})
