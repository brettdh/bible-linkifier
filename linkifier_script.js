// The background page is asking us to find an address on the page.
if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    sendResponse(replaceAllScriptureReferences());
  });
}

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
var books_re_group = "(" + books.join("|") + ")";

var not_inside_tag_re = "(>[^<>]*)";

var scripture_ref_re_pattern = 
    not_inside_tag_re + 
    "(" + 
    books_re_group + 
    "\\s+[0-9]+" + // chapter number (required)
    // verse range (optional)
    "(?::" +
    "[0-9]+" + // single verse number
    "(?:-[0-9]+)?" + // verse range endpoint (optional)
    ")?" + // end optional verse range
    ")"; // end scripture reference group
    
var scripture_reference_regex = 
    new RegExp(scripture_ref_re_pattern, "gi");


function matchScriptureReference(text) {
    scripture_reference_regex.lastIndex = 0;
    if (scripture_reference_regex.exec(text)) {
        return true;
    }
    return false;
}

function linkifySingleScriptureReference(match, preamble, reference) {
    var baseSearchURL = "http://www.biblegateway.com/passage/?search=";
    var url = baseSearchURL + encodeURIComponent(reference);
    var newString = preamble + '<a href="' + url + '">' + reference + '</a>';
    return newString;
}

function replaceScriptureReferences(text) {
    scripture_reference_regex.lastIndex = 0;
    return text.replace(scripture_reference_regex, function(match, preamble, reference) {
        return linkifySingleScriptureReference(match, preamble, reference);
    });
}

function shouldNotLinkify(node) {
    var blacklist = ["A", "INPUT"];
    if ($.inArray(node.nodeName, blacklist) != -1) {
        return true;
    }
    return false;
}

// Search the text nodes for scripture references and linkify them.
// Return the number of references found.
var replaceAllScriptureReferences = function() {
    var num_replaced = 0;

    // breadth-first search through the DOM tree
    var nodes_to_explore = [document.body];
    while (nodes_to_explore.length > 0) {
        var node = nodes_to_explore.shift();

        for (var i = 0; i < node.childNodes.length; ++i) {
            nodes_to_explore.push(node.childNodes[i]);
        }
        if (shouldNotLinkify(node)) {
            continue;
        }

        var jnode = $(node);
        var htmlContent = jnode.html();
        if (htmlContent != null) {
            jnode.html(replaceScriptureReferences(htmlContent));
        }
    }
    return num_replaced;
}
