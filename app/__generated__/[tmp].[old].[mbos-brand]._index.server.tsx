/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import type { PageMeta } from "@webstudio-is/sdk";
      import { toWebstudioParams } from "@webstudio-is/react-sdk";
      import type { System, ResourceRequest } from "@webstudio-is/sdk";
import type { ResourceRequestGraph } from "@webstudio-is/sdk/runtime";
export const getResources = (_props: { system: System; resources?: Record<string, any> }) => {
  const _data: ResourceRequestGraph = {
    resources: [
    ],
    rootIds: [
    ],
  }
  const _contentData = new Map<string, ResourceRequest>()
  const _action = new Map<string, { id: string; outputName: string }>([
  ])
  return { data: _data, action: _action, contentData: _contentData }
}


      import type { ManagedFormResourceGraph } from "@webstudio-is/sdk/runtime";
import { createFormEmailDataProxy } from "@webstudio-is/sdk";
import { createJsonStringifyProxy } from "@webstudio-is/sdk/to-string";
export const getManagedFormResourceGraph = (formId: string, _managedFormProps: { system: System; formData: unknown; browserInfo: unknown }): ManagedFormResourceGraph | undefined => {
  switch (formId) {
    default: return undefined;
  }
};


      export const getPageMeta = ({
  system,
  resources,
}: {
  system: System;
  resources: Record<string, any>;
}): PageMeta => {
  return {
    title: "Mercedes Benz MB.OS",
    description: "Mercedes-Benz needed a bold visual identity to unveil MB.OS. We crafted a striking series of animations that turned abstract concepts into a tangible, immersive story. By blending digital and physical elements, we made the technology feel intuitive, elegant, and alive.",
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: "020_data_loop_square_v001Thumbnail__OjO-8dYbkhLjieipH34W.jpg",
    socialImageUrl: undefined,
    status: 200,
    redirect: "",
    content: undefined,
    custom: [
    ],
  };
};


      export const getRemixParams = (params: Record<string, string | undefined>) => toWebstudioParams("/mbos-brand", params);

      export const getManagedFormSubmissions = () =>
        new Map<string, { action: unknown; resourceIds: (string | null)[] }>(
          []
        );

      /** @deprecated Generated only for saved Webhook Forms. */
      export const contactEmail = undefined;
    