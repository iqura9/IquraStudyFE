import "axios";

declare module "axios" {
  export interface AxiosInterceptorManager<V> {
    use(
      onFulfilled?: (value: V) => V | Promise<V>,
      onRejected?: (error: any) => any,
    ): number;
    eject(id: number): void;
    handlers: any[];
  }

  export function request(options: { method: string; url: string; params: { base64_encoded: string; fields: string; }; headers: { "content-type": string; "Content-Type": string; "X-RapidAPI-Host": string; }; data: { language_id: number; source_code: string; }; }) {
    throw new Error("Function not implemented.");
  }
}
