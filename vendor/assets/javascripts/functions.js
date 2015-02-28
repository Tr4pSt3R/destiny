/* 
 * GLOBAL VARIABLES
 */

// these should match with the bootrstrap defined widths
window.xs_screen_max = 768;
window.sm_screen_max = 992;

/* 
 * ================================================================
 * VIEWPORT
 *
 * get actual window width/height (to match with css media queries)
 */
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

/* 
 * ================================================================
 * MAIN MENU - horizontal menu
 *
 * functionality / hover effects of horizontal menu & submenus
 */
function initialise_main_menu_horizontal_functionality()
{
    var main_menu_ul = $("#main-menu");

    // if main menu hor functionality has not been initialised yet, initialise functionality
    if (!main_menu_ul.hasClass("main_menu_horizontal_functionality"))
    {
        main_menu_ul.addClass("main_menu_horizontal_functionality").removeClass("main_menu_mobile_functionality");

        // reset styling
        $("#main-menu li.menu-item").removeClass("active");
        $("#main-menu li.menu-item .sub-menu:visible").hide();
        $("#main-menu").show();

        // reset scripts
        $("#main-menu li.menu-item > a").off();

        // level 0
        $("#main-menu > li.menu-item").hover(
          function() 
          {
            $(this).addClass("active");
            $(this).children(".sub-menu").fadeIn();
          }, 
          function() 
          {
            $(this).removeClass("active");
            $(this).children(".sub-menu").fadeOut("fast");
          }
        );  
        
        // submenus
        $("#main-menu li.menu-item .sub-menu").hover(
          function()
          {
            var page_width = viewport().width;
            $(this).show();
            $(this).parent(".menu-item").addClass("active");

            // submenu menu items
            $(this).children(".menu-item").hover(
                function()
                {
                    var left_offset = $(this).offset().left + $(this).width() + $(this).width();
                    if (left_offset > page_width)
                    {
                        $(this).children(".sub-menu").removeClass("menu_on_the_right").addClass("menu_on_the_left");
                    }
                    else 
                    {
                        $(this).children(".sub-menu").removeClass("menu_on_the_left").addClass("menu_on_the_right");
                    }
                    $(this).addClass("active");
                    $(this).children(".sub-menu").fadeIn().css({ "z-index":"105" });
                    $(this).parents(".sub-menu").css({ "z-index":"100" });
                },
                function()
                {
                    $(this).removeClass("active");
                    $(this).children(".sub-menu").fadeOut("fast");
                }
            );
            // end: submenu menu items
          }, 
          function()
          {
              $(this).parent(".menu-item").hover(
                function()
                {
                  $(this).addClass("active");
                  $(this).children(".sub-menu").fadeIn();
                }, 
                function()
                {
                  $(this).removeClass("active");
                  $(this).children(".sub-menu").fadeOut("fast");
                }
              );
          }
        );
        // end: submenus

    }
    // END: if main menu hor functionality has not been initialised yet, initialise functionality
}

/* 
 * ================================================================
 * MAIN MENU - TABLET VIEWPORT FIX - opening submenus in main menu
 *
 * when on tablet viewport, when a user clicks on a main menu item which has a submenu which is hidden,
 * prevent click default action to link, and instead open submenu
 */
function initialise_tablet_mainmenu_submenu_fix()
{
    $("#main-menu li.menu-item > a").click(function(event)
    {       
        // if on tablet viewport
        if ( jQuery.browser.mobile && viewport().width > window.xs_screen_max )
        {         
            var menu_item_submenu = $(this).parent(".menu-item").find(".sub-menu");
            // if submenu exists and is hidden
            if (menu_item_submenu.length > 0 && !menu_item_submenu.hasClass("active"))
            {               
                // stop default link action, in order for the submenu to appear
                event.preventDefault();
                return false;
            }
        }
        // end: if on tablet viewport
    });
}

/* 
 * ================================================================
 * MAIN MENU - mobile menu
 *
 * functionality / hover effects of mobile menu * submenus
 */
