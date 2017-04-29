const name = "ruby";
const topics = ["hackathons", "facebook", "food"];
const friends = ["Henry", "Emma"];
const ignore_friends = ["James"];

$(document).on('click', '._5742._1_fz'/*'._5f0v._4wzs'*/, function(e) {
    const messages = $('[aria-label="Messages"]').eq(0);
    const messageList = messages.children('[id^="js_"]').eq(0);

    // scrape through your messages for important messages
    const sendData = {
        messages: [],
        use: [],
    }
    for (const i in messageList.children()) {
        const child = messageList.children().eq(i);
        if (child.prop('tagName') === 'DIV' && !child.prop('class')) {
            const sender = child.find('h5');
            const senderName = sender.eq(0).prop("innerText");
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
                sendData.messages.push(div);
                if (important(string, senderName)) {
                    span.css('background-color', 'yellow');
                    sendData.use.push(true);
                } else {
                    sendData.use.push(false);
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
});

function important(text, sender){
    if (!text){
        return false;
    }
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
     for (const topic of topics){
        if (text.includes(topic)){
          return true;
        }
    }
    return false;
}

function popup(data) {
    const messages = data.messages;
    const use = data.use;

    // make the popup display
}