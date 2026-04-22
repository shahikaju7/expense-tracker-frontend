import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  expenses: any[] = [];
  loading = true;
  totalAmount = 0;
  thisMonthAmount = 0;
  totalCount = 0;

  // Exchange rates to INR
  exchangeRates: any = {
    '$': 83.5,
    '£': 106.0,
    '€': 90.0,
    '₹': 1.0
  };

  categories = [
    'Uncategorized', 'Food', 'Transport', 'Shopping',
    'Medical', 'Entertainment', 'Utilities', 'Other'
  ];

  constructor(
    private expenseService: ExpenseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadExpenses();
  }

  // Convert any currency amount to INR
  toINR(amount: string | number, currency: string): number {
    const rate = this.exchangeRates[currency] || 83.5;
    return parseFloat(amount as string) * rate;
  }

  loadExpenses() {
    this.loading = true;
    this.expenseService.getExpenses().subscribe({
      next: (res: any) => {
        this.expenses = res.expenses;
        this.totalCount = this.expenses.length;

        // Convert all amounts to INR for totals
        this.totalAmount = this.expenses.reduce(
          (sum: number, e: any) => sum + this.toINR(e.amount || 0, e.currency || '$'), 0
        );

        const thisMonth = new Date().getMonth();
        this.thisMonthAmount = this.expenses
          .filter((e: any) => new Date(e.created_at).getMonth() === thisMonth)
          .reduce((sum: number, e: any) => sum + this.toINR(e.amount || 0, e.currency || '$'), 0);

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateCategory(expense: any, event: any) {
    const category = event.target.value;
    this.expenseService.updateExpense(expense.id, {
      ...expense,
      category
    }).subscribe(() => {
      expense.category = category;
    });
  }

  deleteExpense(id: string) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id).subscribe(() => {
        this.expenses = this.expenses.filter(e => e.id !== id);
        this.loadExpenses();
      });
    }
  }

  getStatusColor(category: string): string {
    const colors: any = {
      'Food': '#10b981',
      'Transport': '#3b82f6',
      'Shopping': '#f59e0b',
      'Medical': '#ef4444',
      'Entertainment': '#8b5cf6',
      'Utilities': '#06b6d4',
      'Other': '#6b7280',
      'Uncategorized': '#94a3b8'
    };
    return colors[category] || '#94a3b8';
  }

  parseFloat(value: string): number {
    return parseFloat(value) || 0;
  }
}