import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class StatsComponent implements OnInit {
  stats: any = null;
  loading = true;
  categoryEntries: any[] = [];
  totalInINR = 0;

  // Exchange rates to INR
  exchangeRates: any = {
    '$': 83.5,
    '£': 106.0,
    '€': 90.0,
    '₹': 1.0
  };

  constructor(
    private expenseService: ExpenseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Load stats AND expenses together
    this.expenseService.getExpenses().subscribe({
      next: (expRes: any) => {
        const expenses = expRes.expenses || [];

        // Convert all to INR
        this.totalInINR = expenses.reduce((sum: number, e: any) => {
          const rate = this.exchangeRates[e.currency || '$'] || 83.5;
          return sum + (parseFloat(e.amount || 0) * rate);
        }, 0);

        // Build category totals in INR
        const categoryMap: any = {};
        expenses.forEach((e: any) => {
          const rate = this.exchangeRates[e.currency || '$'] || 83.5;
          const amountINR = parseFloat(e.amount || 0) * rate;
          const cat = e.category || 'Uncategorized';
          categoryMap[cat] = (categoryMap[cat] || 0) + amountINR;
        });

        this.stats = {
          total_expenses: this.totalInINR,
          total_count: expenses.length,
          by_category: categoryMap
        };

        this.categoryEntries = Object.entries(categoryMap)
          .map(([name, amount]) => ({ name, amount }))
          .sort((a: any, b: any) => (b.amount as number) - (a.amount as number));

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Stats error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getBarWidth(amount: number): string {
    if (!this.categoryEntries.length) return '0%';
    const max = Math.max(...this.categoryEntries.map((c: any) => c.amount));
    return Math.round((amount / max) * 100) + '%';
  }

  getCategoryColor(category: string): string {
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
}