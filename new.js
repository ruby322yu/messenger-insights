//const topics = ["hackathons", "facebook", "food"];
//const friends = ["Henry", "Emma"];
//const ignore_friends = ["James"];
let topics = [];
let friends = [];
let ignore_friends = [];
let min_reacts = 2;
let always_ignore = false;

chrome.storage.sync.get(['ignore_friends', 'topics', 'friends'], function(items) {
    if(typeof items.topics !== 'undefined') topics = items.topics;
    if(typeof items.friends !== 'undefined') friends = items.friends;
    if(typeof items.ignore_friends !== 'undefined') ignore_friends = items.ignore_friends;
    if(typeof items.min_reacts !== 'undefined') min_reacts = items.min_reacts;
    if(typeof items.always_ignore !== 'undefined') always_ignore = items.always_ignore;
})

$(document).on('click', '._4qba'/*'._5f0v._4wzs'*/, function(e) {
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
                const react = div.find('._4kf5._4kf6').eq(0);
                if (react){
                    numReacts = react.prop('innerText');
                }
                else{
                    numReacts = 0;
                } 
                const string = span.prop('innerText');
                // span is the element, string contains the actual message string
                // messageStrings.push(string);
                
                // modify the div
                sendData.messages.push(div);
                if (important(string, senderName, numReacts)) {
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

    popup(sendData);

});

function important(text, sender, reacts){
    if (!text){
        return false;
    }
    if (always_ignore && ignore_friends.indexOf(sender) > -1){
        return false;
    }
    if (numReacts >= min_reacts) {
        return true;
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

function popup(data) {
    const messages = data.messages;
    const use = data.use;

    // var bmdiv = document.createElement('div');
    // bmdiv.setAttribute('id', 'myDiv');

    // var str = bmdiv.innerHTML = str;

    $("body").append(`
        <div id="wholeModal" class="_10 _4ebx uiLayer _4-hy _3qw" style="min-width: 886px;">
            <div class="_3ixn"></div>
            <div class="_59s7" role="dialog" style="width: 544px; margin-top: 131px;">
                <div class="_4t2a">
                    <div class="_4eby _2c9i">
                        <h2 class="_4ebz">
                            <div class="_19jt">
                                <em class="_4qba" data-intl-translation="Settings" data-intl-trid="">
                                    Hello World
                                </em>
                            </div>
                            <span class="_30vt">
                                <button class="_3quh _30yy _2t_ _5ixy" tabindex="0">
                                    <em id="closeModal" data-intl-translation="Done" data-intl-trid="">
                                        Done
                                    </em>
                                </button>
                            </span>
                        </h2>
                        <div class="_374b">
                            hello world
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    );
    $('body').on('click', '#closeModal', function() {
        $('#wholeModal').remove();
    });
    $('body').on('click', '._3ixn', function() {
        $('#wholeModal').remove();
    });
}