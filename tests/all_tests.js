$(document).ready(function(){
    test("match scripture reference", function() {
        var positive_matches = [
            "Genesis 5", "Leviticus 6:3", "1 Peter 3:1-2"
        ];
        var negative_matches = [
            "Jimbob 44:1-3", "Matthew Broderick", "Sega Genesis",
            "Judas 3", "Thomas 1:1"
        ];
        
        for (var i = 0; i < positive_matches.length; i++) {
            var str = positive_matches[i];
            ok( matchScriptureReference(str), str + " is a valid reference");
        }
        for (var i = 0; i < negative_matches.length; i++) {
            var str = negative_matches[i];
            ok( !matchScriptureReference(str), str + " is not a valid reference");
        }
    });

    test("linkify all scripture references in a string", function() {
        var strings = ["blah blee bloo ", " blargh blough ", " blaaa"]
        var refs = ["Genesis 4:3-4", "1 Chronicles 3"];
        var text = strings[0] + refs[0] + strings[1] + refs[1] + strings[2];
        var refnum = 0;
        var strnum = 0;
        var linkified = replaceScriptureReferences(text);

        var element = document.createElement("div");
        element.innerHTML = linkified;
        equal(element.childNodes.length, refs.length + strings.length, 
              "Correct number of children were created");
        for (var i = 0; i < element.childNodes.length; ++i) {
            var expected = "";
            var type = "";
            if (element.childNodes[i].nodeName == "A") {
                expected = refs[refnum++];
                type = "Link";
            } else {
                expected = strings[strnum++];
                type = "String";
            }
            equal(element.childNodes[i].textContent, expected,
                  type + " text matches");
        }
    });
});
