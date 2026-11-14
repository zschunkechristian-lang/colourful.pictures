/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { renderText, useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Box as Box, Slot as Slot, Fragment as Fragment_1, HtmlEmbed as HtmlEmbed, Text as Text, Link as Link, Image as Image } from "@webstudio-is/sdk-components-react/components";


      export const projectId = "78b06f7f-b154-49a7-8322-2c97457b286e";

      

      export const projectDomain = "colourfulpictures";

      export const lastPublished = "2024-11-04T07:58:45.578Z";

      export const siteName = "ColourfulPictures // Creative Direction & Design Portfolio Christian Zschunke";

      export const breakpoints = [{"id":"GokalvBMCTCVe_1oBpEYQ"},{"id":"B1PHFgl9ejWva99YrxdNq","maxWidth":991},{"id":"cQnoLhFW_oU46Z23pZV7a","maxWidth":767}];

      export const favIconAsset: string | undefined =
        "favicon_Hbj8jU66HfCXfbngKsu24.ico";

      // Font assets on current page (can be preloaded)
      export const pageFontAssets: string[] =
        ["PPNeueMontreal-Book__PDzFnbWlAmLylwBHx2T3.otf","WorkSans-LightItalic_UNFclH4UHEpE5Df5NeX9M.ttf","WorkSans-ThinItalic_FM1NGk7MA546arhgaD9tT.ttf","WorkSans-Black_gOP2VbGuiSzEdbnK2Du3N.ttf","PPNeueMontreal-Italic_MtsbAVQpyftbOZGl_ds60.otf","WorkSans-SemiBoldItalic_CCPJvXLFr_zkAeQ8tfChm.ttf","PPNeueMontreal-Thin_ZHzgMp4WX8QPkv30sfBuH.otf","SpaceGrotesk_wght__2FXqrSM6Qb5IUNmO8wuzl.woff2","SpaceGrotesk-VariableFont_wght_j9Kc6tuiqQSj49Y_b1GuR.ttf","PPNeueMontreal-Medium_vGjnFQVgKuxYtBpfGWkrs.otf","WorkSans-BlackItalic_lap5vh4sCxSRgiZnwK5YQ.ttf","WorkSans-Regular_5ki_vYwFI0Vc3LaivQOfd.ttf","WorkSans-Thin_6Bi29JjfiUuBBvqSIcn1L.ttf","WorkSans-ExtraLight_tAtbiIas13kzRSNNW_yup.ttf","PPHatton-UltralightItalic_KSG1sYBiim0wgdBuemj9V.otf","WorkSans-ExtraLightItalic_QSRiolZYLE1d8MdF2KwT5.ttf","PPNeueMontreal-BoldItalic_OkEVqKDI3MD3HXuIzr1SO.otf","PPNeueMontreal-ThinItalic_Rek-4ffDPgNmY0KLzFl_D.otf","PPNeueMontreal-Regular_LZ4o_aSNNJWqKklwaLZdm.otf","PPNeueMontreal-Bold_iAX2QKzE6eR1JPkiev-st.otf","PPHatton-Bold_NFWv2sif552yEvMzeFwKm.otf","PPHatton-Medium_bxokt81N8xPRtELI3ZEPw.otf","PPHatton-MediumItalic_621_qcoW4qLa_oiCGxBf1.otf","WorkSans-Medium_tMjlv57v65RBh_1_XYGyW.ttf","WorkSans-ExtraBold_JNPVut2zfxkhHuASaXF2s.ttf","WorkSans-Bold_IYpjXxHy3ZBJSkTAsjoHZ.ttf","DOTNorekk-Mono-titrkd_h-VlxCZmu1Haa6nQurqvJ.ttf","WorkSans-ExtraBoldItalic_xNIBfFPKjdkt0sg3GwC2y.ttf","WorkSans-VariableFont_wght_rZTk3nQvzLnLw1NRl8rWW.ttf","WorkSans-Light_Gly5URkuegk6H4yl8e4Eo.ttf","WorkSans-BoldItalic__9AfLKRj2-SrNHJFI-R0T.ttf","WorkSans-MediumItalic_784lvwqlNHE_mi_BX3apH.ttf","PPNeueMontreal-Light_0vXmEDWPNcH2BmCa_JHDN.otf","PPHatton-BoldItalic_guXAn-iVH4BVnlh7VR6ik.otf","PPHatton-Ultralight_S4eSUf5DGawGuTN87xecl.otf","WorkSans-SemiBold_TEG99C8iDX6gfyzMThBqn.ttf","WorkSans-Italic_lXfSry4qqCfRiS-mjueG2.ttf"]

      export const pageBackgroundImageAssets: string[] =
        []

      

      const Page = (_props: { system: any; }) => {
return <Body
className={`w-body c1ntaiu9 c11qhcj0 c1xg38vj c10bsq2k ${"hide-scrollbar"}`}>
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
tag={"main"}
className={`w-box c1n9nwu5 c1ogtw29 cx1r5dx c1me0raf c1hrjy4j c1ntaiu9 c11qhcj0 c1nmyx9t c31ek29 cjv551l c1acrr3m c4m5zow cbohlbo c171hvy5 c2xjevf c1vmne4z cjyi3u7 c14oktwk c1nwjq81 c10ol12o ${"MainWrapper"}`}>
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
data-ani-progress={"slide-up"}
data-ani-children={"true"}
className={`w-box c1n9nwu5 c1x8fxz1 c1me0raf cei82je c11dl3y9 coa285g crmz8q2 c1qqhuxc c1g31dpx c6jnof9 c1rvutkj crsc73h c9a459m c1jwhlap c1k8h7n4 cbohlbo c171hvy5 cjv551l`}>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c1p13xdy citbd5o c8mhelx c11o1qco cvnoa9x c1j3qymu c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r c19sjcuo c1p7igta c17bg70f c1ukxltw c2r0u52 c1euyina c19g64m cpfkiqa cxd44ev cmb1g0y cefv3qt cnhnabs ca7ixp5 c1rx0vc0`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx c1l31tfa cl272xq c1lwyeat crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
href={"/tmp/old/zeiss-old"}
target={"_self"}
className={`w-link c18cz3nc c1vzdye3 c1gmslhp cnjkebt c1jnl7g6 c1l31tfa cl272xq`}>
<HtmlEmbed
code={"<div id=\"film-grain-zeiss\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: grainzeiss 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes grainzeiss {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q ci2ht8b`} />
<HtmlEmbed
code={"<div style=\"position: relative; width:100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/699v2pwupp3itw1jyfyjr/ZEISS_Smile_Teaser.mp4?rlkey=b4rmcrlgjd36ej8qdsf24os8f&amp;st=vrf9oui4&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
clientOnly={false}
className={`w-html-embed c1pcwimv c6jnof9 cmeg8v1 ${"fade-in"}`} />
<Box
className={`w-box c1h1pga6 c18cz3nc cgblhyt cyw9z6 c10h0i18 c1n9nwu5 cihvjpo c11gclnd c1batr5w c14wn7wu c1ntaiu9 c11qhcj0 c5w2sh7 c1w29uql c1c33o4t c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◐"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"ZEISS → SMILE "}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2023 | comissioned work"}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp c1xtp1z9 cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
</Box>
<Box
className={`w-box c1x8fxz1 c1j25brr cei82je c11dl3y9 c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c1srl2aa cxonsnn c9wae9a c1n9nwu5 c1d1tfg5 c1u9tm8m cetmrd3 cda1ooc cedsfhn c4m5zow c1qmafi1 cxuhvwl cr66c2d c1acrr3m cg6mlau c1p7igta c17bg70f c1k8h7n4 c2r0u52 c1euyina comtr11 cxd44ev cmb1g0y ${"section fade-in"}`}>
<Box
className={`w-box c1n9nwu5 cx1r5dx c1j25brr c1gp9ga9 c12zfe5o c2tvc16 c1u9tm8m c1d1tfg5 c709782 c1tdtd9g cg6mlau c11qfczr c1d9yjey c1acrr3m c17cpsv8 c1v37gm cr66c2d c14gzta7`}>
<Link
href={"mailto:hello@colourful.pictures?subject=Let%27s+start+something."}
className={`w-link cmyijaf c1uy956i`}>
<Text
className={`w-text c3c99v0 c1n2i8qv cbpyli8 c1batr5w crm9qvx c198568g`}>
{"Hi, I'm Chris. I was born, stuff happend now I create digital art, nurture talent and fight bullshit → Get in touch"}
</Text>
</Link>
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 cjfdrz8 citbd5o c8mhelx c11o1qco c1j3qymu c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r c19sjcuo c1p7igta c17bg70f c1ukxltw c2r0u52 c1euyina c19g64m cpfkiqa cxd44ev cmb1g0y cefv3qt cnhnabs ca7ixp5 c1rx0vc0`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx c1l31tfa c1xhgud2 c1lwyeat crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
href={"/tmp/old/zeiss-old"}
target={"_self"}
className={`w-link c18cz3nc c1vzdye3 c1gmslhp cnjkebt c1jnl7g6 c1l31tfa cl272xq`}>
<HtmlEmbed
code={"<div id=\"film-grain-noises\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: grainnoises 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes grainnoises {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q ci2ht8b`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n <source src=\"https://dl.dropboxusercontent.com/scl/fi/lgmikyczv1ad5tsj8zrmj/GRAD_LQ_v003.mp4?rlkey=bwofipzbvbat2hwni20hk9hdf&amp;st=ohny1i1v&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>"}
executeScriptOnCanvas={true}
clientOnly={false}
className={`w-html-embed c1pcwimv c6jnof9 ${"fade-in"}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 c1rjjar3 c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◓"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"NOISES"}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2024 | experimental work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx ck90l9e crcjwpa c1lwyeat crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
href={"/tmp/old/zeiss-old"}
target={"_self"}
className={`w-link c18cz3nc c1vzdye3 c1gmslhp cnjkebt c1jnl7g6 c1l31tfa cl272xq`}>
<HtmlEmbed
code={"<div id=\"film-grain-seabob\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: grainseabob 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes grainseabob {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q ci2ht8b`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n      <source src=\"https://dl.dropboxusercontent.com/scl/fi/7gmgznfoz2n3unxnjuuv9/SEABOB_Moodedit_WebsiteHeader.mp4?rlkey=ymptdbjtbd1gw6bza8b6gq3td&amp;st=yemb1hpz&amp;dl=0\" type=\"video/mp4\">&gt;\n        Your browser does not support the video tag.\n    </video>\n</div>"}
executeScriptOnCanvas={true}
clientOnly={false}
className={`w-html-embed c1pcwimv c6jnof9 ${"fade-in"}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 c1rjjar3 c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◩"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa citbd5o cnjkebt c17lv365 c122wzou ${"projecttitle"}`}>
{"CAYAGO → SEABOB "}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2024 | experimental work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 cpewphs citbd5o c8mhelx c11o1qco c1j3qymu c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r c19sjcuo c1p7igta c17bg70f c1ukxltw c2r0u52 c1euyina c19g64m cpfkiqa cxd44ev cmb1g0y cefv3qt cnhnabs ca7ixp5 c1rx0vc0`}>
<Link
href={"/tmp/old/zeiss-old"}
target={"_self"}
className={`w-link c18cz3nc c1vzdye3 c1gmslhp cnjkebt c1jnl7g6 c1l31tfa cl272xq`}>
<HtmlEmbed
code={"<div id=\"film-grainmbos\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: grainmbos 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes grainmbos {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q ci2ht8b`} />
<HtmlEmbed
code={"<div style=\"position: relative; width:100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/73ghxzaeg0se3eri6eeqh/MB_Website_Header_v001.mp4?rlkey=gcmfx77r6kl3zuhn2yk69uz4j&amp;st=azlkwqzq&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed c1pcwimv c6jnof9 ${"hover-video"}`} />
<Box
className={`w-box c1h1pga6 c18cz3nc cgblhyt cyw9z6 c10h0i18 c1n9nwu5 cihvjpo c11gclnd c1batr5w c14wn7wu c1ntaiu9 c11qhcj0 c1c33o4t cl53kwr c1w29uql c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc c1v14zne cwbrrsf c19g64m`}>
<Text
className={`w-text c1dwi1xq citbd5o cgblhyt c1iqfj3p c7fsoai cnjkebt c13gsb13 c198568g ${"projecttitle"}`}>
{"◐"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1v14zne c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi c1batr5w cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"MERCEDES → MB.OS "}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2023 | comissioned work"}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp c1xtp1z9 cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b c1jnl7g6`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c14v9zit citbd5o c8mhelx c11o1qco c1j3qymu c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r c19sjcuo c1p7igta c17bg70f c1ukxltw c2r0u52 c1euyina c19g64m cpfkiqa cxd44ev cmb1g0y cefv3qt cnhnabs ca7ixp5 c1rx0vc0`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx c1l31tfa c1qdiv54 c1lwyeat crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
href={"/tmp/old/zeiss-old"}
target={"_self"}
className={`w-link c18cz3nc c1vzdye3 c1gmslhp cnjkebt c1jnl7g6 c1l31tfa cl272xq`}>
<HtmlEmbed
code={"<div id=\"film-grain\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: graineucerin1 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes graineucerin1 {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n\n"}
className={`w-html-embed c10hed8q ci2ht8b`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/dp3vjsptdt6nzdnpilwdd/EUC_MOA_urea_0010.mp4?rlkey=6zezv87f6b8h2jkhog2qh15v9&amp;st=x34mkzro&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
clientOnly={false}
className={`w-html-embed c1pcwimv c6jnof9 ${"fade-in"}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 cyw9z6 c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cutldc c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◓"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"EUCERIN → MOA "}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2023 | comissioned work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx c1keggpf c1uae5ev c1lwyeat crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
href={"/tmp/old/zeiss-old"}
target={"_self"}
className={`w-link c18cz3nc c1vzdye3 c1gmslhp cnjkebt c1jnl7g6 c1l31tfa cl272xq`}>
<HtmlEmbed
code={"<div id=\"film-grain\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: graineucerin2 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes graineucerin2 {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n\n"}
className={`w-html-embed c10hed8q ci2ht8b`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n      <source src=\"https://dl.dropboxusercontent.com/scl/fi/980hx28co06t9w80y7553/EUCERIN_MOA2_Header.mp4?rlkey=6bd56e960j2l0h5sd00z2offi&amp;st=bdj2jit7&amp;dl=0\" type=\"video/mp4\">&gt;\n        Your browser does not support the video tag.\n    </video>\n</div>"}
executeScriptOnCanvas={true}
clientOnly={false}
className={`w-html-embed c1pcwimv c6jnof9 ${"fade-in"}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 cyw9z6 c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cutldc c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◩"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa citbd5o cnjkebt c17lv365 c122wzou ${"projecttitle"}`}>
{"EUCERIN → MOA "}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2024 | comissioned work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c1p13xdy citbd5o c8mhelx c11o1qco c1j3qymu c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r c19sjcuo c1p7igta c17bg70f c1ukxltw c2r0u52 c1euyina c19g64m cpfkiqa cxd44ev cmb1g0y cefv3qt cnhnabs c1jsxy53`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx c1l31tfa cl272xq c1lwyeat crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
href={"/tmp/old/zeiss-old"}
target={"_self"}
className={`w-link c18cz3nc c1vzdye3 c1gmslhp cnjkebt c1jnl7g6 c1l31tfa cl272xq`}>
<HtmlEmbed
code={"<div id=\"film-grain\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: grainchange 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes grainchange {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n\n"}
className={`w-html-embed c10hed8q ci2ht8b`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/grcti7tsm4futmccjcgcf/MICROSOFT_CHANGE_WebsiteTitle.mp4?rlkey=rdr20cmlggmy5oucnxmfjyy80&amp;st=fhenip0p&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed c1pcwimv c6jnof9 ${"hover-video"}`} />
<Box
className={`w-box c1h1pga6 c18cz3nc cgblhyt cfsvpaw c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t chxqn51 c1xym8gi c1ie5me3 cc1ry8a c18858vl c4abxsp c5w2sh7 c14wn7wu c1w29uql c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◐"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"MICROSOFT → CHANGE"}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2019 | comissioned work"}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp c1xtp1z9 cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text`}>
{"Life is full of changes—some we choose, some we don’t. When Microsoft approached me to help communicate the transition from Wunderlist to ToDo, I created a heartfelt story about a family navigating change. The result was a charming, relatable message that reframed uncertainty as a chance for growth."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c14v9zit citbd5o c8mhelx c11o1qco c1j3qymu c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r c19sjcuo c1p7igta c17bg70f c1ukxltw c2r0u52 c1euyina c19g64m cpfkiqa cxd44ev cmb1g0y cefv3qt cnhnabs ca7ixp5 c1rx0vc0`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx c1l31tfa c1qdiv54 c1lwyeat crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
href={"/tmp/old/zeiss-old"}
target={"_self"}
className={`w-link c18cz3nc c1vzdye3 c1gmslhp cnjkebt c1jnl7g6 c1l31tfa cl272xq`}>
<HtmlEmbed
code={"<div id=\"film-grain\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: grainrowa 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes grainrowa {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q ci2ht8b`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/qphy9ofwa2a61i6xj0i3z/GGH_ROWA_MASTER_1by1_Snippet_002.mp4?rlkey=axghzsfwojkj6y2tvxqywgrm1&amp;st=oxg5vpm9&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n\n"}
executeScriptOnCanvas={true}
clientOnly={false}
className={`w-html-embed c1pcwimv c6jnof9 ${"fade-in"}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 cfsvpaw c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1xym8gi c1ie5me3 cc1ry8a c18858vl c4abxsp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◓"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"ROWA → EP25+ "}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2020 | comissioned work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx c1keggpf crcjwpa c1lwyeat crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
href={"/tmp/old/zeiss-old"}
target={"_self"}
className={`w-link c18cz3nc c1vzdye3 c1gmslhp cnjkebt c1jnl7g6 c1l31tfa cl272xq`}>
<HtmlEmbed
code={"<div id=\"film-grain-seabob\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: grainbuzz 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes grainbuzz {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q ci2ht8b`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n      <source src=\"https://dl.dropboxusercontent.com/scl/fi/ib3tn43tqk2v8itct4zcd/BUZZFORBEES_WebsiteHeader.mp4?rlkey=znfs4m82blqqmallznnvfd5uf&amp;st=23pii229&amp;dl=0\" type=\"video/mp4\">&gt;\n        Your browser does not support the video tag.\n    </video>\n</div>"}
executeScriptOnCanvas={true}
clientOnly={false}
className={`w-html-embed c1pcwimv c6jnof9 ${"fade-in"}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 cyw9z6 c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1xym8gi c1ie5me3 cc1ry8a c18858vl c4abxsp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◩"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa citbd5o cnjkebt c17lv365 c122wzou ${"projecttitle"}`}>
{"BUZZ FOR BEES "}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2021 | self initiated work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c14v9zit citbd5o c8mhelx c11o1qco c1j3qymu c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r c19sjcuo c1p7igta c17bg70f c1ukxltw c2r0u52 c1euyina c19g64m cpfkiqa cxd44ev cmb1g0y cefv3qt cnhnabs c1jsxy53`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx c1keggpf cl272xq c1lwyeat crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
href={"/tmp/old/zeiss-old"}
target={"_self"}
className={`w-link c18cz3nc c1vzdye3 c1gmslhp cnjkebt c1jnl7g6 c1l31tfa cl272xq`}>
<HtmlEmbed
code={"<div id=\"film-grain-seabob\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: grainhh 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes grainhh {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q ci2ht8b`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/ub1e2imwdggat4v29n4p2/HH_DC_rain_v001.mp4?rlkey=5fh8iz2r0u5qlj7ustkdc8bkm&amp;st=bv0mfmgq&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed c1pcwimv c6jnof9 ${"hover-video"}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 cyw9z6 c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◓"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"BMFI → HELFENDE HAND "}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2016 | comissioned work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx c1keggpf cv9819o c1lwyeat crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
href={"/tmp/old/zeiss-old"}
target={"_self"}
className={`w-link c18cz3nc c1vzdye3 c1gmslhp cnjkebt c1jnl7g6 c1l31tfa cl272xq`}>
<HtmlEmbed
code={"<div id=\"film-grain-seabob\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: graintodo 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes graintodo {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/3efynauvl44is0vmftezg/TDV_Microsoft_PRMaterial_Instagram_Snippet_003.mp4?rlkey=flimt4uc525xvwwupsarxy6r0&amp;st=hw05sm06&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed c1pcwimv c6jnof9 ${"hover-video"}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 cyw9z6 c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◓"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"MICROSOFT → TODO "}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2019| comissioned work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c14v9zit citbd5o c8mhelx c11o1qco c1j3qymu c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r c19sjcuo c1p7igta c17bg70f cfar91m c2r0u52 c1euyina c19g64m cpfkiqa cxd44ev cmb1g0y cefv3qt cnhnabs c1jsxy53`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx c1l31tfa c1qdiv54 c1875ifk crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty`}>
<HtmlEmbed
code={"<div id=\"film-grain-seabob\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: grainslices 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes grainslices {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/ftxad6nr8x2zpaosp567u/Animation_Comp_lq.mp4?rlkey=nr9d46g6o0l43vvv6v8mdpi54&amp;st=996ocpgf&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed c1pcwimv c6jnof9 c1k8h7n4 ${""}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 cyw9z6 c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◩"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa citbd5o cnjkebt c17lv365 c122wzou ${"projecttitle"}`}>
{"SLICES"}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"ongoing | self initiated work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx cgblhyt c1srl2aa c1keggpf crcjwpa c1lwyeat c16yfzc7 c1844gb3 c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty`}>
<HtmlEmbed
code={"<div id=\"film-grain-seabob\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: grainwk 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.5; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes grainwk {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/3eov4k2gdnw80qfgb6gma/081020_WalterKnoll_kampagnenfilm_header_v01.mp4?rlkey=xgqirobyxd3ng981q5rbhq3dc&amp;st=63ed10m9&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed c1pcwimv c6jnof9 ${"hover-video"}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 c1rjjar3 c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◩"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"WALTERKNOLL → SHERU "}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2020 | comissioned work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id c1qqhuxc c1g31dpx cgblhyt c1srl2aa cf4hk6h ct1iw2n c1lwyeat c16yfzc7 c1844gb3 c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty`}>
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/cttu4850480q074vipgg0/XOTQ_Parfume_4by5_1.mp4?rlkey=qrftwrajdtt1w8qqxdsxk676d&amp;st=r1xbvrll&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed c1pcwimv c6jnof9 ${"hover-video"}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 c1rjjar3 c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◩"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"XOTQ"}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"ongoing | self intiated work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 cjfdrz8 c1u0n7fo c23gcc c14ubitr cedsfhn c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r cg6mlau c11qfczr c17bg70f cfar91m c2r0u52 c1euyina c19g64m cxd44ev cmb1g0y`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id cm2myuo c1qqhuxc c1g31dpx c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr cd9xpjb ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty`}>
<HtmlEmbed
code={"<div id=\"film-grain-seabob\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: pitchgrain 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.7; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes pitchgrain {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/1duksig9ae2sbtvenpdx3/PITCH_Instagram_01_website.mp4?rlkey=haiimd398nh54sfyaxqdso8lp&amp;st=68791fo2&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed c1pcwimv c6jnof9 ${"hover-video"}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 cob282a c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◩"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"PITCH → HOW TO PITCH"}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2020 | comissioned work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id cm2myuo c1qqhuxc c1g31dpx c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr cd9xpjb ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty`}>
<Image
src={"/assets/VODAFONE_ZooZoos_ProjectCover_I_vRuWlc9dOJMTOizmQRo.jpg"}
width={3016}
height={2872}
className={`w-image c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone clz0kgc ck2cain`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 cfsvpaw c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◩"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"VODAFONE → ZOOZOOS"}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2024 | comissioned work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c1p13xdy citbd5o c8mhelx c11o1qco c1j3qymu c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r cg6mlau c11qfczr c17bg70f cldle74 c2r0u52 c1euyina c19g64m cpfkiqa cxd44ev cmb1g0y cefv3qt cnhnabs c1jsxy53`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id cm2myuo c1qqhuxc c1g31dpx c1keggpf cl272xq c1875ifk crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr cd9xpjb ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty`}>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c1p13xdy c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4`}>
<Box
className={`w-box c1h1pga6 c1id2b1s cnte2uu coylfqt cqgz7gp c19reeev c1gmslhp c1pvu8w3 cle6o9l c1g2jufu c9maob0 csv506f celbstl c1e3o90j cgrw9f6 c1u0n7fo cfwziq7 c9wae9a ctqbvkf c2xk3tf c1yd1lfy c1pk531j cuiefla c8kmj2h c14gzta7`}>
<Box
className={`w-box c1x8fxz1 c11gclnd c1n9nwu5 c6jnof9 c18cz3nc c1j25brr c1me0raf c1gp9ga9 c12zfe5o c1773gzf c1k8h7n4 c14lgot0 c1g9r5xu`}>
<Text
className={`w-text c10ated0 csmcjty cqpl4ow c89650f clo8j6y c1s86xhq c5w2sh7 cqgz7gp cw8d04u ci6y91l c1hnyemj c7wxkog cc3t040`}>
{"PORTRAITS"}
</Text>
<Box
className={`w-box c1dhi4pe cbpyli8 c1v14zne c1yrlly4 co7la75 crm9qvx c1qanfgn c12i824c c1jfu44o c10pt8xj c1mgl8o clo8j6y cyb4no3 c1u7ivge cc2xj8i c1t88txi`}>
{"But Web Studio is "}
{""}
<br />
{""}
{"Even cheaper"}
</Box>
</Box>
</Box>
<Image
src={"/assets/SelfPortrait_1by1_Grading_YuG4Kr48JxJct_OiCLo8F.jpg"}
width={1974}
height={1974}
className={`w-image c11h2j09 clz0kgc ck2cain c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone`} />
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id cm2myuo c1qqhuxc c1g31dpx cgblhyt c1srl2aa c1keggpf c1uae5ev c1lwyeat c45hcq3 c1844gb3 c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr cd9xpjb ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty coa285g crmz8q2`}>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c18cz3nc c6jnof9 c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4 cbe32kg c15yus9a czuu476 c1qy1eks c1d18rwp c1yevci1 c16wxgy9`}>
<Box
className={`w-box c1h1pga6 c1id2b1s cnte2uu coylfqt cqgz7gp c19reeev c1gmslhp c1pvu8w3 cle6o9l c1g2jufu c9maob0 csv506f celbstl c1e3o90j cgrw9f6 c1u0n7fo cfwziq7 c9wae9a ctqbvkf c2xk3tf c1yd1lfy c1pk531j cuiefla c8kmj2h c14gzta7`}>
<Box
className={`w-box cx1r5dx c1d1tfg5 c1n9nwu5 c6jnof9 c18cz3nc ccv9vgi c1me0raf c1gp9ga9 c12zfe5o c1k8h7n4 c14lgot0 c1g9r5xu`}>
<Text
className={`w-text c10ated0 csmcjty cqpl4ow c1batr5w clo8j6y c1s86xhq c5w2sh7 cqgz7gp cw8d04u ci6y91l c1hnyemj c7wxkog cc3t040`}>
{"ZDF"}
</Text>
<Box
className={`w-box c1dhi4pe cbpyli8 c1v14zne c1batr5w co7la75 crm9qvx c1qanfgn c12i824c c1jfu44o c10pt8xj c1mgl8o clo8j6y cyb4no3 c1u7ivge cc2xj8i c1t88txi`}>
{"But Web Studio is "}
{""}
<br />
{""}
{"Even cheaper"}
</Box>
</Box>
</Box>
<Image
src={"/assets/ZDF_Rotkehlchen_v003_3ekjoPJl5mqttI3k7tMwf.jpg"}
width={3840}
height={2160}
className={`w-image c11h2j09 clz0kgc ck2cain c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone`} />
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1n9nwu5 ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id cm2myuo c1qqhuxc c1g31dpx cgblhyt c1srl2aa c1keggpf c1uae5ev cbccxsc c16yfzc7 c135nxw9 c1844gb3 c16chkwm c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr cd9xpjb ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty coa285g crmz8q2`}>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c18cz3nc c6jnof9 c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4`}>
<Box
className={`w-box c1h1pga6 c1id2b1s cnte2uu coylfqt cqgz7gp c19reeev c1gmslhp c1pvu8w3 cle6o9l c1g2jufu c9maob0 csv506f celbstl c1e3o90j cgrw9f6 c1u0n7fo cfwziq7 c9wae9a ctqbvkf c2xk3tf c1yd1lfy c1pk531j cuiefla c8kmj2h c14gzta7`}>
<Box
className={`w-box cx1r5dx c1d1tfg5 c1n9nwu5 c6jnof9 c18cz3nc ccv9vgi c1me0raf c1gp9ga9 c12zfe5o c1k8h7n4 c14lgot0 c1g9r5xu`}>
<Text
className={`w-text c10ated0 csmcjty cqpl4ow c1batr5w clo8j6y c1s86xhq c5w2sh7 cqgz7gp cw8d04u ci6y91l c1hnyemj c7wxkog cc3t040`}>
{"ILLUSTRATIONS"}
</Text>
<Box
className={`w-box c1dhi4pe cbpyli8 c1v14zne c1batr5w co7la75 crm9qvx c1qanfgn c12i824c c1jfu44o c10pt8xj c1mgl8o clo8j6y cyb4no3 c1u7ivge cc2xj8i c1t88txi`}>
{"But Web Studio is "}
{""}
<br />
{""}
{"Even cheaper"}
</Box>
</Box>
</Box>
<Image
src={"/assets/LL_Coast_Frames_16by9_v1__0005_Layer_10_74iOpmT7Sm610PSy2wF20.jpg"}
width={1920}
height={1080}
className={`w-image c11h2j09 clz0kgc ck2cain c6jnof9 c18cz3nc c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone`} />
</Box>
</Link>
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c1p13xdy citbd5o ck3udat c11o1qco c1j3qymu c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r cg6mlau c11qfczr c17bg70f cfar91m c2r0u52 c1euyina c19g64m cpfkiqa cxd44ev cmb1g0y cefv3qt cnhnabs`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id cm2myuo c1qqhuxc c1g31dpx cf4hk6h cl272xq cbccxsc crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr cd9xpjb ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty`}>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c1p13xdy c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4`}>
<Box
className={`w-box c1h1pga6 c1id2b1s cnte2uu coylfqt cqgz7gp c19reeev c1gmslhp c1pvu8w3 cle6o9l c1g2jufu c9maob0 csv506f celbstl c1e3o90j cgrw9f6 c1u0n7fo cfwziq7 c9wae9a ctqbvkf c2xk3tf c1yd1lfy c1pk531j cuiefla c8kmj2h c14gzta7`}>
<Box
className={`w-box c1x8fxz1 c11gclnd c1n9nwu5 c6jnof9 c18cz3nc c1j25brr c1me0raf c1gp9ga9 c12zfe5o c1773gzf c1k8h7n4 c14lgot0 c1g9r5xu`}>
<Text
className={`w-text c10ated0 csmcjty cqpl4ow c89650f clo8j6y c1s86xhq c5w2sh7 cqgz7gp cw8d04u ci6y91l c1hnyemj c7wxkog cc3t040`}>
{"BUZZFORBEES"}
</Text>
<Box
className={`w-box c1dhi4pe cbpyli8 c1v14zne c1yrlly4 co7la75 crm9qvx c1qanfgn c12i824c c1jfu44o c10pt8xj c1mgl8o clo8j6y cyb4no3 c1u7ivge cc2xj8i c1t88txi`}>
{"But Web Studio is "}
{""}
<br />
{""}
{"Even cheaper"}
</Box>
</Box>
</Box>
<Image
src={"/assets/Buzz_For_Bees_16x9_FHD_Styleframe_01_HCxyMuY7LtaEX-ql6MHK5.jpg"}
width={1920}
height={1080}
className={`w-image c11h2j09 clz0kgc ck2cain c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone`} />
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id cm2myuo c1qqhuxc c1g31dpx c1keggpf cl272xq c1875ifk c45hcq3 c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr cd9xpjb ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty`}>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c1p13xdy c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4`}>
<Box
className={`w-box c1h1pga6 c1id2b1s cnte2uu coylfqt cqgz7gp c19reeev c1gmslhp c1pvu8w3 cle6o9l c1g2jufu c9maob0 csv506f celbstl c1e3o90j cgrw9f6 c1u0n7fo cfwziq7 c9wae9a ctqbvkf c2xk3tf c1yd1lfy c1pk531j cuiefla c8kmj2h c14gzta7`}>
<Box
className={`w-box c1x8fxz1 c11gclnd c1n9nwu5 c6jnof9 c18cz3nc c1j25brr c1me0raf c1gp9ga9 c12zfe5o c1773gzf c1k8h7n4 c14lgot0 c1g9r5xu`}>
<Text
className={`w-text c10ated0 csmcjty cqpl4ow c89650f clo8j6y c1s86xhq c5w2sh7 cqgz7gp cw8d04u ci6y91l c1hnyemj c7wxkog cc3t040`}>
{"GARYANDCLAIRE"}
</Text>
<Box
className={`w-box c1dhi4pe cbpyli8 c1v14zne c1yrlly4 co7la75 crm9qvx c1qanfgn c12i824c c1jfu44o c10pt8xj c1mgl8o clo8j6y cyb4no3 c1u7ivge cc2xj8i c1t88txi`}>
{"But Web Studio is "}
{""}
<br />
{""}
{"Even cheaper"}
</Box>
</Box>
</Box>
<Image
src={"/assets/GuC_Hug_v001_1Upe0G3K3mmkI0zYB55wo.jpg"}
width={2560}
height={1413}
className={`w-image c11h2j09 clz0kgc ck2cain c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone`} />
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id cm2myuo c1qqhuxc c1g31dpx cgblhyt c1srl2aa c16gfo6u crcjwpa c1lwyeat c45hcq3 c1844gb3 c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr cd9xpjb ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty coa285g crmz8q2`}>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c18cz3nc c6jnof9 c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4`}>
<Box
className={`w-box c1h1pga6 c1id2b1s cnte2uu coylfqt cqgz7gp c19reeev c1gmslhp c1pvu8w3 cle6o9l c1g2jufu c9maob0 csv506f celbstl c1e3o90j cgrw9f6 c1u0n7fo cfwziq7 c9wae9a ctqbvkf c2xk3tf c1yd1lfy c1pk531j cuiefla c8kmj2h c14gzta7`}>
<Box
className={`w-box cx1r5dx c1d1tfg5 c1n9nwu5 c6jnof9 c18cz3nc ccv9vgi c1me0raf c1gp9ga9 c12zfe5o c1k8h7n4 c14lgot0 c1g9r5xu`}>
<Text
className={`w-text c10ated0 csmcjty cqpl4ow c1batr5w clo8j6y c1s86xhq c5w2sh7 cqgz7gp cw8d04u ci6y91l c1hnyemj c7wxkog cc3t040`}>
{"MTV"}
</Text>
<Box
className={`w-box c1dhi4pe cbpyli8 c1v14zne c1batr5w co7la75 crm9qvx c1qanfgn c12i824c c1jfu44o c10pt8xj c1mgl8o clo8j6y cyb4no3 c1u7ivge cc2xj8i c1t88txi`}>
{"But Web Studio is "}
{""}
<br />
{""}
{"Even cheaper"}
</Box>
</Box>
</Box>
<Image
src={"/assets/MTV_GH_MASTER_20sec_HD_16.9_30fps_00218_UTmYQDoZfL7CX0s3LJ10L.jpg"}
width={1920}
height={1080}
className={`w-image c11h2j09 clz0kgc ck2cain c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone`} />
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id cm2myuo c1qqhuxc c1g31dpx cgblhyt c1srl2aa c16gfo6u c1qdiv54 cbccxsc c16yfzc7 c1844gb3 c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr cd9xpjb ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty coa285g crmz8q2`}>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c18cz3nc c6jnof9 c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4`}>
<Box
className={`w-box c1h1pga6 c1id2b1s cnte2uu coylfqt cqgz7gp c19reeev c1gmslhp c1pvu8w3 cle6o9l c1g2jufu c9maob0 csv506f celbstl c1e3o90j cgrw9f6 c1u0n7fo cfwziq7 c9wae9a ctqbvkf c2xk3tf c1yd1lfy c1pk531j cuiefla c8kmj2h c14gzta7`}>
<Box
className={`w-box cx1r5dx c1d1tfg5 c1n9nwu5 c6jnof9 c18cz3nc ccv9vgi c1me0raf c1gp9ga9 c12zfe5o c1k8h7n4 c14lgot0 c1g9r5xu`}>
<Text
className={`w-text c10ated0 csmcjty cqpl4ow c1batr5w clo8j6y c1s86xhq c5w2sh7 cqgz7gp cw8d04u ci6y91l c1hnyemj c7wxkog cc3t040`}>
{"PICTOPLASMA"}
</Text>
<Box
className={`w-box c1dhi4pe cbpyli8 c1v14zne c1batr5w co7la75 crm9qvx c1qanfgn c12i824c c1jfu44o c10pt8xj c1mgl8o clo8j6y cyb4no3 c1u7ivge cc2xj8i c1t88txi`}>
{"But Web Studio is "}
{""}
<br />
{""}
{"Even cheaper"}
</Box>
</Box>
</Box>
<Image
src={"/assets/120328_PICTOPLASMA_MASTER_01379_Ec3RwSqwTBNXeE6tLYKoa.jpg"}
width={2000}
height={1000}
className={`w-image c11h2j09 clz0kgc ck2cain c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c178196k cr3eaal cr0m8lk c1lc2xif c14dkone`} />
</Box>
</Link>
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c1p13xdy citbd5o c8mhelx c11o1qco c1j3qymu c4m5zow c1qmafi1 cxuhvwl cjv551l c1lcu76r cg6mlau c11qfczr c17bg70f cfar91m c2r0u52 c1euyina c19g64m cpfkiqa cxd44ev cmb1g0y cefv3qt cnhnabs`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id cm2myuo c1qqhuxc c1g31dpx cgblhyt c1srl2aa c1l31tfa c1qdiv54 c1lwyeat c16yfzc7 c1844gb3 c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr cd9xpjb ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty coa285g crmz8q2`}>
<HtmlEmbed
code={"<div id=\"film-grain-seabob\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: garygrain 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.7; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes garygrain {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/qin2gbx3gu4flsp7ooila/GARY-CLAIRE_Mockup.mp4?rlkey=ht6dc7tbe956i091v98n5hrva&amp;st=x1o8aox7&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed c1pcwimv c6jnof9 c1k8h7n4 ${""}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 cfsvpaw c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◩"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"GARY & CLAIRE"}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2018 | self initiated work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id cm2myuo c1qqhuxc c1g31dpx c1keggpf c1uae5ev c1875ifk crb4e7i c19sjcuo c1p7igta cu3upf4 c1alfrfg c2c8w2c c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr cd9xpjb ${"fade-in"}`}>
<Link
className={`w-link c6jnof9 c18cz3nc csmcjty`}>
<HtmlEmbed
code={"<div id=\"film-grain-seabob\" style=\"\n  width: 100%; \n  height: 100%; \n  position: absolute; \n  z-index: 6; \n  mix-blend-mode: overlay; \n  pointer-events: none;\n  background-repeat: repeat;\n  background-size: 150px 150px; /* Smaller size for finer grain */\n  animation: herograin 1s steps(2) infinite; /* Randomized frames */\n  opacity: 0.7; /* Subtle effect */\n  \"></div>\n\n<style>\n  @keyframes herograin {\n    0%, 10% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.5%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    10%, 20% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.6%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    20%, 30% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.7%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    30%, 40% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    40%, 50% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    50%, 60% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.0%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    60%, 70% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.1%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    70%, 80% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.2%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    80%, 90% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.3%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n    90%, 100% {\n      background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 291 291%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%271.4%27 numOctaves=%271%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');\n    }\n  }\n\n\n</style>\n\n\n"}
className={`w-html-embed c10hed8q`} />
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/5fwd5s24q6f799jmufalg/EHEROES_CaseStudy_Zurich_WebsiteHeader.mp4?rlkey=1repkfs35q6ou47vahehqyeqv&amp;st=eqokbpsx&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed c1pcwimv c6jnof9 c1k8h7n4 ${""}`} />
<Box
className={`w-box c1h1pga6 c1srl2aa c6jnof9 c1nxiwqw c10h0i18 c1n9nwu5 c1j25brr c11gclnd c1batr5w c1ntaiu9 c11qhcj0 c1c33o4t cqgz7gp c1k8h7n4 c3iwqod c5ffiur c1oqqk6j c12cacaq cgggwh3 c4brrs6 c1lcu76r cv4z629`}>
<Box
className={`w-box c17kqez4 cxx9pbc c1xym8gi c18cz3nc cwbrrsf c19g64m`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"◩"}
</Text>
</Box>
<Box
className={`w-box cnjkebt c1batr5w c2k9q08 c1n9nwu5 c18cz3nc cgn7l1h c9wae9a cbpyli8 c1x8fxz1 c1j25brr c1xym8gi cwbrrsf c19sjcuo c1p7igta`}>
<Text
className={`w-text c1iqfj3p c5f73bf c10ated0 c14oicvs cwys8fa c17lv365 c122wzou ${"projecttitle"}`}>
{"EHEROES "}
</Text>
<Text
className={`w-text c1dwi1xq c1gmslhp cgblhyt c1jxf8g4 cnjkebt c1b1q8n0 c1mlbc4w cb54f03 c1jnl7g6 c19a7425 c17lv365 c13v1j4y ${"projecttitle"}`}>
{"2018 | comissioned work"}
</Text>
<Text
className={`w-text c1dwi1xq c1u7ivge c1ikv8fq cnjkebt crsdlke cqgz7gp c19se2ul c1i4osrx c1joo4wy c17lv365 cx415a4 ci2ht8b ${"projecttitle"}`}>
<Text
tag={"span"}
className={`w-text ci2ht8b cqn1qwz c1jnl7g6 c19jmeix`}>
{"Beauty is deeply personal, yet there’s something about it that brings us together. We all respond to it, even if we can’t explain why. That’s the idea behind this temporal sculpture created with Zeiss."}
</Text>
<Text
tag={"span"}
className={`w-text ci2ht8b c1q9r52w`}>
{" "}
</Text>
</Text>
</Box>
</Box>
</Link>
</Box>
</Box>
<Box
tag={"section"}
className={`w-box cxonsnn c23gcc cx1r5dx c31ek29 c1gp9ga9 c12zfe5o c1rvutkj c18qvust c90fh3y c1c5mor0 c1nm2zl cinh9cx c1ntaiu9 c11qhcj0 c1p13xdy c14ubitr coa285g crmz8q2 c10tnjni c135nxw9 crsc73h cedsfhn c4m5zow c1qmafi1 cxuhvwl cr66c2d c1lcu76r cg6mlau c1p7igta c17bg70f cfar91m c2r0u52 c1euyina c1w1squk cxd44ev cmb1g0y`}>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1n9nwu5 ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id coa285g crmz8q2 c135nxw9 c1dwi1xq c1srl2aa c19sjcuo c1p7igta cu3upf4 c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c1p13xdy c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4`}>
<Image
src={"/assets/ABSTRACT_Series_Glass_v01_zQf_tDo-1YXHlivCyKF_m.jpg"}
width={1920}
height={1920}
className={`w-image c1r1cdxj c6jnof9 c18cz3nc c1ogtw29 c1t4vx7i c1qqhuxc c1g31dpx`} />
<Box
className={`w-box c1h1pga6 c1id2b1s cnte2uu coylfqt cqgz7gp c19reeev c1gmslhp c1pvu8w3 cle6o9l c1g2jufu c9maob0 csv506f celbstl c1e3o90j cgrw9f6 c1u0n7fo cfwziq7 c9wae9a ctqbvkf c2xk3tf c1yd1lfy c1pk531j cuiefla c8kmj2h c14gzta7`}>
<Box
className={`w-box cx1r5dx c1d1tfg5 c1n9nwu5 c6jnof9 c18cz3nc ccv9vgi c1me0raf c1gp9ga9 c12zfe5o c1k8h7n4 c14lgot0 c1g9r5xu`}>
<Text
className={`w-text c10ated0 csmcjty cqpl4ow c1batr5w clo8j6y c1s86xhq c5w2sh7 cqgz7gp cw8d04u ci6y91l c1hnyemj c7wxkog cc3t040`}>
{"SLICES"}
</Text>
<Box
className={`w-box c1jnl7g6 cbpyli8 c1v14zne c1batr5w co7la75 crm9qvx c1qanfgn c12i824c c1jfu44o c10pt8xj c1mgl8o clo8j6y cyb4no3 c1u7ivge cc2xj8i c1t88txi`}>
{"I Think Webflow is "}
{""}
<br />
{""}
{"kinda cool"}
</Box>
</Box>
</Box>
</Box>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id coa285g crmz8q2 c19sjcuo c1p7igta cu3upf4 c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c1p13xdy c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4`}>
<Box
className={`w-box c1h1pga6 c1id2b1s cnte2uu coylfqt cqgz7gp c19reeev c1gmslhp c1pvu8w3 cle6o9l c1g2jufu c9maob0 csv506f celbstl c1e3o90j cgrw9f6 c1u0n7fo cfwziq7 c9wae9a ctqbvkf c2xk3tf c1yd1lfy c1pk531j cuiefla c8kmj2h c14gzta7`}>
<Box
className={`w-box cx1r5dx c1d1tfg5 c1n9nwu5 c6jnof9 c18cz3nc ccv9vgi c1me0raf c1gp9ga9 c12zfe5o c1k8h7n4 c14lgot0 c1g9r5xu`}>
<Text
className={`w-text c10ated0 csmcjty cqpl4ow c1batr5w clo8j6y c1s86xhq c5w2sh7 cqgz7gp cw8d04u ci6y91l c1hnyemj c7wxkog cc3t040`}>
{"PITCH"}
</Text>
<Box
className={`w-box c1jnl7g6 cbpyli8 c1v14zne c1batr5w co7la75 crm9qvx c1qanfgn c12i824c c1jfu44o c10pt8xj c1mgl8o clo8j6y cyb4no3 c1u7ivge cc2xj8i c1t88txi`}>
{"I Think Webflow is "}
{""}
<br />
{""}
{"kinda cool"}
</Box>
</Box>
</Box>
</Box>
</Box>
<Box
className={`w-box c1x8fxz1 c1xxp2mx cfwo4re c1gmslhp ci6rzll cr3eaal cr0m8lk c1lc2xif c14dkone c1lzaaez c1w3smzc cnhy0pt cu2m7id coa285g crmz8q2 c19sjcuo c1p7igta cu3upf4 c1pz329a c1gudtt8 c1urul48 c1fni4yr c10aonwr ${"fade-in"}`}>
<Box
className={`w-box cnjkebt c1qqhuxc c1g31dpx c1lzaaez c1w3smzc cnhy0pt cu2m7id c118l8s4 crtkx83 c1p13xdy c19wb77y c1dc6khr cwbtxtf c7q0nwy c1vf5tu4`}>
<HtmlEmbed
code={"<div style=\"position: relative; width: 100%; height: 100%; overflow: hidden;\">\n    <video class=\"hover-video\" autoplay=\"\" loop=\"\" muted=\"\" playsinline=\"\" style=\"position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);\">\n        <source src=\"https://dl.dropboxusercontent.com/scl/fi/fab91d45ji76vcix2i1k0/CZ_Avatar_v1_snippet.mp4?rlkey=m4a18fbx4z09d5sseacxgeh15&amp;st=wbx3lm4f&amp;dl=0\" type=\"video/mp4\">\n        Your browser does not support the video tag.\n    </video>\n</div>\n"}
executeScriptOnCanvas={true}
className={`w-html-embed c1pcwimv c6jnof9 ${"hover-video"}`} />
<Box
className={`w-box c1h1pga6 c1id2b1s cnte2uu coylfqt cqgz7gp c19reeev c1gmslhp c1pvu8w3 cle6o9l c1g2jufu c9maob0 csv506f celbstl c1e3o90j cgrw9f6 c1u0n7fo cfwziq7 c9wae9a ctqbvkf c2xk3tf c1yd1lfy c1pk531j cuiefla c8kmj2h c14gzta7`}>
<Box
className={`w-box cx1r5dx c1d1tfg5 c1n9nwu5 c6jnof9 c18cz3nc ccv9vgi c1me0raf c1gp9ga9 c12zfe5o c1k8h7n4 c14lgot0 c1g9r5xu`}>
<Text
className={`w-text c10ated0 csmcjty cqpl4ow c1batr5w clo8j6y c1s86xhq c5w2sh7 cqgz7gp cw8d04u ci6y91l c1hnyemj c7wxkog cc3t040`}>
{"PITCH"}
</Text>
<Box
className={`w-box c1jnl7g6 cbpyli8 c1v14zne c1batr5w co7la75 crm9qvx c1qanfgn c12i824c c1jfu44o c10pt8xj c1mgl8o clo8j6y cyb4no3 c1u7ivge cc2xj8i c1t88txi`}>
{"I Think Webflow is "}
{""}
<br />
{""}
{"kinda cool"}
</Box>
</Box>
</Box>
</Box>
</Box>
</Box>
</Box>
<Slot />
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
    