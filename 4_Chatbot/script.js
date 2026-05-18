// Send message when Enter key is pressed

document
    .getElementById("userInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            sendMessage();
        }
    });

function sendMessage() {

    let input = document
        .getElementById("userInput");

    let message = input.value.toLowerCase();

    let chatbox =
        document.getElementById("chatbox");

    // Display user message

    chatbox.innerHTML +=
        "<p class='user'><b>You:</b> "
        + message +
        "</p>";

    let reply = "";

    // Rule-based responses

    if (
        message.includes("hello")
        || message.includes("hi")
    ) {

        reply = "Hello! How can I help you?";

    }

    else if (
        message.includes("price")
    ) {

        reply =
            "Our product price starts from ₹500.";

    }

    else if (
        message.includes("delivery")
    ) {

        reply =
            "Delivery takes 3-5 business days.";

    }

    else if (
        message.includes("product")
        || message.includes("products")
    ) {

        reply =
            "We offer laptops, smartphones and accessories.";

    }

    else if (
        message.includes("contact")
        || message.includes("phone")
    ) {

        reply =
            "You can contact us at +91 9876543210.";

    }

    else if (
        message.includes("location")
        || message.includes("address")
    ) {

        reply =
            "We are located in Pune, Maharashtra.";

    }

    else if (
        message.includes("timing")
        || message.includes("hours")
    ) {

        reply =
            "Our store is open from 9 AM to 8 PM.";

    }

    else if (
        message.includes("refund")
        || message.includes("return")
    ) {

        reply =
            "Refunds are processed within 5-7 working days.";

    }

    else if (
        message.includes("thanks")
        || message.includes("thank you")
    ) {

        reply =
            "You're welcome! Happy to help.";

    }

    else if (
        message.includes("help")
        || message.includes("what can you do")
        || message.includes("what can you answer")
        || message.includes("services")
    ) {

        reply =
            "I can help you with products, prices, delivery, refunds, contact details, store timings and location.";

    }

    else if (
        message.includes("bye")
    ) {

        reply = "Thank you! Visit again.";

    }

    else {

        reply =
            "Sorry, I did not understand. Please ask about products, price, delivery, refund, contact or timing.";
    }

    // Display bot reply

    chatbox.innerHTML +=
        "<p class='bot'><b>Bot:</b> "
        + reply +
        "</p>";

    // Clear input box

    input.value = "";

    // Auto scroll

    chatbox.scrollTop =
        chatbox.scrollHeight;
}