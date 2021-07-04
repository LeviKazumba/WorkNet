////var data = [
////    { id: "1", fname: "Tiger", lname: "Noxx", team: 'Team 1', address: 'Ryecroft Field', tel: '0494645879' },
////    { id: "2", fname: "Garrett", lname: "Pellens", team: 'Team 2', address: 'Kiln Circus', tel: '0493658746' },
////    { id: "3", fname: "Ashton", lname: "Fox", team: 'Team 1', address: 'Thurne View', tel: '0498532546' },
////    { id: "4", fname: "Melissa", lname: "Perenboom", team: 'Team 3', address: 'Thornton Glade', tel: '0499454891' },
////    { id: "5", fname: "Frankie", lname: "Winters", team: 'Team 2', address: 'Drayton Brae', tel: '0494678943' },
////    { id: "6", fname: "Benoist", lname: "Muniz", team: 'Team 4', address: 'Foxglove Lane', tel: '0492884618' },
////    { id: "7", fname: "Kelly", lname: "London", team: 'Team 2', address: 'Doxford Park Way', tel: '0497978945' },
////    { id: "8", fname: "Hope", lname: "Gilmore", team: 'Team 3', address: 'Bradford Manor', tel: '0499894125' },
////    { id: "9", fname: "Muriel", lname: "Smith", team: 'Team 3', address: 'Wardle Street', tel: '0491484215' },
////    { id: "10", fname: "Gary", lname: "Hendren", team: 'Team 4', address: 'Church Street', tel: '0493596488' },
////];

////$(document).on("click", ".li-search", function () {
////    $("#txt-search").val($(this).html());
////    setFormFields($(this).attr("id"));
////    $("#filter-records").html("");
////    $(".next").prop("disabled", false);
////});

////$(".radio-group .radio").on("click", function () {
////    $(".selected .fa").removeClass("fa-check");
////    $(".radio").removeClass("selected");
////    $(this).addClass("selected");
////    if ($("#suser").hasClass("selected") == true) {
////        $(".next").prop("disabled", true);
////        $("#sfield").show();
////    } else {
////        setFormFields(false);
////        $(".next").prop("disabled", false);
////        $("#filter-records").html("");
////        $("#sfield").hide();
////    }
////});

//SIGN UP
var step = 1;
$(document).ready(function () { stepProgress(step); });

$(".next").on("click", function () {

    var nextstep = false;
    if (step === 2) {
        nextstep = CheckStep2();
    }
    else if (step === 3) {
        nextstep = CheckStep3();
    }
   
    else {
        nextstep = true;
    }

    if (nextstep == true) {
        if (step < $(".step").length) {
            $(".step").show();
            $(".step")
                .not(":eq(" + step++ + ")")
                .hide();
            stepProgress(step);
        }
        hideButtons(step);
    }
});

// ON CLICK BACK BUTTON
$(".back").on("click", function () {
    if (step > 1) {
        step = step - 2;
        $(".next").trigger("click");
    }
    hideButtons(step);

   
});

// CALCULATE PROGRESS BAR
stepProgress = function (currstep) {
    var percent = parseFloat(100 / $(".step").length) * currstep;
    percent = percent.toFixed();
    $(".progress-bar")
        .css("width", percent + "%")
       /* .html(percent + "%");*/
};

// DISPLAY AND HIDE "NEXT", "BACK" AND "SUMBIT" BUTTONS
hideButtons = function (step) {
    var limit = parseInt($(".step").length);
    $(".action").hide();
    if (step < limit) {
        $(".next").show();
    }
    if (step > 1) {
        $(".back").show();
    }
    if (step == limit) {
        $(".next").hide();
        $(".submit").show();
    }
    if (step === 1) {
        $(".back").hide();
        $(".next").hide();
    }

    if (localStorage.getItem("account") === 1) {
        //individual account
    }

    if (localStorage.getItem("account") === 2) {
        //individual account
    }
};


function CheckStep2() {

    $("#StepTwo").validate({
        rules: {

        },
        messages: {
            Name: "Please enter your name",
            Surname: "Please enter your surname",
            Nationality: "Please select your nationality",
            Ethnicity: "Please select your ethnicity",
            Gender: "Please select your gender",
            DisabilityDesc: "Please select one of the above",
           
        },
        errorElement: "em",
        errorPlacement: function (error, element) {

            error.addClass("invalid-feedback");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.next("label"));
            } else {
                error.insertAfter(element);
            }
        },
        success: function (label) {
            label.addClass("valid").text("Looks good!");
        },

        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).addClass("is-valid").removeClass("is-invalid");
        }

    });

    if ($("#StepTwo").valid()) {
        return true
    }
    else {
        return false
    }
}

