import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ButtonClickComponent} from './button-click.component';
import {ArrayComponent} from './array.component';
import {BasetypeComponent} from './basetype.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonClickComponent,
    BasetypeComponent,
    ArrayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
