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