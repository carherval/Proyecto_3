import './stat.css'

export const stat = (statIcon, statTitle, statValue) => {
  return `<span class="stat" title="${statTitle}"><img src="${statIcon}" alt="${statTitle}" /><span>${statValue}</span></span>`
}
