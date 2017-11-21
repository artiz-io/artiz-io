$(document).ready(function() {

  // nav
  $('.navbar-nav>li>a').on('click', function() {

    $('.navbar-collapse').collapse('hide');

  });

  // countdown
  $('.countdown').countdown(new Date(new Date().getTime() + 1000 * 60 * 60 * 24 + 1000 * 10), {
      elapse: true
    })
    .on('update.countdown', function(event) {

      // show countdown
      $('.countdown').removeClass('invisible');

      // done?
      if (event.elapsed) {

        // show zero values
        $('#countdown-value-days').text('00')
        $('#countdown-value-hours').text('00')
        $('#countdown-value-minutes').text('00')
        $('#countdown-value-seconds').text('00')

      } else {

        // check if we're in the last day
        // exciting stuff
        if (event.offset.days < 1) {

          $('.show-last-day').removeClass('d-none');
          $('.hide-last-day').addClass('d-none');

        }

        $('#countdown-value-days').text((event.offset.days < 10 ? '0' : '') + event.offset.days)
        $('#countdown-value-hours').text((event.offset.hours < 10 ? '0' : '') + event.offset.hours)
        $('#countdown-value-minutes').text((event.offset.minutes < 10 ? '0' : '') + event.offset.minutes)
        $('#countdown-value-seconds').text((event.offset.seconds < 10 ? '0' : '') + event.offset.seconds)

      }

    })

  // smooth scroll
  var scroll = new SmoothScroll('a[href*="#"]:not(.ssignore)', {
    offset: -10
  });

});