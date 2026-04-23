import {EmailContext, EmailTemplateBuilder} from './email-templates.interface';

export const emailTemplateBuilder: EmailTemplateBuilder = (context: EmailContext) => {
  const logoTemplate = '';

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>${context.title ?? ''}</title>

  <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700" rel="stylesheet">

  <style>
    /* RESET */
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      background: #f1f1f1;
    }
    * {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    div[style*="margin: 16px 0"] { margin: 0 !important; }
    table, td {
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }
    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }
    img { -ms-interpolation-mode: bicubic; }
    a { text-decoration: none; }

    /* AUTO-DETECT FIX */
    *[x-apple-data-detectors],
    .unstyle-auto-detected-links *,
    .aBn {
      border-bottom: 0 !important;
      cursor: default !important;
      color: inherit !important;
      text-decoration: none !important;
    }
    .a6S { display: none !important; opacity: 0.01 !important; }
    .im { color: inherit !important; }

    /* BASIC CLASSES */
    .primary { background: #205475; }
    .bg_white { background: #ffffff; }
    .bg_light { background: #f7fafa; }
    .bg_black { background: #000000; }
    .bg_dark { background: rgba(0,0,0,.8); }
    .email-section { padding: 2.5em; }

    /* BUTTON (email-safe) */
    .btn {
      padding: 10px 15px;
      display: inline-block;
      background: #205475;
      color: #ffffff !important;
      border-radius: 5px;
      font-family: 'Poppins', Arial, sans-serif;
    }
    .btn-primary {
      background: #205475 !important;
      color: #ffffff !important;
    }

    h1,h2,h3,h4,h5,h6 {
      font-family: 'Poppins', Arial, sans-serif;
      margin-top: 0;
      color: #000000;
    }

    body {
      font-family: 'Poppins', Arial, sans-serif;
      font-size: 15px;
      line-height: 1.8;
      color: rgba(0,0,0,.6);
    }

    a { color: #205475; }

    .logo h1 { margin: 0; }
    .logo h1 a {
      color: #205475 !important;
      font-size: 24px;
      font-weight: 700;
    }

    /* HERO */
    .hero .text { font-size: 1.2em; color: #616161; }
    .hero .text h2 {
      font-size: 34px;
      margin-bottom: 0;
      font-weight: 200;
      line-height: 1.4;
    }

    .text-author {
      max-width: 50%;
      margin: 0 auto;
      padding: 2em;
    }

    @media screen and (max-width: 500px) {
      .text-author { max-width: 100% !important; }
    }
  </style>

</head>

<body width="100%" style="margin:0; padding:0 !important; background-color:#f1f1f1;">
  <center style="width:100%; background-color:#f1f1f1;">
  
    <!-- hidden preheader -->
    <div style="display:none; opacity:0; max-height:0; overflow:hidden;">
      ${context.preheader ?? ''}
    </div>

    <div style="max-width:600px; margin:0 auto;" class="email-container">

      ${logoTemplate}

      <table role="presentation" width="100%">
        <tr>
          <td class="bg_white" style="padding:1em 2.5em 0;">
            <table role="presentation" width="100%">
              <tr>
                <td class="logo" style="text-align:center;">
                  <h1>${context.preheader ?? ''}</h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td class="hero bg_white" style="padding:2em 0 4em;">
            <table role="presentation" width="100%">
              <tr>
                <td style="padding:0 2.5em; text-align:left;">
                  <div class="text">
                    <p style="font-size:1.2em;">${context.body_main ?? ''}</p>
                  </div>
                </td>
              </tr>

              <tr>
                <td style="text-align:center;">
                  <div class="text-author">
                    ${context.body_footer ?? ''}

                    ${
                      context.button_link && context.button_text
                        ? `
                        <div style="margin-top:20px;">
                          <a href="${context.button_link}"
                             class="btn btn-primary"
                             style="background:#205475; color:#fff; padding:15px 20px; display:inline-block; border-radius:5px;">
                             ${context.button_text}
                          </a>
                        </div>`
                        : ''
                    }
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>

      </table>

    </div>
  </center>
</body>
</html>
`;
};
