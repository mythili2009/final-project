
// ========================================
// 1. GET HTML ELEMENTS
// ========================================

const promptForm = document.getElementById("promptForm");

const generatedPrompt = document.getElementById("generatedPrompt");

const emptyState = document.getElementById("emptyState");

const copyButton = document.getElementById("copyButton");

const clearButton = document.getElementById("clearButton");

const useSampleButton = document.getElementById("useSampleButton");

const copyMessage = document.getElementById("copyMessage");


// ========================================
// 2. GET INPUT FIELD VALUES
// ========================================

function getFieldValue(id) {

    return document.getElementById(id).value.trim();

}


// ========================================
// 3. GENERATE AI PROMPT
// ========================================

function createPrompt() {

    // Get values from input fields

    const role = getFieldValue("role");

    const task = getFieldValue("task");

    const context = getFieldValue("context");

    const constraints = getFieldValue("constraints");

    const outputFormat = getFieldValue("format");


    // Create the basic prompt

    let prompt = `ROLE:
${role}

TASK:
${task}`;


    // Add context if provided

    if (context !== "") {

        prompt += `

CONTEXT:
${context}`;

    }


    // Add constraints if provided

    if (constraints !== "") {

        prompt += `

CONSTRAINTS:
${constraints}`;

    }


    // Add output format

    prompt += `

OUTPUT FORMAT:
Present your response as ${outputFormat}.

Please make the response clear, accurate, well-organised, and appropriate for a college student.`;


    return prompt;

}


// ========================================
// 4. DISPLAY GENERATED PROMPT
// ========================================

promptForm.addEventListener("submit", function(event) {

    // Prevent page refresh

    event.preventDefault();


    // Check required fields

    if (!promptForm.reportValidity()) {

        return;

    }


    // Generate the prompt

    const prompt = createPrompt();


    // Display the prompt

    generatedPrompt.textContent = prompt;

    generatedPrompt.hidden = false;

    emptyState.hidden = true;


    // Clear previous messages

    copyMessage.textContent = "";

});


// ========================================
// 5. COPY GENERATED PROMPT
// ========================================

copyButton.addEventListener("click", async function() {

    const prompt = generatedPrompt.textContent;


    // Check whether a prompt exists

    if (!prompt) {

        copyMessage.textContent = "Generate a prompt before copying.";

        return;

    }


    try {

        // Copy prompt to clipboard

        await navigator.clipboard.writeText(prompt);

        copyMessage.textContent = "✓ Prompt copied successfully!";

    }

    catch (error) {

        // Alternative copy method

        const temporaryTextArea = document.createElement("textarea");

        temporaryTextArea.value = prompt;

        document.body.appendChild(temporaryTextArea);

        temporaryTextArea.select();

        document.execCommand("copy");

        temporaryTextArea.remove();

        copyMessage.textContent = "✓ Prompt copied successfully!";

    }

});


// ========================================
// 6. CLEAR ALL INPUT FIELDS
// ========================================

clearButton.addEventListener("click", function() {

    // Reset form fields

    promptForm.reset();


    // Clear generated prompt

    generatedPrompt.textContent = "";

    generatedPrompt.hidden = true;


    // Show empty output message

    emptyState.hidden = false;


    // Clear status message

    copyMessage.textContent = "";

});


// ========================================
// 7. LOAD SAMPLE PROMPT
// ========================================

useSampleButton.addEventListener("click", function() {

    // Fill the sample values

    document.getElementById("role").value =
        "Act as a friendly computer science tutor";


    document.getElementById("task").value =
        "Explain the basics of cloud computing";


    document.getElementById("context").value =
        "I am a first-year college student who is new to cloud computing.";


    document.getElementById("constraints").value =
        "Use simple English, give two real-life examples, and list three key benefits.";


    document.getElementById("format").value =
        "Bullet points";


    // Clear old generated prompt

    generatedPrompt.textContent = "";

    generatedPrompt.hidden = true;

    emptyState.hidden = false;

    copyMessage.textContent = "";


    // Focus on the first input field

    document.getElementById("role").focus();


    // Scroll to the form

    promptForm.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

});
