import './style.css'
import { createApi } from 'unsplash-js'
import { header } from './src/components/header/header'
import { foto } from './src/components/foto/foto'

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY
})

// Imágenes aleatorias
const getRandomPhotos = async () => {
  try {
    const randomPhotos = await unsplash.photos.getRandom({
      count: 30
    })

    return randomPhotos.response
  } catch (error) {
    console.log(
      `Se ha producido un error al intentar obtener imágenes aleatorias de "Unsplash": ${error.message}`
    )
  }
}

// Búsqueda de imágenes mediante texto de búsqueda
const getSearchPhotos = async (searchKeywords) => {
  try {
    const searchPhotos = await unsplash.search.getPhotos({
      query: searchKeywords,
      page: 1,
      perPage: 30
    })

    return searchPhotos.response.results
  } catch (error) {
    console.log(
      `Se ha producido un error al intentar obtener imágenes de "Unsplash" mediante la búsqueda "${searchKeywords}": ${error.message}`
    )
  }
}

// Función que muestra las imágenes obtenidas
async function showPhotos(photos) {
  let query = document.getElementById('buscador').value
  const noRes = document.querySelector('.no-res')
  const divFotos = document.querySelector('.fotos')

  if (photos.length === 0) {
    noRes.classList.remove('oculto')
    noRes.innerHTML = `<p>No se encuentran imágenes para la búsqueda "${query.trim()}". Pruebe con otro tipo de búsqueda.</p><p>En su lugar, se muestran imágenes de "gatos" ;)</p>`

    photos = await getSearchPhotos('gatos')
  } else {
    noRes.classList.add('oculto')
    noRes.innerHTML = ''
  }

  document.getElementById('buscador').value = ''

  // Se ordenan las imágenes por fecha descendente
  photos.sort(
    (photo1, photo2) =>
      new Date(photo2.user.updated_at) - new Date(photo1.user.updated_at)
  )

  // Se limpia la galería de imágenes antes de mostrar las nuevas
  divFotos.innerHTML = ''

  photos.forEach((photo) => {
    const fecha = new Date(photo.user.updated_at)

    divFotos.innerHTML += `${foto(photo, fecha)}`
  })

  // Eventos de las imágenes
  const articles = document.querySelectorAll('.foto')
  articles.forEach((article) => {
    addEventListenerMouse(article, true)
    addEventListenerMouse(article, false)
  })
}

// Función para gestionar los eventos al poner el ratón encima de una imagen y al quitarlo de la misma
function addEventListenerMouse(article, mouseover) {
  article.addEventListener(mouseover ? 'mouseover' : 'mouseleave', function () {
    const children = article.childNodes

    mouseover
      ? article.classList.add('fondo_sombra')
      : article.classList.remove('fondo_sombra')
    mouseover
      ? children[0].classList.remove('oculto')
      : children[0].classList.add('oculto')
    mouseover
      ? children[0].classList.add('flex')
      : children[0].classList.remove('flex')
    mouseover
      ? children[1].classList.remove('oculto')
      : children[1].classList.add('oculto')
    mouseover
      ? children[1].classList.add('flex')
      : children[1].classList.remove('flex')
    // Div usuario dentro del enlace
    mouseover
      ? children[2].childNodes[0].classList.add('grande')
      : children[2].childNodes[0].classList.remove('grande')
  })
}

const headerTag = document.querySelector('header')
headerTag.innerHTML = `${header(
  'assets/images/pinterest.png',
  'Pinterest Async'
)}`

const photos = await getRandomPhotos()
showPhotos(photos)

// Evento para la búsqueda del formulario
document.forms[0].addEventListener('submit', async function () {
  const query = document.getElementById('buscador').value
  const photos =
    query.trim() !== '' ? await getSearchPhotos(query) : await getRandomPhotos()

  showPhotos(photos)
})
