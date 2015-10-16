// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '325788407560-gj9lmkmo6ovfkmqgngrert4odh9vl6uu.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/drive'];

/**
 * Run authentication flow.
 */
function checkAuth() {
  gapi.auth.authorize({
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': false
    }, handleAuthResult);
}

/**
 * Check if current user has authorized this application.
 */
function checkImediateAuth() {
  gapi.auth.authorize({
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    loadDriveApi();
  } 
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Triggers the event indicating the loading is finished
 */
function informFinishLoading() {
  console.log('GOOGLE DRIVE API LOADDED');  

  $(document).trigger('user.logged');
}

/**
 * Trigger the event indicating the loading of google is finished
 */
function informGoogleLoaded() {
  console.log('GOOGLE API LOADDED');

  checkImediateAuth();

  $(document).trigger('user.ready'); 
}

/**
 * Load Drive API client library.
 */
function loadDriveApi() {
  gapi.client.load('drive', 'v2', informFinishLoading);
}

/**
 * Retrieve a list of File resources.
 *
 * @param {Function} callback Function to call when the request is complete.
 */
function retrieveAllFiles(callback, query) {
  var retrievePageOfFiles = function(request, result) {
    request.execute(function(resp) {
      result = result.concat(resp.items);
      var nextPageToken = resp.nextPageToken;
      if (nextPageToken) {
        request = gapi.client.drive.files.list({
          'pageToken': nextPageToken,
          'orderBy': 'title',
          'q': query
        });

        callback(result);

        //retrievePageOfFiles(request, result);
      } else {
        callback(result);
      }
    });
  }

  var initialRequest = gapi.client.drive.files.list({
    'q': query
  });

  retrievePageOfFiles(initialRequest, []);
}

/**
 * Download a file's content.
 *
 * @param {File} file Drive File instance.
 * @param {Function} callback Function to call when the request is complete.
 */
function downloadFile(file, callback) {
  if (file.downloadUrl) {
    var accessToken = gapi.auth.getToken().access_token;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file.downloadUrl);
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.onload = function() {
      callback(xhr.responseText);
    };
    xhr.onerror = function() {
      callback(null);
    };
    xhr.send();
  } else {
    callback(null);
  }
}

/**
 * Update an existing file's metadata and content.
 *
 * @param {String} fileId ID of the file to update.
 * @param {Object} fileMetadata existing Drive file's metadata.
 * @param {File} fileData File object to read data from.
 * @param {Function} callback Callback function to call when the request is complete.
 * 
 * OBS: Changed to use text data instead of a file parameter
 */
function updateFile(fileId, fileMetadata, fileData, callback) {
  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";

  var contentType = 'text/plain; charset=utf-8';
  // Updating the metadata is optional and you can instead use the value from drive.files.get.
  var base64Data = btoa(unescape(encodeURIComponent(fileData)));
  var multipartRequestBody =
      delimiter +
      'Content-Type: application/json\r\n\r\n' +
      JSON.stringify(fileMetadata) +
      delimiter +
      'Content-Type: ' + contentType + '\r\n' +
      'Content-Transfer-Encoding: base64\r\n' +
      '\r\n' +
      base64Data +
      close_delim;

  var request = gapi.client.request({
      'path': '/upload/drive/v2/files/' + fileId,
      'method': 'PUT',
      'params': {'uploadType': 'multipart', 'alt': 'json'},
      'headers': {
        'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
      },
      'body': multipartRequestBody});
  if (!callback) {
    callback = function(file) {
      console.log(file)
    };
  }
  request.execute(callback);
}

function insertFile(fileData, fileName, callback) {
  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";

  var contentType = 'text/plain; charset=utf-8';
  var metadata = {
    'title': fileName,
    'mimeType': contentType
  };

  var base64Data = btoa(unescape(encodeURIComponent(fileData)));
  var multipartRequestBody =
      delimiter +
      'Content-Type: application/json\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: ' + contentType + '\r\n' +
      'Content-Transfer-Encoding: base64\r\n' +
      '\r\n' +
      base64Data +
      close_delim;

  var request = gapi.client.request({
      'path': '/upload/drive/v2/files',
      'method': 'POST',
      'params': {'uploadType': 'multipart'},
      'headers': {
        'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
      },
      'body': multipartRequestBody});
  if (!callback) {
    callback = function(file) {
      console.log(file)
    };
  }

  request.execute(callback);
}