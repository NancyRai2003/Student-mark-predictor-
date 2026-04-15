function predict() {
    const hours = document.getElementById("hours").value;
    const attendance = document.getElementById("attendance").value;

    if (!hours || !attendance) {
        alert("Please enter all fields");
        return;
    }

    document.getElementById("result").innerText = "Calculating...";

    fetch("http://localhost:3000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ hours, attendance })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("result").innerText =
            "📊 Predicted Marks: " + data.prediction;
    })
    .catch(() => {
        alert("Server not working");
    });
}