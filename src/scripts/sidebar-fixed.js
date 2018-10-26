!((document, $) => {
    'use strict'

    var $window = $(window),
        $document = $(document),
        $content = $('.content'),
        $sidebar = $('.sidebar'),
        $sidebarInner = $('.sidebar-inner'),
        $menu = $('.sidebar-menu'),
        $childMenu = $('.sidebar-menu-child'),
        $menuItem = $menu.find('.sidebar-menu-item'),
        $childMenuItem = $childMenu.find('.sidebar-menu-item'),
        ref = $menu.data('sidebar-ref'),
        prevScrollTop;

    // Fix sidebar position
    function fixSidebar() {
        if ($sidebarInner.outerHeight() < $content.outerHeight()) {
            $sidebar.addClass('sidebar-fixed');
            if ($sidebarInner.outerHeight() > $window.height()) {
                $sidebar.height($window.height());
            }
            else {
                $sidebar.height('auto');
            }
        }
        else {
            $sidebar.removeClass('sidebar-fixed');
            $sidebar.height('auto');
        }
    }

    // Activate current page item
    $menuItem.eq(ref).addClass('sidebar-active');

    // Append child menu.
    if ($childMenu.length) {
        $childMenu.show().appendTo($menuItem.eq(ref));
    }

    // Fixed sidebar
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $window.on('resize', fixSidebar).trigger('resize');
    }

    // Toggle menu JS used by the mobile menu component.
    // These JS classes must be added to both the menu
    // and menu button.
    var $menu = $('.js-menu-toggle');
    var $menuButton = $('.js-menu-toggle-button');

    // Handle menu button clicking
    // This needs jQuery update to run.
    $menuButton.on('click', function (event) {
        var $self = $(this);

        // Toggle classes on menu and menu button.
        $self.toggleClass('site-menu__button--active');

        $self
            .parent()
            .parent()
            .find('.js-menu-toggle')
            .toggleClass('site-menu--expanded');
    });

    // Show markup when the button is clicked.
    $('.js-show-markup').on('click', function () {
        var $self = $(this);

        // Grab the inner html of the next available template tag.
        var markup = $self.next('template').html();

        // Replace the button with the markup.
        $self.replaceWith(markup);

        // Syntax hightlignting with Rainbow.js
        Rainbow.color();
    });

    var fullWidth = function (appendUrl) {
        // Remove the page wrapper padding.
        $('.wrapper').css({ 'padding': 0 });
        // Kill the sidebar.
        $('.sidebar').remove();
        // Remove left margin on main content.
        $('.content').css({ 'margin': '0 auto', 'max-width': '1200px' });
        // Remove padding from example component.
        $('.sidebar-modifier-example').css({
            'padding-left': 0,
            'padding-right': 0
        });

        // Append to URL if this is fired via button click.
        if (appendUrl === true) {
            history.pushState('', '', '?full=true');
        }
    };

    // Kill container padding and the sidebar when the button is clicked.
    $('.js-full-width').on('click', function () {
        var appendUrl = true;
        fullWidth(appendUrl);
    });

    // Pass in a parameter name and return that parameter's value.
    function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    // If "?full=true" exists in the URL call the fullWidth function.
    if (getParameterByName('full') === 'true') {
        var appendUrl = false;
        fullWidth(appendUrl);
    }
})(document, jQuery)