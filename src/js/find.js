import fetchCountries from './fethcRequest';
import Notiflix from 'notiflix';
import { lightBox } from './lightbox';

const gallery = document.querySelector('.gallery')
const form = document.querySelector('.search-form');
const moreBtn = document.querySelector('.load-more')
moreBtn.style.display='none';




let page;
form.addEventListener('submit', async (e)=> {
  e.preventDefault();
  try {
    if (form.searchQuery.value.length !== 0) {
      page = 1;
      let resultOfFetch = await fetchCountries(form.searchQuery.value,page)
      if(resultOfFetch.length!==0) {
        Notiflix.Notify.success(`Hooray! We found ${resultOfFetch.length} images.`)
        moreBtn.style.display='block';
        const renderOne = resultOfFetch.map((item) => {

          return `<a href='${item.largeImageURL}'>
<div class='photo-card'>
  <img src='${item.webformatURL}' alt='${item.tags}' loading='lazy' />
  <div class='info'>
    <p class='info-item'>
      <b>Likes: ${item.likes}</b>
    </p>
    <p class='info-item'>
      <b>Views: ${item.views}</b>
    </p>
    <p class='info-item'>
      <b>Comments: ${item.comments}</b>
    </p>
    <p class='info-item'>
      <b>Downloads: ${item.downloads}</b>
    </p>
  </div>
</div>
</a>`;

        }).join('');
        gallery.innerHTML = renderOne;
        lightBox();
      }
      else{
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }

    }
  }
  catch (e){
    console.log(e)
  }

})

moreBtn.addEventListener('click',async ()=>{
  try {
    moreBtn.style.display='none';
    page++
    let newArray = await fetchCountries(form.searchQuery.value,page)

    if(newArray.length!==0){
    moreBtn.style.display='block';
      Notiflix.Notify.success(`Hooray! We found ${newArray.length} images.`)
      const renderOne = newArray.map((item) => {

        return `<a href='${item.largeImageURL}'><div class='photo-card'>
  <img src='${item.webformatURL}' alt='${item.tags}' loading='lazy' />
  <div class='info'>
    <p class='info-item'>
      <b>Likes: ${item.likes}</b>
    </p>
    <p class='info-item'>
      <b>Views: ${item.views}</b>
    </p>
    <p class='info-item'>
      <b>Comments: ${item.comments}</b>
    </p>
    <p class='info-item'>
      <b>Downloads: ${item.downloads}</b>
    </p>
  </div>
</div>
</a>`;

      }).join('');
      gallery.innerHTML = renderOne;
      lightBox();
    }
    else
    {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    }

  }
  catch (e){
    console.log(e)
  }
})



window.addEventListener('scroll',()=>{
  const { height: cardHeight } = gallery
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 200,
    behavior: "smooth",
  });
})





// window.addEventListener('scroll',async ()=>{
//   const rect = document.documentElement.getBoundingClientRect()
//   if(rect.bottom<document.documentElement.clientHeight+150)
//   {
//     try {
//       moreBtn.style.display='none';
//       page++
//       let newArray = await fetchCountries(form.searchQuery.value,page)
//
//       if(newArray.length!==0){
//         moreBtn.style.display='block';
//         Notiflix.Notify.success(`Hooray! We found ${newArray.length} images.`)
//         const renderOne = newArray.map((item) => {
//
//           return `<div class='photo-card'>
//   <img src='${item.webformatURL}' alt='${item.tags}' loading='lazy' />
//   <div class='info'>
//     <p class='info-item'>
//       <b>Likes: ${item.likes}</b>
//     </p>
//     <p class='info-item'>
//       <b>Views: ${item.views}</b>
//     </p>
//     <p class='info-item'>
//       <b>Comments: ${item.comments}</b>
//     </p>
//     <p class='info-item'>
//       <b>Downloads: ${item.downloads}</b>
//     </p>
//   </div>
// </div>`;
//
//         }).join('');
//         gallery.innerHTML = renderOne;
//         lightBox();
//       }
//       else
//       {
//         Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
//       }
//
//     }
//     catch (e){
//       console.log(e)
//     }
//   }
// })