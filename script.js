function typingEffect(element, text, speed) {
  let i = 0;
  const interval = setInterval(() => {
    const span = document.createElement("span");
    span.textContent = text.charAt(i);
    span.style.color = "#ff6ab4"; // it's color of the Welcome to My CV Terminal
    element.appendChild(span); // Append each letter as a span
    i++;
    if (i >= text.length) {
      clearInterval(interval);
    }
  }, speed);
}

window.onload = function () {
  // Simulate loading screen
  const loadingScreen = document.getElementById('loadingScreen');
  const terminalScreen = document.getElementById('terminalScreen');

  // Show terminal after 3 seconds (when the loading animation finishes)
  setTimeout(() => {
    loadingScreen.style.display = 'none'; // Hide loading screen
    terminalScreen.style.display = 'block'; // Show terminal
    typingEffect(document.getElementById("typing"), "Welcome to My CV Terminal", 100);
  }, 3000); // 3 seconds
};

const commandInput = document.getElementById("commandInput");
const content = document.getElementById("terminalContent");
const prompt = document.getElementById("prompt");
const commandHistory = [];
let historyIndex = 0;

commandInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const command = commandInput.value.trim();
    if (command) {
      commandHistory.push(command);
      historyIndex = commandHistory.length;
      executeCommand(command);
    }
    commandInput.value = ""; // Clear input field
  } else if (event.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      commandInput.value = commandHistory[historyIndex];
    }
  } else if (event.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      commandInput.value = commandHistory[historyIndex];
    } else {
      commandInput.value = "";
    }
  }
});

// Function to dynamically resize the terminal
function resizeTerminal() {
  const contentHeight = content.scrollHeight;
  const terminal = document.querySelector('.terminal');

  // Adjust the terminal height if content exceeds current height
  if (contentHeight > terminal.clientHeight) {
    terminal.style.maxHeight = `${contentHeight + 20}px`; // Add extra space
  }
}

function executeCommand(command) {
  const commandLine = `<p>${prompt.textContent} ${command}</p>`;
  content.innerHTML += commandLine;

  if (command === "help") {
    content.innerHTML += "<p>Available commands: help, about, contact, Project, skills, clear</p>";
  } else if (command === "about") {
    content.innerHTML += "<p>Hi, I'm ROBEE, I'm a full-stack professional web developer.</p>";
  } else if (command === "contact") {
    content.innerHTML += "<p>Email me at 0xrobee@gmail.com</p>";
  } else if (command === "Project") {
    content.innerHTML += "<p>Check out my projects on GitHub: <a href='https://github.com/ROBEE404' target='_blank'>GitHub</a></p>";
  } else if (command === "skills") {
    displaySkills(); // Display the skills section
    resizeTerminal(); // Call the function to adjust the terminal size
  } else if (command === "clear") {
    content.innerHTML = `
      <p id="typing"></p>
      <p>Type 'help' for available commands.</p>`;
    typingEffect(document.getElementById("typing"), "Welcome to My CV Terminal", 100);
    terminal.style.maxHeight = '500px'; // Reset terminal size after clearing
  } else {
    content.innerHTML += "<p>Command not found. Type 'help' for available commands.</p>";
  }

  // Auto scroll to bottom
  content.scrollTop = content.scrollHeight; // Scroll content into view
  commandInput.focus(); // Keep input focused for continuous typing
}

function displaySkills() {
  const skillsHTML = `
        <div>
      <h1 class="information-title">Skills:</h1>
      </div>
    <div class="skills-container">
    
      <div>
        <h2>Languages:</h2>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>C++</li>
          <li>Python</li>
        </ul>
      </div>
      <div>
        <h2>Frontend:</h2>
        <ul>
          <li>React</li>
          <li>Tailwind CSS</li>
          <li>ElectronJS</li>
        </ul>
      </div>
      <div>
        <h2>Backend:</h2>
        <ul>
          <li>Node.js</li>
        </ul>
      </div>
      <div>
    <h2>Technologies:</h2>
        <ul>
          <li>Figma</li>
          <li>GitHub</li>
          <li>VS Code</li>
          <li>Pixel Art</li>
          <li>Video Editing</li>
        </ul>
      </div>
    </div>
  `;

  // Instead of using innerHTML, we will append a new element to avoid losing existing content
  const skillsDiv = document.createElement('div');
  skillsDiv.innerHTML = skillsHTML;
  content.appendChild(skillsDiv); // Add skills to the content

  // Expand the terminal when showing skills
  const terminal = document.querySelector('.terminal');
  terminal.classList.add('terminal-expanded');
  terminal.style.maxHeight = '600px'; // Adjust max-height when displaying skills

  // Auto scroll to bottom
  content.scrollTop = content.scrollHeight; // Scroll content into view
}
