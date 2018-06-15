;(function(){
    'use strict';

    var btn = document.querySelector('.header-nav__hamburgger');
    var html = document.querySelector('html');
    var classMenu = 'menu-opened';
    var menuOpened = false;

    btn.addEventListener('click', toggleMenu);

    function toggleMenu(e){
        if(menuOpened){
            closeMenu();
        } else {
            openMenu();
        }
    }

    function closeMenu(){
        menuOpened = false;
        html.classList.remove(classMenu);
    }

    function openMenu(){
        menuOpened = true;
        html.classList.add(classMenu);
    }

}())