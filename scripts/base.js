// Mobile Navigation

const mnavBtn = $('#m-btn');
const mnav = $('#mnavBar');

mnavBtn.click(()=>{
    mnav.toggleClass('active');
});

$(document).click(e=>{
    if(!$(e.target).closest('#m-btn, #mnavBar').length) {
         mnav.removeClass('active');
    }
});

// Links
const links = [
    { name: 'Home', url: 'home.html' },
    { name: 'Browse', url: 'browse.html' },
    { name: 'Contact', url: 'contact.html' }
]

links.forEach(link => {
    let li = $('<button>', {
        text: link.name
    }).click(() => {
        window.location.href = link.url;
    });
    
    $('#nav').append(li);
    $('#mnavBar nav').append(li.clone());
});

// Dark/Light Mode
$('#dark').click(() => {
    
    $('body').toggleClass('dark');
    
    // Icon
    if ($('#dark i').hasClass('fi-br-moon')) {
        $('#dark i').removeClass('fi-br-moon').addClass('fi-br-sun');
    } else {
        $('#dark i').removeClass('fi-br-sun').addClass('fi-br-moon');
    }
    saveTheme();
});

function saveTheme() {
    const theme = {
        isDark: $('body').hasClass('dark'),
        icon: $('#dark i').attr('class')
    };
    localStorage.setItem('theme', JSON.stringify(theme));
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
        const { isDark, icon } = JSON.parse(theme);
        
        if (isDark) {
            $('body').addClass('dark');
        }
        $('#dark i').attr('class', icon);
    }
}

loadTheme();