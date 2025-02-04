// Define available commands
const commands = {
    "help": "Available commands:\n- <span class='green'>whoami</span> - View profile details\n- <span class='green'>contact</span> - Show contact information\n- <span class='green'>hack</span> - Try accessing restricted files\n- <span class='green'>clear</span> - Clear the terminal",
    "whoami": "----------------------------------------------------\nWELCOME TO MY PAGE\n----------------------------------------------------\n\nPress [ESC] to exit\n\n\\Root\\ATL-srg> Login to View Data\n\nEnter Your Username: Guest\nEnter Your Password: ****************************\n\nThe login session was successful. Welcome, Guest!\nType [help] to list all of the commands.\n\n\\Root\\ATL-srg\\63n713m4n> About me\nReceiving submitted information...\n\nHello, I'm Alphonse Joseph.\nCurrently, I'm Doing my Masters in Cybersecurity.\nMy passion lies in discovering new cybersecurity threats and developing advanced solutions.\nGoogle Certified Cybersecurity professional\nMy LinkedIn: <a href='https://www.linkedin.com/in/alphonse-joseph' target='_blank' style='color: cyan;'>https://www.linkedin.com/in/alphonse-joseph</a>\nMy GitHub: <a href='https://github.com/63n713m4n' target='_blank' style='color: cyan;'>https://github.com/63n713m4n</a>\nWant to know me more? Let's Connect!",
    "contact": "Contact me at:\n- Discord: SouLHuNtEr#2958\n- Email: alphonse.joseph@proton.me\n- GitHub: <a href='https://github.com/63n713m4n' target='_blank' style='color: cyan;'>https://github.com/63n713m4n</a>",
    "hack": "Access Denied. Permission Required!",
    "clear": "Terminal cleared."
};

// Select terminal and input field
const terminal = document.querySelector("#terminal");
const inputField = document.querySelector("#inputField");

// Function to process user commands
function processCommand(command) {
    let output = '';

    // Clear the terminal on 'clear' command
    if (command === "clear") {
        terminal.innerHTML = "";
    } 
    // Display the command output if it's valid
    else if (commands[command]) {
        output = commands[command];
        typeResponse(output.replace(/\n/g, "<br>"));  // Replace newlines with <br> tags for proper display
    } 
    // Command not found
    else {
        output = `<span class="red">Command not found: ${command}</span>`;
    }
    
    // Append the command and response to the terminal
    terminal.innerHTML += `<br><span class="cyan">> ${command}</span><br>` + output;
}

// Function to type the response with a delay (typing animation)
function typeResponse(response) {
    let index = 0;
    const speed = 50;

    function type() {
        if (index < response.length) {
            terminal.innerHTML += response.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Event listener to handle Enter key for executing commands
inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const command = inputField.value.trim();  // Get the trimmed command
        processCommand(command);  // Process the command
        inputField.value = "";  // Clear the input field after execution
    }
});
