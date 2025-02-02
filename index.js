var Typer = {
    text: "",
    index: 0,
    speed: 4,
    file: "63n713m4n.txt",
    accessCount: 0,
    deniedCount: 0,
    cursorVisible: true,

    init: function () {
        if (typeof jQuery == "undefined") {
            console.error("jQuery is required for this script to work.");
            return;
        }

        $.get(Typer.file, function (data) {
            Typer.text = data.trim(); // Remove trailing whitespace/newlines
            Typer.startTyping();
        }).fail(function () {
            console.error("Failed to load text file.");
        });

        setInterval(Typer.updateCursor, 500);
    },

    content: function () {
        return $("#console").html();
    },

    write: function (str) {
        $("#console").append(str);
    },

    addText: function () {
        if (Typer.index < Typer.text.length) {
            let cont = Typer.content();
            if (cont.endsWith("|")) {
                $("#console").html(cont.slice(0, -1));
            }
            Typer.index += Typer.speed;
            $("#console").html(Typer.text.substring(0, Typer.index).replace(/\n/g, "<br/>"));
            window.scrollBy(0, 50);
        } else {
            clearInterval(Typer.typingInterval);
        }
    },

    startTyping: function () {
        Typer.typingInterval = setInterval(Typer.addText, 30);
    },

    updateCursor: function () {
        let cont = Typer.content();
        if (Typer.cursorVisible) {
            $("#console").html(cont + "|");
        } else {
            $("#console").html(cont.replace(/\|$/, ""));
        }
        Typer.cursorVisible = !Typer.cursorVisible;
    },

    handleKey: function (event) {
        switch (event.keyCode) {
            case 18: // Alt key
                Typer.accessCount++;
                if (Typer.accessCount >= 3) Typer.makeAccess();
                break;
            case 20: // Caps Lock
                Typer.deniedCount++;
                if (Typer.deniedCount >= 3) Typer.makeDenied();
                break;
            case 27: // Escape
                Typer.hidePop();
                break;
            case 8: // Backspace
                if (Typer.index > 0) Typer.index -= Typer.speed;
                break;
        }
        event.preventDefault();
    },

    makeAccess: function () {
        alert("Access Granted!");
    },

    makeDenied: function () {
        alert("Access Denied!");
    },

    hidePop: function () {
        console.log("Popup hidden.");
    }
};

function replaceUrls(text) {
    return text.replace(/(http:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
}

function copyToClipboard(element) {
    navigator.clipboard.writeText($(element).text()).then(() => {
        console.log("Text copied to clipboard");
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}

$(document).ready(function () {
    Typer.init();
    $(document).keydown(Typer.handleKey);
});
