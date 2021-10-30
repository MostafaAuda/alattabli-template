/***********************************************
 * Example starter JavaScript for disabling form submissions if there are invalid fields
 ***********************************************/
 (function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

/*--------------------------------------------------------------------------------------------------------------------*/
//Phone Validation

$(function () {
    
  $('.phone_validation').each(function () {
    // element == this
    var phoneInput = $(this)
    phoneInput.attr('minlength', '11').attr('maxlength', '11').attr('onpaste', 'disablePaste(event)');

    phoneInput.on('keypress', function (e) {
      var a = [];
      var k = e.which;
  
      for (i = 48; i < 58; i++)
          a.push(i);
  
      if (!(a.indexOf(k)>=0))
          e.preventDefault();
    });
  });

});

function disablePaste(event) {
  event.preventDefault();
}

/***********************************************
 * Global SCRIPTS
 ***********************************************/
$(function () {

	'use strict';

  /*--------------------------------------------------------------------------------------------------------------------*/
  //To Top

  $("#back2Top").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  /*--------------------------------------------------------------------------------------------------------------------*/
  //Current Year
  
  let date =  new Date().getFullYear();
  $('.current_year').text(date);

  /*--------------------------------------------------------------------------------------------------------------------*/
  //Team Dynamic Height

  let th = $('.ourteam__card').width();
  $('.ourteam__card_img').css({'height': th + 'px'});

  /*--------------------------------------------------------------------------------------------------------------------*/
  //Common Figure Height

  let cfw = $('.common_figure__style_img').width();
  let cfw_currentHeight = cfw/2;
  $('.common_figure__style_img').css({'height': cfw_currentHeight + 'px'}).css({'margin-top': -cfw_currentHeight/2 + 'px'});
  $('.common_figure__margin').css({'margin-top': cfw_currentHeight/2 + 120 + 'px'});
  $('.common_figure__style1').css({'min-height': cfw_currentHeight + 'px'});

  /*--------------------------------------------------------------------------------------------------------------------*/
  //Policy 

  $('.ourpolicy__single:nth-child(2n + 1) .common_figure__style1').addClass('common_figure__revert');

});

/***********************************************
 * INIT THIRD PARTY SCRIPTS
 ***********************************************/
$(function () {

	'use strict';

  // AOS animation
  AOS.init({
    // disable: 'mobile',
    // offset: 120,
    once: true,
    duration: 1000,
    easing: 'ease',
  });

});

/***********************************************
 * LANGUAGE SCRIPTS
 ***********************************************/
$(function () {

	'use strict';
  
  $('.for__lang').on('click', function() {
    var buttonDIRLang = $(this).data('dir');
    localStorage.setItem('direction', buttonDIRLang);
    websiteLang(buttonDIRLang);
    window.location.reload();
  });
  
  let enBootstrapCss = "assets/css/plugins/bootstrap.min.css"; 
  
  let arBootstrapCss = "assets/css/plugins/bootstrap.rtl.min.css";
  
  var _direction;
  
  var _localLang = localStorage.getItem('direction');
  
  websiteLang(_localLang);

  function websiteLang(dir) {
    $("html").attr("dir", dir);
    if (dir == 'rtl') {
      $("html").attr("lang", 'ar');
      $("#changeBootstrapCss").attr("href", arBootstrapCss);
      $('.en').removeClass('hide_lang');
      _direction = 'rtl';
    } else {
      $("html").attr("lang", 'en');
      $("#changeBootstrapCss").attr("href", enBootstrapCss);
      $('.ar').removeClass('hide_lang');
      _direction = 'ltr';
    }
  }
  
});

/***********************************************
 * NAVBAR SCRIPTS
 ***********************************************/
$(function () {

	'use strict';

  $(window).scroll(function() {
    if ($(window).scrollTop() > 700) {
      $('#back2Top').slideDown();
    } else {
      $('#back2Top').slideUp();
    }
  });
  
});

/***********************************************
 * Countdown SCRIPTS
 ***********************************************/
$(function () {
  var fx = function fx() {
  $(".animated__number").each(function (i, el) {
      var data = parseInt(this.dataset.n, 10);
      var props = {
          "from": {
              "count": 0
          },
              "to": { 
              "count": data
          }
      };
      $(props.from).animate(props.to, {
          duration: 5000 * 1,
          step: function (now, fx) {
              $(el).text(Math.ceil(now));
          },
          complete:function() {
              if (el.dataset.sym !== undefined) {
                el.textContent = el.textContent.concat(el.dataset.sym)
              }
          }
      });
  });
  };
  
  var reset = function reset() {
      if ($(this).scrollTop() > 90) {
          $(this).off("scroll");
        fx()
      }
  };
  
  $(window).on("scroll", reset);
});

/***********************************************
 * Swiper SCRIPTS
 ***********************************************/
$(function () {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    centeredSlides: true,
    speed: 500,
    spaceBetween: 12,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });
})

/***********************************************
 * FancyBox SCRIPTS
 ***********************************************/
$(function () {
  Fancybox.bind("[data-fancybox]", {
    mainClass: 'fancy--fullscreen_nav'
  });  
})
