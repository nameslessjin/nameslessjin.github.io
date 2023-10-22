function component(options) {
    const {tableClass, imageUrl, videoUrl, titleUrl, title, github, width, height,
        jobTitle, duration, description, imgWidth, imgHeight} = options

    let trId = title.toLowerCase().replace(/ /g, "_")
    let videoId = trId + "_video";

    let githubLink = 
        !github || github.length == 0 
        ? "" 
        : textIcon({content: "code", link: github, icon: "fa-github"})

    let mediaHtml = 
        !videoUrl || videoUrl.length == 0 
        ? 
        `<img src='${imageUrl}' video width="${imgWidth}" height="${imgHeight}">`
        :
        `
        <div class="sublevel" id='${videoId}' style="height: ${imgHeight}px">
            <video width="${width}" height="${height}" muted loop>
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <img src='${imageUrl}' video width="${imgWidth}" height="${imgHeight}">
        `

    let titleHtml = 
        !titleUrl || titleUrl.length == 0
        ? `<generalTitle>${title}</generalTitle>`
        : `<a href="${titleUrl}"><generalTitle>${title}</generalTitle></a>`

    let trHtml =
        !videoUrl || videoUrl.length == 0
        ? `<tr id="${trId}"></tr>`
        : `<tr onmouseover="handleVideoMouseOver('${videoId}')" onmouseout="handleVideoMouseOut('${videoId}')"  id="${trId}">`

    

    const tableHTML = `
    <table class="${tableClass}">
        <tbody>
            ${trHtml}
                <td class="td1">
                    <div class="level">
                        <div class="midlevel">
                            ${mediaHtml}
                        </div>
                    </div>
                </td>
                <td class="td2">
                    ${titleHtml}
                    <br>
                    ${duration}
                    <br>
                    ${githubLink}
                    <p>
                        ${description}
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
    `
    return tableHTML
}

// attach the even handlers sepearately
function handleVideoMouseOver(videoId) {
    const videoElem = document.getElementById(videoId).querySelector('video');
    videoElem.play();
    console.log("play")
    document.getElementById(videoId).style.opacity = "1";
}

function handleVideoMouseOut(videoId) {
    const videoElem = document.getElementById(videoId).querySelector('video');
    videoElem.pause();
    document.getElementById(videoId).style.opacity = "0";
}


function headerComponent(options) {

    const {header, subheader} = options;

    const headerHTML = `<h1>${header}</h1>`;
    const subheaderHTML = 
        !subheader || subheader.length == 0 
        ? ``
        : `<h7>${subheader}</h7>`

    const html =
    `
        <table class="tableDefault">
        <tbody>
        <tr>
            <td class="tdHeader">
            ${headerHTML}
            ${subheaderHTML}
            </td>
        </tr>
        </tbody>
    </table>
    `
    return html;
}

function renderTable(tableId, content) {
    const container = document.getElementById(tableId)

    // create and append the header
    const headerCmpt = headerComponent(content.header)
    container.insertAdjacentHTML('beforeend', headerCmpt);

    for (let i = 0; i < content.content.length; i++) {
        const c = content.content[i];
        const cmpt = component({
            tableClass: i % 2 == 0 ? "tableWhite" : "tableBlue",
            ...c
        });

        container.insertAdjacentHTML('beforeend', cmpt);
    }
}

function textIcon(options) {
    const {content, icon, link} = options

    const html = `
    <div class="divIconText">
        <i class="fa ${icon}"></i>
        <a href="${link}">${content}</a>
    </div>
    `
    return html
}

function renderExperience(tableId) {
    renderTable(tableId, ExpContent)
}

function renderProject(tableId) {
    renderTable(tableId, ProjectContent)
}
