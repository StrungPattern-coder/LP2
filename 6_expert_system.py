# Assignment 6
# Expert System - Help Desk Management

print("===================================")
print(" HELP DESK EXPERT SYSTEM ")
print("===================================")

while True:

    print("\nSelect Your Problem:")

    print("1. Password Reset")

    print("2. Internet Not Working")

    print("3. Software Installation")

    print("4. Printer Not Working")

    print("5. Exit")

    choice = int(input("\nEnter your choice: "))

    # Password Reset

    if choice == 1:

        print("\nExpert Advice:")

        print("- Go to account settings")

        print("- Click 'Forgot Password'")

        print("- Reset using registered email")

    # Internet Issue

    elif choice == 2:

        print("\nExpert Advice:")

        print("- Restart the router")

        print("- Check network cables")

        print("- Run network troubleshooter")

    # Software Installation

    elif choice == 3:

        print("\nExpert Advice:")

        print("- Check system requirements")

        print("- Run installer as administrator")

        print("- Disable antivirus temporarily")

    # Printer Issue

    elif choice == 4:

        print("\nExpert Advice:")

        print("- Check printer power")

        print("- Verify cable connection")

        print("- Reinstall printer drivers")

    # Exit

    elif choice == 5:

        print("\nExiting Expert System...")

        break

    else:

        print("\nInvalid Choice")