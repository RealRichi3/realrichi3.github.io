$(document).ready(function () {
    //--preloader
    removeLoader();
    $(window).on('load', function () {
        removeLoader();
            })

    //----Go to Top Button
    const toTop = document.querySelector(".gotop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > window.innerHeight / 2) {
            toTop.classList.remove('d-none');
        } else {
            toTop.classList.add('d-none');
        }
    });

    //----Color Theme Selector
    document.querySelector('.color-selector-btn').onclick = () => {
        document.querySelector('.color-selector').classList.toggle('active');
    };
    let themeButton = document.querySelectorAll('.theme-btn');
    themeButton.forEach(color => {
        color.addEventListener('click', () => {
            let dataColor = color.getAttribute('data-color');
            document.querySelector(':root').style.setProperty('--main-solid-color', dataColor);
        });
    });

    //---- OwlCarousel slider
    $(".owl-carousel").owlCarousel({
        autoplay: true,
        autoplayTimeout: 2800,
        loop: true,
        items: 1,
        responsive: {
            480: { items: 1 },  // from zero to 480 screen width 4 items
            768: { items: 2 },  // from 480 screen widthto 768 6 items
            1024: { items: 3 }  // from 768 screen width to 1024 8 items
        },
    });

    //---- Counter effect
    $('.counter').counterUp({
        delay: 80,
        time: 2800
    });

    //--------Menu Scroll effect start
    let section = document.querySelectorAll('section');
    let navlinks = document.querySelectorAll('.menu a');

    window.onscroll = () => {
        section.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 100;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navlinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('.menu a[href*=' + id + ']').classList.add('active');
                });
            }
        });
    };
    //--------Menu Scroll effect end

    //--------Slide Menu start
    document.querySelector('.hidden-menu-bar').onclick = () => {
        document.querySelector('.hidden-slidebar').classList.toggle('active');
    };
    document.querySelector('.close').onclick = () => {
        document.querySelector('.hidden-slidebar').classList.toggle('active');
    };
    $('.mobile-menu-list a').on('click', function () {
        document.querySelector('.hidden-slidebar').classList.toggle('active');
    });
    //--------Slide Menu end

    //------Portfolio navbar active start
    navbar = document.querySelector(".portfolio-nav").querySelectorAll("button");

    navbar.forEach(element => {
        element.addEventListener("click", function () {
            navbar.forEach(nav => nav.classList.remove("active"))

            this.classList.add("active");
        })
    });
    //------Portfolio navbar active end

    //------Portfolio image sorting start
    $(window).on("load", function () {
        let pfContainer = $('.portfolioContainer');
        pfContainer.isotope({
            filter: '*',
            animationOptions: {
                queue: true
            }
        });
        $('.portfolio-nav button').on('click', function () {
            $('.portfolio-nav .current').removeClass('current');
            $(this).addClass('current');
            let selector = $(this).attr('data-filter');
            pfContainer.isotope({
                filter: selector,
                animationOptions: {
                    queue: true
                }
            });

            Waypoint.refreshAll();
            return false;
        });
    });
    //------Portfolio image sorting end

    //---- About Animation start
    const aboutWp1 = new Waypoint({
        element: $('.about_animate_01'),
        handler: function (direction) {
            startAboutAnimation();
        },
        offset: '70%'
    });

    const aboutWp4 = new Waypoint({
        element: $('.about_animate_04'),
        handler: function (direction) {
            $('.about_animate_04').addClass('animated slideInUp');
        },
        offset: '80%'
    });
    //---- About Animation end

    //---- Resume Animation start
    const resumeWp1 = new Waypoint({
        element: $('.resume_animate_01'),
        handler: function (direction) {
            startresumeAnimation();
        },
        offset: '85%'
    });

    const resumeWp4 = new Waypoint({
        element: $('.resume_animate_04'),
        handler: function (direction) {
            $('.resume_animate_04').addClass('animated zoomIn');
        },
        offset: '95%'
    });

    const resumeWp5 = new Waypoint({
        element: $('.resume_animate_05'),
        handler: function (direction) {
            $('.resume_animate_05').addClass('animated zoomIn');
        },
        offset: '90%'
    });
    //---- Resume Animation end

    //---- Portfolio Animation start
    $('.port_animate_01').waypoint(function (direction) {
        startportAnimation();
    }, {
        offset: '85%'
    });
    //---- Portfolio Animation end


    //---- Blogs Animation start
    const blogWp = new Waypoint({
        element: $('.blog_animate_01'),
        handler: function (direction) {
            startblogAnimation();
        },
        offset: '85%'
    });
    //---- Blogs Animation end

    //---- Contact Animation start
    const contactWp1 = new Waypoint({
        element: $('.contact_animate_01'),
        handler: function (direction) {
            startcontactAnimation();
        },
        offset: '80%'
    });

    const contactWp4 = new Waypoint({
        element: $('.contact_animate_04'),
        handler: function (direction) {
            $('.contact_animate_04').addClass('animated jackInTheBox');
        },
        offset: '85%'
    });

    const contactWp5 = new Waypoint({
        element: $('.contact_animate_05'),
        handler: function (direction) {
            $('.contact_animate_05').addClass('animated jackInTheBox');
        },
        offset: '85%'
    });

    const contactWp6 = new Waypoint({
        element: $('.contact_animate_06'),
        handler: function (direction) {
            $('.contact_animate_06').addClass('animated jackInTheBox');
        },
        offset: '85%'
    });

    const contactWp7 = new Waypoint({
        element: $('.contact_animate_07'),
        handler: function (direction) {
            $('.contact_animate_07').addClass('animated bounceInUp');
        },
        offset: '80%'
    });
    //---- Contact Animation end
});


