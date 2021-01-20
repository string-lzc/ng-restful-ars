export interface IRestfulClient {
  rootUrl: string;
  onHttpTimeout(error: any): void;
  onHttpError(error: any, method: string, path: string, options: any): void;
  onHttpRespond(res: any): void;
  onDefaultSuccessNotice(res: any): void;
}
