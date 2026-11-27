/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2026 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Contact form (Formspree)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitButton = document.getElementById('submitButton');
        const successMessage = document.getElementById('submitSuccessMessage');
        const errorMessage = document.getElementById('submitErrorMessage');

        const showMessage = function (target) {
            successMessage.classList.add('d-none');
            errorMessage.classList.add('d-none');
            if (target) {
                target.classList.remove('d-none');
            }
        };

        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            showMessage(null);

            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }

            // フォームIDが未設定のままなら送信しない（以前のように「成功」と誤表示しない）
            if (contactForm.action.indexOf('FORMSPREE_FORM_ID') !== -1) {
                console.error('Formspree のフォームIDが設定されていません。src/pug/index.pug を確認してください。');
                showMessage(errorMessage);
                return;
            }

            submitButton.disabled = true;
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' },
                });
                if (!response.ok) {
                    throw new Error('HTTP ' + response.status);
                }
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                showMessage(successMessage);
            } catch (error) {
                console.error(error);
                showMessage(errorMessage);
            } finally {
                submitButton.disabled = false;
            }
        });
    }

});
