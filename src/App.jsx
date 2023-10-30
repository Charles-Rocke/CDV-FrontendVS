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
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/convert`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputFieldValues }),
        }
      );

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
      {/*  CDV Road Test Evaluation Description Component */}
      <div className="container">
        <center>
          <h1>CDV Road Test Evaluation</h1>
        </center>
        <p>
          The Road Test form is the grading rubric Driver Trainers will use to
          assess the Driver candidate&apos;s performance throughout the test.
          The road test is graded on 3 tiers: Demonstrated, Demonstrated &
          Coached, and Not Demonstrated. Driver Trainers will monitor whether or
          not a Driver candidate demonstrates the listed behaviors and actions
          safely.
        </p>
        <br />
        <p>
          The scoring system of the Road Test is based on the number of
          penalties or Not Demonstrated actions.
        </p>
        <ul>
          <li>Demonstrated actions earn 0 points</li>
          <li>Demonstrated and Coached actions earn 1 point</li>
          <li>Not Demonstrated actions earn 2 points</li>
        </ul>
        <p>
          If during the Road Test the instructor deems the candidate to have
          unsafe driving habits, they should locate a safe area for the
          candidate to park. If they feel it is safe, the instructor should take
          over operation of the vehicle and return to the Delivery Station.
        </p>
        <br />
        <p>
          Select 0 for Demonstrated actions, 1 for Demonstrated and Coached
          actions, and 2 for actions that were Not Demonstrated. A driver
          candidate must have a score of 10 or lower in order to pass.
          Additionaly, items marked with a star (*) are actions that the Driver
          candidate MUST demonstrate. Instances of these actions not being
          demonstrated is an automatic fail.
        </p>
      </div>
      <center>
        <hr style={{ width: "90%" }} />
      </center>
      <div className="container">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          I. Pre-Trip Inspection
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="X">X</option>
              <option value="0">0</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Checks all items included in the DVIC Checklist</span>
          </div>
        </div>
      </div>
      <div className="container">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          II. Straight Line Backing/ Backing in parking spot
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Uses both mirrors frequently </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Uses space for set up correctly </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span>
              Safely stops and sompletes walk around of vehicle (getting out and
              looking)
            </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Avoids backing from blind side </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Sets parking brake </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Controls speed and direction properly when backing </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span>
              Scans to identify parking locations that do not require backing as
              the first option
            </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
      </div>
      {/*  end Type Component */}

      {/*  Type II Component */}
      {/*  Type Component */}
      <div className="container">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          III. Skills Evaluation
        </label>
        <br />
        {/*  Sub Type */}
        <label htmlFor="exampleFormControlInput1" className="form-label">
          1. Locates Controls
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Headlights </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Emergency and parking brakes </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> 4-way flashers </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Horn </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Windshield wipers </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Sub Type */}
        <label htmlFor="exampleFormControlInput1" className="form-label">
          2. Engine, Seat Belt, and Braking
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Starts Engine, emergency brake on </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Secures seat belt * </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Use of correct foot on brake pedal </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Sub Type */}
        <label htmlFor="exampleFormControlInput1" className="form-label">
          3. Steering
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Steers smoothly with minimal adjustments </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Stays centered on lane of travel </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Hands are at 9 & 3 with proper driving posture </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Both hands remain on the steering wheel </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Sub Type */}
        <label htmlFor="exampleFormControlInput1" className="form-label">
          4. Stopping
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Checks mirrors when slowing </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Tests brakes before descending grades </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Uses space cushion to avoid sudden stops </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Stops behind crosswalks </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span>
              {" "}
              Leaves one vehicle length in front or 15&apos; minimum{" "}
            </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Sub Type */}
        <label htmlFor="exampleFormControlInput1" className="form-label">
          5. Lights
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span>
              {" "}
              Turns on hazard lights inside all parking lots & yards{" "}
            </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Properly uses auxiliary lights</span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Sub Type */}
        <label htmlFor="exampleFormControlInput1" className="form-label">
          6. Traffic Signs/Signals
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Heeds all traffic signs & signals </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span>
              {" "}
              Comes to a complete stop at sop signs and stop lights *{" "}
            </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Uses turn signal when changing lanes </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Obeys all stop signs * </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/* {/*  Sub Type */}
        <label htmlFor="exampleFormControlInput1" className="form-label">
          7. Turning
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Signals well in advance and slows for turns </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Begins and ends turns in correct lane </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Check traffic and turns only when safe </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span>
              {" "}
              Completes turns and safely, and does not impede traffic{" "}
            </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Checks mirrors before completing turns </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Performs right turns correctly (avoiding curbs) * </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Sub Type */}
        <label htmlFor="exampleFormControlInput1" className="form-label">
          8. Intersections
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Approaches intersection prepared to stop </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Yields the right-of-way at all times </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Gains eye contact with other drivers </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span>
              Checks left, right, and left again before pulling into
              intersections
            </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Sub Type */}
        <label htmlFor="exampleFormControlInput1" className="form-label">
          9. Passing (Where allowed by law for CMVs)
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Passes with enough space ahead </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Avoids passing in unsafe locations </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Does not follow too close or tailgate </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span>
              Signals lane changes well in advance of passing maneuver (if
              applicable)
            </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Leaves room for other vehicles </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Sub Type */}
        <label htmlFor="exampleFormControlInput1" className="form-label">
          10. Safety
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Keeps vehicle to the right </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Uses horn properly </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Uses path of least resistance </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Maintains lead time </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Maintains adequate distance from vehicles </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Refrains from backing up whenever possible </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Sub Type */}
        <label htmlFor="exampleFormControlInput1" className="form-label">
          11. Speed
        </label>
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Maintains the speed limit * </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Reduces speed before turns </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
        {/*  Benchmark Component */}
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span>
              Adjusts speed to surrounding conditions (weather, space, traffic
              density, pedestrian traffic, etc)
            </span>
          </div>
        </div>
        {/*  end Benchmark Component */}
      </div>
      {/*  end Type Component */}
      {/*  Total points Component */}
      <div className="mt-5 container">
        <div className="row g-3 align-items-center">
          <div className="m-3 col-auto">
            <select
              defaultValue="0"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10+">10+</option>
            </select>
          </div>
          <div className="mb-3 col-auto text-center">
            <span> Total points </span>
          </div>
        </div>
      </div>
      {/*  end Total points Component */}
      {/*  Notes Component */}
      <div className="container">
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Demonstrated & Coached feedback:
          </label>
          <textarea
            defaultValue="N/A"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Remarks/Comments on Skills Evaluation:
          </label>
          <textarea
            defaultValue="Completed"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
      </div>

      {/*  end Notes Component */}
      {/* loading overlay */}
      <div id="loadingOverlay" className="overlay">
        <span className="visually-hidden">Loading...</span>
      </div>
      <center>
        <hr style={{ width: "90%" }} />
      </center>
      {/*  Certificate of Driver&apos;s Road Test */}
      <form id="conversionForm" onSubmit={handleSubmit}>
        {/*  Certificate of Drivers Road Test meta data */}
        <div className="container" id="certificate">
          <center>
            <h2 className="mt-3">Certificate of Driver&apos;s Road Test</h2>
            <p className="muted">
              This is to certify that the below named driver was given a Road
              Test under my supervision on &nbsp;
              <span style={{ display: "inline-block", width: "20%" }}>
                <input
                  type="date"
                  className="form-control"
                  placeholder="MM/DD/YY"
                  aria-label="Enter Date"
                  aria-describedby="basic-addon1"
                  id="date1"
                  required
                />
              </span>
              , consisting of &nbsp;
              <a href="#" data-bs-toggle="tooltip" data-bs-title="10">
                10 &nbsp;
              </a>
              miles of driving. It is my considered opinion that this Driver
              possesses sufficient driving skill to safely operate the type of
              custom delivery vehicle listed above.
            </p>
          </center>
        </div>
        {/*  Driver and Date info Component */}
        <div className="container">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Driver First name
            </span>
            <input
              type="text"
              aria-label="First name"
              className="form-control"
              id="driverFirstName"
              placeholder="Enter driver first name"
            />
            <span className="input-group-text" id="basic-addon1">
              Driver Last name
            </span>
            <input
              type="text"
              aria-label="Last name"
              className="form-control"
              id="driverLastName"
              placeholder="Enter driver last name"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Driver&apos;s License Number:
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter License Number"
              aria-label="Signature"
              aria-describedby="basic-addon1"
              id="driverLicenseNumber"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Driver License State:
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="ex. Maryland"
              aria-label="License State"
              aria-describedby="basic-addon1"
              id="driverLicenseState"
              required
            />
          </div>
          {/*  Trainers Data Component */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Trainer/Examiner&apos;s Name:
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter trainers name"
              aria-label="Name"
              aria-describedby="basic-addon1"
              id="driverTrainerName"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Trainer/Examiner&apos;s Signature:
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter trainers signature"
              aria-label="Signature"
              aria-describedby="basic-addon1"
              id="driverTrainerSignature"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Candidates ID:
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Candidates employee ID"
              aria-label="Candidates ID"
              aria-describedby="basic-addon1"
              id="candidateId"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Date of Road Test Exam:
            </span>
            <input
              type="date"
              className="form-control"
              placeholder="MM/DD/YYYY"
              aria-label="Date"
              aria-describedby="basic-addon1"
              id="date2"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Type of power unit(Vehicle type):
            </span>
            <input
              type="text"
              className="form-control"
              readOnly
              value="CDV"
              aria-label="Date"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Amazon Logistics - Building Address:
            </span>
            <input
              type="text"
              className="form-control"
              readOnly
              value="7226 Preston Gateway DR 21076"
              aria-label="Date"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Facility:
            </span>
            <input
              type="text"
              className="form-control"
              readOnly
              value="DMD6"
              aria-label="Facility"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        {/*  Convert button */}
        <center>
          <button
            type="submit"
            className="btn btn-success btn-lg m-3"
            id="convertButton"
          >
            Convert to JPG
          </button>
        </center>
      </form>
      <div id="imageContainer"></div>
    </>
  );
}

export default App;
