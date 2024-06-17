export interface EmailData {
  [x: string]: string | string[] | number | undefined;
}

export function dictToHtmlList(data: EmailData): string {
  let htmlList = "<ul>";
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let value = data[key];
      if (value === "on") {
        value =
          '<input type="checkbox" checked disabled readonly style="pointer-events: none;">';
      }
      htmlList += `<li><strong>${key}:</strong> ${value}</li>`;
    }
  }
  htmlList += "</ul>";
  return htmlList;
}

export function minifyHtml(html: string): string {
  return html.replace(/\n\s*/g, "").replace(/>\s*</g, "><");
}

export function replacePlaceholderWithHtmlList(
  htmlString: string,
  placeholder: string,
  data: EmailData,
): string {
  const htmlList = dictToHtmlList(data);
  return minifyHtml(htmlString.replace(placeholder, htmlList));
}
