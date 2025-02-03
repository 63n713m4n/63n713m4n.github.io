// Load typing sound from the 'sounds' folder
const typingSound = new Audio("sounds/typing.mp3");

// Select the terminal output div
const terminal = document.getElementById("terminal");

// List of available commands
const commands = {
    "help": `
Welcome to the Interactive Terminal! Type 'help' for commands.<br>
<span style="color: cyan;">> help</span><br>
Available commands:<br>
- <span style="color: lime;">whoami</span> - View profile details<br>
- <span style="color: lime;">contact</span> - Show contact information<br>
- <span style="color: lime;">hack</span> - Try accessing restricted files<br>
- <span style="color: lime;">clear</span> - Clear the terminal<br>
`,
    "whoami": `
----------------------------------------------------<br>
WELCOME TO MY PAGE<br>
----------------------------------------------------<br><br>

Press [ESC] to exit<br><br>

<span style="color: cyan;">\\Root\\ATL-srg> Login to View Data</span><br>

Enter Your Username: <span style="color: lime;">Guest</span><br>
Enter Your Password: <span style="color: lime;">****************************</span><br><br>

The login session was successful. <span style="color: cyan;">Welcome, Guest!</span><br>
Type [help] to list all of the commands.<br><br>

<span style="color: cyan;">\\Root\\ATL-srg\\63n713m4n> About me</span><br>
Receiving submitted information...<br><br>

Hello, I'm <span style="color: lime;">Alphonse Joseph</span>.<br>
Currently, I'm doing my Master's in Cybersecurity.<br>
My passion lies in discovering new cybersecurity threats and developing advanced solutions.<br><br>

Google Certified Cybersecurity Professional<br><br>

My LinkedIn: <a href="https://www.linkedin.com/in/alphonse-joseph" target="_blank" style="color: cyan;">https://www.linkedin.com/in/alphonse-joseph</a><br>
My GitHub: <a href="https://github.com/63n713m4n" target="_blank" style="color: cyan;">https://github.com/63n713m4n</a><br><br>

Want to know me more? Let's Connect!<br>
`,
    "contact": `
<span style="color: cyan;">\\Root\\ATL-srg\\63n713m4n> To_connect_with_me.json</span><br><br>
{
    Discord: "<span style="color: lime;">SouLHuNtEr#2958</span>",<br>
    GitHub: "<a href="https://github.com/63n713m4n" target="_blank" style="color: cyan;">63n713m4n</a>",<br>
    Email: "<a href="mailto:alphonse.joseph@proton.me" style="color: cyan;">alphonse.joseph@proton.me</a>"<br>
}<br>
`,
    "hack": `
<span style="color: red;">Access Denied. Permission Required!</span>
`
};

// Function to display text with typing animation
function typeResponse(text) {
    let index = 0;
    terminal.innerHTML += "<br>"; // Add a new line

    function type() {
        if (index < text.length) {
            terminal.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 20); // Adjust speed of typing effect
        }
    }
    type();
}

// Function to process commands
function processCommand(command) {
    if (commands[command]) {
        typeResponse(commands[command]); // Type out the response
    } else if (command === "clear") {
        terminal.innerHTML = ""; // Clear the terminal
    } else {
        typeResponse(`<span style="color: red;">Command not found: ${command}</span>`);
    }
}

// Handle user input
document.addEventListener("keydown", function (event) {
    if (event.key.length === 1 || event.key === "Backspace") {
        typingSound.currentTime = 0;
        typingSound.play();
    }

    if (event.key === "Enter") {
        let inputField = document.getElementById("command-input");
        let command = inputField.value.trim().toLowerCase();
        
        if (command) {
            terminal.innerHTML += `<br><span style="color: cyan;">> ${command}</span>`; // Show user input
            processCommand(command);
        }
        
        inputField.value = ""; // Clear input field
    }
});
