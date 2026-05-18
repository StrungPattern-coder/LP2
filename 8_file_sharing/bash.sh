############################################################
# ASSIGNMENT 8
# Secure File Sharing Between Cloud Instances
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
# STEP 3 — CREATE FIRST INSTANCE (SENDER VM)
############################################################

# Click:
# Launch Instance

# Configuration:

# Instance Name:
# Sender

# Operating System:
# Ubuntu Server 22.04 LTS

# Instance Type:
# t2.micro

# Key Pair:
# sender-key.pem

# Enable:
# SSH Traffic (Port 22)

# Launch Instance


############################################################
# STEP 4 — CREATE SECOND INSTANCE (RECEIVER VM)
############################################################

# Click:
# Launch Instance

# Configuration:

# Instance Name:
# Receiver

# Operating System:
# Ubuntu Server 22.04 LTS

# Instance Type:
# t2.micro

# Use same key pair:
# sender-key.pem

# Enable:
# SSH Traffic (Port 22)

# Launch Instance


############################################################
# STEP 5 — VERIFY BOTH INSTANCES ARE RUNNING
############################################################

# EC2 Dashboard

# Ensure:
# Sender = Running
# Receiver = Running


############################################################
# STEP 6 — COPY IP ADDRESSES
############################################################

# Sender VM:
# Copy Public IPv4 Address

# Receiver VM:
# Copy:
# Public IPv4 Address
# Private IPv4 Address


############################################################
# STEP 7 — OPEN TERMINAL ON MAC
############################################################

cd ~/Downloads


############################################################
# STEP 8 — GIVE KEY FILE SECURE PERMISSIONS
############################################################

chmod 400 sender-key.pem


############################################################
# STEP 9 — CONNECT TO SENDER VM USING SSH
############################################################

ssh -i sender-key.pem ubuntu@SENDER_PUBLIC_IP


############################################################
# STEP 10 — CREATE SAMPLE FILE INSIDE SENDER VM
############################################################

nano sample.txt


############################################################
# STEP 11 — TYPE SAMPLE CONTENT
############################################################

# Example content:

# Hello from Sender VM
# Cloud File Sharing Assignment


############################################################
# STEP 12 — SAVE FILE
############################################################

# CTRL + O
# ENTER
# CTRL + X


############################################################
# STEP 13 — VERIFY FILE EXISTS
############################################################

ls

# Output should contain:
# sample.txt


############################################################
# STEP 14 — OPEN NEW TERMINAL TAB ON MAC
############################################################

cd ~/Downloads


############################################################
# STEP 15 — COPY PEM KEY TO SENDER VM
############################################################

scp -i ~/Downloads/sender-key.pem ~/Downloads/sender-key.pem ubuntu@SENDER_PUBLIC_IP:/home/ubuntu


############################################################
# STEP 16 — RETURN TO SENDER VM TERMINAL
############################################################

chmod 400 sender-key.pem


############################################################
# STEP 17 — TRANSFER FILE TO RECEIVER VM
############################################################

scp -i sender-key.pem sample.txt ubuntu@RECEIVER_PRIVATE_IP:/home/ubuntu


############################################################
# STEP 18 — ACCEPT SSH AUTHENTICITY PROMPT
############################################################

# Type:
# yes


############################################################
# STEP 19 — VERIFY FILE TRANSFER SUCCESS
############################################################

# Expected Output:

# sample.txt 100%


############################################################
# STEP 20 — CONNECT TO RECEIVER VM
############################################################

ssh -i ~/Downloads/sender-key.pem ubuntu@RECEIVER_PUBLIC_IP


############################################################
# STEP 21 — VERIFY FILE EXISTS IN RECEIVER VM
############################################################

ls

# Output should contain:
# sample.txt


############################################################
# STEP 22 — DISPLAY FILE CONTENT
############################################################

cat sample.txt


############################################################
# EXPECTED OUTPUT
############################################################

# Hello from Sender VM
# Cloud File Sharing Assignment


############################################################
# STEP 23 — STOP BOTH INSTANCES AFTER PRACTICAL
############################################################

# AWS Console
# EC2 Dashboard
# Select Sender + Receiver
# Instance State
# Stop Instance


############################################################
# END OF ASSIGNMENT
############################################################