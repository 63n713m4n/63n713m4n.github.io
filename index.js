var Typer = {
    text: `----------------------------------------------------
WELCOME TO MY PAGE
----------------------------------------------------

Press [ESC] to exit
&nbsp;

<span class="command">\\Root\ATL-srg&gt;</span><span class="output">Login to View Data</span>
&nbsp;

Enter Your Username: Guest  
Enter Your Password: ****************************  
<span class="string">QWx3YXlzIGxlYXJuaW5nIQ==</span>  
The login session was successful. <span class="output">Welcome, Guest!</span>  
Type [help] to list all of the commands.
&nbsp;

----------------------------------------------------
📌 **[ Section: About Me ]**
----------------------------------------------------

<span class="command">\\Root\ATL-srg\63n713m4n&gt;</span><span class="output">About me</span>  
Receiving submitted information...  
<span style="color: transparent">CEEFHNTAKSCDFEETEIGTATIERFEDNSPNOACTSHEONESILNFNKATTSEAA</span>  

Hello, I'm <span class="string">Alphonse Joseph</span>.  
Currently, I'm <span class="string">pursuing my Master's in Cybersecurity</span>.  
🔹 Passionate about <span class="string">discovering new cybersecurity threats</span>  
🔹 Focused on <span class="string">developing advanced security solutions</span> 🔐  
🔹 <span class="string">Google Certified Cybersecurity Professional</span>  

🔗 **My Profiles:**  
<span class="link"><a href="https://www.linkedin.com/in/alphonse-joseph" target="_blank">🔹 LinkedIn</a></span>  
<span class="link"><a href="https://github.com/63n713m4n" target="_blank">🔹 GitHub</a></span>  

Want to know me more? Let’s <span class="output">Connect!</span>  
&nbsp;

----------------------------------------------------
📌 **[ Section: My Hacking Profiles ]**
----------------------------------------------------

<span class="command">\\Root\ATL-srg\63n713m4n&gt;</span><span class="output">view_my_profiles.json</span>

\`\`\`json
{
    "TryHackMe": "RED TEAMER",
    "HackTheBox": "CTF Player"
}
\`\`\`
&nbsp;

----------------------------------------------------
📌 **[ Section: Contact Me ]**
----------------------------------------------------

<span class="command">\\Root\ATL-srg\63n713m4n&gt;</span><span class="output">To_connect_with_me.json</span>

\`\`\`json
{
    "Discord": "SouLHuNtEr#2958",
    "GitHub": "63n713m4n",
    "Email": "alphonse.joseph@proton.me"
}
\`\`\`
&nbsp;

----------------------------------------------------
📌 **[ Section: Logout ]**
----------------------------------------------------

<span class="command">\\Root\ATL-srg\63n713m4n&gt;</span><span class="output">logout</span>  
<span style="color: transparent">Thx for visiting</span>  
Successfully logged out! Hope you have a <span class="output">wonderful day!</span>  

&nbsp;

<span class="command">\\Root\ATL-srg&gt;&nbsp;</span>
`
};

var consoleElement = document.getElementById('console');
var index = 0;
var speed = 10; // speed of text appearing
var typing = true;

function typeText() {
    if (index < Typer.text.length) {
        consoleElement.innerHTML += Typer.text.charAt(index);
        index++;
        setTimeout(typeText, speed);
    }
}

// Start typing effect
typeText();
