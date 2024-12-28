
Pure JS .. Display IIS error message

function render404Page() {
    // Create the HTML elements
    const body = document.body;
    body.style.margin = "0";
    body.style.fontSize = ".7em";
    body.style.fontFamily = "Verdana, Arial, Helvetica, sans-serif";
    body.style.background = "#EEEEEE";

    const header = document.createElement("div");
    header.id = "header";
    header.style.width = "96%";
    header.style.margin = "0";
    header.style.padding = "6px 2%";
    header.style.fontFamily = '"trebuchet MS", Verdana, sans-serif';
    header.style.color = "#FFF";
    header.style.backgroundColor = "#555555";

    const h1 = document.createElement("h1");
    h1.textContent = "Server Error";
    h1.style.fontSize = "2.4em";
    h1.style.margin = "0";
    h1.style.color = "#FFF";

    header.appendChild(h1);

    const content = document.createElement("div");
    content.id = "content";
    content.style.margin = "0 0 0 2%";
    content.style.position = "relative";

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container";
    contentContainer.style.background = "#FFF";
    contentContainer.style.width = "96%";
    contentContainer.style.marginTop = "8px";
    contentContainer.style.padding = "10px";
    contentContainer.style.position = "relative";

    const fieldset = document.createElement("fieldset");
    fieldset.style.padding = "0 15px 10px 15px";

    const h2 = document.createElement("h2");
    h2.textContent = "404 - File or directory not found.";
    h2.style.fontSize = "1.7em";
    h2.style.margin = "0";
    h2.style.color = "#CC0000";

    const h3 = document.createElement("h3");
    h3.textContent = "The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.";
    h3.style.fontSize = "1.2em";
    h3.style.margin = "10px 0 0 0";
    h3.style.color = "#000";

    fieldset.appendChild(h2);
    fieldset.appendChild(h3);
    contentContainer.appendChild(fieldset);
    content.appendChild(contentContainer);

    // Append elements to the body
    body.appendChild(header);
    body.appendChild(content);
}

// Call the function to render the page
render404Page();