function initialise_main_menu_mobile_functionality()
{
    var main_menu_ul = $("#main-menu");

    // if main menu mobile functionality has not been initialised yet, initialise functionality
    if (!main_menu_ul.hasClass("main_menu_mobile_functionality"))
    {
        main_menu_ul.addClass("main_menu_mobile_functionality").removeClass("main_menu_horizontal_functionality");        

        // reset styles
        $("#main-menu li.menu-item").removeClass("active");
        $("#main-menu li.menu-item .sub-menu").hide();
        $("#main-menu").hide();
        $("#mobile-menu-icon").removeClass("active");
        $("#mobile-menu-icon span").removeClass("glyphicon-remove").addClass("glyphicon-th");

        // reset scripts
        $("#main-menu li.menu-item").off();
        $("#main-menu li.menu-item .sub-menu").off();
        $("#mobile-menu-icon").off();

        // on click of mobile menu icon
        $("#mobile-menu-icon").click(function(event)
        {
            // if submenu is visible, hide it
            if ($("#main-menu").is(':visible') && $(this).hasClass("active"))
            {
                $("#main-menu").slideUp("fast");
                $("#main-menu .sub-menu").slideUp("fast");
                $("#main-menu li.menu-item").removeClass("active")
                $(this).removeClass("active");
                $(this).removeClass("active").children("span").removeClass("glyphicon-remove").addClass("glyphicon-th");
                event.preventDefault();
                return false;
            }
            // if submenu is hidden, show it
            else
            {
                $(this).addClass("active").children("span").removeClass("glyphicon-th").addClass("glyphicon-remove");
                $("#main-menu").slideDown();
                event.preventDefault();
                return false;
            }
        });
        // end: on click of mobile menu icon

        // on click of menu item
        $("#main-menu li.menu-item > a").click(function(event)
        {
            var parent_menu_item = $(this).parent("li.menu-item");

            // if there is a submenu
            if (parent_menu_item.children(".sub-menu").length > 0)
            {
                // if submenu is visible
                if (parent_menu_item.children(".sub-menu").is(':visible'))
                {
                    // if link is empty, close submenus
                    if ($(this).attr("href") == "#")
                    {
                        parent_menu_item.find(".sub-menu:visible").slideUp("fast", function()
                        {
                            parent_menu_item.removeClass("active");
                            parent_menu_item.find(".sub-menu li.menu-item").removeClass("active");
                            event.preventDefault();
                            return false;
                        });
                        event.preventDefault();
                        return false;
                    }
                    // end: if link is empty, close submenu
                    else
                    {
                        // link href is not #, link acts normally
                    }
                }
                // end: if submenu is visible

                // if submenu is hidden, show it
                else 
                {
                    parent_menu_item.children(".sub-menu").slideDown("", function()
                    {
                        parent_menu_item.addClass("active");
                        event.preventDefault();
                        return false;
                    });
                    event.preventDefault();
                    return false;
                }
                // end: if submenu is hidden, show it
            }
            // end: if there is a submenu

            // if there is NO submenu
            else {
                // link acts normally
            }
            // end: if there is NO submenu
        });
        // end: on click of menu item

    }
    // END: if main menu mobile functionality has not been initialised yet, initialise functionality
}

/* 
 * ================================================================
 * SUBPAGE SUBMENU functionality
 *
 * functionality / hover effects of subpages sidebar submenus
 */
