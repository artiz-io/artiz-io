$(document).ready(function() {

  $('.collapse').on('hidden.bs.collapse', function() {

    $(this).parent().removeClass('active');

  })

  $('.collapse').on('show.bs.collapse', function() {

    $(this).parent().addClass('active');

  })

});