//========= Functions Start ======

//--preloader
function removeLoader() {
    $('.preloader').addClass('complete');
    $('.loader').fadeOut(200);
    setTimeout(function () {
        $(".preloader").css('z-index', '-1000');
        $("body").css("overflow", "auto");
    }, 1000);
}
//---- about start
function startAboutAnimation() {
    $('.about_animate_01').addClass('animated slideInLeft');

    setTimeout(function () {
        $('.about_animate_02').addClass('animated slideInUp');
    }, 450);

    setTimeout(function () {
        $('.about_animate_03').addClass('animated slideInRight');
    }, 450);
}

//---- about end

//---- services start
function startservicesAnimation() {
    $('.services_animate_01').addClass('animated slideInLeft');

    setTimeout(function () {
        $('.services_animate_02').addClass('animated slideInUp');
    }, 650);
}

//---- services end

//---- resume start
function startresumeAnimation() {
    $('.resume_animate_01').addClass('animated slideInLeft');

    setTimeout(function () {
        $('.resume_animate_02').addClass('animated slideInLeft');
    }, 550);
    setTimeout(function () {
        $('.resume_animate_03').addClass('animated slideInRight');
    }, 600);
}

//---- resume end

//---- Portfolio start
function startportAnimation() {
    $('.port_animate_01').addClass('animated slideInLeft');

    setTimeout(function () {
        $('.port_animate_02').addClass('animated slideInUp');
    }, 550);
    setTimeout(function () {
        $('.port_animate_03').addClass('animated zoomIn');
    }, 400);
}

//---- Portfolio end

//---- Test start
function starttestAnimation() {
    $('.test_animate_01').addClass('animated slideInLeft');
}
//---- Test end


//---- Blogs Animation start
function startblogAnimation() {
    $('.blog_animate_01').addClass('animated slideInLeft');

    setTimeout(function () {
        $('.blog_animate_02').addClass('animated fadeInLeft');
    }, 550);
    setTimeout(function () {
        $('.blog_animate_03').addClass('animated fadeInRight');
    }, 600);
}

//---- Blogs Animation end

//---- contact start
function startcontactAnimation() {
    $('.contact_animate_01').addClass('animated slideInLeft');

    setTimeout(function () {
        $('.contact_animate_02').addClass('animated fadeInBottomLeft');
    }, 450);
    setTimeout(function () {
        $('.contact_animate_03').addClass('animated fadeInBottomRight');
    }, 650);
}

//---- contact end

const baseURL = "https://richie-mail-server.herokuapp.com/api"
//---- contact mail start
$('#contact-form').on('submit', function (e) {
    e.preventDefault();
    let submitBtn = $('button', $(this));
    submitBtn.prop('disabled', true);
    var formData = $(this).serializeArray();
    var handlerUrl = $(this).attr('action');

    let config = {
        method: 'post',
        url: `${baseURL}/contactform/submit`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            email: document.getElementById("email").value,
            name: document.getElementById("name").value,
            message: document.getElementById("email-message").value
        }
    };

    axios(config)
        .then((response) => {
            console.log(response)
            if (response.status == 200) {
                alert("Success")
            } else {
                alert("An error occured")
            }
        })
        .catch(function (error) {
            console.log(error)
            alert('Something went wrong.');
            submitBtn.prop('disabled', false);
        });
    return false;
});


//---- contact mail end

//========= Functions End ======