function save_options() {
  var topics = document.getElementById('keywords').value.split(',');
  var friends = document.getElementById('friends').value.split(',');
  var ignore_friends = document.getElementById('ignore').value.split(',');
  chrome.storage.sync.set({
    topics: topics,
    friends: friends,
    ignore_friends : ignore_friends
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    topics: [],
    friends: [],
    ignore_friends: []
  }, function(items) {
    document.getElementById('keywords').value = items.topics;
    document.getElementById('friends').value = items.friends;
    document.getElementById('ignore').value = items.ignore_friends;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);