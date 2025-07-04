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