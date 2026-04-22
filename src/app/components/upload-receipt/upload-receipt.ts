import { Component, ChangeDetectorRef } from '@angular/core';  // ← Add ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-upload-receipt',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './upload-receipt.html',
  styleUrl: './upload-receipt.css'
})
export class UploadReceiptComponent {
  selectedFile: File | null = null;
  preview: string | null = null;
  uploading = false;
  result: any = null;
  error: string | null = null;

  constructor(
    private expenseService: ExpenseService,
    private cdr: ChangeDetectorRef   // ← Add this
  ) {}

  

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.result = null;
      this.error = null;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadReceipt() {
    if (!this.selectedFile) return;
    this.uploading = true;
    this.error = null;
    this.expenseService.uploadReceipt(this.selectedFile).subscribe({
      next: (res: any) => {
        this.result = res.expense;
        this.uploading = false;
        this.cdr.detectChanges();   // ← Add this
      },
      error: (err) => {
        this.error = 'Failed to process receipt. Please try again.';
        this.uploading = false;
        this.cdr.detectChanges();   // ← Add this
      }
    });
  }

  reset() {
    this.selectedFile = null;
    this.preview = null;
    this.result = null;
    this.error = null;
  }
}