/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { renderText, useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Fragment as Fragment_1, HtmlEmbed as HtmlEmbed, Box as Box, Text as Text, Link as Link, Body as Body, Slot as Slot, Image as Image, Button as Button, Bold as Bold, Span as Span, Italic as Italic, Link as Link_1 } from "@webstudio-is/sdk-components-react/components";
import { AnimateChildren as AnimateChildren, AnimateText as AnimateText } from "@webstudio-is/sdk-components-animation";


      export const projectId = "78b06f7f-b154-49a7-8322-2c97457b286e";

      

      export const projectDomain = "colourfulpictures";

      export const lastPublished = "2024-11-04T07:58:45.578Z";

      export const siteName = "ColourfulPictures // Creative Direction & Design Portfolio Christian Zschunke";

      export const breakpoints = [{"id":"GokalvBMCTCVe_1oBpEYQ"},{"id":"B1PHFgl9ejWva99YrxdNq","maxWidth":991},{"id":"cQnoLhFW_oU46Z23pZV7a","maxWidth":767}];

      export const favIconAsset: string | undefined =
        "favicon_Hbj8jU66HfCXfbngKsu24.ico";

      // Font assets on current page (can be preloaded)
      export const pageFontAssets: string[] =
        ["PPNeueMontreal-Book__PDzFnbWlAmLylwBHx2T3.otf","WorkSans-LightItalic_UNFclH4UHEpE5Df5NeX9M.ttf","WorkSans-ThinItalic_FM1NGk7MA546arhgaD9tT.ttf","WorkSans-Black_gOP2VbGuiSzEdbnK2Du3N.ttf","PPNeueMontreal-Italic_MtsbAVQpyftbOZGl_ds60.otf","WorkSans-SemiBoldItalic_CCPJvXLFr_zkAeQ8tfChm.ttf","PPNeueMontreal-Thin_ZHzgMp4WX8QPkv30sfBuH.otf","SpaceGrotesk_wght__2FXqrSM6Qb5IUNmO8wuzl.woff2","SpaceGrotesk-VariableFont_wght_j9Kc6tuiqQSj49Y_b1GuR.ttf","PPNeueMontreal-Medium_vGjnFQVgKuxYtBpfGWkrs.otf","WorkSans-BlackItalic_lap5vh4sCxSRgiZnwK5YQ.ttf","WorkSans-Regular_5ki_vYwFI0Vc3LaivQOfd.ttf","WorkSans-Thin_6Bi29JjfiUuBBvqSIcn1L.ttf","WorkSans-ExtraLight_tAtbiIas13kzRSNNW_yup.ttf","PPHatton-UltralightItalic_KSG1sYBiim0wgdBuemj9V.otf","WorkSans-ExtraLightItalic_QSRiolZYLE1d8MdF2KwT5.ttf","PPNeueMontreal-BoldItalic_OkEVqKDI3MD3HXuIzr1SO.otf","PPNeueMontreal-ThinItalic_Rek-4ffDPgNmY0KLzFl_D.otf","PPNeueMontreal-Regular_LZ4o_aSNNJWqKklwaLZdm.otf","PPNeueMontreal-Bold_iAX2QKzE6eR1JPkiev-st.otf","PPHatton-Bold_NFWv2sif552yEvMzeFwKm.otf","PPHatton-Medium_bxokt81N8xPRtELI3ZEPw.otf","PPHatton-MediumItalic_621_qcoW4qLa_oiCGxBf1.otf","WorkSans-Medium_tMjlv57v65RBh_1_XYGyW.ttf","WorkSans-ExtraBold_JNPVut2zfxkhHuASaXF2s.ttf","WorkSans-Bold_IYpjXxHy3ZBJSkTAsjoHZ.ttf","WorkSans-ExtraBoldItalic_xNIBfFPKjdkt0sg3GwC2y.ttf","WorkSans-VariableFont_wght_rZTk3nQvzLnLw1NRl8rWW.ttf","WorkSans-Light_Gly5URkuegk6H4yl8e4Eo.ttf","WorkSans-BoldItalic__9AfLKRj2-SrNHJFI-R0T.ttf","WorkSans-MediumItalic_784lvwqlNHE_mi_BX3apH.ttf","PPNeueMontreal-Light_0vXmEDWPNcH2BmCa_JHDN.otf","PPHatton-BoldItalic_guXAn-iVH4BVnlh7VR6ik.otf","PPHatton-Ultralight_S4eSUf5DGawGuTN87xecl.otf","WorkSans-SemiBold_TEG99C8iDX6gfyzMThBqn.ttf","WorkSans-Italic_lXfSry4qqCfRiS-mjueG2.ttf"]

      export const pageBackgroundImageAssets: string[] =
        []

      

      const Page = (_props: { system: any; }) => {
return <Body
className={`w-body c1dhi4pe ctk92t9 c10fz4vk ${""}`}>
<Slot>
<Fragment_1>
<HtmlEmbed
code={"<style>\n  /* Basic page styling */\n  body {\n    cursor: none; /* Hide the default cursor globally */\n  }\n\n  /* Custom cursor (circle) */\n  .custom-cursor {\n    position: fixed;\n    width: 16px;\n    height: 16px;\n    border-radius: 50%;\n    background: white;\n    pointer-events: none; /* Prevent interaction */\n    mix-blend-mode: difference; /* Blend effect */\n    transform: translate(-50%, -50%);\n    transition: transform 0.2s ease, width 0.2s ease, height 0.2s ease; /* Smooth transition */\n    z-index: 9999;\n  }\n\n  /* Hover state: Shrink the circle */\n  a:hover ~ .custom-cursor,\n  .custom-cursor.hover {\n    width: 32px; /* grows to 50% */\n    height: 32px;\n  }\n\n  a {\n    cursor: none;\n  }\n\n  /* Hide the custom cursor on non-desktop devices */\n  @media (hover: none) {\n    .custom-cursor {\n      display: none;\n    }\n    body {\n      cursor: auto; /* Revert to default cursor */\n    }\n  }\n</style>\n\n<div class=\"custom-cursor\"></div>\n\n<script type=\"module\">\n  const cursor = document.querySelector('.custom-cursor');\n\n  const initializeCursor = () => {\n    const links = document.querySelectorAll('a');\n\n    // Track mouse movement\n    document.addEventListener('mousemove', (e) => {\n      cursor.style.left = `${e.clientX}px`;\n      cursor.style.top = `${e.clientY}px`;\n    });\n\n    // Hover effect for links\n    links.forEach((link) => {\n      link.addEventListener('mouseenter', () => {\n        cursor.classList.add('hover'); // Add shrinking effect\n      });\n      link.addEventListener('mouseleave', () => {\n        cursor.classList.remove('hover'); // Remove shrinking effect\n      });\n    });\n  };\n\n  // Initial setup\n  initializeCursor();\n\n  // Reinitialize on dynamic page navigation\n  document.addEventListener('DOMContentLoaded', initializeCursor);\n</script>"}
clientOnly={true}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script type=\"module\">\n// Track the last scroll position\nlet lastScrollY = window.scrollY;\n\n// Detect if the current device is mobile\nconst isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);\n\n// Create and inject the styles dynamically\nconst style = document.createElement('style');\nstyle.textContent = `\n    .fade-in {\n        opacity: 0;\n        transform: translateY(7rem);\n        transition: opacity 0.7s cubic-bezier( 0.09, -0.01, 0.27, 1 ), transform 1s cubic-bezier( 0.09, -0.01, 0.27, 1 );\n    }\n    .fade-in.visible {\n        opacity: 1;\n        transform: translateY(0);\n    }\n    .fade-in.hidden-up {\n        transform: translateY(-3rem); /* Leave upward when leaving from the top */\n    }\n    .fade-in.hidden-down {\n        transform: translateY(3rem); /* Leave downward when leaving from the bottom */\n    }\n`;\ndocument.head.appendChild(style);\n\n// Select all images you want to fade in and out\nconst images = document.querySelectorAll('.fade-in');\n\n// Assign a random delay to each element\nimages.forEach(image => {\n    const randomDelay = (Math.random() * 0.5 + 0.1).toFixed(2); // Random delay between 0.1s and 0.4s\n    image.style.transitionDelay = `${randomDelay}s`;\n});\n\n// Set initial position of elements\nimages.forEach(image => {\n    if (image.getBoundingClientRect().top < 0) {\n        // Elements above the viewport should be hidden up (translate up)\n        image.classList.add('hidden-up');\n    } else {\n        // Elements below the viewport should be hidden down (translate down)\n        image.classList.add('hidden-down');\n    }\n});\n\n// Determine the current scroll direction\nlet scrollDirection = 'down';\nconst updateScrollDirection = () => {\n    const currentScrollY = window.scrollY;\n\n    if (currentScrollY > lastScrollY) {\n        scrollDirection = 'down';\n    } else if (currentScrollY < lastScrollY) {\n        scrollDirection = 'up';\n    }\n\n    lastScrollY = currentScrollY;\n};\n\n// Throttle scroll event listener to improve performance and timing\nlet scrollTimeout;\nwindow.addEventListener('scroll', () => {\n    clearTimeout(scrollTimeout);\n    scrollTimeout = setTimeout(updateScrollDirection, 100);\n});\n\n// Create an Intersection Observer\nconst observer = new IntersectionObserver((entries) => {\n    entries.forEach(entry => {\n        const target = entry.target;\n\n        if (entry.isIntersecting) {\n            // If element is visible, remove hidden classes and add \"visible\" class\n            target.classList.remove('hidden-up', 'hidden-down');\n            target.classList.add('visible');\n            target.dataset.state = 'visible'; // Track the state as 'visible'\n        } else {\n            // If element is not visible, check its current state before applying hidden classes\n            if (target.dataset.state !== 'hidden') {\n                // Remove \"visible\" class before applying hidden class\n                target.classList.remove('visible');\n                \n                if (scrollDirection === 'down') {\n                    // Only apply \"hidden-up\" if it wasn't previously hidden\n                    target.classList.add('hidden-up');\n                    target.dataset.state = 'hidden'; // Mark the state as 'hidden'\n                } else {\n                    // Only apply \"hidden-down\" if it wasn't previously hidden\n                    target.classList.add('hidden-down');\n                    target.dataset.state = 'hidden'; // Mark the state as 'hidden'\n                }\n            }\n        }\n    });\n}, {\n    threshold: 0.13 // Trigger when 13% of the image is visible\n});\n\n// Observe each image\nimages.forEach(image => observer.observe(image));\n</script>"}
executeScriptOnCanvas={true}
clientOnly={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script type=\"module\">\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const videos = document.querySelectorAll(\".lazy-video video\");\n\n    const observer = new IntersectionObserver((entries) => {\n        entries.forEach(entry => {\n            const video = entry.target;\n            const source = video.querySelector(\"source\");\n\n            if (entry.isIntersecting) {\n                if (!video.src) {\n                    source.src = source.getAttribute(\"data-src\");\n                    video.load();\n                }\n\n                // Attempt to play safely\n                video.play().then(() => {\n                    // Playback started successfully\n                }).catch(error => {\n                    console.warn(\"Video play was blocked or failed:\", error);\n                });\n\n            } else {\n                // Only pause if the video is currently playing\n                if (!video.paused) {\n                    video.pause();\n                }\n            }\n        });\n    }, { threshold: 0.4, rootMargin: \"1000px\" });\n\n    const observeVideos = () => {\n        videos.forEach(video => observer.observe(video));\n    };\n\n    if ('requestIdleCallback' in window) {\n        requestIdleCallback(observeVideos);\n    } else {\n        setTimeout(observeVideos, 200);\n    }\n});\n</script>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<link rel=\"stylesheet\" href=\"https://unpkg.com/lenis@1.3.23/dist/lenis.css\">\n<script src=\"https://unpkg.com/lenis@1.3.23/dist/lenis.min.js\"></script> \n<script>new Lenis({ autoRaf: true, autoToggle: true, anchors: true, allowNestedScroll: true, naiveDimensions: true, stopInertiaOnNavigate: true })</script>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script src=\"https://unpkg.com/lenis@1.1.18/dist/lenis.min.js\"></script>\n\n<script>\n  {\n    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;\n    if (!isTouchDevice) {\n      new Lenis({\n        autoRaf: true,\n        autoToggle: true,\n        anchors: true,\n        allowNestedScroll: true,\n        naiveDimensions: true,\n        stopInertiaOnNavigate: true\n      });\n    }\n  }\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script type=\"module\">\nconst containers = document.querySelectorAll(\".video-player-container\");\ncontainers.forEach(container => {\n    const video = container.querySelector(\".film\");\n    const toggleButton = container.querySelector(\".toggleButton\");\n    const fullscreenButton = container.querySelector(\".fullscreenButton\");\n    const progressFill = container.querySelector(\".progressFill\");\n    const progressBar = container.querySelector(\".progressBar\"); // parent track element\n\n    async function togglePlay() {\n        if (video.paused || video.ended) {\n            try {\n                await video.play();\n            } catch (err) {\n                console.error(\"Playback blocked:\", err);\n            }\n        } else {\n            video.pause();\n        }\n    }\n\n    function updateUI() {\n        if (video.paused) {\n            toggleButton.innerHTML = \"►\";\n            toggleButton.style.opacity = \"1\";\n        } else {\n            toggleButton.innerHTML = \" \";\n            toggleButton.style.opacity = \"0\";\n        }\n    }\n\n    function updateProgress() {\n        if (video.duration) {\n            const progress = video.currentTime / video.duration;\n            progressFill.style.transform = `scaleX(${progress})`;\n        }\n    }\n\n    function seek(e) {\n        if (!video.duration) return;\n        const bar = progressBar || progressFill.parentElement;\n        const rect = bar.getBoundingClientRect();\n        const clickX = e.clientX - rect.left;\n        const ratio = Math.min(Math.max(clickX / rect.width, 0), 1);\n        video.currentTime = ratio * video.duration;\n    }\n\n    toggleButton.addEventListener(\"click\", togglePlay);\n\n    // Make progress bar clickable — use the track element if available, else fall back to progressFill\n    const seekTarget = progressBar || progressFill.parentElement;\n    seekTarget.addEventListener(\"click\", seek);\n\n    // Optional: scrubbing (click + drag)\n    let isScrubbing = false;\n    seekTarget.addEventListener(\"mousedown\", (e) => {\n        isScrubbing = true;\n        seek(e);\n    });\n    document.addEventListener(\"mousemove\", (e) => {\n        if (isScrubbing) seek(e);\n    });\n    document.addEventListener(\"mouseup\", () => {\n        isScrubbing = false;\n    });\n\n    if (fullscreenButton) {\n        fullscreenButton.addEventListener(\"click\", (e) => {\n            e.stopPropagation();\n            if (!document.fullscreenElement) {\n                container.requestFullscreen().catch(err => console.warn(err));\n            } else {\n                document.exitFullscreen();\n            }\n        });\n    }\n\n    video.addEventListener(\"play\", updateUI);\n    video.addEventListener(\"pause\", updateUI);\n    video.addEventListener(\"timeupdate\", updateProgress);\n    updateUI();\n});\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</Fragment_1>
</Slot>
<Box
className={`w-box c1n9nwu5 c1ogtw29 cx1r5dx c1me0raf c1hrjy4j c1nmyx9t cjv551l c1acrr3m c4m5zow cbohlbo c171hvy5 c2xjevf c1k8h7n4 c1vmne4z cjyi3u7 c14oktwk c1nwjq81 c10ol12o`}>
<Slot>
<Fragment_1>
<Box
className={`w-box c7yq7r7 c14wn7wu c1n9nwu5 c1rysbby c1x8fxz1 cihvjpo c1me0raf cxqxrg6 cb54f03 coa285g crmz8q2 c1nk42zz cei82je c11dl3y9 cvi720m c9wae9a c19vfbu4 c1pvu8w3 czj31qc ccatjxh c5nhqt9 cb6lnkv c47594t c14dkone c2qzr5y cbdfur9 c1g5y11x c1alfrfg c2c8w2c c6h9stg c1vl95vb c14k3fse ch4lphv c14lgot0 c1kxbopr cu48jet c1cpltmk cnxk5yr cv4z629 c3iwqod c13xa2mt c171hvy5 cbohlbo cedsfhn cisz44u c6j281x cx4jyiq cewo1sm c1m12r38 crbbw09`}>
<Box
className={`w-box cedsfhn c1n6tvme c1jv4ml0 cdc858u cv4z629 c1n9nwu5 c1x8fxz1 c11dl3y9 cei82je cxqxrg6 c9wae9a`}>
<Link
href={"/"}
target={"_self"}
className={`w-link c14maq6i c16h65gg cf2wnze c1vtq806 c1batr5w c6h7dgv c19gop6c c1qa6rhv c13ab8hf ck32072 c9175ne c19d3n6s c1gmdbzm`}>
<HtmlEmbed
code={"<!--?xml version=\"1.0\" encoding=\"UTF-8\"?--><svg id=\"Layer_2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 14.88 19.6\"><defs><style>.cls-1{fill:currentcolor;}</style></defs><g id=\"Layer_1\"><path class=\"cls-1\" d=\"M4.97,7.2L7.2,0v9.6H2.7l.91-4.24-1.81,4.24H0V0h2.71L.9,7.2,3.61,0h2.69l-1.33,7.2Z\"></path><path class=\"cls-1\" d=\"M14.88,0v9.6h-7.2V0h7.2ZM13.98,8.4l-3.14-6.6h-1.36l4.5,6.6Z\"></path><path class=\"cls-1\" d=\"M7.2,16l-5.4-1.8,5.4,3v2.4h-3.16l-2.24-3.06.9,3.06H0v-9.6h7.2v6ZM6.3,14.2l-4.5-3v1.2l4.5,1.8Z\"></path><path class=\"cls-1\" d=\"M14.88,16l-5.4-1.87,5.4,3.07v2.4h-2.29l-3.11-3.06,1.8,3.06h-3.6v-9.6h4.04l-2.24,2.98,3.6-2.98h1.8v6Z\"></path></g></svg>"}
clientOnly={false}
executeScriptOnCanvas={false}
className={`w-html-embed`} />
</Link>
<Link
href={"/play"}
className={`w-link c14maq6i c16h65gg cf2wnze c1vtq806 c1batr5w c1puembi c1oaj362 c1qa6rhv c13ab8hf ck32072 cbeev8j c1gmslhp c1gmdbzm c9175ne`}>
<HtmlEmbed
code={"<!--?xml version=\"1.0\" encoding=\"UTF-8\"?--><svg id=\"Layer_2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 14.88 19.6\"><defs><style>.cls-1{fill:currentcolor;}</style></defs><g id=\"Layer_1-2\"><path class=\"cls-1\" d=\"M7.2,7.9l-1.8-1.2.9,2.9H0V0h7.2v7.9ZM6.3,4.15L1.8,1.2v1.15l4.5,1.8Z\"></path><path class=\"cls-1\" d=\"M12.64,6l2.24-3.6v7.2h-7.2V0h5.82l-.86,6Z\"></path><path class=\"cls-1\" d=\"M7.2,19.6H3.14l.46-4.8-1.8,4.8H0v-9.6h7.2v9.6ZM4.94,13.6l.46-3-1.8,3h1.34Z\"></path><path class=\"cls-1\" d=\"M14.88,19.6h-7.2v-3.6l3.6,1.2-3.6-2.4v-4.8h2.26l3.14,7.2-1.8-7.2h3.6v9.6Z\"></path></g></svg>"}
clientOnly={true}
className={`w-html-embed clkm5nz cgblhyt`} />
</Link>
<Link
href={"/info"}
className={`w-link c14maq6i c16h65gg cf2wnze c1vtq806 c1batr5w c1puembi c1oaj362 c1qa6rhv c13ab8hf ck32072 cbeev8j c1gmslhp c1gmdbzm c9175ne`}>
<HtmlEmbed
code={"<!--?xml version=\"1.0\" encoding=\"UTF-8\"?--><svg id=\"Layer_2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 14.88 19.6\"><defs><style>.cls-1{fill:currentcolor;}</style></defs><g id=\"Layer_1-2\"><path class=\"cls-1\" d=\"M7.2,4.38l-1.33-.78v1.81l1.33.28v3.91H0v-3.91l1.33-.3v-1.79l-1.33.79V0h7.2v4.38Z\"></path><path class=\"cls-1\" d=\"M14.88,9.6h-3.6l-2.7-7.87,1.8,7.87h-2.7V0h3.6l2.7,7.82-1.8-7.82h2.7v9.6Z\"></path><path class=\"cls-1\" d=\"M7.2,12.96l-5.4-1.2,5.4,2.4v3.04l-1.8-.4.5,2.8H0v-9.6h7.2v2.96Z\"></path><path class=\"cls-1\" d=\"M14.88,10v9.6h-7.2v-9.6h7.2ZM13.98,18.4l-3.14-6.6h-1.36l4.5,6.6Z\"></path></g></svg>"}
clientOnly={true}
className={`w-html-embed clkm5nz cgblhyt`} />
</Link>
<Link
href={"mailto:hello@colourful.pictures"}
className={`w-link c14maq6i c16h65gg cf2wnze c1vtq806 c1batr5w c1puembi c1oaj362 c1qa6rhv c13ab8hf ck32072 cbeev8j c1gmslhp c1gmdbzm c9175ne`}>
<HtmlEmbed
code={"<!--?xml version=\"1.0\" encoding=\"UTF-8\"?--><svg id=\"Layer_2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 14.88 19.6\"><defs><style>.cls-1{fill:currentcolor;}</style></defs><g id=\"Layer_1-2\"><path class=\"cls-1\" d=\"M7.2,9.6l-2.28-6.56.89,6.56H1.38l.88-6.56L0,9.6V0h7.2v9.6Z\"></path><path class=\"cls-1\" d=\"M14.88,9.6h-4.06l.46-4.8-1.8,4.8h-1.8V0h7.2v9.6ZM12.62,3.6l.46-3-1.8,3h1.34Z\"></path><path class=\"cls-1\" d=\"M4.96,16l2.24-3.6v7.2H0v-9.6h5.82l-.86,6Z\"></path><path class=\"cls-1\" d=\"M14.88,16l-5.4-1.87,5.4,3.07v2.4h-2.29l-3.11-3.06,1.8,3.06h-3.6v-9.6h4.04l-2.24,2.98,3.6-2.98h1.8v6Z\"></path></g></svg>"}
clientOnly={true}
className={`w-html-embed clkm5nz cgblhyt`} />
</Link>
</Box>
<Box
className={`w-box ci2ht8b c1n6tvme c1jv4ml0 cdc858u cv4z629 c8g8cbo c1h1m7w5 cg6mlau c11qfczr c1n9nwu5 c1x8fxz1 c11dl3y9 cei82je cxqxrg6 cbeev8j c178196k cr3eaal cb6lnkv c1lc2xif c14dkone cducrf5 cixqz0o c1g0re0t`}>
<HtmlEmbed
code={"<div class=\"svg-button\" \n     style=\"display: inline-block; cursor: none;\" \n     onclick=\"toggleBackgroundColor()\" \n     aria-label=\"Toggle background color\">\n  <svg viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path class=\"cls-1\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" \n          d=\"M0 8L3.07945 4.30466C4.29638 2.84434 6.09909 2 8 2C9.90091 2 11.7036 2.84434 12.9206 4.30466L16 8L12.9206 11.6953C11.7036 13.1557 9.90091 14 8 14C6.09909 14 4.29638 13.1557 3.07945 11.6953L0 8ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z\" \n          fill=\"#000000\">\n    </path>\n  </svg>\n</div>\n<script>\n  const LIGHT = 'rgb(224, 224, 224)';\n  const DARK = 'rgb(0, 0, 0)';\n\n  function toggleBackgroundColor() {\n    const bodyElement = document.body;\n    const currentColor = getComputedStyle(bodyElement).backgroundColor.trim();\n    const newColor = currentColor === LIGHT ? DARK : LIGHT;\n\n    bodyElement.style.backgroundColor = newColor;\n    // Mark that the user has made an explicit choice, overriding system default\n    localStorage.setItem('backgroundColor', newColor);\n    localStorage.setItem('userOverride', 'true');\n  }\n\n  function applyColor(color) {\n    document.body.style.cssText += `\n      background-color: ${color};\n      transition: background-color 1.5s ease-in-out;\n    `;\n  }\n\n  document.addEventListener('DOMContentLoaded', () => {\n    const hasOverride = localStorage.getItem('userOverride') === 'true';\n    const savedColor = localStorage.getItem('backgroundColor');\n\n    if (hasOverride && savedColor) {\n      // Respect the user's manual toggle over the system setting\n      applyColor(savedColor);\n    } else {\n      // Fall back to system/browser preference\n      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n      applyColor(prefersDark ? DARK : LIGHT);\n    }\n\n    // Keep in sync if the system theme changes while the page is open\n    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {\n      if (!(localStorage.getItem('userOverride') === 'true')) {\n        applyColor(e.matches ? DARK : LIGHT);\n      }\n    });\n  });\n</script>"}
clientOnly={false}
executeScriptOnCanvas={true}
className={`w-html-embed c1batr5w c9wae9a c1hbaw5a cixxelr c1kd4a7u c1y25egk cducrf5`} />
</Box>
<Box
className={`w-box c1emdvoy c11zq3l0 c14c89xd c1gcx0gu c5ffiur c5ff7fa c6gpf0c c7lek1d cdc858u cnjkebt c1s589xk cqgz7gp c5w2sh7 c2tvc16 c1ggvlar`}>
<Link
href={"mailto:hello@colourful.pictures?subject=Let%27s%20connect"}
target={"_blank"}
className={`w-link cbeev8j c1gcx0gu`}>
<HtmlEmbed
code={"<!--?xml version=\"1.0\" encoding=\"UTF-8\"?-->\n<svg id=\"Layer_3\" data-name=\"Layer 3\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 59.52 318.4\">\n  <defs>\n    <style>\n      .cls-17 {\n        fill: url(#linear-gradient-15);\n      }\n\n      .cls-2 {\n        fill: url(#linear-gradient-13);\n      }\n\n      .cls-3 {\n        fill: url(#linear-gradient-2);\n      }\n\n      .cls-4 {\n        fill: url(#linear-gradient-10);\n      }\n\n      .cls-5 {\n        fill: url(#linear-gradient-12);\n      }\n\n      .cls-6 {\n        fill: url(#linear-gradient-4);\n      }\n\n      .cls-7 {\n        fill: url(#linear-gradient-3);\n      }\n\n      .cls-8 {\n        fill: url(#linear-gradient-5);\n      }\n\n      .cls-9 {\n        fill: url(#linear-gradient-8);\n      }\n\n      .cls-10 {\n        fill: url(#linear-gradient-14);\n      }\n\n      .cls-11 {\n        fill: url(#linear-gradient-7);\n      }\n\n      .cls-12 {\n        fill: url(#linear-gradient-9);\n      }\n\n      .cls-13 {\n        fill: url(#linear-gradient-11);\n      }\n\n      .cls-14 {\n        fill: url(#linear-gradient-6);\n      }\n\n      .cls-15 {\n        fill: url(#linear-gradient-16);\n      }\n\n      .cls-16 {\n        fill: url(#linear-gradient);\n      }\n    </style>\n    <linearGradient id=\"linear-gradient\" x1=\"9.55\" y1=\"-5.69\" x2=\"72.21\" y2=\"315.65\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0\" stop-color=\"#fff\"></stop>\n      <stop offset=\"1\" stop-color=\"#9be013\"></stop>\n    </linearGradient>\n    <linearGradient id=\"linear-gradient-2\" x1=\"39.14\" y1=\"-11.46\" x2=\"101.81\" y2=\"309.87\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0\" stop-color=\"#fff\"></stop>\n      <stop offset=\"1\" stop-color=\"#9be013\"></stop>\n    </linearGradient>\n    <linearGradient id=\"linear-gradient-3\" x1=\"2.03\" y1=\"-4.22\" x2=\"64.7\" y2=\"317.11\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n    <linearGradient id=\"linear-gradient-4\" x1=\"31.63\" y1=\"-9.99\" x2=\"94.29\" y2=\"311.34\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n    <linearGradient id=\"linear-gradient-5\" x1=\"-6.39\" y1=\"-2.58\" x2=\"56.28\" y2=\"318.75\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n    <linearGradient id=\"linear-gradient-6\" x1=\"24.11\" y1=\"-8.53\" x2=\"86.78\" y2=\"312.8\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n    <linearGradient id=\"linear-gradient-7\" x1=\"-13\" y1=\"-1.29\" x2=\"49.67\" y2=\"320.04\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n    <linearGradient id=\"linear-gradient-8\" x1=\"16.6\" y1=\"-7.06\" x2=\"79.26\" y2=\"314.27\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n    <linearGradient id=\"linear-gradient-9\" x1=\"-20.51\" y1=\".17\" x2=\"42.15\" y2=\"321.51\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n    <linearGradient id=\"linear-gradient-10\" x1=\"9.08\" y1=\"-5.6\" x2=\"71.75\" y2=\"315.74\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n    <linearGradient id=\"linear-gradient-11\" x1=\"-28.03\" y1=\"1.64\" x2=\"34.64\" y2=\"322.97\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n    <linearGradient id=\"linear-gradient-12\" x1=\"1.57\" y1=\"-4.13\" x2=\"64.23\" y2=\"317.2\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n    <linearGradient id=\"linear-gradient-13\" x1=\"-35.54\" y1=\"3.11\" x2=\"27.12\" y2=\"324.44\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0\" stop-color=\"#fff\"></stop>\n      <stop offset=\"1\" stop-color=\"#9be013\"></stop>\n    </linearGradient>\n    <linearGradient id=\"linear-gradient-14\" x1=\"-5.95\" y1=\"-2.67\" x2=\"56.72\" y2=\"318.67\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n    <linearGradient id=\"linear-gradient-15\" x1=\"-43.96\" y1=\"4.75\" x2=\"18.71\" y2=\"326.08\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n    <linearGradient id=\"linear-gradient-16\" x1=\"-13.46\" y1=\"-1.2\" x2=\"49.2\" y2=\"320.13\" xlink:href=\"#linear-gradient-2\"></linearGradient>\n  </defs>\n  <g id=\"Layer_1-2\" data-name=\"Layer 1-2\">\n    <path class=\"cls-16\" d=\"M28.8,21.31L7.2,13.3v5.9l21.6,3.98v15.22H0V0h28.8v21.31Z\"></path>\n    <path class=\"cls-3\" d=\"M59.52,31.58l-7.2-4.8,3.6,11.62h-25.2V0h28.8s0,31.58,0,31.58ZM55.92,16.61l-18-11.81v4.61l18,7.2Z\"></path>\n    <path class=\"cls-7\" d=\"M28.8,40v38.4H0v-38.4h28.8ZM25.2,73.6l-12.58-26.4h-5.42l18,26.4Z\"></path>\n    <path class=\"cls-6\" d=\"M59.52,57.52l-5.33-3.12v7.25l5.33,1.1v15.65h-28.8v-15.65l5.33-1.2v-7.15l-5.33,3.17v-17.57h28.8s0,17.52,0,17.52Z\"></path>\n    <path class=\"cls-8\" d=\"M19.82,104l8.98-14.4v28.8H0v-38.4h23.28s-3.46,24-3.46,24Z\"></path>\n    <path class=\"cls-14\" d=\"M59.52,101.31l-21.6-8.02v5.9l21.6,3.98v15.22h-28.8v-38.4h28.8v21.31h0Z\"></path>\n    <path class=\"cls-11\" d=\"M28.8,120v38.4H0v-38.4s28.8,0,28.8,0ZM25.2,153.6l-12.58-26.4h-5.42l18,26.4Z\"></path>\n    <path class=\"cls-9\" d=\"M59.52,158.4l-9.12-26.26,3.55,26.26h-17.71l3.5-26.26-9.02,26.26v-38.4h28.8v38.4Z\"></path>\n    <path class=\"cls-12\" d=\"M28.8,184l-21.6-7.2,21.6,12v9.6h-12.62l-8.98-12.24,3.6,12.24H0v-38.4h28.8v24ZM25.2,176.8l-18-12v4.8l18,7.2Z\"></path>\n    <path class=\"cls-4\" d=\"M59.52,198.4h-28.8v-38.4h16.13l-5.33,31.44h5.33l1.87-31.44h10.8s0,38.4,0,38.4Z\"></path>\n    <path class=\"cls-13\" d=\"M28.8,211.86l-21.6-4.8,21.6,9.6v12.14l-7.2-1.58,2.02,11.18H0v-38.4h28.8v11.86Z\"></path>\n    <path class=\"cls-5\" d=\"M59.52,224l-21.6-7.2,21.6,12v9.6h-12.62l-8.98-12.24,3.6,12.24h-10.8v-38.4h28.8s0,24,0,24ZM55.92,216.8l-18-12v4.8l18,7.2Z\"></path>\n    <path class=\"cls-2\" d=\"M28.8,278.4H0v-38.4h16.13l-5.33,31.44h5.33l1.87-31.44h10.8v38.4Z\"></path>\n    <path class=\"cls-10\" d=\"M59.52,251.86l-21.6-4.8,21.6,9.6v12.14l-21.6-4.8,21.6,9.6v4.8h-28.8v-38.4h28.8v11.86h0Z\"></path>\n    <path class=\"cls-17\" d=\"M19.82,304l8.98-14.4v28.8H0v-38.4h23.28l-3.46,24Z\"></path>\n    <path class=\"cls-15\" d=\"M59.52,294.4l-16.42-9.6,16.42,14.4v19.2h-28.8v-14.4l16.32,9.6-16.32-14.4v-19.2h28.8s0,14.4,0,14.4Z\"></path>\n  </g>\n</svg>"}
clientOnly={true}
className={`w-html-embed c1batr5w cgblhyt c1gcx0gu`} />
</Link>
</Box>
</Box>
</Fragment_1>
</Slot>
<Box
data-theme={"white"}
data-control={"close"}
className={`w-box c1n9nwu5 c1x8fxz1 c1me0raf cei82je c11dl3y9 coa285g crmz8q2 c1qqhuxc c1g31dpx c6jnof9 c1rvutkj crsc73h c9a459m c1dhi4pe c1k8h7n4 cbohlbo c171hvy5 c1nwjq81 c10ol12o ${"spotlight-group"}`}>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 cdbdaqr c1rzb4lq c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c1srl2aa c1vzdye3 c1n9nwu5 c1g37eb5 cvnoa9x ct63ucs cedsfhn c4m5zow c1qmafi1 cxuhvwl cr66c2d c1lcu76r cg6mlau c1p7igta c17bg70f c1k8h7n4 c2r0u52 c1euyina cxd44ev cmb1g0y`}>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c18cz3nc c1k4xk51 c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4 ca7ixp5 cu3upf4`}>
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video id=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://colourful-pictures.s3.eu-north-1.amazonaws.com/projects/mschange/MICROSOFT_CHANGE_WebsiteTitle.mp4?rlkey=rdr20cmlggmy5oucnxmfjyy80&amp;st=a0bj7p3t&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>"}
executeScriptOnCanvas={true}
clientOnly={true}
className={`w-html-embed c1srl2aa ${""}`} />
</Box>
<Box
className={`w-box c18cz3nc csmpq68 c1j7dc8a c1n9nwu5 c1x8fxz1 c11dl3y9 c6jnof9 c13zzgv0 c31ek29 cxqxrg6 c1uy956i cei82je c1me0raf c9wae9a c1batr5w c1hl15nf coa285g crmz8q2 cu434ze cc54k3y c12hk3th c1ow9ps3 ctqbvkf c105ku0e c1vmne4z ciul0js c14gzta7 cuiefla c82u1yx c1iy7zjn cpuqvy0 cnx0ft5 c1mf95ps cyphcfi c709782 c1tdtd9g cg6mlau c11qfczr c1d9yjey c1acrr3m c17cpsv8 c1v37gm cr66c2d c3f4shh cxuhvwl cedsfhn c1crqva9 c163v1aw c4m5zow c1rqxliy`}>
<Box
className={`w-box cixqz0o ci2ht8b coa285g crmz8q2 cuvmc8a`}>
<Text
tag={"span"}
className={`w-text c3c99v0 c1q73w86 c1vb4hou cyldmh9 cmyijaf crm9qvx cbpyli8 c1y061to c18qvust c90fh3y c1c5mor0 c1nm2zl c1batr5w cbdfur9 cx415a4 c1sf5ie1 c1ez9p0o c18urxk0 c1itvjy4`}>
{"\"Life is full of changes — some we choose, some we don’t.\""}
</Text>
</Box>
<Box
className={`w-box c1ntaiu9 c11qhcj0 cnjkebt c1n9nwu5 clo8j6y c1i4a2wk c1y7pu6h cqgz7gp c1x8fxz1 c1d1tfg5 c31ek29 c19wq5rt cedsfhn c4m5zow`}>
<Box
className={`w-box c1vq6zvl cg4kw9l c9kqf6d c1jwhlap cnjkebt c1re8dlu`}>
<Text
tag={"span"}
className={`w-text c19a7425 cgr8s25 cbpyli8 cbhiseb c1batr5w c1y061to c1k9abfu c1jnl7g6 cgn9eb0 c1577b1f cx415a4 c2go1lc c1y0jpx3`}>
{"Change is never just logistical—it’s personal. When Microsoft asked us to help Wunderlist users transition to Microsoft ToDo, we saw the real challenge: this wasn’t just about moving data; it was about moving people."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Wunderlist had become more than an app. It was part of daily routines, a quiet companion in people’s lives. Ignoring that connection would mean losing trust. Acknowledging it meant we had a chance to make this transition feel less like an ending and more like a step forward."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Instead of selling a replacement, we told a story—one that met users where they were, understood their hesitation, and helped them see change in a new light."}
</Text>
</Box>
</Box>
<Box
className={`w-box cixqz0o ci2ht8b coa285g c1y7pu6h c1n9nwu5 c1x8fxz1 c11gclnd`}>
<Box
className={`w-box cib8xme cn1c3t5 c1pvu8w3 c2tvc16 c181g2t1 c6jnof9`} />
<Text
tag={"span"}
className={`w-text cn0alg3 c7y2mdd c1zec5q c1n17t5g c1jnl7g6 cbhiseb cnjkebt`}>
{"Comissioned Work | Microsoft | 2019 | "}
<Bold
className={`w-bold-text`}>
{"Creative Direction & Artist  "}
</Bold>
</Text>
<Box
className={`w-box cib8xme cn1c3t5 c3yoeuu c2tvc16 c6jnof9`} />
</Box>
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1qqhuxc c1g31dpx c1p13xdy c1v285u7 cnjkebt c1x6n90q c2tvc16 cvnoa9x c9a459m ce0v13i cedsfhn c4m5zow c1qmafi1 cxuhvwl cr66c2d c1lcu76r cg6mlau c1p7igta c17bg70f cthm5kh c2r0u52 c5lya2o cxd44ev cmb1g0y cr559cp cmofzet ${"fade-in"}`}>
<Button
type={"submit"}
id={""}
className={`w-button c1h1pga6 c1qwg229 c1lzaaez c1w3smzc cnhy0pt cu2m7id cxm889z c1xc8hnv c18j4dbh c171bgfa c2tvc16 c1e9olbp cgblhyt c1srl2aa cnlnqza c1batr5w cducrf5 c1pcwimv cqgz7gp c5w2sh7 c1kqnbr7 cc3sqnx c178196k cr3eaal cr0m8lk c1lc2xif c14dkone cvitwgc c1gudtt8 c1urul48 c1fni4yr c10aonwr c19s2jrk c1kkq53y c1g0re0t ${"fullscreenButton"}`}>
{"⛶"}
</Button>
<Button
type={"button"}
className={`w-button c1h1pga6 c19reeev c1lzaaez c1w3smzc cnhy0pt cu2m7id cxm889z c1xc8hnv c18j4dbh c171bgfa c2tvc16 c1e9olbp c6jnof9 c18cz3nc cnlnqza c1batr5w cducrf5 c1pcwimv cvitwgc c1gudtt8 c1urul48 c1fni4yr c10aonwr c19s2jrk ${"toggleButton"}`}>
{"►"}
</Button>
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"film\" loop=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%); cursor: pointer;\">\n        <source src=\"https://colourful-pictures.s3.eu-north-1.amazonaws.com/projects/mschange/MICROSOFT_CHANGE_V017_MSEnding_Medium.mp4\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n\n</div>\n\n<script type=\"module\">\nconst video = document.querySelector(\".film\");\nconst toggleButton = document.querySelector(\".toggleButton\");\nconst fullscreenButton = document.querySelector(\".fullscreenButton\");\nlet isPausedByObserver = false; // Tracks auto-pause state\nlet autoplayedOnce = false; // Tracks if video has autoplayed once\nlet manualOverride = false; // Tracks if toggle button overrides auto-play/pause\n\n// Function to toggle play/pause\nfunction togglePlayPause() {\n    if (video.paused || video.ended) {\n        video.play();\n        manualOverride = true; // User interaction overrides observer\n    } else {\n        video.pause();\n        manualOverride = true; // User interaction overrides observer\n    }\n}\n\n// Function to update the button label\nfunction updateToggleButton() {\n    toggleButton.innerHTML = video.paused ? \"►\" : \" \";\n}\n\n// Event listeners for video clicks and toggle button\nvideo.addEventListener(\"click\", togglePlayPause);\ntoggleButton.addEventListener(\"click\", togglePlayPause);\nvideo.addEventListener(\"play\", updateToggleButton);\nvideo.addEventListener(\"pause\", updateToggleButton);\n\n// Intersection Observer for auto-pause/resume\nconst observer = new IntersectionObserver((entries) => {\n    entries.forEach(entry => {\n        if (!entry.isIntersecting) {\n            if (!video.paused && !manualOverride) {\n                video.pause();\n                isPausedByObserver = true; // Mark it was paused by observer\n            }\n        } else {\n            if (isPausedByObserver && !manualOverride) {\n                video.play();\n                isPausedByObserver = false; // Reset observer pause state\n            }\n            if (!autoplayedOnce) {\n                video.play();\n                autoplayedOnce = true; // Ensure autoplay happens only once\n            }\n        }\n    });\n}, {\n    threshold: 0.5 // Trigger when 50% of the video is visible\n});\n\n// Start observing the video element\nobserver.observe(video);\n\n// Fullscreen functionality\nfullscreenButton.addEventListener(\"click\", () => {\n    const container = video.parentElement; // Get the container element\n    if (document.fullscreenElement) {\n        document.exitFullscreen(); // Exit fullscreen if already in fullscreen\n    } else {\n        container.requestFullscreen(); // Request fullscreen on the container\n    }\n});\n</script>"}
executeScriptOnCanvas={true}
clientOnly={true}
className={`w-html-embed cfrkvz7 c1sht8xh c4kb2e9 ${""}`} />
</Box>
<Box
className={`w-box c1x6n90q cn1c3t5 c6jnof9 c1gmslhp ckud48p ${"snap-point"}`} />
<Box
className={`w-box c1vzdye3 cvnoa9x cgvccmn c1g37eb5 c9wae9a c1swdl7x c1y909c2 ${"section fade-in"}`}>
<Box
className={`w-box c1n9nwu5 cx1r5dx c1j25brr c1gp9ga9 c12zfe5o c2tvc16 c1u9tm8m c1d1tfg5 c709782 c1tdtd9g cg6mlau c11qfczr c1d9yjey c1acrr3m c17cpsv8 c1v37gm cr66c2d c14gzta7`}>
<Link
href={"mailto:hello@colourful.pictures?subject=Let%27s+start+something."}
className={`w-link cmyijaf coje9ss cbfqxpi`}>
<Text
className={`w-text cnqvwqg c3c99v0 cbpyli8 c1batr5w cyldmh9 cbdfur9`}>
{"A simple story, but one that mirrored the emotional arc of switching from a familiar tool to something new."}
</Text>
</Link>
</Box>
</Box>
<Box
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c1srl2aa c14ubitr c1llb22u coa285g crmz8q2 c1x6n90q cjs5uhz celbstl c1vzdye3 cedsfhn c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r cg6mlau c11qfczr c13ggpa5 ciw0epb c2r0u52 c1euyina c19g64m cxd44ev cmb1g0y c1o3dm5w cu5b733`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx c1uae5ev c1l31tfa c16yfzc7 c1lwyeat c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<HtmlEmbed
code={"<div style=\"position: relative; width:100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://colourful-pictures.s3.eu-north-1.amazonaws.com/projects/mschange/MICROSOFT_CHANGE_InstaSnippets_Spiral+(1)_1.mp4\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
clientOnly={false}
className={`w-html-embed c1pcwimv c6jnof9 cmeg8v1 ${"fade-in"}`} />
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx cgblhyt c1srl2aa c364q7i cnzw3vj c45hcq3 c1lwyeat c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<HtmlEmbed
code={"<div style=\"position: relative; width:100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://colourful-pictures.s3.eu-north-1.amazonaws.com/projects/mschange/MICROSOFT_CHANGE_InstaSnippets_PerspectiveSquare+(2)_1.mp4\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
clientOnly={false}
className={`w-html-embed c1pcwimv c6jnof9 cmeg8v1 ${"fade-in"}`} />
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx cgblhyt c1srl2aa cnzw3vj c364q7i c16yfzc7 cbccxsc c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<HtmlEmbed
code={"<div style=\"position: relative; width:100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://colourful-pictures.s3.eu-north-1.amazonaws.com/projects/mschange/MICROSOFT_CHANGE_InstaSnippets_Costumes_1.mp4\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
clientOnly={false}
className={`w-html-embed c1pcwimv c6jnof9 cmeg8v1 ${"fade-in"}`} />
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 cdbdaqr c1rzb4lq c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c1srl2aa c1vzdye3 c1n9nwu5 c1g37eb5 cvnoa9x cgvccmn ct63ucs cedsfhn c4m5zow c1qmafi1 cxuhvwl cr66c2d c1lcu76r cg6mlau c1p7igta c17bg70f c1k8h7n4 c2r0u52 c1euyina cxd44ev cmb1g0y`}>
<Box
className={`w-box c18cz3nc csmpq68 c1j7dc8a c1n9nwu5 c1x8fxz1 c11dl3y9 c6jnof9 c13zzgv0 c31ek29 cxqxrg6 cpywtu9 cocbp8p c1me0raf c9wae9a c1batr5w coa285g crmz8q2 cu434ze cc54k3y c12hk3th c1ow9ps3 ctqbvkf c105ku0e c1vmne4z ciul0js c14gzta7 cuiefla c82u1yx c1iy7zjn cpuqvy0 cnx0ft5 c1mf95ps cyphcfi c709782 c1tdtd9g cg6mlau c11qfczr c1d9yjey c1acrr3m c17cpsv8 c1v37gm cr66c2d c3f4shh cxuhvwl cedsfhn c1crqva9 c163v1aw c4m5zow c1rqxliy`}>
<Box
className={`w-box cixqz0o ci2ht8b coa285g crmz8q2 cuvmc8a`}>
<Text
tag={"span"}
className={`w-text c3c99v0 c1qmwcfy c1vb4hou cyldmh9 cmyijaf crm9qvx cbpyli8 c1y061to c18qvust c90fh3y c1c5mor0 c1nm2zl c1batr5w csi5p0r c1sf5ie1 c1ez9p0o c18urxk0 c1itvjy4`}>
{"Collaboration was key. Microsoft didn’t just hand us a brief; they were in the trenches with us."}
</Text>
</Box>
<Box
className={`w-box c1n9nwu5 c1i4a2wk c1y7pu6h c1x8fxz1 cxqxrg6 c1ppha3o c6jnof9 cedsfhn c4m5zow`}>
<Text
tag={"span"}
className={`w-text c19a7425 cnbllr4 cbpyli8 cbhiseb c1batr5w c1y061to c1k9abfu c1jnl7g6 cgn9eb0 c1577b1f cx415a4 c2go1lc c1y0jpx3`}>
{"We built on the storytelling framework we’d developed in our last collaboration: clean, abstract visuals paired with metaphors that do the heavy lifting. This time, we pushed further—more depth, more nuance, more honesty."}
{""}
<br />
{""}
{""}
<br />
{""}
{"The story followed a family facing a big move. The mother saw opportunity. The daughter saw loss. The father, caught in between, found a way to reframe change as something empowering. A simple story, but one that mirrored the emotional arc of switching from a familiar tool to something new."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Visually, we kept the refined simplicity but expanded the possibilities—richer colors, a more dynamic background, and interactions between shapes that felt organic, intentional, alive. The animation carried weight without losing warmth."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Collaboration was key. Microsoft didn’t just hand us a brief; they were in the trenches with us. Workshops, studio visits, constant iteration—the process was as much about understanding the users as it was about designing the visuals."}
</Text>
</Box>
</Box>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c18cz3nc c1k4xk51 c6jnof9 c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4 ca7ixp5 cu3upf4`}>
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay loop muted playsinline style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://colourful-pictures.s3.eu-north-1.amazonaws.com/projects/mschange/MICROSOFT_CHANGE_InstaSnippets_FitIn_1.mp4\" type=\"video/mp4\">\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
data-media={"video"}
data-autoplay={"true"}
data-control={"false"}
data-inline={"true"}
data-loop={"true"}
className={`w-html-embed cfrkvz7 ${"spotlight"}`} />
</Box>
</Box>
<Box
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c1srl2aa c14ubitr c1llb22u coa285g crmz8q2 c1x6n90q cjs5uhz celbstl c1vzdye3 c2gj880 cedsfhn c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r cg6mlau c11qfczr c17bg70f c1k8h7n4 c2r0u52 c1euyina c19g64m cy1g8ke ch4lphv c1veq5tp cxd44ev cmb1g0y c105ku0e`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx c1uae5ev c1l31tfa c1lwyeat c1jwgoa8 c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c3iwqod c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Image
src={"/assets/1733762189408.2016208507_6rQ-gYc_ocbeSXJAFImkW.jpg"}
width={738}
height={815}
className={`w-image c11h2j09 clz0kgc ck2cain c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone ${"spotlight"}`} />
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx cnzw3vj c364q7i c1lwyeat c16yfzc7 c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c3iwqod c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Image
src={"/assets/MSC_Change_LookDev_Frame_04_TUvVMTeoMec2CNbqDUaRd.jpg"}
width={1600}
height={679}
className={`w-image c11h2j09 clz0kgc ck2cain c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone ${"spotlight"}`} />
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx cgblhyt c1srl2aa c1l31tfa c1uae5ev c1vkgpne cim7ioj c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Image
src={"/assets/1733762189408.996669585_qUvdFUuNTMvQ3uazjswco.jpg"}
width={716}
height={815}
className={`w-image c11h2j09 clz0kgc ck2cain c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone ${"spotlight"}`} />
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx cgblhyt c1srl2aa cnzw3vj c364q7i c1vkgpne c1875ifk c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Image
src={"/assets/MSC_Change_LookDev_Frame_07_xd7qgyO_wssRTPm6w63qO.jpg"}
width={1600}
height={679}
className={`w-image c11h2j09 clz0kgc ck2cain c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone ${"spotlight"}`} />
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx cnzw3vj c1l31tfa c11lomv3 cmgoeoq c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Image
src={"/assets/1733762189408.1897856833_uFXkXaSVR6Jvln5G-dMRB.jpg"}
width={946}
height={815}
className={`w-image c11h2j09 clz0kgc ck2cain c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone ${"spotlight"}`} />
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c3dhuzf c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c1p13xdy c1vzdye3 c1n9nwu5 c1g37eb5 cvnoa9x cgvccmn cedsfhn c4m5zow c1qmafi1 cxuhvwl cr66c2d c1lcu76r cg6mlau c1p7igta c17bg70f c1k8h7n4 c2r0u52 c1euyina cxd44ev cmb1g0y`}>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c18cz3nc c1k4xk51 c120caw3 c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4 ca7ixp5 cu3upf4`}>
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay loop muted playsinline style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://colourful-pictures.s3.eu-north-1.amazonaws.com/projects/mschange/MICROSOFT_CHANGE_InstaSnippets_Ending_1.mp4\" type=\"video/mp4\">\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
data-media={"video"}
data-autoplay={"true"}
data-control={"false"}
data-inline={"true"}
data-loop={"true"}
className={`w-html-embed cfrkvz7 ${"spotlight"}`} />
</Box>
<Box
className={`w-box c18cz3nc csmpq68 c1j7dc8a c1n9nwu5 c1x8fxz1 c11dl3y9 c6jnof9 c13zzgv0 c31ek29 cxqxrg6 cz60i7 cocbp8p c1me0raf c9wae9a c1batr5w coa285g crmz8q2 cu434ze cc54k3y c1f9vzx c12hk3th c1ow9ps3 ctqbvkf c105ku0e c1vmne4z ciul0js c14gzta7 cuiefla c82u1yx c1iy7zjn cpuqvy0 cnx0ft5 c1mf95ps cyphcfi c709782 c1tdtd9g cg6mlau c11qfczr c1d9yjey c1acrr3m c17cpsv8 c1v37gm cr66c2d c3f4shh cxuhvwl cedsfhn c1crqva9 c163v1aw c4m5zow c1rqxliy`}>
<Box
className={`w-box cixqz0o ci2ht8b coa285g crmz8q2 cuvmc8a`}>
<Text
tag={"span"}
className={`w-text c3c99v0 c1i3i3w5 c1vb4hou cyldmh9 cmyijaf crm9qvx cbpyli8 c1y061to c18qvust c90fh3y c1c5mor0 c1nm2zl c1batr5w csi5p0r c1sf5ie1 c1ez9p0o c18urxk0 c1itvjy4`}>
{"The response spoke for itself. People saw themselves in the story. They related, they engaged, they felt understood. That was the real success—not just guiding users to Microsoft ToDo, but doing it in a way that respected what Wunderlist had meant to them."}
{""}
<br />
{""}
{""}
<br />
{""}
{""}
<br />
{""}
{""}
<br />
{""}
</Text>
</Box>
<Box
className={`w-box c1n9nwu5 c1i4a2wk c1y7pu6h c1x8fxz1 cxqxrg6 c1ppha3o c6jnof9 cedsfhn c4m5zow`}>
<Box
className={`w-box cib8xme cn1c3t5 c1pvu8w3 c2tvc16 c19wq5rt c6jnof9`} />
<Box
className={`w-box c19a7425 cr1l4sv cbpyli8 cbhiseb c1batr5w c1y061to c1k9abfu cg4kw9l cgn9eb0 c1577b1f cx415a4 c2go1lc c1y0jpx3`}>
<Text
tag={"span"}
className={`w-text c19a7425 cr1l4sv c1iqfj3p cbhiseb c1batr5w c1y061to c1k9abfu cg4kw9l cgn9eb0 c1577b1f cx415a4 c2go1lc c1y0jpx3`}>
{"◐ "}
<Span
className={`w-text-1`}>
{"Creative Direction◗ "}
</Span>
<Span
className={`w-text-1`}>
<Italic
className={`w-italic-text`}>
{"Christian Zschunke  "}
</Italic>
</Span>
{"Artists◗ "}
<Italic
className={`w-italic-text`}>
{"Ignas Blazys, Philipp Brates, David Weidemann, Christian Zschunke, Saskia Kretzschmann  "}
</Italic>
{"Producer◗ T"}
<Italic
className={`w-italic-text`}>
{"imo Seegräber "}
</Italic>
</Text>
</Box>
</Box>
</Box>
</Box>
<Slot>
<Fragment_1>
<Box
className={`w-box c1vzdye3 cvnoa9x cgvccmn c1g37eb5 c9wae9a c1swdl7x c1y909c2 ${"section fade-in"}`}>
<Box
className={`w-box c1n9nwu5 cx1r5dx ccv9vgi c1gp9ga9 c12zfe5o c2tvc16 c1u9tm8m c1d1tfg5 c709782 c1tdtd9g cg6mlau c11qfczr c1d9yjey c14lgot0 c17cpsv8 c1v37gm cr66c2d c14gzta7`}>
<AnimateChildren
action={{"type":"view","animations":[{"name":"Fade In","description":"Fade in the element as it scrolls into view.","keyframes":[{"offset":0,"styles":{"opacity":{"type":"unit","unit":"number","value":0},"translate":{"type":"tuple","value":[{"type":"unit","unit":"px","value":0},{"type":"unit","unit":"px","value":20}]},"filter":{"type":"tuple","value":[{"type":"function","name":"blur","args":{"type":"tuple","value":[{"type":"unit","unit":"px","value":10}]}}]}}}],"timing":{"easing":"linear","fill":"backwards","rangeStart":["entry",{"type":"unit","value":0,"unit":"%"}],"rangeEnd":["contain",{"type":"unit","value":50,"unit":"%"}]}}],"isPinned":true}}>
<AnimateText
splitBy={"space"}
easing={"easeOutCubic"}
className={`w-text-animation`}>
<Text
className={`w-text c3c99v0 cnqvwqg c1vb4hou cyldmh9 cmyijaf crm9qvx cbpyli8 c1y061to c18qvust c90fh3y c1c5mor0 c1nm2zl c1batr5w cbdfur9 cx415a4 c1sf5ie1 cur4o68 c1ez9p0o c18urxk0 c279tbb`}>
{"We are all in this together."}
{""}
<br />
{""}
{"Let's connect & collaborate || vibe"}
{""}
<br />
{""}
<Link_1
href={"mailto:hello@colourful.pictures"}
className={`w-element c1ij3n2f cyldmh9 cmyijaf cbhiseb`}>
{"@colourful.pictures"}
</Link_1>
</Text>
</AnimateText>
</AnimateChildren>
</Box>
</Box>
<Box
className={`w-box c1vzdye3 cvnoa9x cgvccmn c1g37eb5 c9wae9a c1swdl7x c1y909c2 ${"section fade-in"}`}>
<Box
className={`w-box c1n9nwu5 cx1r5dx c1ppha3o c1gp9ga9 c12zfe5o c2tvc16 c1u9tm8m c11gclnd c709782 c1tdtd9g cg6mlau c11qfczr c1d9yjey c14lgot0 c17cpsv8 c1v37gm cr66c2d c14gzta7`}>
<AnimateChildren
action={{"type":"view","animations":[{"name":"Fade In","description":"Fade in the element as it scrolls into view.","keyframes":[{"offset":0,"styles":{"opacity":{"type":"unit","unit":"number","value":0},"translate":{"type":"tuple","value":[{"type":"unit","unit":"px","value":0},{"type":"unit","unit":"px","value":20}]},"filter":{"type":"tuple","value":[{"type":"function","name":"blur","args":{"type":"tuple","value":[{"type":"unit","unit":"px","value":10}]}}]}}}],"timing":{"easing":"linear","fill":"backwards","rangeStart":["entry",{"type":"unit","value":0,"unit":"%"}],"rangeEnd":["contain",{"type":"unit","value":50,"unit":"%"}]}}],"isPinned":true}}>
<AnimateText
splitBy={"space"}
easing={"easeOutCubic"}
className={`w-text-animation`}>
<Text
className={`w-text cnqvwqg c3c99v0 cbpyli8 c1batr5w c1zec5q cbdfur9 c1q6yy20 cnjkebt`}>
<Italic
className={`w-italic-text cr1l4sv`}>
{"* or check out more"}
</Italic>
</Text>
</AnimateText>
</AnimateChildren>
</Box>
</Box>
</Fragment_1>
</Slot>
<Box
className={`w-box c4fjyqb c1ob2nkf c1hgcu2v cviptpg`}>
<Slot>
</Slot>
</Box>
<Slot>
</Slot>
<Box
className={`w-box c4qfk62 cn1c3t5 c6jnof9 c1gmslhp ckud48p ${"snap-point"}`} />
</Box>
</Box>
<Slot>
<Fragment_1>
<Box
tag={"section"}
id={""}
className={`w-box c1vzdye3 cvnoa9x c1batr5w c2tvc16 c1844gb3 c1pvu8w3 c1srl2aa c1vh507j c1emdvoy ${""}`}>
<Box
className={`w-box c14ubitr cx1r5dx c1j25brr c1gp9ga9 c12zfe5o c1me0raf c1u0n7fo c6jnof9 covt5gy c11whril c9wae9a c1844gb3 cmykebw c709782 c1tdtd9g cg6mlau c11qfczr c1d9yjey c1acrr3m c17cpsv8 c1v37gm cr66c2d c1qmafi1 cxuhvwl cbohlbo c171hvy5 c14gzta7`}>
<Box
className={`w-box ce2fp6r c1a15w3c ${"\n"}`}>
<Box
className={`w-box c19wq5rt c1jnl7g6 c1re8dlu c3iwqod c279tbb`}>
<Text
tag={"span"}
className={`w-text c3c99v0 cnqvwqg c1vb4hou cyldmh9 cmyijaf crm9qvx cbpyli8 c1y061to c18qvust c90fh3y c1c5mor0 c1nm2zl c1batr5w cx415a4 c1sf5ie1 c1ez9p0o c18urxk0 c1itvjy4`}>
{"Get In Touch"}
</Text>
<Box
className={`w-box cib8xme caui20f c1pvu8w3`} />
</Box>
<Box
className={`w-box c1n9nwu5 c1x8fxz1 c9a459m cr66c2d`}>
<Link
href={"mailto:hello@colourful.pictures?subject=Hi%21"}
target={"_blank"}
className={`w-link cmyijaf c1batr5w c19wq5rt c1n9nwu5 c1d1tfg5`}>
<Text
tag={"span"}
className={`w-text c1d8k4sm c1jnl7g6 cbpyli8 cvtj0f7 c1dnbiv`}>
{"⟶ hello@colourful.pictures"}
</Text>
</Link>
<Link
href={"https://www.instagram.com/_colourful.pictures_"}
target={"_blank"}
className={`w-link cmyijaf c1batr5w cle6o9l c1n9nwu5 c1d1tfg5`}>
<Text
tag={"span"}
className={`w-text c1d8k4sm c1jnl7g6 cbpyli8 cvtj0f7 c1dnbiv`}>
{"⟶ @_colourful.pictures_"}
</Text>
</Link>
<Link
href={"https://www.linkedin.com/in/christian-zschunke-92324524/"}
target={"_blank"}
className={`w-link cmyijaf c1batr5w cle6o9l c1n9nwu5 c1d1tfg5`}>
<Text
tag={"span"}
className={`w-text c1d8k4sm c1jnl7g6 cbpyli8 cvtj0f7 c1dnbiv`}>
{"⟶ christian.zschunke"}
</Text>
</Link>
</Box>
</Box>
<Box
className={`w-box c1i4a2wk c1y7pu6h c15d3vp ci2ht8b ${"\n"}`}>
<Box
className={`w-box c19wq5rt c1jnl7g6 c1re8dlu c3iwqod`}>
<Text
tag={"span"}
className={`w-text c3c99v0 cnqvwqg c1vb4hou cyldmh9 cmyijaf crm9qvx cbpyli8 c1y061to c18qvust c90fh3y c1c5mor0 c1nm2zl c1batr5w cx415a4 c1sf5ie1 c1ez9p0o c18urxk0 c1itvjy4`}>
{"Philosophy"}
</Text>
<Box
className={`w-box cib8xme caui20f c1pvu8w3`} />
</Box>
<Box
className={`w-box`}>
<Text
tag={"span"}
className={`w-text c19a7425 cr1l4sv cbpyli8 cbhiseb c1batr5w c1y061to c1k9abfu cg4kw9l cgn9eb0 c1577b1f cx415a4 c2go1lc c1y0jpx3`}>
{"Creative work isn't about sounding smart. It's not about chasing whatever's trending or performing genius for people who aren't paying attention anyway. "}
{""}
<br />
{""}
{""}
<br />
{""}
{"It's about saying something, in a way that actually lands."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Collaboration is harder than people admit. It means talking about your actual ideas, not the polished version you think people want to hear. It means asking dumb questions. It means ego is the enemy."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Mistakes aren't failures. That's become a cliché, but it's still true. Some of the best decisions start as accidents. Imperfections aren't the thing you fix before you ship, sometimes they're the whole point."}
{""}
<br />
{""}
{""}
<br />
{""}
{"If something doesn't serve the idea, cut it. Doesn't matter how long it took or how clever it is. The work should feel inevitable, not assembled."}
{""}
<br />
{""}
{""}
<br />
{""}
{"Curiosity keeps things from getting stale. The moment I think I've figured out how to do something, the work starts to die a little. Standing still feels safe. It isn't."}
{""}
<br />
{""}
{""}
<br />
{""}
{"If we're not enjoying it at least some of the time, something's wrong — with the brief, the process, or both. Worth finding out which."}
</Text>
</Box>
</Box>
</Box>
</Box>
</Fragment_1>
</Slot>
</Body>
}


      export { Page }
    