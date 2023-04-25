(function() {
  "use strict";
	console.log('%c[DEBUG]: Load custom-project.js >>>', 'background: #28a745; color: #FFFFFF; padding: 2px 5px;');

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
	/**
 * Easy event listener function
 */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

	/**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }


		window.addEventListener('DOMContentLoaded', event => {
		// Toggle the side navigation
		const sidebarToggle = document.body.querySelector('.toggle-sidebar-btn');
		if (sidebarToggle) {
			sidebarToggle.addEventListener('click', event => {
				event.preventDefault();
				console.log('click en el icono');
				select('body').classList.toggle('toggle-sidebar')
				//document.body.classList.toggle('sb-sidenav-toggled');
				//localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
			});
		}
	});

	/**
   * Search bar toggle
   */

	window.addEventListener('DOMContentLoaded', event => {
		// Toggle the side navigation
		const sidebarToggle = document.body.querySelector('.search-bar-toggle');
		if (sidebarToggle) {
			sidebarToggle.addEventListener('click', event => {
				event.preventDefault();
				console.log('click en el search');
				select('.search-bar').classList.toggle('search-bar-show')
				//document.body.classList.toggle('sb-sidenav-toggled');
				//localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
			});
		}
	});

	/**
   * Navbar links active state on scroll
   */
	let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)


	const selectHeader = document.getElementById('header');
  if (selectHeader) {	
    const headerScrolled = () => {
			if (window.scrollY > 100) {
				alert(Header);
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

	/**
   * Back to top button
   */
/* 	window.addEventListener('scroll', () => {
		var scrollDistance = window.scrollY;
		const backtotop = document.querySelector('.back-to-top');
		if (scrollDistance > 100) {
			backtotop.classList.add('active')
		} else {
			backtotop.classList.remove('active')
		}
	}); */

	/**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });
})();