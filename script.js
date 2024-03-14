function sendMessage() {
    var input = document.getElementById('command-input').value.trim();
    if (input !== '') {
        var output = document.createElement('div');
        output.textContent = input;
        document.getElementById('console-output').appendChild(output);
        document.getElementById('command-input').value = '';
        document.getElementById('console-output').scrollTop = document.getElementById('console-output').scrollHeight;
    }
}

document.getElementById("send-button").addEventListener("click", function() {
    var message = document.getElementById("command-input").value;
    sendMessage(message);
    sendWebhook(message);
});

function sendMessage(message) {
    var consoleOutput = document.getElementById("console-output");
    consoleOutput.innerHTML += "<p>" + message + "</p>";
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}
    
    function sendWebhook(message) {
        var webhookUrl = "YOUR_WEBHOOKS_URL";
        var requestData = {
            embeds: [{
                title: "! >Terminus.sh - Message",
                description: message,
                color: 15548997,
                timestamp: new Date().toISOString()
            }]
        };
        
        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        }).then(response => {
            if (!response.ok) {
                console.error("Erreur lors de l'envoi du webhook:", response.status, response.statusText);
            }
        }).catch(error => {
            console.error("Erreur lors de l'envoi du webhook:", error.message);
        });
    }
    
