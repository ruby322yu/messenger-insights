const name = "Ruby";
const topics = ["hackathons", "facebook", "food"];
const friends = ["Henry", "Emma"];
const ignore_friends = ["James"];

$(document).on('click', '._4qba'/*'._5f0v._4wzs'*/, function(e) {
    const messages = $('[aria-label="Messages"]').eq(0);
    console.log(messages);
    const messageList = messages.children('[id^="js_"]').eq(0);
    console.log(messageList);
    for (const i in messageList.children()) {
        const child = messageList.children().eq(i);
        if (child.prop('tagName') === 'DIV') {
            const sender = child.find('h5');
            const senderName = sender.eq(0).prop("innerText");
            // child.children('._3oh-_58nk').each(function() {
            //     console.log(child.innerText);
            //     child.css('background-color', 'green');
            // });
            console.log("found",senderName);
            
            //console.log(messages);
            const allmessages = child.find('[class="_3oh- _58nk"]');
            for (let m = 0; m < allmessages.length; m++){
                const message = allmessages.eq(m).prop('innerText');
                console.log(message);
                if (important(message,senderName)){
                    console.log(message, "is important");
                    allmessages.eq(m).css('background-color', 'green');
                }
            }
            child.css('background-color', 'red');
        } else if (child.prop('tagName') === 'H4') {
            console.log("New time");
            child.css('background-color', 'blue');
        }
    };
});

function important(text, sender){
    text = text.toLowerCase();
    if (text.includes(name)){
        return true;
    }
    if (friends.indexOf(sender)> -1){
        return true;
    }
    if (ignore_friends.indexOf(sender) > -1){
        return false;
    }
    // for (const topic: topics){
    //     if (text.includes(topic)){
    //       return true;
    //     }
    // }
    return false;
}