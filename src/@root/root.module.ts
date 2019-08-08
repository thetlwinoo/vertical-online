import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

// import { BOX_CONFIG } from '@box/services/config.service';

@NgModule()
export class BoxModule
{
    // constructor(@Optional() @SkipSelf() parentModule: BoxModule)
    // {
    //     if ( parentModule )
    //     {
    //         throw new Error('BoxModule is already loaded. Import it in the AppModule only!');
    //     }
    // }

    // static forRoot(config): ModuleWithProviders
    // {
    //     return {
    //         ngModule : BoxModule,
    //         providers: [
    //             {
    //                 provide : BOX_CONFIG,
    //                 useValue: config
    //             }
    //         ]
    //     };
    // }
}
