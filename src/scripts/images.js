document.addEventListener('DOMContentLoaded', () => {
    let terms = document.getElementById('terms-title');
    let termsList = document.getElementById('terms-list')

    terms.addEventListener('mouseover', () => {
        terms.classList.add('terms-title-hide')
        termsList.classList.add('terms-list-show');
    })

    termsList.addEventListener('mouseout', () => {
        termsList.classList.remove('terms-list-show');
        terms.classList.remove('terms-title-hide');
    })

    let firstImage = document.getElementById('first-img');
    firstImage.addEventListener('mouseover', () => {
        let firstImagetext = document.getElementById('first-img-text');
        firstImagetext.classList.add('first-img-text-show')
    })

    firstImage.addEventListener('mouseout', () => {
        let firstImagetext = document.getElementById('first-img-text');
        firstImagetext.classList.remove('first-img-text-show')
    })

    let secondImage = document.getElementById('second-img');
    secondImage.addEventListener('mouseover', () => {
        let secondImagetext = document.getElementById('second-img-text');
        secondImagetext.classList.add('second-img-text-show')
    })

    secondImage.addEventListener('mouseout', () => {
        let secondImagetext = document.getElementById('second-img-text');
        secondImagetext.classList.remove('second-img-text-show')
    })
})
