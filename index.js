document.addEventListener("DOMContentLoaded", function() {
    const consoleElement = document.getElementById("console");
    const commandInput = document.getElementById("commandInput");
    const typeSound = document.getElementById("typeSound");

    const commands = {
        "help": "Available commands: <br> - whoami <br> - clear <br> - contact <br> - hack",
        "whoami": "I am Alphonse Joseph, a Cybersecurity enthusiast.",
        "contact": "Email: alphonse.joseph@proton.me <br> LinkedIn: <a href='https://www.linkedin.com/in/alphonse-joseph' target='_blank'>Profile</a>",
        "clear": () => { consoleElement.innerHTML = ""; },
        "hack": runFakeHack
    };

    function writeToConsole(text, speed = 50) {
        let index = 0;
        let line = document.createElement("div");
        consoleElement.appendChild(line);
        consoleElement.scrollTop = consoleElement.scrollHeight;

        function typeEffect() {
            if (index < text.length) {
                typeSound.play();
                line.innerHTML += text[index];
                index++;
                setTimeout(typeEffect, speed);
            }
        }
        typeEffect();
    }

    function runFakeHack() {
        consoleElement.innerHTML = "<span class='glitch'>Initializing hacking sequence...</span>";
        setTimeout(() => writeToConsole("Connecting to secure database..."), 2000);
        setTimeout(() => writeToConsole("Bypassing firewall..."), 4000);
        setTimeout(() => writeToConsole("Accessing confidential files..."), 6000);
        setTimeout(() => writeToConsole("Download complete!"), 8000);
        setTimeout(() => writeToConsole("Mission success!"), 10000);
    }

    function executeCommand(command) {
        command = command.toLowerCase().trim();
        if (commands[command]) {
            let response = typeof commands[command] === "function" ? commands[command]() : commands[command];
            writeToConsole(response);
        } else {
            writeToConsole(`Command not found: ${command}`);
        }
    }

    commandInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            let userInput = commandInput.value;
            writeToConsole(`<span style="color: cyan;">> ${userInput}</span>`);
            executeCommand(userInput);
            commandInput.value = "";
        }
    });

    writeToConsole("Welcome to the Interactive Terminal! Type 'help' for commands.");
});
