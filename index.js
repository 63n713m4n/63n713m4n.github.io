document.addEventListener("DOMContentLoaded", function () {
    const consoleElement = document.getElementById("console");
    const inputElement = document.getElementById("terminal-input");

    // Store terminal commands and responses
    const commands = {
        "help": `
            Available commands:
            - whoami
            - contact
            - clear
            - hack
        `,
        "whoami": `
            Name: Alphonse Joseph
            Cybersecurity Master's Student
            Google Certified Cybersecurity Professional
        `,
        "contact": `
            LinkedIn: <a href="https://www.linkedin.com/in/alphonse-joseph" target="_blank">LinkedIn Profile</a>
            GitHub: <a href="https://github.com/63n713m4n" target="_blank">GitHub Profile</a>
            Discord: SouLHuNtEr#2958
            Email: alphonse.joseph@proton.me
        `,
        "hack": `
            Access Denied. Permission Required!
        `,
        "clear": ""
    };

    function appendToTerminal(text) {
        let formattedText = text.replace(/\n/g, "<br>");
        consoleElement.innerHTML += `<div class="console-output">${formattedText}</div>`;
    }

    function executeCommand(command) {
        command = command.toLowerCase().trim();
        if (command === "clear") {
            consoleElement.innerHTML = ""; // Clear terminal
        } else if (commands[command]) {
            appendToTerminal(commands[command]);
        } else {
            appendToTerminal(`Command not found: ${command}`);
        }
    }

    // Handle user input
    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let command = inputElement.value;
            appendToTerminal(`> ${command}`); // Show entered command
            executeCommand(command);
            inputElement.value = ""; // Clear input field
        }
    });
});
