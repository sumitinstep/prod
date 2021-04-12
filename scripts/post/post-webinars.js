(function($)
{
    $(document).ready(function()
    {
        if (typeof MktoForms2 == "undefined") {
            return;
        }
        var bFormSubmitted = false;

        MktoForms2.whenReady(function (form) {
            if (form.getId() === 15316) {
                var data = localStorage.getItem("firstFormData");
                var brokenArray = data.split('-');
                $("<div style='margin-left:10px;line-height:10px;' class='marketo_form_user_data'><p>" + brokenArray[0] + " " + brokenArray[1] + "</p><p>" + brokenArray[2] + "</p><p>" + brokenArray[3] + "</p><p>" + brokenArray[4] + "</p></div>")
                    .insertAfter($(".marketo_form h5"));
            }

            form.onSubmit(function (form) {

                //param/value pairs
                var jsonData = {};
                $(".marketo-params").each(function () {
                    var param = $(this).attr('name');
                    var value = $(this).val();
                    jsonData[param] = value;
                });
                form.addHiddenFields(jsonData);

                // reflink in URL param, uncompressed by BITLY (in function.php)
                if ($('#meraki-bitly-sfid').length) {
                    var $sfid = $('#meraki-bitly-sfid').val();
                    form.vals({
                        "Referrer__c": $sfid
                    });
                }
                if ($('#meraki-bitly-d1').length) {
                    var $d1 = $('#meraki-bitly-d1').val();
                    form.vals({
                        "Referrer_Data_1__c": $d1
                    });
                }

                // campaign id provided by ONDEMAND video only
                $campaign_id = $('.marketo-campaign-id').val();
                if ($campaign_id !== undefined) {
                    form.vals({
                        "universalId": $campaign_id
                    });
                }

                // webex id provided by LIVE webinar only
                $webex_id = $('input[name="live_webinars"]:checked').val();
                if ($webex_id !== undefined) {
                    $webex_id = $('input[name="live_webinars"]:checked').val();
                    form.vals({
                        "universalId": $webex_id
                    });
                }
            });

            form.onSuccess(function (callback) {
                dataLayer.push({'event':'GA-Event-FormSuccess'});

                bFormSubmitted = true;

                // Redirect if Demo form - hard coded for specific Demo only
                var isDemo = false;
                $(".marketo-params").each(function () {
                    var param = $(this).attr('name').toLocaleLowerCase();
                    
                    //Skip for new demo url parameter as it needs to preserve case
                    if (param !== 'newdemourl')
                    var value = $(this).val().toLocaleLowerCase();
                    else
                    var value = $(this).val();

                    if (param == 'formtype' && value == 'demo') {
                        isDemo = true;
                    }
                });
                if (isDemo) {
                    var vals = form.getValues();
                    if (vals['Email'] != null) {
                        var email = vals['Email'];
                        if (email != '') {
                            window.location.href = 'https://n140.meraki.com/login/new_live_demo?email=' + email;
                            return false;
                        }
                    } else {
                        console.log('Marketo Email field is not available.')
                    }
                }
                if(newDemo){
                    var d = new Date();
                    d.setTime(d.getTime() + (7 * 60 * 60 * 1000));
                    var vals = form.getValues();
                    // Set a cookie to store value of users from the first demo form
                    document.cookie = "meraki-dashboard=true,firstname=" + vals['FirstName'] + ",lastname=" + vals['LastName'] + ",email=" + vals['Email'] + ",company=" + vals['Company'] + ",country=" + vals['Mailing_Country_SFDC_Sync__c'] + ";expires=" + d.toUTCString() +";path=/;";
                    
                    var formValues = vals['FirstName'] + '-' + vals['LastName'] + '-' + vals['Email'] + '-' + vals['Company'] + '-' + vals['Mailing_Country_SFDC_Sync__c'];
                    localStorage.setItem("firstFormData", formValues);
                    // Open demo url in new tab and next demo form page in same tab
                    var myPopup = window.open(newDemoUrl, "PopupWindow", "minimizable=no, location=0, status=0, resizable=1, fullscreen, scrollbars=1, width=2000, height=1000"); 
				    jQuery(myPopup).on("unload", function (e) {
					    window.location.href = newDemoConfirmUrl;
				    });
                    return false;
                }
                
                // Diplay confirmation text/video
                $('.head-post').hide();
                $('#col-form').hide();
                $('#row--bottom').hide();

                if ($('.wista-row').length) {
                    $('.wista-row').show();
                } else {
                    if ($('#confirmation_date').length) {
                        $webex_id = $('input[name="live_webinars"]:checked').val();
                        $event_string = '';
                        if ($webex_id !== undefined) {
                            $event_string = $('#text_' + $webex_id).text();
                        }
                        $('#confirmation_date').text($event_string);
                        $('.confirmation').show();
                    } else if ($('.confirmation').length) {
                        $('.confirmation').show();
                    }
                }
                $("html, body").animate({ scrollTop: 0 }, "slow");

                // Check for file to download - provided by Gated Assets
                if ($('#marketo-file-postid').length) {
                    var post_id = $('#marketo-file-postid').val();
                    var ajaxurl = $('#marketo-ajax-url').val();

                    var data = {
                        action: 'meraki_cookie_ajax',
                        post_id: post_id
                    };

                    $.ajax({
                        url: ajaxurl,
                        type: 'POST',
                        data: data,
                        success: function (result) {
                            $('.btn-download').show();
                        },
                        error: function (e) {
                            console(JSON.stringify(e));
                        }
                    });
                }

                // display values submitted to Marketo
                var vals = form.getValues();
                console.log("Submitted values: " + JSON.stringify(vals));
                return false;
            });
            
            postFormResize();
/*
            $(".marketo_form .mktoForm input, .marketo_form .mktoForm textarea").each(function (index) {
                $(this).keyup(function (e) {
                    var submitElement = $(".marketo_form .mktoForm button").first();
                    submitElement.removeClass('inactive');
                    submitElement.removeAttr('disabled');
                });
                $(this).focus(function (e) {
                    var submitElement = $(".marketo_form .mktoForm button").first();
                    submitElement.removeClass('inactive');
                    submitElement.removeAttr('disabled');
                });
            });

            $(".marketo_form .mktoForm select").each(function (index) {
                $(this).change(function (e) {
                    var submitElement = $(".marketo_form .mktoForm button").first();
                    submitElement.removeClass('inactive');
                    submitElement.removeAttr('disabled');
                });
                $(this).focus(function (e) {
                    var submitElement = $(".marketo_form .mktoForm button").first();
                    submitElement.removeClass('inactive');
                    submitElement.removeAttr('disabled');
                });
            });
*/

            $(document).on("click", ".marketo_form .mktoForm button", function () {
                if ($('.mktoError').offset()) {
                    var to = $('.mktoError').offset().top;
                    if (to) {
                        setTimeout(function () {
                            to = to - 150;
                            $('html, body').animate({
                                scrollTop: to
                            }, 1);
                        }, 400);
                    }
                }
            });

            /*
            var INPUTS_STOR = 'INPUT,SELECT,TEXTAREA',
                formEl = form.getFormElem()[0],
                reValidate = function (e) {
                    /(^|\s)mktoInvalid(\s|$)/.test(this.className) && form.validate();
                },
                reValidateIfNonEmpty = function (e) {
                    /(^|\s)mktoInvalid(\s|$)/.test(this.className) && this.value && form.validate();
                };


            [].forEach.call(formEl.querySelectorAll(INPUTS_STOR), function (el) {
                el.addEventListener('blur', reValidate);
            });
            */

        });

        MktoForms2.whenRendered(function(form) {
            moveCheckboxesToTheLeft(form);
            addCustomCheckbox(form);
            addCustomWrap(form);
            addCtaStyle(form);
            //addRealtimeValidation(form);
            //validateSubmit(form);
        });

        function validateSubmit(form) {
            form.getFormElem().find(".mktoFieldDescriptor").each(function (idx, el) {
                var originalFocusInListeners;

                if (MktoForms2.$.hasData(el)) {
                    if (originalFocusInListeners = MktoForms2.$._data(el).events.focusin) {
                        MktoForms2.$(el).data("reservedFocusIn", originalFocusInListeners[0]);
                        MktoForms2.$(el).off("focusin");
                    }
                }
            });

            form.onValidate(function (valid) {
                form.getFormElem()
                    .find(".mktoFieldDescriptor")
                    .each(function (idx, el) {
                        var reservedFocusInListener;

                        if (reservedFocusInListener = MktoForms2.$(el).data("reservedFocusIn")) {
                            MktoForms2.$(el).on("focusin", reservedFocusInListener);
                        }
                    })
            })
        }

        function addRealtimeValidation(form) {
            $(form.getFormElem()[0]).attr('autocomplete', 'off');
            $(form.getFormElem()[0]).find("input").on("change", function() {
                if(form.validate()) {
                    $(form.getFormElem()[0]).find("button[type='submit']").removeClass("inactive").prop("disabled", false);
                } else {
                    $(form.getFormElem()[0]).find("button[type='submit']").addClass("inactive").prop("disabled",true);
                }
            });
        }

        function moveCheckboxesToTheLeft(form) {  
            var formEl = form.getFormElem()[0];  
            var formRowEl = formEl.querySelectorAll(".mktoFormRow");  
            
            for (var i = 0; i < formRowEl.length; i++) {  
            // Get all checkboxes and radio buttons within form row  
                var formCheckboxEl = formRowEl[i].querySelectorAll(  
                    "input[type=checkbox], input[type=radio]"  
                ); 

                var hasCheckbox =   
                    formCheckboxEl !== null && formCheckboxEl.length > 0;  
                if (hasCheckbox) { 
                    for(var j=0; j< formCheckboxEl.length; j++){
                        var formCheckboxLabel = formRowEl[i].querySelectorAll(  
                            "label[for=" + formCheckboxEl[j].getAttribute("name") + "], label[for=" + formCheckboxEl[j].getAttribute("id") + "]"  
                        );             
                    
                        // Check if second label element is empty which should be the case   
                        // for all single checkbox / radio button elements  
                        if (formCheckboxLabel[1].textContent === "") {  
                            formCheckboxLabel[1].innerHTML = formCheckboxLabel[0].innerHTML;  
                            formCheckboxLabel[0].innerHTML = "";  
                        }
                    }
                }  
            }  
        }  

        function addCustomCheckbox(form) {
            $(form.getFormElem()[0]).find(".mktoCheckboxList").each(function() {
                //check for pre-existing custom checkbox?
                var input = $(this).find("input");
                var label = $(this).find("label");
                if(label.find("span.checkmark").length == 0) {

                    var checkBox = $("<span>");
                    checkBox.addClass("checkmark");
                    checkBox.prependTo(label);
                    input.prependTo(label);
                }

            });

        }

        function addCustomWrap(form) {
            $(form.getFormElem()[0]).find(".mktoCheckboxList,.mktoHtmlText").closest(".mktoFieldWrap").addClass("customFieldWrap");
        }

        function addCtaStyle(form) {
            $(form.getFormElem()[0]).find("button[type='submit']").addClass("btn").addClass("btn-primary-green").css({"background-image": "none"});
        }

        function postFormResize(){
            var topRowHeight = 0;
            var colFormHeight = 0;

            if ($('#row--top').length && $('#col-form').length) {
                topRowHeight = document.getElementById('row--top').clientHeight;
                colFormHeight = document.getElementById('col-form').clientHeight;
                if(!bFormSubmitted)
                    document.getElementById("row--bottom").setAttribute("style", "min-height:" + (colFormHeight - topRowHeight + 190) + 'px'); 
            }
        }

        document.getElementsByTagName("BODY")[0].onresize = function() {postFormResize()};
        var postFormLoopCount = 0;
        var findFormInterval = setInterval(function(){
            postFormLoopCount = postFormLoopCount + 1;
            if (document.getElementsByClassName("marketo_form").clientHeight > 0 || postFormLoopCount > 30){
                clearInterval (findFormInterval);
                postFormResize();
            }
        },100);
    });
})(jQuery);