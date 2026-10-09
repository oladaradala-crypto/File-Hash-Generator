const textInput = document.getElementById("textInput");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const hashOutput = document.getElementById("hashOutput");


// Generate SHA-256 Hash
async function generateHash(text){

    const encoder = new TextEncoder();

    const data = encoder.encode(text);

    const hashBuffer =
    await crypto.subtle.digest("SHA-256", data);

    const hashArray =
    Array.from(new Uint8Array(hashBuffer));

    const hashHex =
    hashArray.map(byte =>
        byte.toString(16).padStart(2, "0")
    ).join("");

    return hashHex;
}


// Generate Button
generateBtn.addEventListener("click", async () => {

    const text = textInput.value;

    if(text === ""){

        alert("Please enter some text.");

        return;
    }

    const hash = await generateHash(text);

    hashOutput.textContent = hash;

});


// Copy Button
copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(
        hashOutput.textContent
    );

    alert("Hash copied successfully!");

});


// Clear Button
clearBtn.addEventListener("click", () => {

    textInput.value = "";

    hashOutput.textContent = "";

});