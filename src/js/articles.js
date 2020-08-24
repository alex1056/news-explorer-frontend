// import '../css/articles.css';

(function () {
  const cropElement = document.querySelectorAll('.card__text');
  const size = 60;
  const endCharacter = '...';
  if (window.screen.width <= 768) {
    cropElement.forEach((el) => {
      const elem = el;
      let text = el.innerHTML;

      if (el.innerHTML.length > size) {
        text = text.substr(0, size);
        elem.innerHTML = text + endCharacter;
      }
    });
  }
}());
