declare module '@citation-js/core' {
  export class Cite {
    constructor(data: any, options?: any);

    // Add the 'format' method
    format(
      type: 'string' | 'object' | 'json' | 'html' | 'text' | 'data' | 'bibliography',
      options?: {
        format?: 'html' | 'text';
        template?: string;
        lang?: string;
        [key: string]: any;
      }
    ): string;

    // If you're using other methods, add them here
  }
}
