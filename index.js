document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const inputField = document.getElementById("command-input");

    const commands = {
        "help": `
> help
Available commands:
- <span class="green">whoami</span> - View profile details
- <span class="green">contact</span> - Show contact information
- <span class="green">hack</span> - Try accessing restricted files
- <span class="green">clear</span> - Clear the terminal
`,
        "whoami": `
----------------------------------------------------
SYSTEM PROFILE - USER: <span class="green">Guest</span>
----------------------------------------------------

<span class="cyan">\\Root\\ATL-srg> Login to View Data</span>

Login session successful. Welcome, <span class="green">Guest</span>!
Type '<span class="green">help</span>' to list commands.

<span class="cyan">\\Root\\ATL-srg\\63n713m4n> About me</span>

Hello, I'm <span class="green">Alphonse Joseph</span>.
Master’s Student in Cybersecurity | Google Certified Cybersecurity Professional

LinkedIn: <a href="https://www.linkedin.com/in/alphonse-joseph" target="_blank">Click Here</a>
GitHub: <a href="https://github.com/63n713m4n" target="_blank">Click Here</a>

Want to know more? Let's Connect!
`,
        "contact": `
<span class="cyan">\\Root\\ATL-srg\\63n713m4n> Contact Details</span>

Discord: <span class="green">SouLHuNtEr#2958</span>
GitHub: <a href="https://github.com/63n713m4n" target="_blank">63n713m4n</a>
Email: <a href="mailto:alphonse.joseph@proton.me">alphonse.joseph@proton.me</a>
`,
        "hack": `<span class="red">ACCESS DENIED - Permission Required!</span>`,
    };

    function typeResponse(text) {
        let index = 0;
        let outputDiv = document.createElement("div");
        terminal.appendChild(outputDiv);

        function type() {
            if (index < text.length) {
                outputDiv.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 10);
            }
        }
        type();
    }

 function processCommand(command) {
    if (command === "clear") {
        terminal.innerHTML = "";
    } else if (commands[command]) {
        terminal.innerHTML += `<br><span class="cyan">> ${command}</span><br>`;
        typeResponse(commands[command].replace(/\n/g, "<br>"));  // 🔹 Fix new lines
    } else {
        terminal.innerHTML += `<br><span class="red">Command not found: ${command}</span>`;
    }
}

    inputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let command = inputField.value.trim().toLowerCase();
            if (command) {
                processCommand(command);
            }
            inputField.value = "";
        }
    });
});
