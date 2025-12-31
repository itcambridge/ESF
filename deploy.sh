#!/bin/bash
# Economic Symmetry Forum Website Deployment Script
# For use on Linode server at 172.237.102.139

echo "=== Economic Symmetry Forum Website Deployment ==="
echo "This script will deploy the ESF website on your Linode server."
echo "Make sure you're running this with appropriate permissions."
echo ""

# 1. Update system packages
echo "=== Updating system packages ==="
sudo apt update
sudo apt upgrade -y

# 2. Install Nginx and Git
echo "=== Installing Nginx and Git ==="
sudo apt install -y nginx git

# 3. Set up website directory
echo "=== Creating website directory ==="
sudo mkdir -p /var/www/economicsymmetryforum
sudo chown -R $USER:$USER /var/www/economicsymmetryforum
sudo chmod -R 755 /var/www/economicsymmetryforum

# 4. Clone the repository
echo "=== Cloning website repository ==="
cd /var/www/economicsymmetryforum
git clone https://github.com/itcambridge/ESF.git .

# 5. Configure Nginx
echo "=== Setting up Nginx configuration ==="
cat > /tmp/economicsymmetryforum.conf << 'EOF'
server {
    listen 80;
    server_name economicsymmetryforum.com www.economicsymmetryforum.com;

    root /var/www/economicsymmetryforum;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Enable gzip compression
    gzip on;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
}
EOF

sudo mv /tmp/economicsymmetryforum.conf /etc/nginx/sites-available/economicsymmetryforum.com
sudo ln -s /etc/nginx/sites-available/economicsymmetryforum.com /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default # Remove default config

# 6. Test Nginx configuration
echo "=== Testing Nginx configuration ==="
sudo nginx -t

if [ $? -eq 0 ]; then
    # 7. Restart Nginx
    echo "=== Restarting Nginx ==="
    sudo systemctl restart nginx
    sudo systemctl enable nginx

    # 8. Set up firewall
    echo "=== Setting up firewall ==="
    sudo ufw allow 'Nginx Full'
    
    echo "=== Setup Complete! ==="
    echo "Your website should now be accessible once DNS propagation completes."
    echo "Next steps:"
    echo "1. Update DNS records to point to 172.237.102.139"
    echo "2. Optional: Set up HTTPS with Let's Encrypt:"
    echo "   sudo apt install -y certbot python3-certbot-nginx"
    echo "   sudo certbot --nginx -d economicsymmetryforum.com -d www.economicsymmetryforum.com"
else
    echo "=== Error in Nginx configuration. Please check and fix the issues. ==="
fi
