/**
 * 
 * @param {string} title 
 * @param {string[]} pdfs 
 */
function embedpdf(title, pdfs) {
    let tbody = [];
    for (let i = 0; i < pdfs.length; i++) {
        tbody.push(`<tr> <td> <embed src="/pdf/${pdfs[i]}.pdf" width="100%" height="550" type="application/pdf"> </td> </tr>`);
    }
    document.write(`
        <table>
            <thead> <tr> <th colspan="${2 - pdfs.length % 2}">${title}</th> </tr> </thead>
            <tbody> ${tbody.join('\n')} </tbody>
        </table>
    `);
}

/**
 * 
 * @param {string} title 
 * @param {string} url 
 */
function embedcode(title, url) {
    document.write(`
        <details>
            <summary>${title}</summary>
            <script src="https://emgithub.com/embed.js?target=${url}&style=a11y-dark&showBorder=on&showLineNumbers=on&showCopy=on"></script>
        </details>
    `);
}

/**
 * 
 * @param {string} oj 
 * @param {string} pid 
 * @param {string} name 
 */
function embedproblem(oj, pid, title) {
    let url = "", name = "";
    switch (oj) {
        case "cf":
            [c, p] = pid.match(/(\d+)(.*)/).slice(1);
            url = `https://codeforces.com/contest/${c}/problem/${p}`;
            name = `Codeforces ${pid} ${title}`;
            break;
        case "gym":
            [c, p] = pid.match(/(\d+)(.*)/).slice(1);
            url = `https://codeforces.com/gym/${c}/problem/${p}`;
            name = `Codeforces gym ${pid} ${title}`;
            break;
        case "lg":
            url = `https://www.luogu.com.cn/problem/${pid}`;
            name = `Luogu ${pid} ${title}`;
            break;
        case "nc":
            [c, p] = pid.match(/(\d+)(.*)/).slice(1);
            url = `https://ac.nowcoder.com/acm/contest/${c}/${p}`;
            name = `Nowcoder ${pid} ${title}`;
            break;
        case "pta":
            [c, p] = pid.match(/(\d+)(.*)/).slice(1)
            url = `https://pintia.cn/problem-sets/${c}`;
            name = `PTA ${pid} ${title}`;
            break;
        default:
            throw new Error(`${oj} is an unsupported OJ`);
    }
    document.write(`<a target="_blank" rel="noopener" href="${url}">${name}</a>`);
}
