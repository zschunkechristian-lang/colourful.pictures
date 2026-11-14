/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { renderText, useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, HtmlEmbed as HtmlEmbed } from "@webstudio-is/sdk-components-react/components";


      export const projectId = "78b06f7f-b154-49a7-8322-2c97457b286e";

      

      export const projectDomain = "colourfulpictures";

      export const lastPublished = "2024-11-04T07:58:45.578Z";

      export const siteName = "ColourfulPictures // Creative Direction & Design Portfolio Christian Zschunke";

      export const breakpoints = [{"id":"GokalvBMCTCVe_1oBpEYQ"},{"id":"B1PHFgl9ejWva99YrxdNq","maxWidth":991},{"id":"cQnoLhFW_oU46Z23pZV7a","maxWidth":767}];

      export const favIconAsset: string | undefined =
        "favicon_Hbj8jU66HfCXfbngKsu24.ico";

      // Font assets on current page (can be preloaded)
      export const pageFontAssets: string[] =
        []

      export const pageBackgroundImageAssets: string[] =
        []

      

      const Page = (_props: { system: any; }) => {
return <Body
className={`w-body`}>
<HtmlEmbed
code={"<div style=\"display: inline-block; position: relative; width: 120px; height: 60px;\">\n  <input type=\"checkbox\" id=\"inlineSwitch\" style=\"display: none;\">\n  <label for=\"inlineSwitch\" style=\"\n      display: flex;\n      align-items: center;\n      width: 100%;\n      height: 100%;\n      background-color: #ffffff;\n      border-radius: 30px;\n      cursor: pointer;\n      position: relative;\n      box-shadow: inset 0 0 5px 4px rgba(255, 255, 255, 1),\n                  inset 0 0 20px 1px rgba(0, 0, 0, 0.488),\n                  10px 20px 30px rgba(0, 0, 0, 0.096),\n                  inset 0 0 0 3px rgba(0, 0, 0, 0.3);\n      transition: transform 0.4s;\n    \" onmouseover=\"this.style.transform='perspective(100px) rotateX(5deg) rotateY(-5deg)'\" onmouseout=\"this.style.transform='perspective(100px) rotateX(0) rotateY(0)'\">\n    <span style=\"\n        position: absolute;\n        content: '';\n        height: 40px;\n        width: 40px;\n        border-radius: 50%;\n        background: linear-gradient(130deg, #757272 10%, #ffffff 11%, #726f6f 62%);\n        left: 10px;\n        box-shadow: 0 2px 1px rgba(0, 0, 0, 0.3),\n                    10px 10px 10px rgba(0, 0, 0, 0.3);\n        transition: left 0.4s, background 0.4s;\n      \" id=\"toggleCircle\"></span>\n  </label>\n</div>\n\n<script>\n  document.getElementById('inlineSwitch').addEventListener('change', function () {\n    const circle = document.getElementById('toggleCircle');\n    if (this.checked) {\n      circle.style.left = '70px';\n      circle.style.background = 'linear-gradient(315deg, #000000 0%, #414141 70%)';\n    } else {\n      circle.style.left = '10px';\n      circle.style.background = 'linear-gradient(130deg, #757272 10%, #ffffff 11%, #726f6f 62%)';\n    }\n  });\n</script>\n"}
className={`w-html-embed`} />
</Body>
}


      export { Page }
    