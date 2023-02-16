let slideIndex: number = 1;
showSlides(slideIndex);

setInterval(() => {
showSlides(slideIndex += 1);
}, 4000);

function plusSlides(n: number) {
showSlides(slideIndex += n);
}

function currentSlide(n: number) {
showSlides(slideIndex = n);
}

function showSlides(n: number) {
let i: number;
const slides: HTMLCollectionOf<Element> = document.getElementsByClassName("carousel");
if (n > slides.length) {slideIndex = 1;}
if (n < 1) {slideIndex = slides.length;}
for (i = 0; i < slides.length; i++) {
(slides[i] as HTMLElement).style.display = "none";
}
(slides[slideIndex-1] as HTMLElement).style.display = "block";
}