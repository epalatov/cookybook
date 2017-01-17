var dropDownMenu = document.getElementById('drop-down-top-menu');
function toggle(){
  dropDownMenu.classList.toggle('hidden');
  dropDownMenu.classList.toggle('visible');
}
document.querySelector('#menu-btn').addEventListener("click", toggle)

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
})
