/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { renderText, useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Box as Box, HtmlEmbed as HtmlEmbed } from "@webstudio-is/sdk-components-react/components";


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
<Box
className={`w-box c1eivd08 cpewphs c1n9nwu5 c1me0raf cu6ypgs c1uyqsz7`}>
<HtmlEmbed
code={"<div id=\"film-grain-zeiss\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: grainzeiss 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes grainzeiss {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q ci2ht8b`} />
<HtmlEmbed
code={"<div id=\"video-container\" style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video id=\"hover-video\" loop muted playsinline style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/fab91d45ji76vcix2i1k0/CZ_Avatar_v1_snippet.mp4?rlkey=m4a18fbx4z09d5sseacxgeh15&amp;st=wbx3lm4f&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n\n<script>\n    const videoContainer = document.getElementById(\"video-container\");\n    const video = document.getElementById(\"hover-video\");\n\n    // Wait for the video to be ready\n    video.addEventListener(\"loadedmetadata\", () => {\n        const videoDuration = video.duration;\n\n        // Set the video to a random frame when the page loads\n        const randomTime = Math.random() * videoDuration;\n\n        // Seek to the random time and ensure the video updates visually\n        video.currentTime = randomTime;\n\n        video.addEventListener(\"seeked\", () => {\n            // Add mousemove event for scrubbing only after seeking is complete\n            videoContainer.addEventListener(\"mousemove\", (event) => {\n                const rect = videoContainer.getBoundingClientRect();\n                const mouseX = event.clientX - rect.left;\n                const fraction = mouseX / rect.width;\n                video.currentTime = fraction * videoDuration;\n            });\n        }, { once: true });\n    });\n</script>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed c1pcwimv c6jnof9 ${"hover-video"}`} />
</Box>
</Body>
}


      export { Page }
    