function CheckStep3() {
    if ($('.CV-validate').is(':visible')) {
        return false
    }

    $("#StepThree").validate({
        ignore: "",
        rules: {

        },
        messages: {
            Professions: "Please provide at least one profession",
            Skills: "Please provide at least one of your skills",
            Industries: "Please provide at least one industry",
            CVText: "Please select a correct CV",
            Address: "Please provide yout city/town name",

        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `invalid-feedback` class to the error element
            error.addClass("invalid-feedback");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.next("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).addClass("is-valid").removeClass("is-invalid");
        }

    });

    if ($("#StepThree").valid()) {
        return true
    }
    else {
        return false
    }
}

function CheckStep4() {

    $("#StepFour").validate({
        ignore: "",
        rules: {
            Password: {
                required: true,
                minlength: 5
            },
            ConfirmPassword: {
                required: true,
                minlength: 5,
                equalTo: "#Password"
            }
        },
        messages: {
            Username: "Please enter your username",
            Password: "Please enter your password",
            ConfirmPassword: "Please re-enter your password",

        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `invalid-feedback` class to the error element
            error.addClass("invalid-feedback");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.next("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).addClass("is-valid").removeClass("is-invalid");
        }

    });

    if ($("#StepFour").valid()) {
        return true
    }
    else {
        return false
    }
}


$(document).ready(function () {
    $('.AccountTypeCheck').click(function () {
        $('.AccountTypeCheck').not(this).prop('checked', false);


        if ($(this).attr('id') === "Company") {
            $(".CompanyNameStar").show();
            $("#CompanyName").attr("required", true);

        }
        else if ($(this).attr('id') === "User") {
            $(".CompanyNameStar").hide();
            $("#CompanyName").attr("required", false);

        }
    });

    $("#Username").keydown(function () {
        $("#Username").val($('#Username').val().replace(/[^A-Z0-9]/gi, ''));
    });

    $("#Name").keydown(function () {
        $("#Name").val($('#Name').val().replace(/[^A-Za-z]+/g, ''));
    });
    $("#Surname").keydown(function () {
        $("#Surname").val($('#Surname').val().replace(/[^A-Za-z]+/g, ''));
    });

    //datepicker
    $(".DOB").click(function () {
        $('#DOB').datepicker('show');
    });




});

function DisabilityOptions() {
    if ($("#Disability").val() === "No") {
        $(".DisabilityInput").hide();
        $("#DisabilityDesc").attr("required", false);
    }
    else if ($("#Disability").val() === "Yes") {
        $(".DisabilityInput").show();
        $("#DisabilityDesc").attr("required", true);
    }
}


$(document).on('click', '.upload-cv', function () {
    var file = $(this).parent().parent().parent().find('.CV-file');
    file.trigger('click');
});
$(document).on('change', '.CV-file', function () {

    var file_size = $('.CV-file')[0].files[0].size;
    var ext = $('.CV-file').val().split('.').pop().toLowerCase();

    if (file_size > 2097152) {
        $(".CV-validate").html("Your cv size is greater than 2MB.").show();
    }
    else if ($.inArray(ext, ['pdf']) == -1) {
        $(".CV-validate").html("Your cv should be in pdf format.").show();
    }

    else {
        $(".CV-validate").hide();
        $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
    }
});

function VerifyUser () {
    try {

        if ($("#Username").val()) {
            var o = {};

            o.User = $("#Username").val();
            o.VerifyBy = 'Username';


            var jsonString = JSON.stringify(o);
            var strData = jsonString.replace(/\"/g, '\\"');

            $.ajax({
                type: "POST",
                url: "../connect/api.asmx/VerifyUser",
                contentType: "application/json; charset=utf-8",
                data: '{strData: "' + strData + '"}',
                dataType: "json",
                success: function (response) {

                    var data = typeof response.d == "string" ? eval("(" + response.d + ")") : response.d;

                    if (data[0] === "Taken") {
                        $(".Username-check").text("This username is already taken, please try another").show();
                    }
                    if (data[0] === "Available") {
                        $(".Username-check").hide();
                    }

                },

                failure: function (e) {
                }
            });
        }

    } catch (ex) {
       
    }
}

function VerifyEmail () {
    try {
        if ($("#Email").val()) {
            var o = {};

            o.User = $("#Email").val();
            o.VerifyBy = 'Email';

            var jsonString = JSON.stringify(o);
            var strData = jsonString.replace(/\"/g, '\\"');

            $.ajax({
                type: "POST",
                url: "../connect/api.asmx/VerifyUser",
                contentType: "application/json; charset=utf-8",
                data: '{strData: "' + strData + '"}',
                dataType: "json",
                success: function (response) {

                    var data = typeof response.d == "string" ? eval("(" + response.d + ")") : response.d;

                    if (data[0] === "Taken") {
                        $(".Email-check").text("This email is already in use, please try another.").show();
                    }
                    if (data[0] === "Available") {
                        $(".Email-check").hide();
                    }

                },

                failure: function (e) {
                }
            });

        }
       

    } catch (ex) {

    }
}

function VerifyTelephone() {
    try {
        if ($("#Telephone").val()) {
            var o = {};

            o.User = $("#Telephone").val();
            o.VerifyBy = 'Telephone';

            var jsonString = JSON.stringify(o);
            var strData = jsonString.replace(/\"/g, '\\"');

            $.ajax({
                type: "POST",
                url: "../connect/api.asmx/VerifyUser",
                contentType: "application/json; charset=utf-8",
                data: '{strData: "' + strData + '"}',
                dataType: "json",
                success: function (response) {

                    var data = typeof response.d == "string" ? eval("(" + response.d + ")") : response.d;

                    if (data[0] === "Taken") {
                        $(".Telephone-check").text("This telephone number is already in use, please try another.").show();
                    }
                    if (data[0] === "Available") {
                        $(".Telephone-check").hide();
                    }

                },

                failure: function (e) {
                }
            });

        }


    } catch (ex) {

    }
}


$(document).on("change", ".uploadProfileInput", function () {
    var triggerInput = this;
    var currentImg = $(this).closest(".pic-holder").find(".pic").attr("src");
    var holder = $(this).closest(".pic-holder");
    var wrapper = $(this).closest(".profile-pic-wrapper");
    $(wrapper).find('[role="alert"]').remove();
    var files = !!this.files ? this.files : [];
    if (!files.length || !window.FileReader) {
        return;
    }
    if (/^image/.test(files[0].type)) {
        // only image file
        var reader = new FileReader(); // instance of the FileReader
        reader.readAsDataURL(files[0]); // read the local file

        reader.onloadend = function () {
            $(holder).addClass("uploadInProgress");
            $(holder).find(".pic").attr("src", this.result);
            $(holder).append(
                '<div class="upload-loader"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>'
            );

            // Dummy timeout; call API or AJAX below
            setTimeout(() => {
                $(holder).removeClass("uploadInProgress");
                $(holder).find(".upload-loader").remove();
                // If upload successful
                if (Math.random() < 0.5) {
                    $(wrapper).append(
                        //'<div class="snackbar show" role="alert"><i class="fa fa-check-circle text-success"></i> Profile image updated successfully</div>'
                    );

                    // Clear input after upload
                    $(triggerInput).val("");

                    setTimeout(() => {
                        $(wrapper).find('[role="alert"]').remove();
                    }, 3000);
                } else {
                    $(holder).find(".pic").attr("src", currentImg);
                    $(wrapper).append(
                        '<div class="snackbar show" role="alert"><i class="fa fa-times-circle text-danger"></i> There is an error while uploading! Please try again.</div>'
                    );

                    // Clear input after upload
                    $(triggerInput).val("");
                    setTimeout(() => {
                        $(wrapper).find('[role="alert"]').remove();
                    }, 3000);
                }
            }, 1500);
        };
    } else {
        $(wrapper).append(
            '<div class="alert alert-danger d-inline-block p-2 small" role="alert">Please choose the valid image.</div>'
        );
        setTimeout(() => {
            $(wrapper).find('role="alert"').remove();
        }, 3000);
    }
});



function SetAccountType(int) {
    if (int === 1) {
        localStorage.setItem("Account", 1);
        $(".CV-div").show();
    }
    if (int === 2) {
        localStorage.setItem("Account", 2);
        $(".CV-div").hide();
    }
}
//END OF SIGN UP