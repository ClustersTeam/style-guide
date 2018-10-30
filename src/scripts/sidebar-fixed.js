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
        $childMenuItem = $childMenu.find('.sidebar-menu-child-item'),
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
    $menuItem.eq(ref).addClass('active');

    // Append child menu.
    if ($childMenu.length) {
        $childMenu.show().appendTo($menuItem.eq(ref));
    }

    // Fixed sidebar
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $window.on('resize', fixSidebar).trigger('resize');
    }
})(document, jQuery)