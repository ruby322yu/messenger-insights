$(document).on('click', '._4qba'/*'._5f0v._4wzs'*/, function(e) {
    const messages = $('[aria-label="Messages"]').eq(0);
    const messageList = messages.children('[id^="js_"]').eq(0);

    // scrape through your messages for important messages
    let messageStrings = [];
    for (const i in messageList.children()) {
        const child = messageList.children().eq(i);
        if (child.prop('tagName') === 'DIV' && !child.prop('class')) {
            // found a messsage chunk, iterate through to get individual messages
            const childMessages = child.find('.clearfix');
            // const childMessages = child.find('[class="_3oh- _58nk"]');
            for (let m = 0; m < childMessages.length; m++){
                const div = childMessages.eq(m);
                const span = div.find('[class="_3oh- _58nk"]').eq(0);
                const string = span.prop('innerText');

                // span is the element, string contains the actual message string
                messageStrings.push(string);
                
                // modify the div
                if (!important(string)) {
                    div.css('display', 'none');
                }
            }
            // child.css('background-color', 'red');
        } else if (child.prop('tagName') === 'H4') {
            console.log("New time");
            child.css('background-color', 'blue');
        } else {
            child.css('background-color', 'orange');
        }
    };

    // messageStrings contains all the message texts;
    for (const str of messageStrings) {
        // display however
        if (important(str)) {
            console.log(str);
        }
    }
});

function important(text){
    if (text.length > 1)
        return true;
    return false;
}