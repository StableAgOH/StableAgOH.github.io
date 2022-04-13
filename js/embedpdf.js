function embedpdf(title, pdfs) {
    let tbody = [];
    if (screen.availWidth < 2560 || pdfs.length % 2) {
        for (let i = 0; i < pdfs.length; i++) {
            tbody.push(`<tr> <td> <embed src="/pdf/${pdfs[i]}.pdf" width="100%" height="550" type="application/pdf"> </td> </tr>`);
        }
    }
    else {
        for (let i = 0; i < pdfs.length; i += 2) {
            tbody.push("<tr>")
            tbody.push(`<td> <embed src="/pdf/${pdfs[i]}.pdf" width="100%" height="550" type="application/pdf"> </td>`);
            tbody.push(`<td> <embed src="/pdf/${pdfs[i + 1]}.pdf" width="100%" height="550" type="application/pdf"> </td>`);
            tbody.push("</tr>")
        }
    }
    document.write(`
        <table>
            <thead> <tr> <th colspan="${2 - pdfs.length % 2}">${title}</th> </tr> </thead>
            <tbody> ${tbody.join('\n')} </tbody>
        </table>
    `);
}