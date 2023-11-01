import "./App.css";

function App() {
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Access form field values using document.getElementById or React state
    const inputFieldValues = {
      date1: document.getElementById("date1").value,
      driverFirstName: document.getElementById("driverFirstName").value,
      driverLastName: document.getElementById("driverLastName").value,
      driverLicenseNumber: document.getElementById("driverLicenseNumber").value,
      driverLicenseState: document.getElementById("driverLicenseState").value,
      driverTrainerName: document.getElementById("driverTrainerName").value,
      driverTrainerSignature: document.getElementById("driverTrainerSignature")
        .value,
      candidateId: document.getElementById("candidateId").value,
      date2: document.getElementById("date2").value,
    };

    // Handle form submission logic here
    try {
      // Show the loading overlay when the conversion starts
      document.getElementById("loadingOverlay").style.display = "flex"; // Display the overlay
      console.log("Convert clicked");

      // Send the checkbox states to the server
      const response = await fetch(`https://dt-suite.onrender.com/convert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputFieldValues }),
      });

      if (response.ok) {
        console.log("Webpage converted to JPG");

        const firstName = inputFieldValues.driverFirstName;
        const lastName = inputFieldValues.driverLastName;

        // Ensure that both first and last names are provided
        if (firstName && lastName) {
          const imagePath = `${firstName}${lastName}.jpg`;

          // Display the image in the 'imageContainer' div
          const imageContainer = document.getElementById("imageContainer");
          imageContainer.style.backgroundColor = "black";
          imageContainer.style.display = "flex";
          imageContainer.style.alignItems = "center";
          imageContainer.style.justifyContent = "center";
          imageContainer.style.padding = "20px";

          // Create a download link for the image
          const downloadLink = document.createElement("a");
          downloadLink.href = imagePath;
          downloadLink.download = imagePath;

          // Create a button element for downloading
          const downloadButton = document.createElement("button");
          downloadButton.classList.add("btn", "btn-primary", "btn-lg");
          downloadButton.textContent = "Download JPG";

          downloadButton.addEventListener("click", async function () {
            const downloadLink = document.createElement("a");
            downloadLink.href = imagePath;
            downloadLink.download = imagePath;
            downloadLink.click();
          });

          downloadButton.style.display = "block";
          downloadButton.style.margin = "20px auto";

          const refreshButton = document.createElement("button");
          refreshButton.classList.add("btn", "btn-secondary", "btn-lg");
          refreshButton.textContent = "Refresh Page";

          refreshButton.style.display = "block";
          refreshButton.style.margin = "20px auto";

          refreshButton.addEventListener("click", function () {
            location.reload();
          });

          document.body.appendChild(downloadButton);
          document.body.appendChild(refreshButton);

          setTimeout(function () {
            window.scrollTo(0, document.body.scrollHeight);
          }, 100);

          document.getElementById("loadingOverlay").style.display = "none";
        } else {
          console.error("First and last names are required.");
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (err) {
      console.error("Error:", err);
      document.getElementById("loadingOverlay").style.display = "none";
    }
  }
  return (
    <>
      <div></div>
    </>
  );
}

export default App;
