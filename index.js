document.addEventListener("DOMContentLoaded", function () {
    const consoleElement = document.getElementById("console");
    const inputElement = document.getElementById("terminal-input");

    const commands = {
        "help": `
Available commands:
- whoami
- clear
- contact
- hack`,
        "contact": `
LinkedIn: <a href="https://www.linkedin.com/in/alphonse-joseph" target="_blank">LinkedIn Profile</a>
GitHub: <a href="https://github.com/63n713m4n" target="_blank">GitHub Profile</a>
Discord: SouLHuNtEr#2958
Email: alphonse.joseph@proton.me
`,
        "hack": "Access Denied. Permission Required!",
        "clear": ""
    };

    function appendToTerminal(text) {
        let formattedText = text.replace(/\n/g, "<br>").replace(/ /g, "&nbsp;");
        consoleElement.innerHTML += `<div class="console-output">${formattedText}</div>`;
        consoleElement.scrollTop = consoleElement.scrollHeight; // Auto-scroll down
    }

    function executeCommand(command) {
        command = command.toLowerCase().trim();

        if (command === "clear") {
            consoleElement.innerHTML = ""; // Clears the terminal
        } else if (command === "whoami") {
            // Fetch details.txt dynamically
            fetch("details.txt")
                .then(response => response.text())
                .then(data => appendToTerminal(data))
                .catch(error => appendToTerminal("Error loading file."));
        } else if (commands[command]) {
            appendToTerminal(commands[command]);
        } else {
            appendToTerminal(`Command not found: ${command}`);
        }
    }

    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let command = inputElement.value;
            appendToTerminal(`> ${command}`); // Show entered command
            executeCommand(command);
            inputElement.value = ""; // Clear input field
        }
    });
});
