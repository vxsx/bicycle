/**
 * Toggles some content by clicking on trigger
 *
 * default duration: 250ms
 * default easing: linear
 *
 * override through data-components attribute
*/
define(['jquery'], function ($) {
    $(document).on('click', '.js-toggle__trigger', function (e) {
        e.preventDefault();
        var $this = $(this),
            data = $this.data('components') ? $this.data('components').toggle : undefined,
            defaults = {
                duration: 250,
                easing: 'linear'
            },
            options = $.extend(defaults, data);
            $parent = $this.closest('.js-toggle');

        $parent.find('.js-toggle__content:first').slideToggle({
            duration: options.duration,
            easing: options.easing,
            complete: function () {
                $parent.toggleClass('js-toggle_state_closed');
            }
        });
    });
});
