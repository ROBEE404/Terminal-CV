document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading');
  const container = document.querySelector('.container');
  const input = document.getElementById('input');
  const output = document.getElementById('output');
  
  // Simulate loading
  setTimeout(() => {
      loadingScreen.style.display = 'none';
      container.style.display = 'block';
      typeWelcomeMessage();
  }, 3000);

  // Command handling
  input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
          const command = input.value.trim().toLowerCase();
          input.value = '';
          handleCommand(command);
      }
  });
});

function typeWelcomeMessage() {
  const welcomeText = document.getElementById('welcome-text');
  const text = "Welcome to ROBEE's Terminal CV";
  let i = 0;
  
  const typing = setInterval(() => {
      welcomeText.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(typing);
  }, 100);
}

function handleCommand(command) {
  const output = document.getElementById('output');
  
  // Create command line
  const commandLine = document.createElement('p');
  commandLine.innerHTML = `<span class="prompt">➜</span> ${command}`;
  output.appendChild(commandLine);

  // Handle commands
  let response;
  switch(command) {
      case 'help':
          response = `<div class="command-response">
              <p>Available commands:</p>
              <ul>
                  <li><span class="accent">help</span> - Show this help</li>
                  <li><span class="accent">about</span> - About me</li>
                  <li><span class="accent">contact</span> - Contact information</li>
                  <li><span class="accent">skills</span> - Technical skills</li>
                  <li><span class="accent">clear</span> - Clear terminal</li>
              </ul>
          </div>`;
          break;
          
      case 'about':
          response = `<p class="command-output">IT specialist with expertise in system optimization, troubleshooting, and support. Proficient in Linux/Windows environments, ensuring seamless system operations. Skilled in web development, database management, and responsive design, with strong problem-solving and communication skills. Committed to delivering efficient technical solutions for optimal IT performance.<br></p>`;
          break;
          
      case 'contact':
          response = `<div class="command-response">
              <p>📧 <span class="accent">Email:</span> 0xrobee@gmail.com</p>
              <p>💻 <span class="accent">GitHub:</span> github.com/ROBEE404</p>
          </div>`;
          break;
          
      case 'skills':
          response = `<div class="skills-grid">
              <div class="skill-category">
                  <h3>Frontend</h3>
                  <ul>
                      <li>Html & Css</li> 
                      <li>JavaScript</li>
                      <li>TypeScript</li> 
                      <li>React</li>
                      <li>Tailwind CSS</li>
                  </ul>
              </div>
              <div class="skill-category">
                  <h3>Backend</h3>
                  <ul>
                      <li>Node.js</li>
                      <li>Python</li>
                      <li>PostgreSQL</li>
                  </ul>
              </div>
          </div>`;
          break;
          
      case 'clear':
          output.innerHTML = `
              <p id="welcome-text"></p>
              <p class="help-text">Type 'help' to see available commands</p>
          `;
          typeWelcomeMessage();
          return;
          
      default:
          response = `<p class="error">Command not found. Type 'help' for available commands.</p>`;
  }

  const responseElement = document.createElement('div');
  responseElement.innerHTML = response;
  output.appendChild(responseElement);
  
  // Auto-scroll to bottom
  output.scrollTop = output.scrollHeight;
}