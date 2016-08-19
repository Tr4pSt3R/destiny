function viewport(){var e=window,i="inner";return"innerWidth"in window||(i="client",e=document.documentElement||document.body),{width:e[i+"Width"],height:e[i+"Height"]}}function initialise_main_menu_horizontal_functionality(){var e=$("#main-menu");e.hasClass("main_menu_horizontal_functionality")||(e.addClass("main_menu_horizontal_functionality").removeClass("main_menu_mobile_functionality"),$("#main-menu li.menu-item").removeClass("active"),$("#main-menu li.menu-item .sub-menu:visible").hide(),$("#main-menu").show(),$("#main-menu li.menu-item > a").off(),$("#main-menu > li.menu-item").hover(function(){$(this).addClass("active"),$(this).children(".sub-menu").fadeIn()},function(){$(this).removeClass("active"),$(this).children(".sub-menu").fadeOut("fast")}),$("#main-menu li.menu-item .sub-menu").hover(function(){var e=viewport().width;$(this).show(),$(this).parent(".menu-item").addClass("active"),$(this).children(".menu-item").hover(function(){var i=$(this).offset().left+$(this).width()+$(this).width();i>e?$(this).children(".sub-menu").removeClass("menu_on_the_right").addClass("menu_on_the_left"):$(this).children(".sub-menu").removeClass("menu_on_the_left").addClass("menu_on_the_right"),$(this).addClass("active"),$(this).children(".sub-menu").fadeIn().css({"z-index":"105"}),$(this).parents(".sub-menu").css({"z-index":"100"})},function(){$(this).removeClass("active"),$(this).children(".sub-menu").fadeOut("fast")})},function(){$(this).parent(".menu-item").hover(function(){$(this).addClass("active"),$(this).children(".sub-menu").fadeIn()},function(){$(this).removeClass("active"),$(this).children(".sub-menu").fadeOut("fast")})}))}function initialise_tablet_mainmenu_submenu_fix(){$("#main-menu li.menu-item > a").click(function(e){if(jQuery.browser.mobile&&viewport().width>window.xs_screen_max){var i=$(this).parent(".menu-item").find(".sub-menu");if(i.length>0&&!i.hasClass("active"))return e.preventDefault(),!1}})}function initialise_main_menu_mobile_functionality(){var e=$("#main-menu");e.hasClass("main_menu_mobile_functionality")||(e.addClass("main_menu_mobile_functionality").removeClass("main_menu_horizontal_functionality"),$("#main-menu li.menu-item").removeClass("active"),$("#main-menu li.menu-item .sub-menu").hide(),$("#main-menu").hide(),$("#mobile-menu-icon").removeClass("active"),$("#mobile-menu-icon span").removeClass("glyphicon-remove").addClass("glyphicon-th"),$("#main-menu li.menu-item").off(),$("#main-menu li.menu-item .sub-menu").off(),$("#mobile-menu-icon").off(),$("#mobile-menu-icon").click(function(e){return $("#main-menu").is(":visible")&&$(this).hasClass("active")?($("#main-menu").slideUp("fast"),$("#main-menu .sub-menu").slideUp("fast"),$("#main-menu li.menu-item").removeClass("active"),$(this).removeClass("active"),$(this).removeClass("active").children("span").removeClass("glyphicon-remove").addClass("glyphicon-th"),e.preventDefault(),!1):($(this).addClass("active").children("span").removeClass("glyphicon-th").addClass("glyphicon-remove"),$("#main-menu").slideDown(),e.preventDefault(),!1)}),$("#main-menu li.menu-item > a").click(function(e){var i=$(this).parent("li.menu-item");if(i.children(".sub-menu").length>0){if(!i.children(".sub-menu").is(":visible"))return i.children(".sub-menu").slideDown("",function(){return i.addClass("active"),e.preventDefault(),!1}),e.preventDefault(),!1;if("#"==$(this).attr("href"))return i.find(".sub-menu:visible").slideUp("fast",function(){return i.removeClass("active"),i.find(".sub-menu li.menu-item").removeClass("active"),e.preventDefault(),!1}),e.preventDefault(),!1}}))}function initialise_submenu_functionality(){$(".sidebar-menu li.menu-item > a").click(function(e){var i=$(this).parent("li.menu-item");if(i.children(".sub-menu").length>0){if(!i.children(".sub-menu").is(":visible"))return i.children(".sub-menu").slideDown("",function(){return i.addClass("active"),$(this).parent(".menu-item").siblings().find(".sub-menu:visible").slideUp("fast",function(){return $(this).parent(".menu-item").removeClass("active"),e.preventDefault(),!1}),e.preventDefault(),!1}),e.preventDefault(),!1;if("#"==$(this).attr("href"))return i.find(".sub-menu:visible").slideUp("fast",function(){return i.removeClass("active"),i.find(".sub-menu li.menu-item").removeClass("active"),e.preventDefault(),!1}),e.preventDefault(),!1}})}function main_menu_fixed_at_top_on_scroll(e){var i=$("header:first-of-type");if(0==i.length)return!1;var t=i.attr("data-menu-fixed-at-top-on-scroll"),a=$("header #main-menu-container");if(0==a.length)return!1;var n=$(document).scrollTop(),s=i.attr("data-original-top-offset"),r=i.attr("data-original-header-height");(void 0===s||isNaN(s)||void 0===r||isNaN(r)||1==e)&&(i.removeClass("fixed-at-top"),$(".outer-container").css({"padding-top":""}),s=a.offset().top,r=i.innerHeight(),i.attr("data-original-top-offset",s),i.attr("data-original-header-height",r)),"true"==t&&n>s||viewport().width<window.xs_screen_max?(i.addClass("fixed-at-top"),$(".outer-container").css({"padding-top":r+"px"}),toggle_scroll_to_mobile_main_menu(viewport().width<window.xs_screen_max?"enable":"disable")):(i.removeClass("fixed-at-top"),$(".outer-container").css({"padding-top":""}),toggle_scroll_to_mobile_main_menu("disable"))}function toggle_scroll_to_mobile_main_menu(e){var i=$("#main-menu");if(i.css({"overflow-y":"visible",height:"auto"}),"enable"==e){var t=$(document).scrollTop(),a=$("#main-menu").offset().top,n=a-t;(0>n||isNaN(n))&&(n=60);var s=viewport().height-(n+10);i.css({"overflow-y":"auto","max-height":s+"px"})}}function set_equal_heights_to_list_items(){var e=$(".equal-height");e.each(function(){var e=$(this).find(".item");if(e.each(function(){$(this).find(".item-content").css({height:"auto"})}),viewport().width>window.xs_screen_max){var i=[];e.each(function(){i.push($(this).find(".item-content").height())});var t=Math.max.apply(Math,i);e.each(function(){$(this).find(".item-content").height(t)})}})}function set_equal_heights_to_section_columns(){var e=$(".horizontal-section-container");e.each(function(){$(this).find(".row").first().children("*[class*='col-']").not("*[class*='-12']").css({"min-height":"1px"})}),$("body").hasClass("isolated-sections")&&viewport().width>window.xs_screen_max&&e.each(function(){var e=$(this).find(".row").first().children("*[class*='col-']").not("*[class*='-12']");if(e.length>1){var i=[];e.each(function(){i.push($(this).height())});var t=Math.max.apply(Math,i);e.each(function(){$(this).css({"min-height":t+"px"})})}})}function fade_in_gallery_images(){var e=$(".gallery-grid");e.each(function(){var e=$(this);"true"==e.attr("data-gallery-hidden-on-page-load")&&(e.find(".gallery-loader").fadeOut("fast"),e.find(".gallery-item").animate({opacity:1},1e3))})}function add_clear_items_to_container_rows(e,i){if(void 0===e||0==e.length||void 0===i)return!1;var t=e.children(".item");if(0==t.length)return!1;e.find(".clearfix_item").remove();var a=i;e.find(".item:nth-of-type("+a+"n+"+a+")").after('<hr class="clearfix_item clearfix" />')}function go_to_top_visibility(){var e=$("#go-to-top");if(e.length>0){var i=$(document).scrollTop();i<.5*viewport().height?e.removeClass("active"):e.addClass("active")}}function scroll_to_top(e){return void 0!==e&&e.preventDefault(),$("html, body").stop().animate({scrollTop:0},1500,"easeInOutCubic",function(){$("#go-to-top").removeClass("active")}),!1}function validate_and_submit_forms(e){var i=void 0!==e&&e.length>0?e:$("form.validate-form");i.each(function(){var e=$(this);e.find(".validate-field").each(function(){$(this).change(function(){if($(this).siblings(".alert").remove(),""!=$(this).val().trim()){var i=validate_fields(e,$(this));if(i.length>0&&void 0!==i[0].message&&""!=i[0].message&&"success"!=i[0].message){var t='<div class="alert">'+i[0].message+"</div>";$(this).after(t),$(this).siblings(".alert").fadeIn("fast")}}})}),e.find("#form-captcha-refresh").click(function(){var i=(new Date).getTime();e.find("#form-captcha-img").replaceWith('<img id="form-captcha-img" src="php/form_captcha/captcha_img.php?t='+i+'" class="img-responsive" title="Reload" style="display:none">'),e.find("#form-captcha").val(""),setTimeout(function(){e.find("#form-captcha-img").show()},500)}),e.submit(function(i){i.preventDefault(),$(this).find(".form-loader").fadeIn("fast");var t=$(this).attr("action");if(void 0===t&&""==t)return!1;$(this).find(".alert").remove(),$(this).find(".form-general-error-container").empty();var a=!1;return $(this).find(".validate-field").each(function(){var i=validate_fields(e,$(this));if(i.length>0&&void 0!==i[0].message&&""!=i[0].message&&"success"!=i[0].message){var t='<div class="alert">'+i[0].message+"</div>";$(this).after(t),$(this).siblings(".alert").fadeIn("fast"),a=!0}}),1==a?($(this).find(".form-loader").fadeOut("fast"),!1):void $.ajax({type:"POST",url:t,data:$(this).serialize(),dataType:"html",success:function(i){e.find(".form-loader").fadeOut("fast");var t="success"==i?!0:!1,a="captcha"==i?!1:!0,n="";switch(i){case"success":n="Form submitted successfully.";break;case"captcha":n="Incorrect CAPTCHA.";break;case"incomplete":n="Please fill in all required fields.";break;case"error":n="An error occured. Please try again later."}var s='<div class="alert ';s+=1==t?"success":"error",s+='">'+n+"</div>",a?e.find(".form-general-error-container").html(s).fadeIn("fast",function(){$(this).delay(1e4).fadeOut("fast",function(){$(this).html("")})}):(e.find("#form-captcha").parents(".form-group").append(s),e.find("#form-captcha").parents(".form-group").find(".alert").fadeIn("fast"));var r=(new Date).getTime();e.find("#form-captcha-img").replaceWith('<img id="form-captcha-img" src="php/form_captcha/captcha_img.php?t='+r+'" class="img-responsive" title="Reload" style="display:none">'),e.find("#form-captcha").val(""),setTimeout(function(){e.find("#form-captcha-img").show()},500),1==t&&e.find(".form-control").val("")},error:function(){e.find(".form-loader").fadeOut("fast");var i='<div class="alert">An error occured. Please try again later.</div>';e.find(".form-general-error-container").html(i).fadeIn("fast")}})})})}function validate_fields(e,i){if(void 0!==e&&e.length>0){var t=void 0!==i&&i.length>0?i:e.find(".validate"),a=new Array;return t.each(function(){var e=$(this).attr("data-validation-type"),i=$(this).hasClass("required"),t=$(this).val().trim(),n=new Array;n.field_object=$(this),n.message="success",1!=i||""!=t&&null!==t&&void 0!==t||(n.message="This field is required"),"string"==e&&""!=t&&null!==t&&void 0!==t?null==t.match(/^[a-z0-9 .\-]+$/i)&&(n.message="Invalid characters found."):"email"==e&&""!=t&&null!==t&&void 0!==t?null==t.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)&&(n.message="Please enter a valid email address."):"phone"==e&&""!=t&&null!==t&&void 0!==t&&null==t.match(/^\(?\+?[\d\(\-\s\)]+$/)&&(n.message="Invalid characters found."),a.push(n)}),a}}function mainmenu_search_icon(){var e=$("#search-container");if(0==e.length)return!1;1==$("#main-menu-container #search-container").length&&$("#main-menu-container #main-menu").addClass("search-icon-active");var i=$("#search-container #search-icon"),t=($("#search-container #search-input"),$("#search-container #search-close"));$("html").click(function(){var e=$("#search-container #search-input");i.hasClass("active")&&e.is(":visible")&&(e.slideUp("fast"),i.removeClass("active"))}),i.click(function(e){e.preventDefault(),e.stopPropagation();var t=$("#search-container #search-input");i.hasClass("active")&&t.is(":visible")?(t.slideUp("fast"),i.removeClass("active")):(t.slideDown("fast"),i.addClass("active"))}),t.click(function(e){e.preventDefault(),e.stopPropagation();var i=$("#search-container #search-input"),t=$("#search-container #search-icon");t.hasClass("active")&&i.is(":visible")&&(i.slideUp("fast"),t.removeClass("active"))}),$("#search-container #search-input").click(function(e){e.stopPropagation()})}window.xs_screen_max=768,window.sm_screen_max=992;