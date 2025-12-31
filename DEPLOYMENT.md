# Economic Symmetry Forum Website - Deployment Guide

This guide provides instructions for testing and deploying the Economic Symmetry Forum (ESF) website.

## Local Testing

Before deploying to a production server, it's recommended to test the website locally:

### Option 1: Simple Local Server

The simplest way to test the website locally is using Python's built-in HTTP server:

```bash
# If you have Python 3 installed
python -m http.server

# If you have Python 2 installed
python -m SimpleHTTPServer
```

Then visit http://localhost:8000 in your web browser.

### Option 2: Using Live Server Extension

If you're using Visual Studio Code:

1. Install the "Live Server" extension
2. Right-click on index.html
3. Select "Open with Live Server"

## Deployment to Production

The website is designed to be deployed to a standard web server. Follow these steps to deploy to your production environment:

### Option 1: Deployment to Linode (as configured)

The repository includes a deployment script for Linode servers. To use it:

1. Ensure you have SSH access to your Linode server
2. Update the server IP address in deploy.sh if needed (currently set to 172.237.102.139)
3. Run the deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

4. Update your DNS settings as described in deploy-to-linode.md

### Option 2: Manual Deployment to Any Web Server

1. Copy all files to your web server's document root:

```bash
# Example using SCP
scp -r * username@your-server:/path/to/webroot/

# Example using rsync
rsync -avz --delete ./ username@your-server:/path/to/webroot/
```

2. Set up your web server configuration (example for Nginx):

```nginx
server {
    listen 80;
    server_name economicsymmetryforum.org www.economicsymmetryforum.org;

    root /path/to/webroot;
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
```

## SSL/TLS Configuration (Recommended)

For HTTPS support with Let's Encrypt:

```bash
# Install Certbot and its Nginx plugin
sudo apt install -y certbot python3-certbot-nginx

# Obtain and install certificates
sudo certbot --nginx -d economicsymmetryforum.org -d www.economicsymmetryforum.org

# Follow the interactive prompts
```

## Performance Optimization

The website is already optimized with:

- Properly sized and compressed images
- Efficient CSS and JavaScript
- Proper caching headers
- Deferred loading for non-critical resources

For further optimization:
- Consider implementing a CDN like Cloudflare
- Optimize images further using WebP format
- Set up proper cache control headers on your server

## Troubleshooting

- Check web server error logs if the site isn't loading
- Ensure file permissions are set correctly (usually 644 for files, 755 for directories)
- Verify DNS settings are pointing to the correct IP address
- Test using curl to isolate browser-specific issues: `curl -I https://economicsymmetryforum.org`
