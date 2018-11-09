// test/back-to-top.test.js
'use strict';

describe('Expect to apply class when scroll reaches 200px', () => {
  
  test('Back to top', () => {
    // Set up our document body 
    
    // require jQuery before other files 
    const $ = require('jquery');

    // neded when using IFFE with (jQuery) 
    window.jQuery = $;
    
    var scrollHandler = require('../src/scripts/back-to-top');
    
    const $html = $('html');
    
    
    // expect clear html 
    expect($html.hasClass("show-back-to-top")).toBeFalsy();
    
    
    // change conditions
    $html.scrollTop(350);
    
    // call the function
    scrollHandler(); 
    
    // check if the function above worked as expected
    expect($html.hasClass("show-back-to-top")).toBeTruthy(); 
    
    
    // apply changes to the conditions
    $html.scrollTop(150); 
    
    // call the function
    scrollHandler();
    
    // check to see the function works with the new conditions applied.
    expect($html.hasClass("show-back-to-top")).toBeFalsy();
  });
});