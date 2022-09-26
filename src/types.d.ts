declare global {
    export interface Window {
        H5PIntegration: any;
    };
};

export type Config =
    | {
        backgroundColor: string;
        textColor: string;
        licenceIntro: string;
        licenceTarget: string;
        licenceName: string;
        licenceUrl: string;
        reuseConditions: string;
        isHVP: boolean;
        modalTitle: string|null;
        licenceToUse: string|null;
        downloadText: string|null;
        copyText: string|null;
        closeText: string|null;
        downloadURL: string|null;
    };

export type H5PIntegrationContent =
    | {
        library: string;
        jsonContent: Object;
        fullScreen: string|number;
        exportUrl: string;
        embedCode: string;
        resizeCode: string;
        title: string;
        displayOptions: {
            frame: boolean;
            export: boolean;
            embed: boolean;
            copyright: boolean;
            icon: boolean;
            copy: boolean;
        };
        url: string;
        contentUrl: string;
        metadata: {
            title: string;
            license: string;
            defaultLanguage: string;
        };
        contentUserData: Array<{
            state: string;
        }>;
        scripts: Array<string>;
        styles: Array<string>;
    };
