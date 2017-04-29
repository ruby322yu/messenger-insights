//const topics = ["hackathons", "facebook", "food"];
//const friends = ["Henry", "Emma"];
//const ignore_friends = ["James"];
let topics = [];
let friends = [];
let ignore_friends = [];

chrome.storage.sync.get(['ignore_friends', 'topics', 'friends'], function(items) {
    if(typeof items.topics !== 'undefined') topics = items.topics;
    if(typeof items.friends !== 'undefined') friends = items.friends;
    if(typeof items.ignore_friends !== 'undefined') ignore_friends = items.ignore_friends;
})

$(document).on('click', '._4qba'/*'._5f0v._4wzs'*/, function(e) {
    const messages = $('[aria-label="Messages"]').eq(0);
    const messageList = messages.children('[id^="js_"]').eq(0);
    // console.log(topics);
    // console.log(friends);
    // console.log(ignore_friends);
    // scrape through your messages for important messages
    let messageStrings = [];
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
                if (!important(string, senderName)) {
                    div.css('display', 'none');
                    console.log(string);
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

    // // messageStrings contains all the message texts;
    // for (const str of messageStrings) {
    //     // display however
    //     if (important(str)) {
    //         console.log(str);
    //     }
    // }
});

function important(text, sender){
    if (!text){
        return false;
    }
    text = text.toLowerCase();
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