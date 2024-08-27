import './header.css'

export const header = (logoSrc, logoTitle) => {
  return `<div class="flex container cabecera"><a href="index.html" title="${logoTitle}"><img src="${logoSrc}" alt="${logoTitle}" /></a><form action="index.html" method="post" onsubmit="javascript:return false"><fieldset><legend class="oculto">Buscador</legend><label class="oculto" for="buscador">Buscar</label><div class="flex container buscador"><input class="lupa" type="image" src="assets/images/lupa.png" alt="Buscar" title="Buscar" /><input type="text" id="buscador" name="buscador" placeholder="Buscar" /></div></fieldset></form></div><div class="no-res oculto"></div>`
}
