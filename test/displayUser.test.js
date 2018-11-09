// __tests__/displayUser-test.js
'use strict';

jest.mock('../src/scripts/fetchCurrentUser');

test('displays a user after a click', () => {
  // Set up our document body  we will work on this as we implement handlebars
  document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="button" />' +
    '</div>';

  // This module has a side-effect
  const $ = require('jquery');

  // prevent jQuery is undefined
  window.jQuery = $;

  // i
  require('../src/scripts/displayUser');

  const fetchCurrentUser = require('../src/scripts/fetchCurrentUser');

  // Tell the fetchCurrentUser mock function to automatically invoke
  // its callback with some data
  fetchCurrentUser.mockImplementation(cb => {
    cb({
      fullName: 'Johnny Cash',
      loggedIn: true,
    });
  });

  // Use jquery to emulate a click on our button
  $('#button').click();
  
  // Assert that the fetchCurrentUser function was called, and that the
  // #username span's inner text was updated as we'd expect it to.
  expect(fetchCurrentUser).toBeCalled();
  expect($('#username').text()).toEqual('Johnny Cash - Logged In');
});