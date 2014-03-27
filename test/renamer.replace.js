var test = require("tape"),
    renamer = require("../lib/renamer"),
    Options = require("../lib/RenamerOptions");

var preset = {
    one: [ "file1.txt", "file2.txt", "folder/file3.txt"]
};

test("find string not found, nothing replaced", function(t){
    var options = new Options({
        files: preset.one,
        find: "blah",
        replace: "clive"
    });
    
    var results = renamer.replace(options);
    t.deepEqual(results, [
        { before: "file1.txt" },
        { before: "file2.txt" },
        { before: "folder/file3.txt" }
    ]);

    t.end();
});

test("simple find and replace", function(t){
    var options = new Options({
        files: preset.one,
        find: "file",
        replace: "clive"
    });
    
    var results = renamer.replace(options);
    t.deepEqual(results, [
        { before: "file1.txt", after: "clive1.txt" },
        { before: "file2.txt", after: "clive2.txt" },
        { before: "folder/file3.txt", after: "folder/clive3.txt" }
    ]);
    t.end();
});

test("case insensitive", function(t){
    var options = new Options({
        files: preset.one,
        find: "FILE",
        replace: "clive"
    });
    
    var results = renamer.replace(options);
    t.deepEqual(results, [
        { before: "file1.txt" },
        { before: "file2.txt" },
        { before: "folder/file3.txt" }
    ]);

    options.insensitive = true;
    results = renamer.replace(options);
    t.deepEqual(results, [
        { before: "file1.txt", after: "clive1.txt" },
        { before: "file2.txt", after: "clive2.txt" },
        { before: "folder/file3.txt", after: "folder/clive3.txt" }
    ]);
    t.end();
});

test("replace complex string pattern in files", function(t){
    var options = new Options({
        files: [ "...[]()£$%^...", "++[]()£$%^++" ],
        find: "[]()£$%^",
        replace: "[].*$%^"
    });
    t.deepEqual(renamer.replace(options), [
        { before: "...[]()£$%^...", after: "...[].*$%^..." },
        { before: "++[]()£$%^++", after: "++[].*$%^++" }
    ]);
    t.end();
});


test("replace all <find-string> instances", function(t){
    var options = new Options({
        files: [ "aaaaa", "rraarr" ],
        find: "a",
        replace: "b"
    });
    t.deepEqual(renamer.replace(options), [
        { before: "aaaaa", after: "bbbbb" },
        { before: "rraarr", after: "rrbbrr" }
    ]);
    t.end();
});