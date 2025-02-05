document.addEventListener("DOMContentLoaded", function () {
    const terminal = document.querySelector("#terminal");
    const inputField = document.querySelector("#inputField");

    // Commands and their responses
    const commands = {
        "help": `Available commands:<br>
        - <span class="green">whoami</span> - View profile details<br>
        - <span class="green">contact</span> - Show contact information<br>
        - <span class="green">hack</span> - Try accessing restricted files<br>
        - <span class="green">clear</span> - Clear the terminal`,

        "whoami": `----------------------------------------------------<br>
        WELCOME TO MY PAGE<br>
        ----------------------------------------------------<br><br>
        Press [ESC] to exit<br><br>
        <span class="cyan">\\Root\\ATL-srg&gt;</span> Login to View Data<br>
        Enter Your Username: <span class="lime">Guest</span><br>
        Enter Your Password: <span class="lime">****************************</span><br><br>
        The login session was successful. <span class="cyan">Welcome, Guest!</span><br>
        Type <span class="lime">help</span> to list all of the commands.<br><br>
        <span class="cyan">\\Root\\ATL-srg\\63n713m4n&gt;</span> About me<br>
        Receiving submitted information...<br><br>
        Hello, I'm <span class="lime">Alphonse Joseph</span>.<br>
        Currently, I'm doing my Master's in Cybersecurity.<br>
        My passion lies in discovering new cybersecurity threats and developing advanced solutions.<br><br>
        Google Certified Cybersecurity Professional<br><br>
        My LinkedIn: <a href="https://www.linkedin.com/in/alphonse-joseph" target="_blank" class="cyan">LinkedIn Profile</a><br>
        My GitHub: <a href="https://github.com/63n713m4n" target="_blank" class="cyan">GitHub Profile</a><br><br>
        Want to know more? Let's Connect!`,

        "contact": `Contact Information:<br>
        - Email: <a href="mailto:alphonse.joseph@proton.me" class="cyan">alphonse.joseph@proton.me</a><br>
        - Discord: <span class="lime">SouLHuNtEr#2958</span><br>
        - GitHub: <a href="https://github.com/63n713m4n" target="_blank" class="cyan">63n713m4n</a>`,

        "hack": `<span class="red">Access Denied.</span> Permission Required!`,

        "clear": "" // Clears the terminal
    };

    // Function to handle input
    function processCommand(input) {
        const trimmedInput = input.trim().toLowerCase();
        let output = `<span class="cyan">&gt; ${trimmedInput}</span><br>`;

        if (commands[trimmedInput] !== undefined) {
            output += commands[trimmedInput] + "<br>";
        } else {
            output += `<span class="red">Command not found: ${trimmedInput}</span><br>Type 'help' to see available commands.<br>`;
        }

        if (trimmedInput === "clear") {
            terminal.innerHTML = "";
        } else {
            terminal.innerHTML += output;
        }

        terminal.scrollTop = terminal.scrollHeight; // Auto-scroll to bottom
    }

    // Capture keypress event
    inputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const inputValue = inputField.value;
            if (inputValue) {
                processCommand(inputValue);
                inputField.value = ""; // Clear input field after processing
            }
        }
    });

    // Focus on input field when clicking anywhere in the terminal
    document.addEventListener("click", () => inputField.focus());
});
