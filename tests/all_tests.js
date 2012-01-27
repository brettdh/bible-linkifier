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
});