function initialise_submenu_functionality()
{
    // on click of menu item
    $(".sidebar-menu li.menu-item > a").click(function(event)
    {
        var parent_menu_item = $(this).parent("li.menu-item");

        // if there is a submenu
        if (parent_menu_item.children(".sub-menu").length > 0)
        {
            // if submenu is visible
            if (parent_menu_item.children(".sub-menu").is(':visible'))
            {
                // if link is empty, close submenus
                if ($(this).attr("href") == "#")
                {
                    parent_menu_item.find(".sub-menu:visible").slideUp("fast", function()
                    {
                        parent_menu_item.removeClass("active");
                        parent_menu_item.find(".sub-menu li.menu-item").removeClass("active");
                        event.preventDefault();
                        return false;
                    });
                    event.preventDefault();
                    return false;
                }
                // end: if link is empty, close submenu
                else
                {
                    // link href is not #, link acts normally
                }
            }
            // end: if submenu is visible

            // if submenu is hidden, show it
            else 
            {
                parent_menu_item.children(".sub-menu").slideDown("", function()
                {
                    parent_menu_item.addClass("active");

                    // hide other open submenus
                    $(this).parent(".menu-item").siblings().find(".sub-menu:visible").slideUp("fast", function()
                    {
                        $(this).parent(".menu-item").removeClass("active");
                        event.preventDefault();
                        return false;
                    });

                    event.preventDefault();
                    return false;
                });

                event.preventDefault();
                return false;
            }
            // end: if submenu is hidden, show it
        }
        // end: if there is a submenu

        // if there is NO submenu
        else {
            // link acts normally
        }
        // end: if there is NO submenu
    });
}

/* 
 * ================================================================
 * MAIN MENU - fixed at top of page
 *
 * when the user scrolls down the page, the main menu stays fixed at the top (and the logo hidden)
 * - for this function to work, the <header> needs to have the attribute: data-menu-fixed-at-top-on-scroll set to "true"
 *
 *
 * @param adjust_offset - if set to true, set the original top offset of the menu as an attribute, to calculate when the menu fixed action should switch on/off on scroll. This is set to true on page load and on window resize (when the menu top offset can change)
 */
function main_menu_fixed_at_top_on_scroll(adjust_offset)
{
    var header = $("header:first-of-type");
    if (header.length == 0) return false; // header has to exist for this function to work

    var fixed_at_top_attr = header.attr("data-menu-fixed-at-top-on-scroll");

    var main_menu_container = $("header #main-menu-container");
    if (main_menu_container.length == 0) return false; // main menu container has to exist as well for this function to work

    var scroll_from_top = $(document).scrollTop(); // current scroll top offset

    // check if original menu top offset and header original height were already set as attributes
    var original_menu_top_offset = header.attr("data-original-top-offset");
    var original_header_height = header.attr("data-original-header-height");
    // if top offset wasn't already calculated, or if function is set to adjust offset, first ensure that menu is not already fixed at top, calculate the offset, and set as an attribute
    if (original_menu_top_offset === undefined || isNaN(original_menu_top_offset) 
        || original_header_height === undefined || isNaN(original_header_height) 
        || adjust_offset == true)
    {
        header.removeClass("fixed-at-top");
        $(".outer-container").css({ "padding-top": "" });
        original_menu_top_offset = main_menu_container.offset().top;
        original_header_height = header.innerHeight();
        header.attr("data-original-top-offset", original_menu_top_offset);
        header.attr("data-original-header-height", original_header_height);
    }

    // if user scrolls down further than the menu, set the menu fixed at top
    if ( (fixed_at_top_attr == "true" && scroll_from_top > original_menu_top_offset) || viewport().width < window.xs_screen_max)
    {
        header.addClass("fixed-at-top");
        // add a padding to the outer container to compensate for the fixed header
        $(".outer-container").css({ "padding-top": original_header_height+"px" });

        // enable scroll functionality to mobile main menu (on small viewports only)
        if (viewport().width < window.xs_screen_max) { toggle_scroll_to_mobile_main_menu("enable"); }
        else { toggle_scroll_to_mobile_main_menu("disable"); }
    }
    // else: set the menu to default static position
    else 
    {
        header.removeClass("fixed-at-top");
        
        // removepadding to the outer container since header is not fixed anymore
        $(".outer-container").css({ "padding-top": "" });

        // disable scroll functionality to mobile main menu
        toggle_scroll_to_mobile_main_menu("disable");
    }
}

