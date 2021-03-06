
/**
 * Saves the options.
 * @param {object} e The event.
 * @returns {undefined}
 */
function saveOptions(e) {
  browser.storage.local.set({
    hostUrl: document.querySelector('#host-url').value
  });

  e.preventDefault();
  browser.runtime.sendMessage({'req':'dictionary-update'});
}


/**
 * Loads the preferences.
 * @returns {undefined}
 */
function restoreOptions() {
  var storageItem = browser.storage.local.get('hostUrl');
  storageItem.then((res) => {
    document.querySelector('#host-url').value = res.hostUrl || 'https://raw.githubusercontent.com/rhadamanthe/host-grabber-pp-host.xml/master/hosts.xml';
  });
}


/**
 * Switches the visibility.
 * @param {object} e The default event.
 * @returns {undefined}
 */
function switchVisibility(e) {
  e.preventDefault();
  if (document.getElementById('local').style.visibility === 'none') {
    document.getElementById('local').style.visibility = 'block';
    document.getElementById('remote').style.visibility = 'none';
  } else {
    document.getElementById('local').style.visibility = 'none';
    document.getElementById('remote').style.visibility = 'block';
  }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
