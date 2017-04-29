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
            child.css('background-color', 'red');
        } else if (child.prop('tagName') === 'H4') {
            console.log("New time");
            child.css('background-color', 'blue');
        }
    };
});