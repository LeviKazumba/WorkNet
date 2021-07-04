
var prof =
    '[{ "value": 1, "text": "Task 1", "continent": "Task" }, { "value": 2, "text": "Task 2", "continent": "Task" }, { "value": 3, "text": "Task 3", "continent": "Task" }, { "value": 4, "text": "Task 4", "continent": "Task" }, { "value": 5, "text": "Task 5", "continent": "Task" }, { "value": 6, "text": "Task 6", "continent": "Task" } ]';

var skillset =
    '[{ "value": 1, "text": "Task 1", "continent": "Task" }, { "value": 2, "text": "Task 2", "continent": "Task" }, { "value": 3, "text": "Task 3", "continent": "Task" }, { "value": 4, "text": "Task 4", "continent": "Task" }, { "value": 5, "text": "Task 5", "continent": "Task" }, { "value": 6, "text": "Task 6", "continent": "Task" } ]';

var IndustryList =
    '[{ "value": 1, "text": "Task 1", "continent": "Task" }, { "value": 2, "text": "Task 2", "continent": "Task" }, { "value": 3, "text": "Task 3", "continent": "Task" }, { "value": 4, "text": "Task 4", "continent": "Task" }, { "value": 5, "text": "Task 5", "continent": "Task" }, { "value": 6, "text": "Task 6", "continent": "Task" } ]';


//get data pass to json
var profession = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("text"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: jQuery.parseJSON(prof) 
});

var skill = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("text"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: jQuery.parseJSON(skillset) 
});

var industry = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("text"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: jQuery.parseJSON(IndustryList) 
});

profession.initialize();
skill.initialize();
industry.initialize();


var Professions = $("#Professions");
Professions.tagsinput({
    freeInput: true,
    addOnBlur: true,
    maxChars: 25,
    maxTags: 3,
    trimValue: true,
    cancelConfirmKeysOnEmpty: true
});

var Skills = $("#Skills");
Skills.tagsinput({
    freeInput: true,
    addOnBlur: true,
    maxChars: 25,
    maxTags: 5,
    trimValue: true,
    cancelConfirmKeysOnEmpty: true
});

var Industries = $("#Industries");
Industries.tagsinput({
    freeInput: true,
    addOnBlur: true,
    maxChars: 25,
    maxTags: 3, 
    trimValue: true,
    cancelConfirmKeysOnEmpty: true
});


//insert data to input in load page
Professions.tagsinput("add", 'Teacher',);

Skills.tagsinput("add", 'Business Studies', 'Financial consultation');

Industries.tagsinput("add", 'Education');


