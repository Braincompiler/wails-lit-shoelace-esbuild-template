declare interface IApp {
    // @TODO: Add other functions provided by the wails backend
    Greet(s: string): Promise<string>;
}

declare interface IMain {
    App?: IApp;
}

declare var go: {
    main?: IMain;
};
