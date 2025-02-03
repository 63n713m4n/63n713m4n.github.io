const consoleElement = document.getElementById("console");
const audioKey = new Audio("key-press.mp3"); // Add a key press sound effect

function typeTextAnimation(text, delay = 40, callback = null) {
    let i = 0;
    function typeNextChar() {
        if (i < text.length) {
            appendToTerminal(text.charAt(i), false); // Append one character
            audioKey.play(); // Play key press sound
            i++;
            setTimeout(typeNextChar, delay);
        } else {
            appendToTerminal("<br>"); // New line after typing
            if (callback) callback();
        }
    }
    typeNextChar();
}

function executeCommand(command) {
    command = command.toLowerCase().trim();

    if (command === "clear") {
        consoleElement.innerHTML = ""; // Clears the terminal
    } else if (command === "whoami") {
        const whoamiText = `
----------------------------------------------------
WELCOME TO MY PAGE
----------------------------------------------------

Press [ESC] to exit

\\Root\\ATL-srg> Login to View Data

Enter Your Username: Guest
Enter Your Password: `;

        typeTextAnimation(whoamiText, 40, () => {
            simulatePasswordInput(() => {
                const userDetails = `
                
The login session was successful. Welcome, Guest!
Type [help] to list all of the commands.

\\Root\\ATL-srg\\63n713m4n> About me
Receiving submitted information...

Hello, I'm Alphonse Joseph.
Currently, I'm Doing my Masters in Cybersecurity.
My passion lies in discovering new cybersecurity threats and developing advanced solutions.

Google Certified Cybersecurity professional

My LinkedIn: https://www.linkedin.com/in/alphonse-joseph
My GitHub: https://github.com/63n713m4n

Want to know me more? Let's Connect!
                `;
                typeTextAnimation(userDetails, 40);
            });
        });
    } else {
        appendToTerminal(`Command not found: ${command}`);
    }
}

function simulatePasswordInput(callback) {
    let password = "";
    function typeAsterisk() {
        if (password.length < 12) { // Fake password length
            password += "*";
            appendToTerminal("*", false);
            setTimeout(typeAsterisk, 100);
        } else {
            appendToTerminal("<br>");
            callback();
        }
    }
    typeAsterisk();
}

function appendToTerminal(text, newLine = true) {
    consoleElement.innerHTML += text;
    if (newLine) consoleElement.innerHTML += "<br>";
    consoleElement.scrollTop = consoleElement.scrollHeight;
}
