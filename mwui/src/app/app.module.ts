import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HelloComponent } from './hello/hello.component';
import { CounterComponent } from './counter/counter.component';
import { CFormatPipe } from './c-format.pipe';
import { HlDirective } from './hl.directive';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchComponent } from './search/search.component';
import { RxDemoComponent } from './rx-demo/rx-demo.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChildAComponent } from './child-a/child-a.component';
import { ChildBComponent } from './child-b/child-b.component';
import { MwpageComponent } from './mwpage/mwpage.component';
import { HeaderInterceptorService } from './header-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    CounterComponent,
    CFormatPipe,
    HlDirective,
    SearchComponent,
    RxDemoComponent,
    ChildAComponent,
    ChildBComponent,
    MwpageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule, 

    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
