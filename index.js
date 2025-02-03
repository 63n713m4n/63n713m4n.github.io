const consoleElement = document.getElementById("console");
const inputElement = document.getElementById("terminal-input");
const audioKey = new Audio("key-press.mp3"); // Keyboard sound effect

inputElement.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        executeCommand(inputElement.value.trim());
        inputElement.value = "";
    }
});

function executeCommand(command) {
    if (!command) return;

    appendToTerminal(`> ${command}`, true); // Show the command in the terminal

    switch (command.toLowerCase()) {
        case "help":
            typeTextAnimation("Available commands: whoami, clear, contact, hack", 30);
            break;
        case "clear":
            consoleElement.innerHTML = ""; // Clear the terminal
            break;
        case "whoami":
            showWhoAmI();
            break;
        case "contact":
            typeTextAnimation("Email: alphonse.joseph@proton.me | Discord: SouLHuNtEr#2958", 30);
            break;
        case "hack":
            typeTextAnimation("Access Denied. Permission Required!", 30);
            break;
        default:
            typeTextAnimation(`Command not found: ${command}`, 30);
    }
}

function showWhoAmI() {
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
}

function typeTextAnimation(text, delay = 40, callback = null) {
    let i = 0;
    function typeNextChar() {
        if (i < text.length) {
            appendToTerminal(text.charAt(i), false);
            audioKey.play();
            i++;
            setTimeout(typeNextChar, delay);
        } else {
            appendToTerminal("<br>");
            convertUrlsToLinks();
            if (callback) callback();
        }
    }
    typeNextChar();
}

function simulatePasswordInput(callback) {
    let password = "";
    function typeAsterisk() {
        if (password.length < 12) { 
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

function convertUrlsToLinks() {
    const elements = consoleElement.childNodes;

    elements.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue;
            const urlPattern = /(https?:\/\/[^\s]+)/g;

            if (text.match(urlPattern)) {
                const formattedText = text.replace(urlPattern, '<a href="$1" target="_blank" style="color: cyan;">$1</a>');
                const newElement = document.createElement("span");
                newElement.innerHTML = formattedText;
                consoleElement.replaceChild(newElement, node);
            }
        }
    });
}
