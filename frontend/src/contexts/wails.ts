import { createContext } from '@lit/context';

export interface IWailsContext {
    /**
     * Calls the function in the wails backend.
     *
     * @param fname Name of the function
     * @param args Optional list of arguments to pass to the function
     */
    call<TFname extends keyof IApp, TReturn = IApp[TFname]>(fname: TFname, ...args: any[]): TReturn;

    /**
     * Checks if the function is provided by the wails backend.
     *
     * @param fname Name of the function
     */
    has<TFname extends keyof IApp>(fname: TFname): boolean;
}

export class WailsContext implements IWailsContext {
    public call<TFname extends keyof IApp, TReturn = ReturnType<IApp[TFname]>>(fname: TFname, ...args: Parameters<IApp[TFname]>): TReturn {
        const func = window.go!.main!.App![fname];

        return func?.call(null, ...args) as TReturn;
    }

    public has<TFname extends keyof IApp>(fname: TFname): boolean {
        return window.go?.main?.App?.[fname] != undefined;
    }
}

export const wailsContext = createContext<IWailsContext>(Symbol('wailsContext'));
