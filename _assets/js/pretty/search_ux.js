!(function($, window, document) {
  $("#search-input").on("keyup keypress", function(e) {
    var key = e.keyCode || e.which;
    if (key === 13) {
      e.preventDefault();
      return false;
    }
    if (e.target.value) {
      $("header, ul li").addClass("d-none d-md-block");
      // $("#posts, #pagination, #archive").addClass("d-none");
      $("section, #pagination").addClass("d-none");
      $("#search-results").removeClass("d-none");
    } else {
      $("header, ul li").removeClass("d-none d-md-block");
      $("section, #pagination").removeClass("d-none");
      // $("#posts, #pagination, #archive").removeClass("d-none");
      $("#search-results").addClass("d-none");
    }
  });
})(window.jQuery, window, document);
