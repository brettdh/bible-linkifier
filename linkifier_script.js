// The background page is asking us to find an address on the page.
if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    sendResponse(findAddress());
  });
}

function matchScriptureReference(str) {
    var books = [
        "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", 
        "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", 
        "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", 
        "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", 
        "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", 
        "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", 
        "Amos", "Obadiah", "Jonah", "Micah", "Nahum", 
        "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", 

        "Matthew", "Mark", "Luke", "John", "Acts", "Romans", 
        "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", 
        "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", 
        "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", 
        "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", 
        "Revelation",
    ];

    var books_re_group = books.join("|");
    var re = new RegExp(books_re_group + "");
    // TODO: continue.
    return null;
}

// Search the text nodes for scripture references and linkify them.
// Return the number of references found.
var findScriptureReference = function() {
  var found;
  var node = document.body;
  var done = false;
  while (!done) {
    done = true;
    for (var i = 0; i < node.childNodes.length; ++i) {
      var child = node.childNodes[i];
      if (child.textContent.match(re)) {
        node = child;
        found = node;
        done = false;
        break;
      }
    }
  }
  if (found) {
    var text = "";
    if (found.childNodes.length) {
      for (var i = 0; i < found.childNodes.length; ++i) {
        text += found.childNodes[i].textContent + " ";
      }
    } else {
      text = found.textContent;
    }
    var match = re.exec(text);
    if (match && match.length) {
      console.log("found: " + match[0]);
      var trim = /\s{2,}/g;
      return match[0].replace(trim, " ");
    } else {
      console.log("bad initial match: " + found.textContent);
      console.log("no match in: " + text);
    }
  }
  return null;
}

