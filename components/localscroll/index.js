/**
Applies to pseudo links that scroll to
some id in the document (as opposed to jumping there)

    default scroll-time: 300ms
    default offset: -20px

override through data-components attribute

@module localscroll
@example <code>&lt;a href="#next-section" data-offset="-10" class="js-localscroll link link_type_pseudo"&gt;next&lt;/a&gt;</code>
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
