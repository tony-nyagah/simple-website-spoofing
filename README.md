# Website Spoofing Demonstration

⚠️ **Educational Purposes Only** ⚠️

This project demonstrates website spoofing techniques to raise awareness about cybersecurity risks and promote better security practices. It is intended strictly for educational purposes in controlled environments.

## Quick Links
- [Detailed Setup Guide](setup-steps.md)
- [Technical Documentation](docs/)

## Prerequisites

- Ubuntu/Debian-based Linux system
- Administrative (sudo) privileges
- Basic knowledge of terminal commands
- Text editor (nano, vim, or VS Code)

## Quick Start

1. Follow the [setup guide](setup-steps.md) to install required dependencies:
   - Node.js v22 (via nvm)
   - Caddy web server

2. Start the application:
   ```bash
   make start
   ```

## Available Commands

```bash
make start     # Start the application
make stop      # Stop all services
make clean     # Clean up the environment
make kill_ports # Free up required ports
```

## Accessing the Site

After setup, the site is accessible via:
- `https://<your-ip-address>/WebSelfService#/signin`
- `https://<your-domain>/WebSelfService#/signin`

Note: You'll see a security warning due to the self-signed certificate.

## Technical Stack

- Frontend: Vite + Tailwind CSS
- Backend: Node.js
- Proxy: Caddy (HTTPS)
- Build System: Make

## Security Notice

This tool demonstrates:
- Website spoofing techniques
- Social engineering vulnerabilities
- Importance of security awareness
- HTTPS certificate verification

## Ethical Guidelines

This project must only be used:
- In controlled educational environments
- With explicit permission from all parties
- To demonstrate security concepts
- To improve cybersecurity awareness

## Legal Disclaimer

This tool is for educational purposes only. The creators and contributors:
- Are not responsible for misuse
- Require proper authorization before testing
- Mandate ethical usage
- Expect compliance with local laws

## License

Educational use only. All rights reserved.
