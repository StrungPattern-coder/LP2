############################################################
# ASSIGNMENT 9
# Online Blog Application Deployment using MERN + AWS EC2
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

# Open:
# EC2 Dashboard


############################################################
# STEP 3 — LAUNCH NEW EC2 INSTANCE
############################################################

# Configuration:

# Instance Name:
# blog-app-server

# Operating System:
# Ubuntu Server 22.04 LTS

# Instance Type:
# t2.micro

# Key Pair:
# Create or select existing .pem key

# Network Settings:
# Allow SSH Traffic (Port 22)
# Allow HTTP Traffic (Port 80)

# Add Custom TCP Rules:
# Port 5001 → Anywhere
# Port 5173 → Anywhere

# Launch Instance


############################################################
# STEP 4 — COPY PUBLIC IPV4 ADDRESS
############################################################

# Example:
# 13.61.27.68


############################################################
# STEP 5 — CONNECT TO EC2 USING SSH
############################################################

# Open terminal on local machine

cd ~/Downloads

chmod 400 your-key.pem

ssh -i your-key.pem ubuntu@YOUR_PUBLIC_IP


############################################################
# STEP 6 — UPDATE SYSTEM PACKAGES
############################################################

sudo apt update


############################################################
# STEP 7 — INSTALL NODE.JS AND NPM
############################################################

sudo apt install nodejs npm -y


############################################################
# STEP 8 — VERIFY INSTALLATION
############################################################

node -v

npm -v


############################################################
# STEP 9 — INSTALL GIT
############################################################

sudo apt install git -y


############################################################
# STEP 10 — CLONE GITHUB REPOSITORY
############################################################

git clone https://github.com/StrungPattern-coder/LP2.git


############################################################
# STEP 11 — ENTER PROJECT DIRECTORY
############################################################

cd LP2/9_blog_app/blog-app


############################################################
# STEP 12 — SETUP BACKEND
############################################################

cd backend


############################################################
# STEP 13 — INSTALL BACKEND DEPENDENCIES
############################################################

npm install


############################################################
# STEP 14 — VERIFY MONGODB ATLAS CONNECTION
############################################################

# Open server.js

nano server.js

# Ensure mongoose.connect() contains
# MongoDB Atlas connection string.


############################################################
# STEP 15 — START BACKEND SERVER
############################################################

npm start


############################################################
# EXPECTED OUTPUT
############################################################

# MongoDB Connected
# Server running on port 5001


############################################################
# STEP 16 — OPEN NEW TERMINAL TAB
############################################################

cd ~/Downloads

ssh -i your-key.pem ubuntu@YOUR_PUBLIC_IP


############################################################
# STEP 17 — GO TO FRONTEND DIRECTORY
############################################################

cd ~/LP2/9_blog_app/blog-app/frontend


############################################################
# STEP 18 — INSTALL FRONTEND DEPENDENCIES
############################################################

npm install


############################################################
# STEP 19 — CREATE .env FILE
############################################################

nano .env


############################################################
# STEP 20 — ADD API URL
############################################################

# Replace YOUR_PUBLIC_IP with EC2 public IP

VITE_API_URL=http://YOUR_PUBLIC_IP:5001


############################################################
# STEP 21 — SAVE .env FILE
############################################################

# CTRL + O
# ENTER
# CTRL + X


############################################################
# STEP 22 — BUILD FRONTEND FOR PRODUCTION
############################################################

npm run build


############################################################
# STEP 23 — INSTALL STATIC FILE SERVER
############################################################

sudo npm install -g serve


############################################################
# STEP 24 — START FRONTEND SERVER
############################################################

serve -s dist -l 5173


############################################################
# EXPECTED OUTPUT
############################################################

# Serving!
# Local:    http://localhost:5173
# Network:  http://172.xx.xx.xx:5173


############################################################
# STEP 25 — OPEN WEBSITE IN BROWSER
############################################################

# Open:

# http://YOUR_PUBLIC_IP:5173


############################################################
# EXPECTED RESULT
############################################################

# Full MERN blog application opens publicly.
# Users can:
# - Create blogs
# - View blogs
# - Delete blogs
# - Data stored in MongoDB Atlas


############################################################
# OPTIONAL — FIX CORS ISSUE
############################################################

# If frontend cannot communicate with backend:

cd ~/LP2/9_blog_app/blog-app/backend

nano server.js

# Add deployed frontend URL in allowedOrigins:

# Example:
# "http://13.61.27.68:5173"

# Save file.

# Restart backend:

npm start


############################################################
# OPTIONAL — PULL UPDATED GITHUB CODE
############################################################

git reset --hard HEAD

git pull origin main


############################################################
# OPTIONAL — USE PM2 FOR PERSISTENT HOSTING
############################################################

sudo npm install -g pm2

cd ~/LP2/9_blog_app/blog-app/backend

pm2 start server.js

cd ~/LP2/9_blog_app/blog-app/frontend

pm2 serve dist 5173 --spa


############################################################
# STEP 26 — STOP EC2 INSTANCE AFTER PRACTICAL
############################################################

# AWS Console
# EC2 Dashboard
# Select Instance
# Instance State → Stop Instance


############################################################
# END OF ASSIGNMENT
############################################################