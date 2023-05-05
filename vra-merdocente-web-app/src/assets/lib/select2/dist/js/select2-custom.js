console.log('%c[DEBUG]: Load select2-custom >>>', 'background: #28a745; color: #FFFFFF; padding: 2px 5px;');

/* jQuery(function ($) {
	$('.select2').select2({
		theme: "bootstrap-5",
	});
}); */

(function($){

    $(window).on('load', function() {
      $('.select2').select2({
				theme: "bootstrap-5",
			});
    });

})(jQuery);