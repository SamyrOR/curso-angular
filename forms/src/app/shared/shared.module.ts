import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { DropdownService } from './services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';

@NgModule({
  declarations: [FormDebugComponent, ErrorMsgComponent, InputFieldComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [FormDebugComponent, ErrorMsgComponent, InputFieldComponent],
  providers: [DropdownService],
})
export class SharedModule {}