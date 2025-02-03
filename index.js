var Typer = {
    text: null,
    accessCountimer: null,
    index: 0,
    speed: 2,
    file: "63n713m4n.txt",
    accessCount: 0,
    deniedCount: 0,
    
    init: function(){
        accessCountimer = setInterval(function(){ Typer.updLstChr(); }, 500); 
        fetch(Typer.file)
            .then(response => response.text())
            .then(data => {
                Typer.text = data;
                Typer.text = Typer.text.slice(0, Typer.text.length - 1);
            });
    },

    content: function(){
        return document.getElementById("console").innerHTML;
    },

    write: function(str){
        document.getElementById("console").innerHTML += str;
        return false;
    },

    addText: function(key){
        if(key.keyCode == 18){
            Typer.accessCount++; 
            if(Typer.accessCount >= 3){
                Typer.makeAccess(); 
            }
        }
        else if(key.keyCode == 20){
            Typer.deniedCount++; 
            if(Typer.deniedCount >= 3){
                Typer.makeDenied(); 
            }
        }
        else if(key.keyCode == 27){ 
            Typer.hidepop(); 
        }
        else if(Typer.text){ 
            var cont = Typer.content(); 
            if(cont.substring(cont.length - 1, cont.length) == "|") 
                document.getElementById("console").innerHTML = cont.substring(0, cont.length - 1); 
            if(key.keyCode != 8){ 
                Typer.index += Typer.speed;    
            } else {
                if(Typer.index > 0) 
                    Typer.index -= Typer.speed;
            }
            var text = Typer.text.substring(0, Typer.index);
            var rtn = new RegExp("\n", "g"); 
            document.getElementById("console").innerHTML = text.replace(rtn, "<br/>");
            window.scrollBy(0, 50); 
        }
        if (key.preventDefault && key.keyCode != 122) { 
            key.preventDefault();
        }
        if(key.keyCode != 122){ 
            key.returnValue = false;
        }
    },

    updLstChr: function(){ 
        var cont = this.content(); 
        if(cont.substring(cont.length - 1, cont.length) == "|") 
            document.getElementById("console").innerHTML = cont.substring(0, cont.length - 1); 
        else
            this.write("|");
    }
};

Typer.speed = 4;
Typer.init();

var timer = setInterval(function() {
    Typer.addText({ "keyCode": 123748 });

    if (Typer.index > (Typer.text ? Typer.text.length : 0)) {
        clearInterval(timer);
    }
}, 30);

function copyToClipboard(element) {
    var temp = document.createElement("input");
    document.body.appendChild(temp);
    temp.value = document.getElementById(element).innerText;
    temp.select();
    document.execCommand("copy");
    temp.remove();
}
