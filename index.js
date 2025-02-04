// Select terminal and input field
const terminal = document.querySelector("#terminal");
const inputField = document.querySelector("#inputField");

// Define available commands
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
    <span class="cyan">\\Root\\ATL-srg&gt; Login to View Data</span><br>
    Enter Your Username: <span class="lime">Guest</span><br>
    Enter Your Password: <span class="lime">****************************</span><br><br>
    The login session was successful. <span class="cyan">Welcome, Guest!</span><br>
    Type [help] to list all of the commands.<br><br>
    <span class="cyan">\\Root\\ATL-srg\\63n713m4n&gt; About me</span><br>
    Receiving submitted information...<br><br>
    Hello, I'm <span class="lime">Alphonse Joseph</span>.<br>
    Currently, I'm doing my Master's in Cybersecurity.<br>
    My passion lies in discovering new cybersecurity threats and developing advanced solutions.<br><br>
    Google Certified Cybersecurity Professional<br><br>
    My LinkedIn: <a href='https://www.linkedin.com/in/alphonse-joseph' target='_blank' class='cyan'>LinkedIn Profile</a><br>
    My GitHub: <a href='https://github.com/63n713m4n' target='_blank' class='cyan'>GitHub Profile</a><br>
    Want to know me more? Let's Connect!`,

    "contact": `Contact me at:<br>
    - Discord: <span class="cyan">SouLHuNtEr#2958</span><br>
    - Email: <span class="cyan">alphonse.joseph@proton.me</span><br>
    - GitHub: <a href='https://github.com/63n713m4n' target='_blank' class='cyan'>GitHub Profile</a>`,

    "hack": `<span class="red">Access Denied. Permission Required!</span>`,

    "clear": "clear"
};

// Function to process commands
function processCommand(command) {
    let output = "";

    if (command === "clear") {
        terminal.innerHTML = ""; // Clear terminal
        return;
    }

    if (commands[command]) {
        output = commands[command];
    } else {
        output = `<span class="red">Command not found: ${command}</span>`;
    }

    // Append typed command and output
    terminal.innerHTML += `<br><span class="cyan">&gt; ${command}</span><br>`;
    typeResponse(output);
}

// Function for typing animation
function typeResponse(response) {
    let index = 0;
    const speed = 20; // Typing speed

    function type() {
        if (index < response.length) {
            terminal.innerHTML += response.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Event listener for Enter key
inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        const command = inputField.value.trim(); // Get input value

        if (command) {
            processCommand(command); // Execute command
        }

        inputField.value = ""; // Clear input field
    }
});
