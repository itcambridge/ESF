# Deploying the Economic Symmetry Forum Website to Linode

This guide walks through deploying the ESF website to your Linode server at 172.237.102.139.

## 1. Install Nginx Web Server

```bash
# Update package list
sudo apt update

# Install Nginx
sudo apt install -y nginx

# Start Nginx and enable it to start on boot
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 2. Create Website Directory

```bash
# Create directory for the website
sudo mkdir -p /var/www/economicsymmetryforum

# Set proper permissions
sudo chown -R $USER:$USER /var/www/economicsymmetryforum
sudo chmod -R 755 /var/www/economicsymmetryforum
```

## 3. Transfer Website Files to Server

There are several ways to transfer your website files to the server:

### Option A: Clone from GitHub (Recommended)

If your repository is public or you've set up SSH keys for GitHub on your Linode server:

```bash
# Install Git if not already installed
sudo apt install -y git

# Navigate to web directory
cd /var/www/economicsymmetryforum

# Clone your repository (replace with your actual repository URL)
git clone https://github.com/itcambridge/ESF.git .
```

### Option B: Use SCP to Transfer Files

From your local machine (not on the server), you can use SCP to transfer files:

```bash
# Run this from your local machine, not on the server
# Replace /path/to/local/website with your local website directory
scp -r /path/to/local/website/* root@172.237.102.139:/var/www/economicsymmetryforum
```

## 4. Configure Nginx

Create an Nginx server block configuration:

```bash
# Create new Nginx configuration file
sudo nano /etc/nginx/sites-available/economicsymmetryforum.com

# Add the following configuration
# -------
server {
    listen 80;
    server_name economicsymmetryforum.com www.economicsymmetryforum.com;

    root /var/www/economicsymmetryforum;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Additional configurations can be added here
}
# -------

# Create a symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/economicsymmetryforum.com /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# If the test is successful, restart Nginx
sudo systemctl restart nginx
```

## 5. Update DNS Records

Update your DNS records as shown in your domain management panel:

1. Ensure your A records point to 172.237.102.139:
   - @ (root domain)
   - www

## 6. Testing

After DNS propagation (may take up to 24-48 hours), your website should be accessible at:

- http://economicsymmetryforum.com
- http://www.economicsymmetryforum.com

## Optional: Set Up SSL/TLS with Let's Encrypt

For HTTPS support:

```bash
# Install Certbot and its Nginx plugin
sudo apt install -y certbot python3-certbot-nginx

# Obtain and install certificates
sudo certbot --nginx -d economicsymmetryforum.com -d www.economicsymmetryforum.com

# Follow the interactive prompts

# Certbot will automatically update your Nginx configuration
```

## Troubleshooting

- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Check permissions: Ensure files are readable by the Nginx user
- Firewall issues: Ensure ports 80 and 443 are open: `sudo ufw allow 'Nginx Full'`
