declare module "html2pdf.js" {
    export default function html2pdf(): {
        from: (element: HTMLElement) => {
            save: (fileName: string) => void;
        };
    };
}

declare var html2pdf: {
    (): any;
    from: (element: HTMLElement) => any;
};