/* 
 * ================================================================
 * Add scroll functionality to mobile main menu
 *
 * @action - "enable" or "disable"
 */
function toggle_scroll_to_mobile_main_menu(action)
{
    var main_menu = $("#main-menu");

    // first reset (disable)
    main_menu.css({
        'overflow-y':'visible',
        'height':'auto'
    });

    if (action == "enable")
    {
        var scroll_position = $(document).scrollTop();
        var menu_top_offset = $("#main-menu").offset().top;
        var menu_fixed_top_offset = menu_top_offset - scroll_position;
        if (menu_fixed_top_offset < 0 || isNaN(menu_fixed_top_offset)) menu_fixed_top_offset = 60;
        var maximum_menu_height = viewport().height - (menu_fixed_top_offset + 10);  
              
        main_menu.css({
            'overflow-y':'auto',
            'max-height':maximum_menu_height+'px'
        });
    }
}

/* 
 * ================================================================
 * SET EQUAL HEIGHTS TO LIST ITEMS
 *
 * when there is a horizontal list of items, their heights may differ (because of different content).
 * This function find the largest height among the group, and set it as height of all these items.
 *
 * This function is called on window.load and page-resize and searches for all the list parent
 * containers with class ".equal-height". It adjust the item's .item-content height
 *
 * This function only applies to non-mobile viewports
 */
function set_equal_heights_to_list_items()
{
    var list_parents = $(".equal-height");

    // for each list
    list_parents.each(function()
    {
        var list_items = $(this).find(".item");

        // first reset each item's height
        list_items.each(function()
        {
            $(this).find(".item-content").css({ "height":"auto" });
        });

        // if on non-mobile viewport
        if (viewport().width > window.xs_screen_max)
        {
            // get each item's height, and store in array
            var item_heights = [];
            list_items.each(function()
            {
                item_heights.push($(this).find(".item-content").height());
            });
            var largest_height = Math.max.apply(Math, item_heights); // get largest height

            // set each item's height to the largest height
            list_items.each(function()
            {
                $(this).find(".item-content").height(largest_height);
            });
        }
    });
}

/* 
 * ================================================================
 * SECTION COLUMNS - Set equal heights
 *
 * When "isolated-sections" are enabled, make sure that each column in a horizontal section have equal
 * heights. This is in order to ensure that each section's right divider border is of full height
 *
 */
function set_equal_heights_to_section_columns()
{
    var horizontal_sections = $(".horizontal-section-container");

    // first reset heights of each column
    horizontal_sections.each(function()
    {
        $(this).find(".row").first().children("*[class*='col-']").not("*[class*='-12']").css({ "min-height":"1px" });
    });

    // if isolated sections enabled, and non-mobile viewport
    if ($("body").hasClass("isolated-sections") && viewport().width > window.xs_screen_max)
    {
        // for each horizontal section
        horizontal_sections.each(function()
        {
            var columns = $(this).find(".row").first().children("*[class*='col-']").not("*[class*='-12']");
            
            // if there are more than one columns
            if (columns.length > 1)
            {
                // get each column's height, and store in array
                var column_heights = [];
                columns.each(function()
                {
                    column_heights.push($(this).height());
                });
                var largest_height = Math.max.apply(Math, column_heights); // get largest height
                
                // set each item's height to the largest height
                columns.each(function()
                {
                    //$(this).height(largest_height);
                    $(this).css({ "min-height":largest_height+"px" });
                });
            }
        });
    }
}

/* 
 * ================================================================
 * GALLERY - Fade In Images
 *
 * If .gallery-grid has attribute "data-gallery-hidden-on-page-load" to "true", before all images are loaded, show a loader.
 * Once they are loaded, fade in images and fade out loader.
 *
 */
