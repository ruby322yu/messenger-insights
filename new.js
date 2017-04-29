$(document).on('click', '._4qba'/*'._5f0v._4wzs'*/, function(e) {
    const messages = $('[aria-label="Messages"]').eq(0);
    console.log(messages);
    const messageList = messages.children('[id^="js_"]').eq(0);
    console.log(messageList);
    for (const i in messageList.children()) {
        const child = messageList.children().eq(i);
        if (child.prop('tagName') === 'DIV') {
            // child.children('._3oh-_58nk').each(function() {
            //     console.log(child.innerText);
            //     child.css('background-color', 'green');
            // });
            console.log("found");
            
            //console.log(messages);
            const allmessages = child.find('[class="_3oh- _58nk"]');
            for (let m = 0; m < allmessages.length; m++){
                const message = allmessages.eq(m);

                console.log(message.prop('innerText'));
                message.css('background-color', 'green');
            }
            child.css('background-color', 'red');
        } else if (child.prop('tagName') === 'H4') {
            console.log("New time");
            child.css('background-color', 'blue');
        }
    };
});

function important(text){
    return false;
}