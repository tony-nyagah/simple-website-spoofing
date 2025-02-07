# Website Spoofing Demonstration

⚠️ **Educational Purposes Only** ⚠️

This project is a demonstration of how easily websites can be spoofed and user data can be collected without proper security awareness. It is intended for educational purposes only, to raise awareness about cybersecurity risks and promote better security practices.

## Prerequisites

- Node.js
- npm
- Caddy web server: install from [here](https://caddyserver.com/docs/install)
- sudo privileges (for hosts file modification and Caddy HTTPS)

## Quick Setup

The project uses a makefile for easy setup and management. Here are the available commands:

```bash
# Show all available commands
make help

# Set up and start the project
make start

# Stop all services
make stop

# Clean up the environment
make clean

# Kill any processes using ports 3000 and 3001
make kill_ports
```

The `make start` command will:
1. Set up required host entries
2. Install all dependencies
3. Build the frontend
4. Start the Node.js server
5. Configure and run Caddy for HTTPS

## Configuration

1. In the `Caddyfile`, update the following:
   ```
   # Replace with your domain
   your-domain.local {
       import common
   }

   # Replace with your server's IP
   172.16.x.x {
       import common
   }
   ```

2. Copy `.env.example` to `.env` and set your domain:
   ```bash
   cp .env.example .env
   # Edit .env and set your DOMAIN
   ```

## Network Access

To access the site from other machines on your network:

1. The site will be accessible via:
   - HTTPS using your domain: `https://your-domain.local`
   - HTTPS using server IP: `https://172.16.x.x`

2. If using the domain, add it to your client machine's hosts file:
   - Linux/Mac: Edit `/etc/hosts`
   - Windows: Edit `C:\Windows\System32\drivers\etc\hosts`
   ```
   # Add this line (replace with your server's IP and domain)
   172.16.x.x  your-domain.local
   ```

3. Accept the self-signed certificate warning in your browser when first accessing the site

## Purpose

This demonstration shows:
- How phishing websites can mimic legitimate services
- The importance of verifying website authenticity
- Common techniques used in social engineering attacks
- Ways to protect yourself from such attacks

## Technical Stack

- Node.js (Backend server)
- Vite (Frontend build tool)
- Tailwind CSS (Styling)
- Caddy (HTTPS reverse proxy)

## Ethical Guidelines

This project should only be used:
- In controlled educational environments
- With explicit permission from all parties involved
- To demonstrate security concepts
- To improve cybersecurity awareness

## Disclaimer

This tool is for educational purposes only. The creators and contributors are not responsible for any misuse or damage caused by this demonstration. Always:
- Obtain proper authorization before testing
- Use responsibly and ethically
- Follow local laws and regulations
- Respect privacy and data protection laws

## License

This project is intended for educational use only. All rights reserved.