function fade_in_gallery_images()
{
    var galleries = $(".gallery-grid");

    galleries.each(function()
    {
        var gallery = $(this);

        // if fading is activated
        if (gallery.attr("data-gallery-hidden-on-page-load") == "true")
        {
            // fade out loader
            gallery.find(".gallery-loader").fadeOut("fast");

            // fade in images
            gallery.find(".gallery-item").animate({opacity: 1}, 1000);
        }
    });
}

/* 
 * ================================================================
 * Add Clear Items to Container Rows
 *
 * Add <hr class="clearfix_item clearfix" /> after each row of a provided items container
 *
 * @param container - the container which has child items (.item)
 * @columns_per_row - the number of columns per row
 */
function add_clear_items_to_container_rows(container, columns_per_row)
{
    if (container === undefined || container.length == 0 || columns_per_row === undefined) return false;

    // check for container's child items
    var items = container.children(".item");
    if (items.length == 0) return false;

    // first remove all clearfixes
    container.find(".clearfix_item").remove();

    // add clearfixes after every n (no. of columns) items
    var n = columns_per_row;
    container.find(".item:nth-of-type("+n+"n+"+n+")").after('<hr class="clearfix_item clearfix" />') 
}

/*
 * ================================================================
 * Go To Top Icon Visibility
 *
 * - icon is hidden at the top of the page, shown when scrolling further down
 */
function go_to_top_visibility()
{
    var go_to_top_icon = $("#go-to-top");

    // if icon exists
    if (go_to_top_icon.length > 0)
    {
        var scroll_from_top = $(document).scrollTop();
        
        // if at the top section of the page, hide icon
        if (scroll_from_top < (viewport().height*0.5))
        {
            go_to_top_icon.removeClass("active");
        }

        // if further down the page, show icon
        else
        {
            go_to_top_icon.addClass("active");
        }
    }
}

/*
 * ================================================================
 * Scroll to Top of the Page
 *
 * - scrolls to top of the page (#outer-container)
 */
function scroll_to_top(event)
{
    if (event !== undefined) event.preventDefault();

    $('html, body').stop().animate({
        scrollTop: 0
    }, 1500,'easeInOutCubic', function(){
        $("#go-to-top").removeClass("active"); // deactive scroll to top icin     
    });

    return false;
}

/*
 * ================================================================
 * Form validation and submit actions
 *
 * @param form_object - objects -  if set, validate and submit this form only. Otherwise search for all forms with class .validate-form
 */
