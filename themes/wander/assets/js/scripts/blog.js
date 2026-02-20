

$(function () {
  var min = new Date();
  //max = new Date(min.getFullYear(), min.getMonth() + 6, min.getDate());


    $('.blog').slick({
      dots: false,
      autoplay: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      //variableWidth: true,
      responsive: [
        {
          breakpoint: 920,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });


});
