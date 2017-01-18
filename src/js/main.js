$(document).ready(function() {
  //Show ingridiens in the search form
  $('.ingridients-tags-search').hide();
  $('.search-by-ingridients-btn').click(function(){
    $('.ingridients-tags-search').slideToggle("fast");
  });

  //Add ingridient in the search form
  var tagSearchResult = "";
  $('#tags-search-list').children().click(function(){
    var CurTag = $(this).text();
    tagSearchResult = tagSearchResult + CurTag + " ";
    $("#search-field").val(tagSearchResult);
    $('#search-field').on('input', function() {
      tagSearchResult = $('#search-field').val();
    });
  })

  //Search by ingridients
  $('[data-toggle="tooltip"]').tooltip();

  //Search popup
  $('.popup-with-form').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',

    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      beforeOpen: function() {
        if($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#search-field';
        }
      }
    }
  });
});

//Main menu dropdown
var dropDownMenu = document.getElementById('drop-down-top-menu');
function toggle(){
  dropDownMenu.classList.toggle('hidden');
  dropDownMenu.classList.toggle('visible');
}
document.querySelector('#menu-btn').addEventListener("click", toggle)
