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
                // messageStrings.push(string);
                
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

    popup(sendData);

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

function popup(data) {
    const messages = data.messages;
    const use = data.use;

    // var bmdiv = document.createElement('div');
    // bmdiv.setAttribute('id', 'myDiv');

    // var str = bmdiv.innerHTML = str;

    $("body").append(`
        <div class="_10 _4ebx uiLayer _4-hy _3qw" style="min-width: 886px;">
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
                                    <em class="_4qba" data-intl-translation="Done" data-intl-trid="">
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
    // document.getElementsByClassName('_3ixn')[0].innerHTML += '<div class="_59s7" role="dialog" style="width: 544px; margin-top: 131px;"><div class="_4t2a"><div><div><div><div class="_4eby _2c9i"><h2 class="_4ebz"><div class="_19jt"><em class="_4qba" data-intl-translation="Settings" data-intl-trid="">Settings</em></div><span class="_30vt"><button class="_3quh _30yy _2t_ _5ixy" tabindex="0"><em class="_4qba" data-intl-translation="Done" data-intl-trid="">Done</em></button></span></h2><div class="_374b"><div class="_374c"><em class="_4qba" data-intl-translation="Account" data-intl-trid="">Account</em></div><div class="_374d"><div class="_3xld _1u5d clearfix" direction="left"><div class="_ohe lfloat"><div class="_1u5h img _8o _8s"><div class="_4ldz" style="width: 34px; height: 34px;"><div class="_4ld-" style="width: 34px; height: 34px;"><img alt="" height="34" src="https://scontent.xx.fbcdn.net/v/t1.0-1/c71.42.469.469/s32x32/10616262_10206299682195065_1368028286112963457_n.jpg?oh=4e855342d148d86961f3e19b2d22fc32&amp;oe=5980ED74" width="34" class="img"></div><div class="_4ld_ _2pom"><div class="_2pon _2poo"></div></div></div></div></div><div class=""><div class="_42ef clearfix" direction="right"><div class="_ohf rfloat"><a title="Go Offline" href="#"><div class="_3dwl _337l"><div class="_3dwf _3dwk"></div></div></a></div><div class=""><div class="_1u5i"><div class="_364g">Emma Young</div></div></div></div></div></div></div></div><div class="_374b"><div class="_374c"><em class="_4qba" data-intl-translation="Sounds" data-intl-trid="">Sounds</em></div><div class="_374d"><label class="_55sg _4ng2 _kv1"><input type="checkbox" value="on"><span></span></label><span class="_1pr_"><em class="_4qba" data-intl-translation="Enabled" data-intl-trid="">Enabled</em></span></div></div><div class="_374b"><div class="_374c"><em class="_4qba" data-intl-translation="Notifications" data-intl-trid="">Notifications</em></div><div class="_374d"><label class="_55sg _4ng2 _kv1"><input type="checkbox" value="on"><span></span></label><span class="_1pr_"><em class="_4qba" data-intl-translation="Desktop notifications enabled" data-intl-trid="">Desktop notifications enabled</em></span></div></div><div class="_374b"><div class="_374c"><em class="_4qba" data-intl-translation="Blocking" data-intl-trid="">Blocking</em></div><div class="_374d"><a target="_blank" href="https://www.facebook.com/settings?tab=blocking"><em class="_4qba" data-intl-translation="Manage on Facebook" data-intl-trid="">Manage on Facebook</em></a></div></div><div class="_374b"><div class="_374c"><em class="_4qba" data-intl-translation="Emoji" data-intl-trid="">Emoji</em></div><div class="_374d _5jb0"><div class="_5f0v uiScrollableArea fade"><div class="uiScrollableAreaWrap scrollable" id="js_174q"><div class="uiScrollableAreaBody"><div class="uiScrollableAreaContent"><table cols="6" class="_3-s_ uiGrid _51mz" cellspacing="0" cellpadding="0"><tbody><tr class="_51mx"><td class="_3-sy _51m-"><div class="_4rlt _4rlu"><div aria-label="Pick an Emoji" role="button" tabindex="1"><img class="_1lih _1ift _1ifu img" src="https://static.xx.fbcdn.net/images/emoji.php/v8/zb6/1/32/1f44d.png" alt="" style="margin: 0px;"></div></div></td><td class="_3-sy _51m-"><div class=" _4rlu"><div aria-label="Pick an Emoji" role="button" tabindex="1"><img class="_1lih _1ift _1ifu img" src="https://static.xx.fbcdn.net/images/emoji.php/v8/zb1/1/32/1f44d_1f3fb.png" alt="" style="margin: 0px;"></div></div></td><td class="_3-sy _51m-"><div class=" _4rlu"><div aria-label="Pick an Emoji" role="button" tabindex="1"><img class="_1lih _1ift _1ifu img" src="https://static.xx.fbcdn.net/images/emoji.php/v8/z32/1/32/1f44d_1f3fc.png" alt="" style="margin: 0px;"></div></div></td><td class="_3-sy _51m-"><div class=" _4rlu"><div aria-label="Pick an Emoji" role="button" tabindex="1"><img class="_1lih _1ift _1ifu img" src="https://static.xx.fbcdn.net/images/emoji.php/v8/zb3/1/32/1f44d_1f3fd.png" alt="" style="margin: 0px;"></div></div></td><td class="_3-sy _51m-"><div class=" _4rlu"><div aria-label="Pick an Emoji" role="button" tabindex="1"><img class="_1lih _1ift _1ifu img" src="https://static.xx.fbcdn.net/images/emoji.php/v8/z34/1/32/1f44d_1f3fe.png" alt="" style="margin: 0px;"></div></div></td><td class="_3-sy _51mw _51m-"><div class=" _4rlu"><div aria-label="Pick an Emoji" role="button" tabindex="1"><img class="_1lih _1ift _1ifu img" src="https://static.xx.fbcdn.net/images/emoji.php/v8/zb5/1/32/1f44d_1f3ff.png" alt="" style="margin: 0px;"></div></div></td></tr></tbody></table></div></div></div><div class="uiScrollableAreaTrack hidden_elem"><div class="uiScrollableAreaGripper hidden_elem"></div></div></div></div></div></div></div></div></div></div></div>';
    


    // make the popup display
}