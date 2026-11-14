/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { renderText, useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Box as Box, Heading as Heading, List as List, ListItem as ListItem, Text as Text, Link as Link } from "@webstudio-is/sdk-components-react/components";


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
className={`w-box c1srl2aa c1n9nwu5 c11gclnd ccv9vgi c1x8fxz1 cm7k8qo cq278u7 cbdfur9 c1h39d6e c12velc7`}>
<Heading
className={`w-heading cqc9ztf c4ftmty c1owz83 cjmypef cgh9rs0`}>
{"Animation Examples"}
</Heading>
<List
className={`w-list cbhiseb c10am3bj`}>
<ListItem
className={`w-list-item`}>
<Text
tag={"span"}
className={`w-text`}>
{"Beginner"}
</Text>
<List
className={`w-list`}>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Scroll Indicator"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Parallax"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Breakpoints"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Duration"}
</Link>
</ListItem>
</List>
</ListItem>
<ListItem
className={`w-list-item`}>
<Text
tag={"span"}
className={`w-text`}>
{"Intermediate"}
</Text>
<List
className={`w-list`}>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Inset"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Easing"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Ranges"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Ranges 2"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Ranges Offset"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Parallax and Fade"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Parallax and Fade (Combined)"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Parent Child"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Image Horizontal Scroll"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Fly In and Out"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Image Zoom"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Text Animaition (By Letter)"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Text Animaition (By Word)"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Stagger"}
</Link>
</ListItem>
</List>
</ListItem>
<ListItem
className={`w-list-item`}>
<Text
tag={"span"}
className={`w-text`}>
{"Advanced"}
</Text>
<List
className={`w-list`}>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Sticky Images"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Sticky Images Object Fit"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Advanced Parallax"}
</Link>
</ListItem>
<ListItem
className={`w-list-item`}>
<Link
className={`w-link cjnlht7 c1892jp3 csl583q c1gqyrq5 c1gx4lgh c17z2fjy c1lc2xif c14dkone c13f959m cx73h14 c18blen9`}>
{"Index"}
</Link>
</ListItem>
</List>
</ListItem>
</List>
</Box>
</Body>
}


      export { Page }
    