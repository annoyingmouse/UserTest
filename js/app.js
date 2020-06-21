import Utils from './services/Utils.js'

import Navbar from './components/Navbar.js'
import Home from './pages/Home.js'
import Table from './pages/Table.js'
import Tables from './pages/Tables.js'
import Error404 from './pages/Error404.js'

const routes = {
  '/': Home,
  '/tables': Tables,
  '/table': Table
}
const router = async () => {
  // Lazy load view element:
  const header = document.getElementById('header_container');
  const content = document.getElementById('page_container');

  // Render the Header of the page
  header.innerHTML = await Navbar.render();
  await Navbar.after_render();

  // Get the parsed URl from the address bar
  let request = Utils.parseRequestURL()

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
  let page = routes[parsedURL] ? routes[parsedURL] : Error404
  content.innerHTML = await page.render();
  await page.after_render();
}
// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);