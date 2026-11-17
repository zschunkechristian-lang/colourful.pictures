declare global {
  namespace Vike {
    interface Config {
      Head?: (props: { data: PageData }) => React.ReactNode;
    }

    interface PageContext {
      Page?: (props: { data: PageData }) => React.ReactNode;
    }
  }
}

export {};
