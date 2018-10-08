import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetaRoutingModule } from "./meta-routing.module";
import { PrivacyComponent } from './privacy/privacy.component';
import { NgxEditorModule } from 'ngx-editor';
import { TermsComponent } from './terms/terms.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MetaRoutingModule,
        NgxEditorModule,
        
    ],
    declarations: [
        PrivacyComponent,
        TermsComponent,
    ]
})
export class MetaModule { }
