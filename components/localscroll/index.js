/**
 * @author Vadim Sikora
 * 
 * Applies to pseudo links that scroll to
 * some id in the document (as ooposed to jumping there)
 *
 * default scroll-time: 300ms
 * default offset: -20px
 *
 * override through data-components attribute
 */
define(['jquery'], function ($) {
    $(document).on('click', '.js-localscroll', function (e) {
        e.preventDefault();

        var $this = $(this),
            href = $this.attr('href'),
            data = $this.data('components') ? $this.data('components').localscroll : undefined,
            defaults = {
                offset: -20,
                scrollTime: 300
            },
            options = $.extend(defaults, data),
            //TODO check for existense of the elemnt maybe
            top = $(href).offset().top + parseInt(options.offset, 10);

        $('html, body').animate({
            scrollTop: top
        }, options.scrollTime, function () {
            window.location.hash = href;
        });
    });
});
