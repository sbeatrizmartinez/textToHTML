var input = document.querySelector('input');
var resumeObj = []; 


input.addEventListener('change', () => {
    //Get File and convert it to Json Object
    var files = input.files;
    if (files.length == 0) return;
    if (txtExtInvalid()) return;

    const file = files[0];

    var reader = new FileReader();
    reader.onload = (e) => {
        const file = e.target.result;
        resumeObj = file.split('\n');

        //HTML Form
        document.getElementById("jsonToHTML").textContent = resumeObj;
        var newHTML = document.getElementById("jsonToHTML").textContent;
        newHTML = newHTML.split(',').join('\n');
        var HTMLFormat = newHTML;
        document.getElementById("jsonToHTML").textContent = HTMLFormat;

        //All uppercase to Bold
        var divHTML = document.getElementById("jsonToHTML");
        var html = divHTML.innerHTML;
        html = html.replace(/(\b[A-Z-]{4,}\b)/g, "<b>$1</b>");
        divHTML.innerHTML = html;
  
        //Text to Json Object
        var jsonObj = JSON.stringify(resumeObj);
        document.getElementById("jsonData").textContent = jsonObj;

    };
    
    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);
    console.log(resumeObj);
});

function txtExtInvalid() {
    var file = document.getElementById("resumeFile");
    if (/\.(txt)$/i.test(file.files[0].name) === false) { alert("Please upload text file."); }
}

