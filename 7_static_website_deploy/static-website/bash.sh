############################################################
# ASSIGNMENT 7
# Design and Deploy a Static Website on AWS EC2
############################################################


############################################################
# STEP 1 — LOGIN TO AWS CONSOLE
############################################################

# Open:
# https://aws.amazon.com/console/


############################################################
# STEP 2 — OPEN EC2 DASHBOARD
############################################################

# Search:
# EC2

# Click:
# Launch Instance


############################################################
# STEP 3 — CONFIGURE INSTANCE
############################################################

# Instance Name:
# LP2-Static-Website

# AMI:
# Ubuntu Server 24.02 LTS

# Instance Type:
# t3.micro


############################################################
# STEP 4 — CREATE KEY PAIR
############################################################

# Key Pair Name:
# lp2-static-website-key

# Type:
# RSA

# Format:
# .pem

# Download key file


############################################################
# STEP 5 — CONFIGURE SECURITY GROUP
############################################################

# Enable:
# SSH (Port 22)

# Enable:
# HTTP (Port 80)

# Source:
# Anywhere (0.0.0.0/0)


############################################################
# STEP 6 — LAUNCH INSTANCE
############################################################

# Click:
# Launch Instance

# Wait until:
# Instance State = Running


############################################################
# STEP 7 — COPY PUBLIC IPV4 ADDRESS
############################################################

# Example:
# 16.171.28.252


############################################################
# STEP 8 — OPEN TERMINAL ON MAC
############################################################

cd ~/Downloads


############################################################
# STEP 9 — GIVE KEY FILE PERMISSION
############################################################

chmod 400 lp2-static-website-key.pem


############################################################
# STEP 10 — CONNECT TO EC2 USING SSH
############################################################

ssh -i lp2-static-website-key.pem ubuntu@16.171.28.252


############################################################
# STEP 11 — UPDATE UBUNTU PACKAGES
############################################################

sudo apt update


############################################################
# STEP 12 — INSTALL APACHE WEB SERVER
############################################################

sudo apt install apache2 -y


############################################################
# STEP 13 — START APACHE SERVER
############################################################

sudo systemctl start apache2


############################################################
# STEP 14 — CHECK APACHE STATUS
############################################################

sudo systemctl status apache2

# Press:
# q
# to exit status screen


############################################################
# STEP 15 — CHECK WEBSITE IN BROWSER
############################################################

# Open browser:

# http://16.171.28.252

# Apache default page should appear


############################################################
# STEP 16 — CREATE LOCAL WEBSITE FILE
############################################################

# Create:
# index.html

# Sample HTML website code


############################################################
# STEP 17 — OPEN NEW TERMINAL TAB
############################################################

cd /Users/sriram_kommalapudi/Projects/LP2/7_static_website_deploy/static-website


############################################################
# STEP 18 — VERIFY WEBSITE FILE EXISTS
############################################################

ls

# Output should contain:
# index.html


############################################################
# STEP 19 — UPLOAD WEBSITE USING SCP
############################################################

scp -i ~/Downloads/lp2-static-website-key.pem index.html ubuntu@16.171.28.252:/home/ubuntu


############################################################
# STEP 20 — RETURN TO SSH TERMINAL
############################################################

cd /var/www/html


############################################################
# STEP 21 — REMOVE APACHE DEFAULT PAGE
############################################################

sudo rm index.html


############################################################
# STEP 22 — MOVE WEBSITE FILE TO WEB DIRECTORY
############################################################

sudo mv ~/index.html /var/www/html/


############################################################
# STEP 23 — REFRESH WEBSITE
############################################################

# Open browser:

# http://16.171.28.252

# Your custom website should now appear


############################################################
# STEP 24 — REMOTE WEBSITE UPDATE PROCESS
############################################################

# Modify local index.html file

# Upload updated file again:

scp -i ~/Downloads/lp2-static-website-key.pem index.html ubuntu@16.171.28.252:/home/ubuntu


############################################################
# STEP 25 — MOVE UPDATED FILE
############################################################

sudo mv ~/index.html /var/www/html/


############################################################
# STEP 26 — REFRESH WEBSITE AGAIN
############################################################

# Updated website changes will appear


############################################################
# STEP 27 — STOP INSTANCE AFTER PRACTICAL
############################################################

# AWS Console
# EC2
# Instance State
# Stop Instance

# Prevents unnecessary billing
############################################################