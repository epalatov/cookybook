$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
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

var dropDownMenu = document.getElementById('drop-down-top-menu');
function toggle(){
  dropDownMenu.classList.toggle('hidden');
  dropDownMenu.classList.toggle('visible');
}
document.querySelector('#menu-btn').addEventListener("click", toggle)
