$(document).ready(function () {
    $(".dangxuat").click(function (e) { 
        var isDisable = false;
        sessionStorage.setItem("isDisable", isDisable)
    });
});