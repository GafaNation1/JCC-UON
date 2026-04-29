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


document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.getElementById('joinForm');

    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page from refreshing

            // 1. Get field values
            const name = document.getElementById('joinName').value;
            const email = document.getElementById('joinEmail').value;
            const phone = document.getElementById('joinPhone').value;
            const year = document.getElementById('joinYear').value;
            const message = document.getElementById('joinMessage').value;
            
            // 2. Get the specific phone number from the form's data attribute
            const campusWhatsApp = this.getAttribute('data-phone');

            // 3. Format the text (using * for bold in WhatsApp)
            const text = `*New Membership Request*%0A` +
                         `--------------------------%0A` +
                         `*Name:* ${name}%0A` +
                         `*Email:* ${email}%0A` +
                         `*Phone:* ${phone}%0A` +
                         `*Year:* ${year}%0A` +
                         `*Message:* ${message}`;

            // 4. Construct URL
            const whatsappUrl = `https://wa.me/${campusWhatsApp}?text=${encodeURIComponent(text).replace(/%250A/g, '%0A')}`;

            // 5. User Feedback
            const successMsg = document.getElementById('joinSuccessMessage');
            if (successMsg) {
                successMsg.style.display = 'block';
            }

            // 6. Open WhatsApp & Reset Form
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                joinForm.reset();
                if (successMsg) successMsg.style.display = 'none';
            }, 1000); 
        });
    }
});