var Typer = {
    text: "",
    index: 0,
    speed: 4,
    file: "63n713m4n.txt",
    cursorVisible: true,

    init: function () {
        if (typeof jQuery == "undefined") {
            console.error("jQuery is required for this script to work.");
            return;
        }

        // Display TryHackMe Profile at the top
        $("#console").html(`
            <div style="margin-bottom: 10px; text-align: center;">
                <iframe src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=1848669"
                    style="border:none; width:100%; height:200px;">
                </iframe>
            </div>
        `);

        // Load the text file
        $.get(Typer.file, function (data) {
            Typer.text = data.trim(); // Remove extra whitespace
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
            let displayedText = Typer.text.substring(0, Typer.index)
                .replace(/(?:\r\n|\r|\n)/g, "<br/>"); // Fixes new line display

            $("#console").html(displayedText);

            // Auto-scroll to keep new text visible
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
    }
};

$(document).ready(function () {
    Typer.init();
});
