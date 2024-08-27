import './foto.css'
import { stat } from './stat/stat'

export const foto = (photo, fecha) => {
  return `<article id="foto_${photo.id}" class="flex container foto" title="${
    photo.alt_description
  }" style="background-image: url('${
    photo.urls.regular
  }');"><div class="container estadisticas oculto">${stat(
    'assets/images/camara.png',
    'Descargas',
    photo.downloads == undefined ? 0 : photo.downloads
  )}${stat(
    'assets/images/corazon.png',
    'Favoritos',
    photo.likes
  )}</div><div class="visitar oculto" title=""><a href="${
    photo.links.download
  }" title="Ver imagen. Abre nueva ventana" target="_blank">Visitar</a></div><a class="flex container" href="${
    photo.user.links.html
  }" title="Perfil de ${
    photo.user.name
  }. Abre nueva ventana" target="_blank"><div id="usuario_${
    photo.id
  }" class="flex container usuario" style="border: solid 0.4rem ${
    photo.color
  }; background-image: url('${
    photo.user.profile_image.large
  }');"></div></a><div class="flex container nombre_fecha" title=""><span>${
    photo.user.name
  }</span><span class="fecha" title="Fecha de subida"><img src="assets/images/upload.png" alt="Fecha de subida" />${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}</span></div></article>`
}
