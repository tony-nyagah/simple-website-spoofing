.PHONY: setup start stop clean kill_ports

# Configuration
DOMAIN=cess.chem-labs.local
IP=192.168.0.104
HOSTS_FILE=/etc/hosts

kill_ports:
	@echo "Killing processes on ports 3000 and 3001..."
	@-sudo lsof -ti:3000 | xargs -r sudo kill -9
	@-sudo lsof -ti:3001 | xargs -r sudo kill -9

setup: clean kill_ports
	@echo "Setting up the environment..."
	@# Check if domain is already in hosts file
	@if ! grep -q "$(IP) $(DOMAIN)" $(HOSTS_FILE); then \
		echo "$(IP) $(DOMAIN)" | sudo tee -a $(HOSTS_FILE); \
	fi
	@# Install dependencies
	@cd server && npm install
	@npm install
	@# Build frontend
	@npm run build

start: setup
	@echo "Starting services..."
	@# Start the Node.js server in the background
	@cd server && node index.js & echo $$! > ../server.pid
	@# Start Caddy in the background
	@sudo caddy run & echo $$! > caddy.pid
	@echo "Services started! Access the site at https://$(DOMAIN)"
	@echo "To stop the services, run: make stop"

stop:
	@echo "Stopping services..."
	@# Kill the Node.js server
	@if [ -f server.pid ]; then \
		kill $$(cat server.pid) 2>/dev/null || true; \
		rm server.pid; \
	fi
	@# Kill Caddy
	@if [ -f caddy.pid ]; then \
		sudo kill $$(cat caddy.pid) 2>/dev/null || true; \
		rm caddy.pid; \
	fi
	@sudo pkill caddy 2>/dev/null || true
	@echo "Services stopped"

clean: stop
	@echo "Cleaning up..."
	@# Remove domain from hosts file
	@sudo sed -i "/$(IP) $(DOMAIN)/d" $(HOSTS_FILE)
	@echo "Cleanup complete"

status:
	@echo "Checking service status..."
	@if [ -f server.pid ] && ps -p $$(cat server.pid) > /dev/null; then \
		echo "Node.js server is running (PID: $$(cat server.pid))"; \
	else \
		echo "Node.js server is not running"; \
	fi
	@if pgrep caddy > /dev/null; then \
		echo "Caddy is running (PID: $$(pgrep caddy))"; \
	else \
		echo "Caddy is not running"; \
	fi
	@if grep -q "$(IP) $(DOMAIN)" $(HOSTS_FILE); then \
		echo "Domain is configured in hosts file"; \
	else \
		echo "Domain is not configured in hosts file"; \
	fi