function validate_and_submit_forms(form_object)
{
    var forms = (form_object !== undefined && form_object.length > 0) ? form_object : $("form.validate-form");

    // for each form 
    forms.each(function(){

        var this_form = $(this);

        // -------------- onChange of each form field with validation enabled (with class .validate) --------------
        this_form.find(".validate-field").each(function()
        {
            $(this).change(function()
            {
                // first empty any error containers
                $(this).siblings(".alert").remove();

                // value is not empty, validate it
                if ($(this).val().trim() != "")
                {
                    var validation_message = validate_fields(this_form, $(this));
                    if (validation_message.length > 0)
                    {
                        // if there are errors (not successfull)
                        if (validation_message[0]["message"] !== undefined && validation_message[0]["message"] != "" && validation_message[0]["message"] != "success")
                        {
                            // create error field
                            var error_field_html = '<div class="alert">'+validation_message[0]["message"]+'</div>';
                            $(this).after(error_field_html);
                            $(this).siblings(".alert").fadeIn("fast");
                        }
                        // end: if there are errors
                    }
                }
                // end: if value is not empty
            });
        });
        // -------------- end: onChange of each form field --------------

        // -------------- reload captcha --------------
        this_form.find("#form-captcha-refresh").click(function() {
            var d = new Date().getTime();
            this_form.find("#form-captcha-img").replaceWith('<img id="form-captcha-img" src="php/form_captcha/captcha_img.php?t='+d+'" class="img-responsive" title="Reload" style="display:none">');
            this_form.find("#form-captcha").val("");
            setTimeout(function() { this_form.find("#form-captcha-img").show(); }, 500);
        });

        // -------------- on Submit of form --------------
        this_form.submit(function(event)
        {
            event.preventDefault(); // stop default action (will be handled via AJAX below)

            // show form loader
            $(this).find(".form-loader").fadeIn("fast");

            var form_action = $(this).attr("action");
            // if action is not set (URL to mail.php), stop form action
            if (form_action === undefined && form_action == "") return false;

            // clear all errors
            $(this).find(".alert").remove();
            $(this).find(".form-general-error-container").empty();

            var errors_found = false;

            // for each field with validation enabled (with class .validate)
            $(this).find(".validate-field").each(function()
            {
                var validation_message = validate_fields(this_form, $(this));
                if (validation_message.length > 0)
                {
                    // if there are errors (not successfull)
                    if (validation_message[0]["message"] !== undefined && validation_message[0]["message"] != "" && validation_message[0]["message"] != "success")
                    {
                        // create error field
                        var error_field_html = '<div class="alert">'+validation_message[0]["message"]+'</div>';
                        $(this).after(error_field_html);
                        $(this).siblings(".alert").fadeIn("fast");

                        errors_found = true;
                    }
                    // end: if there are errors
                }               
            });
            // end: for each field

            // if errors were found, stop form from being submitted
            if (errors_found == true) 
            {
                // hide loader
                $(this).find(".form-loader").fadeOut("fast");
                return false;
            }

            // submit form
            $.ajax({
                type: 'POST',
                url: form_action,
                data: $(this).serialize(),
                dataType: 'html',
                success: function (data) 
                {
                    // if form submission was processed (successfully or not)

                    // hide loader
                    this_form.find(".form-loader").fadeOut("fast");

                    var submission_successful = (data == "success") ? true : false;
                    var captcha_success = (data == "captcha") ? false : true;

                    var message = "";
                    switch(data) {
                        case "success":
                            message = "Form submitted successfully.";
                            break;
                        case "captcha":
                            message = "Incorrect CAPTCHA.";
                            break;
                        case "incomplete":
                            message = "Please fill in all required fields.";
                            break;
                        case "error":
                            message = "An error occured. Please try again later.";
                            break;
                    }

                    // prepare message to show after form processed
                    var message_field_html = '<div class="alert ';
                    message_field_html += (submission_successful == true) ? 'success' : 'error';
                    message_field_html += '">'+message+'</div>';

                    // incorrect captcha
                    if (!captcha_success) {
                        this_form.find("#form-captcha").parents(".form-group").append(message_field_html);
                        this_form.find("#form-captcha").parents(".form-group").find(".alert").fadeIn("fast");
                    }
                    // general message
                    else {
                        this_form.find(".form-general-error-container").html(message_field_html).fadeIn("fast", function(){
                            // if submission was successful, hide message after some time
                            $(this).delay(10000).fadeOut("fast", function(){ $(this).html(""); });
                        });
                    }

                    // refresh captcha
                    var d = new Date().getTime();
                    this_form.find("#form-captcha-img").replaceWith('<img id="form-captcha-img" src="php/form_captcha/captcha_img.php?t='+d+'" class="img-responsive" title="Reload" style="display:none">');
                    this_form.find("#form-captcha").val("");
                    setTimeout(function() { this_form.find("#form-captcha-img").show(); }, 500);

                    // if form submitted successfully, empty fields
                    if (submission_successful == true) this_form.find(".form-control").val("");
                },
                error: function (data) 
                {
                    // if form submission wasn't processed

                    // hide loader
                    this_form.find(".form-loader").fadeOut("fast");

                    // show error message
                    var error_field_html = '<div class="alert">An error occured. Please try again later.</div>';
                    this_form.find(".form-general-error-container").html(error_field_html).fadeIn("fast");

                }
            }); 
            // end: submit form           
        });
        // -------------- end: on Submit of form --------------

    })
    // end: for each form
}

