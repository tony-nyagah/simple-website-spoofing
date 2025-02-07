# Simple Website Spoofing Setup Guide

This guide will help you set up a local development environment for the website spoofing project. Please follow these steps carefully.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
  - [1. Install Node.js via NVM](#1-install-nodejs-via-nvm)
  - [2. Install Caddy Web Server](#2-install-caddy-web-server)
  - [3. Configure Project Settings](#3-configure-project-settings)
    - [3.1 Get Your Local IP Address](#31-get-your-local-ip-address)
    - [3.2 Configure Caddyfile](#32-configure-caddyfile)
    - [3.3 Domain Configuration](#33-domain-configuration)
  - [4. Start the Application](#4-start-the-application)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Notes](#notes)

## Prerequisites

- Ubuntu/Debian-based Linux system
- Administrative (sudo) privileges
- Basic knowledge of terminal commands
- Text editor (nano, vim, or VS Code)

## Installation Steps

### 1. Install Node.js via NVM

First, we'll install Node Version Manager (nvm) and Node.js:

```bash
# Download and install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Reload shell configuration (IMPORTANT!)
source ~/.bashrc  # or source ~/.zshrc if using zsh

# Install Node.js version 22
nvm install 22

# Verify installations
node -v  # Should show v22.13.1
npm -v   # Should show 10.9.2
```

### 2. Install Caddy Web Server

Caddy is our reverse proxy server. Install it using these commands:

```bash
# Install required packages
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl

# Add Caddy official repository
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list

# Update package list and install Caddy
sudo apt update
sudo apt install caddy
```

### 3. Configure Project Settings

#### 3.1 Get Your Local IP Address
```bash
# This command will show your local IP address
ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v '127.0.0.1' | head -n 1
```

Copy the IP address shown - you'll need it for the next step.

#### 3.2 Configure Caddyfile
Open the `Caddyfile` and add your IP address at the bottom:
```text
# Replace <your-ip-address> with the IP from step 3.1
# Example: if your IP is 192.168.0.104, write:
# 192.168.0.104 {
#     import common
# }
<your-ip-address> {
    import common
}
```

#### 3.3 Domain Configuration
The project is configured to use `cess.chem-labs.local` as the domain. The makefile will automatically:
1. Get your local IP address
2. Add the domain to your system's hosts file
3. Configure Caddy to use this domain

### 4. Start the Application

```bash
# Start the server using make
make start
```

## Verification

1. The server should start without any errors
2. You should be able to access the site using either:
   - `https://<your-ip-address>/WebSelfService#/signin`
   - `https://<your-domain>/WebSelfService#/signin`

## Troubleshooting

- If you can't access the site:
  - Check if Caddy is running: `sudo systemctl status caddy`
  - Verify your hosts file entry: `cat /etc/hosts`
  - Ensure ports 80 and 443 are not in use: `sudo lsof -i :80 -i :443`
  - Check Caddy logs: `sudo journalctl -u caddy`

## Notes

- This setup is for development/testing purposes only
- The site uses a self-signed certificate, so you'll see a security warning in your browser
- To stop the server: `make stop`
