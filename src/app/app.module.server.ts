import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module'; // Update the path if needed
import { AppComponent } from './app.component'; // Update the path if needed

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent], // Bootstrap the AppComponent
})
export class AppServerModule {}
