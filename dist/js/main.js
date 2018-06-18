;(function(){
    'use strict';

    // Referencia ao elemento 'html'
    var html = document.querySelector('html');

    // variavel.objeto.medoto('classe')
    html.classList.remove('no-js');
    
    html.classList.add('js');
}())