/*
 * ================================================================
 * Form validation - separate fields
 *
 * @param form_object - object - required - the form in which the fields relate to
 * @param single_field - object - if set, the function will validate only that particular field. Otherwise the function will validate all the fields with class .validate
 */
 function validate_fields(form_object, single_field)
 {
    // if form exists
    if (form_object !== undefined && form_object.length > 0)
    {
        var form_fields_to_validate = (single_field !== undefined && single_field.length > 0) ? single_field : form_object.find(".validate"); // if single field is set, the function will validate only that particular field. Otherwise the function will validate all the fields with class .validate

        var validation_messages = new Array();

        // for each field to validate
        form_fields_to_validate.each(function()
        {
            var validation_type = $(this).attr("data-validation-type");
            var field_required = $(this).hasClass("required");
            var field_value = $(this).val().trim();

            var single_field_error_details = new Array(); // will contain this field and its error
            single_field_error_details["field_object"] = $(this);
            
            single_field_error_details["message"] = "success"; // default is success. If the above tests fail, replace message with error

            // if field is required and value is empty
            if (field_required == true && (field_value == "" || field_value === null || field_value === undefined)) single_field_error_details["message"] = "This field is required";

            // string validation
            if (validation_type == "string" && (field_value != "" && field_value !== null && field_value !== undefined))
            {
                if (field_value.match(/^[a-z0-9 .\-]+$/i) == null) single_field_error_details["message"] = "Invalid characters found.";
            }

            // email validation
            else if (validation_type == "email" && (field_value != "" && field_value !== null && field_value !== undefined))
            {
                if (field_value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) single_field_error_details["message"] = "Please enter a valid email address.";
            }

            // phone validation
            else if (validation_type == "phone" && (field_value != "" && field_value !== null && field_value !== undefined))
            {
                if (field_value.match(/^\(?\+?[\d\(\-\s\)]+$/) == null) single_field_error_details["message"] = "Invalid characters found.";
            }

            validation_messages.push(single_field_error_details); // if none of the above fail, return validation successfull

        });
        // end: for each field to validate

        return validation_messages;
    }
    // end: if form exists
 }

 /* 
 * ================================================================
 * Menu Search Icon Visiblity / Click actions
 *
 */
function mainmenu_search_icon()
{
    var search_container = $("#search-container");
    if (search_container.length == 0) return false;

    // add left-padding to main menu if search icon exists in main menu - layout purposes
    if ($("#main-menu-container #search-container").length == 1)
    {
        $("#main-menu-container #main-menu").addClass("search-icon-active");
    }

    var search_icon = $("#search-container #search-icon");
    var search_input_container = $("#search-container #search-input");
    var search_close_icon = $("#search-container #search-close");

    // clicking outside of the search box
    $('html').click(function()
    {
        var search_input = $("#search-container #search-input");
        // if search visible, hide it
        if (search_icon.hasClass("active") && search_input.is(":visible"))
        {
            search_input.slideUp("fast");
            search_icon.removeClass("active");
        }        
    });

    // clicking on search icon
    search_icon.click(function(event)
    {
        event.preventDefault();
        event.stopPropagation();
        var search_input = $("#search-container #search-input");

        // if search visible, hide it
        if (search_icon.hasClass("active") && search_input.is(":visible"))
        {
            search_input.slideUp("fast");
            search_icon.removeClass("active");
        }

        // if search hidden, show it
        else 
        {
            search_input.slideDown("fast");
            search_icon.addClass("active");
        }
    });

    // clicking on close icon
    search_close_icon.click(function(event)
    {
        event.preventDefault();
        event.stopPropagation();       
        var search_input = $("#search-container #search-input");
        var search_icon = $("#search-container #search-icon");

        // if search visible, hide it
        if (search_icon.hasClass("active") && search_input.is(":visible"))
        {
            search_input.slideUp("fast");
            search_icon.removeClass("active");
        }
    });

    // clicking inside the search container doesn't close it
    $("#search-container #search-input").click(function(event)
    {
        event.stopPropagation();
    });    
}