//const topics = ["hackathons", "facebook", "food"];
//const friends = ["Henry", "Emma"];
//const ignore_friends = ["James"];
let topics = [];
let friends = [];
let ignore_friends = [];
let min_reacts = 2;
let always_ignore = false;

const Filters = {
    unreadMessagesButton: '._5f0v._4wzs',
    messages: '[aria-label="Messages"]',
    messageList: '[id^="js_"]',
    childMessages: '.clearfix._o46._3erg',
    messageSpan: '[class="_3oh- _58nk"]',
    react: '._4kf5._4kf6',
    seen: '[class="_4jzq _jf4"]',
}

chrome.storage.sync.get(['ignore_friends', 'topics', 'friends'], function(items) {
    if(typeof items.topics !== 'undefined') topics = items.topics;
    if(typeof items.friends !== 'undefined') friends = items.friends;
    if(typeof items.ignore_friends !== 'undefined') ignore_friends = items.ignore_friends;
    if(typeof items.min_reacts !== 'undefined') min_reacts = items.min_reacts;
    if(typeof items.always_ignore !== 'undefined') always_ignore = items.always_ignore;
})

$(document).on('click', '._4qba'/*Filters.unreadMessagesButton*/, function(e) {
    const messages = $(Filters.messages).eq(0);
    const messageList = messages.children(Filters.messageList).eq(0);
    // scrape through your messages for important messages
    const sendData = [];
    for (const i in messageList.children()) {
        const child = messageList.children().eq(i);
        if (child.prop('tagName') === 'DIV' && !child.prop('class')) {
            const sender = child.find('h5');
            const senderName = sender.eq(0).prop("innerText");
            // found a messsage chunk, iterate through to get individual messages
            const curr = {
                chunk: child.clone(),
                use: [],
            };
            
            const childMessages = child.find(Filters.childMessages);
            for (let m = 0; m < childMessages.length; m++){
                const div = childMessages.eq(m);
                const span = div.find(Filters.messageSpan).eq(0);
                const react = div.find(Filters.react).eq(0);
                if (react){
                    numReacts = react.prop('innerText');
                }
                else{
                    numReacts = 0;
                } 
                const string = span.prop('innerText');
                // span is the element, string contains the actual message string
                // messageStrings.push(string);
                
                if (important(string, senderName, numReacts)) {
                    curr.use.push(true);
                } else {
                    curr.use.push(false);
                }
            }
            sendData.push(curr);
        } else if (child.prop('tagName') === 'H4') {
            console.log("New time");
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
    $("body").append(`
        <div id="wholeModal" class="_10 _4ebx uiLayer _4-hy _3qw" style="min-width: 906px;">
            <div class="_3ixn"></div>
            <div class="_59s7" role="dialog" style="width: 544px; margin-top: 131px;">
                <div class="_4t2a">
                    <div class="_4eby _2c9i">
                        <h2 class="_4ebz">
                            <div class="_19jt">
                                <em class="_4qba" data-intl-translation="Settings" data-intl-trid="">
                                    Your message queue
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
                        <div style="overflow-y:scroll; height:400px; font-size:14px">
                            <div id="insert" style="margin-left:10px; padding-left:10px">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    );

    /*
     * data is in the format
     *  [{
     *    chunk: <div>...</div>
     *    use: [],
     *  }]
     * 
     * We append the entire chunk immediately,
     * then iterate through each of the messages and check use[] to see which ones we ignore
     * we do some complicated shit to give context across chunks
     */

    previousLength = 0;
    currentLength = 0;
    for (let i = 0, len = data.length; i < len; i++) {
        const childMessages = data[i].chunk.find(Filters.childMessages);
        previousLength = currentLength;
        currentLength = childMessages.length;
        let addChunk = false;

        //For each message inside a chunk
        for (let j = 0; j < childMessages.length; j++) {
            //Case 1: The message is relevant and so we must highlight it
            if (data[i].use[j]) {
                //If a message is relevant, then we highlight it
                childMessages.eq(j).find(Filters.messageSpan).eq(0).css('background-color', 'yellow');
                addChunk = true;
            
            //Case 2: The message is the first in a non-first chunk, and the last message in the previous chunk is relevant
            } else if (j == 0 && i != 0) {
                if (data[i-1].use[previousLength-1]) {
                    addChunk = true;
                } else {
                    childMessages.eq(j).css('display', 'none');
                }

            //Case 3: The message is the last in a non-last chunk, and the first message in the chunk after it is relevant
            } else if (j == currentLength - 1 && i < len - 1) {
                if (data[i+1].use[0]) {
                    addChunk = true;
                } else {
                    childMessages.eq(j).css('display', 'none');
                }

            //Case 4: The message is is directly before or after a relevant message in the same chunk 
            } else {
                //Hide any messages in the chunk that aren't directly before or after it
                if ((j > 1 && data[i].use[j-1]) || (j < childMessages.length-1 && data[i].use[j+1])) {
                    addChunk = true;
                } else {
                    childMessages.eq(j).css('display', 'none');
                }
            }
        }
        if (addChunk)
            $("#insert").append(data[i].chunk);
    }
    $("#insert").find(Filters.seen).eq(0).css('display', 'none');
    $('body').on('click', '#closeModal', function() {
        $('#wholeModal').remove();
    });
    $('body').on('click', '._3ixn', function() {
        $('#wholeModal').remove();
    });
}
