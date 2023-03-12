import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
export function lightBox(){
let lightbox = new SimpleLightbox('.gallery a', {
  spinner: true,
  enableKeyboard: true,
  captionsData: "alt",
  captionDelay: 250,
});

lightbox.on((e)=>	e.preventDefault());
lightbox.refresh();
}