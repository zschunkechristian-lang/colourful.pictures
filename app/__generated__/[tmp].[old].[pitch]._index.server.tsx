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
    title: "Pitch",
    description: "We partnered with Pitch, a Berlin startup revolutionizing presentations, to create a bold animation that blends UI highlights with stunning 3D visuals. The result? A vibrant launch story that inspires teams to pitch their ideas with confidence.",
    excludePageFromSearch: false,
    language: "",
    socialImageAssetName: "PIO_Styleframe_Collaboration_02_0029_bg_X6DLWes0dvAuk4IzwF.jpg",
    socialImageUrl: undefined,
    status: 200,
    redirect: "",
    content: undefined,
    custom: [
    ],
  };
};


      export const getRemixParams = (params: Record<string, string | undefined>) => toWebstudioParams("/pitch", params);

      export const getManagedFormSubmissions = () =>
        new Map<string, { action: unknown; resourceIds: (string | null)[] }>(
          []
        );

      /** @deprecated Generated only for saved Webhook Forms. */
      export const contactEmail = undefined;
    