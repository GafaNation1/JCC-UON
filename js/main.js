(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.nav-bar').addClass('fixed-top').css('padding', '0');
        } else {
            $('.nav-bar').removeClass('fixed-top').css('padding', '0px 90px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Donation progress
    $('.donation-item .donation-progress').waypoint(function () {
        $('.donation-item .progress .progress-bar').each(function () {
            $(this).css("height", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'rotateOutUpRight',
        animateIn: 'rotateInDownLeft',
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    
})(jQuery);


function sendToWhatsApp() {
    // Grabbing the values from the form IDs
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const phone = document.getElementById('userPhone').value;

    // Basic check to ensure fields aren't empty
    if (name === "" || email === "" || phone === "") {
        alert("Please fill in all the details before connecting.");
        return;
    }

    // Creating the message (using * for bold text in WhatsApp)
    const message = "Hello UoN JCC! %0A%0A" + 
                    "I would like to join the community. Here are my details:%0A" +
                    "*Name:* " + name + "%0A" +
                    "*Email:* " + email + "%0A" +
                    "*Phone:* " + phone;

    // The WhatsApp link (using your contact number)
    const whatsappUrl = "https://wa.me/254705047204?text=" + message;

    // Opens WhatsApp in a new tab
    window.open(whatsappUrl, '_blank').focus();
}


document.addEventListener('DOMContentLoaded', function() {
    const joinForm = document.getElementById('joinForm');

    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('joinName').value.trim();
            const email = document.getElementById('joinEmail').value.trim();
            const phone = document.getElementById('joinPhone').value.trim();
            const year = document.getElementById('joinYear').value;
            const message = document.getElementById('joinMessage').value.trim();
            const campusWhatsApp = this.getAttribute('data-phone');

            const fullMessage = `*New Membership Request*\n\n` +
                                `*Name:* ${name}\n` +
                                `*Email:* ${email}\n` +
                                `*Phone:* ${phone}\n` +
                                `*Year:* ${year}\n\n` +
                                `*Message:* ${message}`;

            const encodedMessage = encodeURIComponent(fullMessage);

            // More reliable URL format for pre-filled messages
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${campusWhatsApp}&text=${encodedMessage}`;

            const successMsg = document.getElementById('joinSuccessMessage');
            if (successMsg) successMsg.style.display = 'block';

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');

                setTimeout(() => {
                    joinForm.reset();
                    if (successMsg) successMsg.style.display = 'none';
                }, 5000);
            }, 300);
        });
    }
});