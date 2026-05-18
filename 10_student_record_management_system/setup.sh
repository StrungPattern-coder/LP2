#!/bin/bash

############################################################
# Cloud-Based Student Record Management System
# Complete End-to-End AWS EC2 Deployment Script
############################################################
# sudo apt install git -y
# cd ~/10_student_record_management_system
# chmod +x setup.sh
# ./setup.sh

# VERY IMPORTANT AWS SECURITY GROUP RULES

# Enable:
# Type      Port
# SSH       22
# Custom TCP    5002
# Custom TCP    5173
# Custom TCP    5000
# Custom TCP    5001

echo "==========================================="
echo "Student Record Management System Setup"
echo "==========================================="

sleep 2

############################################################
# STEP 1 — UPDATE SYSTEM
############################################################

echo ""
echo "Updating system packages..."
echo ""

sudo apt update -y

############################################################
# STEP 2 — INSTALL REQUIRED SOFTWARE
############################################################

echo ""
echo "Installing Node.js, npm, git, and serve..."
echo ""

sudo apt install -y nodejs npm git

sudo npm install -g serve

############################################################
# STEP 3 — BACKEND SETUP
############################################################

echo ""
echo "Setting up backend..."
echo ""

cd backend

npm install

############################################################
# STEP 4 — CREATE BACKEND .env FILE
############################################################

echo ""
echo "Creating backend .env file..."
echo ""

cat > .env <<EOL
PORT=5002
MONGODB_URI=mongodb+srv://lp2user:lp2password123@cluster0.rk1rpuj.mongodb.net/studentRecordsDB?retryWrites=true&w=majority&appName=Cluster0
FRONTEND_URL=http://$(curl -s ifconfig.me):5173
EOL

############################################################
# STEP 5 — START BACKEND
############################################################

echo ""
echo "Starting backend server..."
echo ""

nohup npm start > backend.log 2>&1 &

sleep 5

############################################################
# STEP 6 — FRONTEND SETUP
############################################################

echo ""
echo "Setting up frontend..."
echo ""

cd ../frontend

npm install

############################################################
# STEP 7 — CREATE FRONTEND .env FILE
############################################################

echo ""
echo "Creating frontend .env file..."
echo ""

cat > .env <<EOL
VITE_API_URL=http://$(curl -s ifconfig.me):5002
EOL

############################################################
# STEP 8 — BUILD FRONTEND
############################################################

echo ""
echo "Building frontend..."
echo ""

npm run build

############################################################
# STEP 9 — START FRONTEND SERVER
############################################################

echo ""
echo "Starting frontend server..."
echo ""

nohup serve -s dist -l 5173 > frontend.log 2>&1 &

sleep 5

############################################################
# STEP 10 — DISPLAY FINAL URL
############################################################

PUBLIC_IP=$(curl -s ifconfig.me)

echo ""
echo "==========================================="
echo "DEPLOYMENT COMPLETED SUCCESSFULLY"
echo "==========================================="
echo ""
echo "Frontend URL:"
echo "http://$PUBLIC_IP:5173"
echo ""
echo "Backend URL:"
echo "http://$PUBLIC_IP:5002"
echo ""
echo "Backend Logs:"
echo "tail -f ~/student_mern_app/backend/backend.log"
echo ""
echo "Frontend Logs:"
echo "tail -f ~/student_mern_app/frontend/frontend.log"
echo ""
echo "==========================================="