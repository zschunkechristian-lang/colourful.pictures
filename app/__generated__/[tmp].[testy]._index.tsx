/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { renderText, useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, HtmlEmbed as HtmlEmbed, Box as Box, Link as Link, Image as Image, Heading as Heading } from "@webstudio-is/sdk-components-react/components";


      export const projectId = "78b06f7f-b154-49a7-8322-2c97457b286e";

      

      export const projectDomain = "colourfulpictures";

      export const lastPublished = "2024-11-04T07:58:45.578Z";

      export const siteName = "ColourfulPictures // Creative Direction & Design Portfolio Christian Zschunke";

      export const breakpoints = [{"id":"GokalvBMCTCVe_1oBpEYQ"},{"id":"B1PHFgl9ejWva99YrxdNq","maxWidth":991},{"id":"cQnoLhFW_oU46Z23pZV7a","maxWidth":767}];

      export const favIconAsset: string | undefined =
        "favicon_Hbj8jU66HfCXfbngKsu24.ico";

      // Font assets on current page (can be preloaded)
      export const pageFontAssets: string[] =
        ["PPNeueMontreal-Book__PDzFnbWlAmLylwBHx2T3.otf","PPNeueMontreal-Italic_MtsbAVQpyftbOZGl_ds60.otf","PPNeueMontreal-Thin_ZHzgMp4WX8QPkv30sfBuH.otf","PPNeueMontreal-Medium_vGjnFQVgKuxYtBpfGWkrs.otf","PPNeueMontreal-BoldItalic_OkEVqKDI3MD3HXuIzr1SO.otf","PPNeueMontreal-ThinItalic_Rek-4ffDPgNmY0KLzFl_D.otf","PPNeueMontreal-Regular_LZ4o_aSNNJWqKklwaLZdm.otf","PPNeueMontreal-Bold_iAX2QKzE6eR1JPkiev-st.otf","PPNeueMontreal-Light_0vXmEDWPNcH2BmCa_JHDN.otf"]

      export const pageBackgroundImageAssets: string[] =
        []

      

      const Page = (_props: { system: any; }) => {
return <Body
className={`w-body c1ntaiu9 c11qhcj0 c17ya77e`}>
<HtmlEmbed
code={"<script type=\"module\">\ndocument.addEventListener('DOMContentLoaded', () => {\n    // Select the CreditsWrapper element\n    const creditsWrapper = document.querySelector('.CreditsWrapper');\n\n    if (creditsWrapper) {\n        // Track the current horizontal position\n        let currentPosition = 0;\n\n        // Add a mouse wheel event listener to the CreditsWrapper's parent\n        const parentContainer = creditsWrapper.parentElement;\n        if (parentContainer) {\n            parentContainer.addEventListener('wheel', handleWheel);\n\n            function handleWheel(event) {\n                // Prevent the default scroll behavior\n                event.preventDefault();\n\n                // Determine the amount to move\n                const delta = event.deltaY; // Positive or negative depending on scroll direction\n                const moveAmount = delta > 0 ? -70 : 70; // Adjust the step size (50px)\n\n                // Update the current position\n                currentPosition += moveAmount;\n\n                // Get the width of the parent container to clamp the movement\n                const parentWidth = parentContainer.offsetWidth;\n\n                // Clamp the current position between -parentWidth and 0\n                currentPosition = Math.max(-parentWidth, Math.min(currentPosition, 0));\n\n                // Apply the transform\n                creditsWrapper.style.transform = `translateX(${currentPosition}px)`;\n            }\n        }\n    }\n});\n</script>\n"}
executeScriptOnCanvas={true}
clientOnly={true}
className={`w-html-embed`} />
<Box
className={`w-box c1lakali c1ntaiu9 c11qhcj0 c1rvutkj`}>
<Box
className={`w-box c1crsdv6 c1srl2aa c1gp9ga9 c12zfe5o c1qqhuxc c1g31dpx c1u7ivge ${"credits"}`}>
<Box
className={`w-box c1n9nwu5 c1gp9ga9 c12zfe5o c6jnof9 c18cz3nc c1ntaiu9 c16chkwm c11qhcj0 c1me0raf c2osc3t c187gqi5 ${"CreditsWrapper"}`}>
<Link
className={`w-link cmyijaf`}>
<Box
className={`w-box ct8gz7y c18cz3nc cib8xme coa285g c1y7pu6h c1v20t5v c755qw6 c1q4bcp6 c7h95hc c13ab8hf ck32072 c1lzaaez c1w3smzc cnhy0pt cu2m7id cosgfq9 c1n9nwu5 c1x8fxz1 c1j25brr c1d1tfg5 c11h2j09 c76ve99`}>
<Image
src={"/assets/christiazschunke_square_qIa-imITE0V2g6YAGJl0M.jpg"}
width={777}
height={768}
className={`w-image c6jnof9 cqdk6jy c1t4vx7i c1lzaaez c1w3smzc cnhy0pt cu2m7id`} />
<Heading
className={`w-heading c1rvutkj cbdfur9 c1jnl7g6 c1mlbc4w csdrsnc`}>
{"Christian Zschunke"}
</Heading>
<HtmlEmbed
code={"<span style=\"position: relative; display: inline-block; width: max-content;\">\n    <span style=\"\n        position: absolute;\n        background-color:var(--color-cd);\n        width: calc(100% + 1rem);\n        height: 70%;\n        left: -2px;\n        bottom: 0;\n        z-index: -1;\n        transform: rotate(-2deg);\n        display: block;\">\n    </span>\n    <span style=\"position: relative; z-index: 1;\">Creative Direction &amp;</span>\n</span>\n"}
className={`w-html-embed c1rvutkj cbpyli8 cqn1qwz c1jnl7g6 cbdfur9 c2tvc16`} />
<HtmlEmbed
code={"\n<span style=\"position: relative; display: inline-block;width: max-content;\">\n    <span style=\"\n        position: absolute;\n        background-color:var(--color-artist);\n        width: calc(100% + 1rem);\n        height: 60%;\n        left: -2px;\n        bottom: 0;\n        z-index: -1;\n        transform: rotate(2deg);\n        display: block;\">\n    </span>\n    <span style=\"position: relative; z-index: 1;\">Artist</span>\n</span>\n"}
className={`w-html-embed c1rvutkj cbpyli8 cqn1qwz c1jnl7g6 cbdfur9 c1ta699v`} />
</Box>
</Link>
<Link
className={`w-link cmyijaf`}>
<Box
className={`w-box ct8gz7y c18cz3nc cib8xme coa285g c1y7pu6h c1v20t5v c755qw6 c1q4bcp6 c7h95hc c13ab8hf ck32072 c1lzaaez c1w3smzc cnhy0pt cu2m7id cosgfq9 c1n9nwu5 c1x8fxz1 c31ek29 c1d1tfg5 c1qqhuxc c1g31dpx c11h2j09 c76ve99`}>
<Image
src={"/assets/Saskia_Square_MM55dyDzjwSgxINBNQ_Y_.jpg"}
width={659}
height={638}
className={`w-image c6jnof9 cqdk6jy c1t4vx7i c1lzaaez c1w3smzc cnhy0pt cu2m7id`} />
<Heading
className={`w-heading c1rvutkj cbdfur9 c1jnl7g6 c1mlbc4w csdrsnc c1uy956i`}>
{"Saskia Kretzschmann"}
</Heading>
<HtmlEmbed
code={"<span style=\"position: relative; display: inline-block; width: max-content;\">\n    <span style=\"\n        position: absolute;\n        background-color: var(--color-ad);\n        width: calc(100% + 1rem);\n        height: 70%;\n        left: -2px;\n        bottom: 0;\n        z-index: -1;\n        transform: rotate(-2deg);\n        display: block;\">\n    </span>\n    <span style=\"position: relative; z-index: 1;\">Art  Direction &amp;</span>\n</span>\n"}
className={`w-html-embed c1rvutkj cbpyli8 cqn1qwz c1jnl7g6 cbdfur9 c2tvc16`} />
<HtmlEmbed
code={"\n<span style=\"position: relative; display: inline-block;width: max-content;\">\n    <span style=\"\n        position: absolute;\n        background-color: var(--color-artist);\n        width: calc(100% + 1rem);\n        height: 60%;\n        left: -2px;\n        bottom: 0;\n        z-index: -1;\n        transform: rotate(2deg);\n        display: block;\">\n    </span>\n    <span style=\"position: relative; z-index: 1;\">Artist</span>\n</span>\n"}
className={`w-html-embed c1rvutkj cbpyli8 cqn1qwz c1jnl7g6 cbdfur9 c1ta699v`} />
</Box>
</Link>
<Link
className={`w-link cmyijaf`}>
<Box
className={`w-box ct8gz7y c18cz3nc cib8xme coa285g c1y7pu6h c1v20t5v c755qw6 c1q4bcp6 c7h95hc c13ab8hf ck32072 c1lzaaez c1w3smzc cnhy0pt cu2m7id cosgfq9 c1n9nwu5 c1x8fxz1 c1j25brr c1d1tfg5 c11h2j09 c76ve99`}>
<Image
src={"/assets/Ignaz_square_LC6c4pGUbcHiHs4IC_1zH.jpg"}
width={500}
height={500}
className={`w-image c6jnof9 cqdk6jy c1t4vx7i c1lzaaez c1w3smzc cnhy0pt cu2m7id`} />
<Heading
className={`w-heading c1rvutkj cbdfur9 c1jnl7g6 c1mlbc4w csdrsnc`}>
{"Ignas Blažys"}
</Heading>
<HtmlEmbed
code={"\n<span style=\"position: relative; display: inline-block;width: max-content;\">\n    <span style=\"\n        position: absolute;\n        background-color:var(--color-artist);\n        width: calc(100% + 1rem);\n        height: 60%;\n        left: -2px;\n        bottom: 0;\n        z-index: -1;\n        transform: rotate(2deg);\n        display: block;\">\n    </span>\n    <span style=\"position: relative; z-index: 1;\">Artist</span>\n</span>\n"}
className={`w-html-embed c1rvutkj cbpyli8 cqn1qwz c1jnl7g6 cbdfur9 c1ta699v`} />
</Box>
</Link>
<Link
className={`w-link cmyijaf`}>
<Box
className={`w-box ct8gz7y c18cz3nc cib8xme coa285g c1y7pu6h c1v20t5v c755qw6 c1q4bcp6 c7h95hc c13ab8hf ck32072 c1lzaaez c1w3smzc cnhy0pt cu2m7id cosgfq9 c1n9nwu5 c1x8fxz1 c1j25brr c1d1tfg5 c11h2j09 c76ve99`}>
<Image
src={"/assets/philippbreates_square_LfdHIYqxVMp-_1vE6ow75.jpg"}
width={677}
height={783}
className={`w-image c6jnof9 cqdk6jy c1t4vx7i c1lzaaez c1w3smzc cnhy0pt cu2m7id`} />
<Heading
className={`w-heading c1rvutkj cbdfur9 c1jnl7g6 c1mlbc4w csdrsnc`}>
{"Philipp Brates"}
</Heading>
<HtmlEmbed
code={"\n<span style=\"position: relative; display: inline-block;width: max-content;\">\n    <span style=\"\n        position: absolute;\n        background-color:var(--color-artist);\n        width: calc(100% + 1rem);\n        height: 60%;\n        left: -2px;\n        bottom: 0;\n        z-index: -1;\n        transform: rotate(2deg);\n        display: block;\">\n    </span>\n    <span style=\"position: relative; z-index: 1;\">Artist</span>\n</span>\n"}
className={`w-html-embed c1rvutkj cbpyli8 cqn1qwz c1jnl7g6 cbdfur9 c1ta699v`} />
</Box>
</Link>
<Link
className={`w-link cmyijaf`}>
<Box
className={`w-box ct8gz7y c18cz3nc cib8xme coa285g c1y7pu6h c1v20t5v c755qw6 c1q4bcp6 c7h95hc c13ab8hf ck32072 c1lzaaez c1w3smzc cnhy0pt cu2m7id cosgfq9 c1n9nwu5 c1x8fxz1 c1j25brr c1d1tfg5 c11h2j09 c76ve99`}>
<Image
src={"/assets/DavidWeidemannt_lfKFXfM25hsNnQpAeHR5e.jpg"}
width={389}
height={389}
className={`w-image c6jnof9 cqdk6jy c1t4vx7i c1lzaaez c1w3smzc cnhy0pt cu2m7id`} />
<Heading
className={`w-heading c1rvutkj cbdfur9 c1jnl7g6 c1mlbc4w csdrsnc`}>
{"David Weidemann"}
</Heading>
<HtmlEmbed
code={"\n<span style=\"position: relative; display: inline-block;width: max-content;\">\n    <span style=\"\n        position: absolute;\n        background-color:var(--color-artist);\n        width: calc(100% + 1rem);\n        height: 60%;\n        left: -2px;\n        bottom: 0;\n        z-index: -1;\n        transform: rotate(2deg);\n        display: block;\">\n    </span>\n    <span style=\"position: relative; z-index: 1;\">Artist</span>\n</span>\n"}
className={`w-html-embed c1rvutkj cbpyli8 cqn1qwz c1jnl7g6 cbdfur9 c1ta699v`} />
</Box>
</Link>
</Box>
</Box>
</Box>
</Body>
}


      export { Page }
    