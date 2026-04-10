# Business Owner Dashboard - Component Architecture

## Overview

This is a professional, reusable dashboard system for the Accounting App. All components follow a **modular, re-usable design pattern** that allows you to use them anywhere in your application.

## Dashboard Structure

```
/app/dashboard/
├── layout.tsx                 # Dashboard layout (no navbar/footer)
├── page.tsx                   # Main dashboard
├── transactions/page.tsx      # Transactions management
├── income/page.tsx            # Income tracking
├── expenses/page.tsx          # Expense management
├── ledger/page.tsx            # General ledger
├── reports/page.tsx           # Reports and statements
└── settings/page.tsx          # Account settings

/app/components/dashboard/
├── Sidebar.tsx                # Collapsible sidebar navigation
├── DashboardHeader.tsx         # Dashboard header with controls
├── StatCard.tsx               # Reusable stat card component
├── DataTable.tsx              # Powerful generic data table
├── TransactionCard.tsx        # Transaction display card
├── SimpleChart.tsx            # Bar and pie charts
├── SummaryCard.tsx            # Summary information display
└── QuickActionButton.tsx      # Quick action buttons
```

## Reusable Components

### 1. **StatCard**
Display key statistics with optional trends and icons.

```tsx
import StatCard from '@/app/components/dashboard/StatCard';

<StatCard
  title="Total Income"
  value="$28,450.00"
  description="This month"
  icon={TrendingUp}
  variant="success"
  trend={{ value: 12, isPositive: true }}
/>
```

**Props:**
- `title` (string): Card title
- `value` (string | number): Main value to display
- `description` (string, optional): Subtitle
- `icon` (LucideIcon, optional): Icon to display
- `trend` (object, optional): `{ value: number, isPositive: boolean }`
- `variant` ('primary' | 'success' | 'warning' | 'danger'): Color scheme
- `onClick` (function, optional): Click handler

---

### 2. **DataTable**
Generic, searchable, paginated table component.

```tsx
import DataTable from '@/app/components/dashboard/DataTable';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  status: 'Completed' | 'Pending';
}

<DataTable<Transaction>
  title="Transactions"
  description="All your transactions"
  data={transactionData}
  columns={[
    { key: 'date', label: 'Date' },
    { key: 'description', label: 'Description' },
    {
      key: 'amount',
      label: 'Amount',
      align: 'right',
      render: (value) => `$${value.toFixed(2)}`
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={value === 'Completed' ? 'text-green-600' : 'text-amber-600'}>
          {value}
        </span>
      )
    }
  ]}
  searchable={true}
  pagination={true}
  itemsPerPage={10}
  onRowClick={(row) => console.log(row)}
/>
```

**Props:**
- `data` (Array): Array of objects to display
- `columns` (Array): Column configuration
  - `key`: Data key
  - `label`: Column header
  - `render`: Custom render function
  - `align`: 'left' | 'center' | 'right'
  - `width`: Tailwind width class
- `title` (string, optional): Table title
- `description` (string, optional): Subtitle
- `searchable` (boolean, default: true): Show search input
- `pagination` (boolean, default: true): Enable pagination
- `itemsPerPage` (number, default: 10): Items per page
- `onRowClick` (function, optional): Row click handler
- `onSearch` (function, optional): Search handler

---

### 3. **SimpleChart**
Bar and pie charts for data visualization.

```tsx
import SimpleChart from '@/app/components/dashboard/SimpleChart';

<SimpleChart
  title="Monthly Income"
  description="Income trend for the past 6 months"
  data={[
    { label: 'Jan', value: 12500 },
    { label: 'Feb', value: 15800 },
    { label: 'Mar', value: 14200 },
  ]}
  type="bar"
  height="h-64"
/>
```

**Props:**
- `data` (Array): `[{ label: string, value: number, color?: string }]`
- `type` ('bar' | 'pie'): Chart type
- `title` (string, optional): Chart title
- `description` (string, optional): Chart subtitle
- `height` (string): Tailwind height class (default: 'h-64')

---

### 4. **TransactionCard**
Display individual transactions with type indicators.

```tsx
import TransactionCard from '@/app/components/dashboard/TransactionCard';

<TransactionCard
  icon={ArrowUpRight}
  category="Client Invoice"
  description="Payment for Project #12"
  amount={1200}
  date="Today"
  type="income"
  onClick={() => handleViewDetail()}
/>
```

**Props:**
- `icon` (LucideIcon): Lucide icon component
- `category` (string): Transaction category
- `description` (string): Transaction description
- `amount` (number): Transaction amount
- `date` (string): Transaction date
- `type` ('income' | 'expense'): Transaction type
- `onClick` (function, optional): Click handler

---

### 5. **SummaryCard**
Display key information in a list format.

```tsx
import SummaryCard from '@/app/components/dashboard/SummaryCard';

<SummaryCard
  title="Financial Summary"
  items={[
    { label: 'Gross Income', value: '$28,450.00', color: 'text-green-600' },
    { label: 'Total Expenses', value: '$8,240.00', color: 'text-red-600' },
    { label: 'Net Profit', value: '$20,210.00', color: 'text-emerald-600' },
  ]}
  footer="Updated today at 2:30 PM"
/>
```

**Props:**
- `title` (string): Card title
- `items` (Array): Summary items
  - `label` (string): Item label
  - `value` (string | number): Item value
  - `color` (string, optional): Text color class
- `footer` (string, optional): Footer text

---

### 6. **QuickActionButton**
Primary action button with icon and description.

```tsx
import QuickActionButton from '@/app/components/dashboard/QuickActionButton';

<QuickActionButton
  icon={Plus}
  label="New Transaction"
  description="Record a new transaction"
  variant="primary"
  onClick={() => handleNewTransaction()}
/>
```

**Props:**
- `icon` (LucideIcon): Button icon
- `label` (string): Button label
- `description` (string, optional): Button description
- `variant` ('primary' | 'secondary'): Button style
- `onClick` (function, optional): Click handler

---

### 7. **Sidebar**
Collapsible sidebar navigation.

```tsx
// Already integrated in dashboard/layout.tsx
// Accessible from any dashboard page
```

**Features:**
- Collapsible/expandable
- Active route highlighting
- Icons with labels
- Settings and Logout options
- Green/white color scheme

---

### 8. **DashboardHeader**
Dashboard page header with controls.

```tsx
// Already integrated in dashboard/layout.tsx
// Shows current date, notifications, user profile
```

---

## Usage Examples

### Creating a New Dashboard Page

```tsx
'use client';

import React from 'react';
import StatCard from '@/app/components/dashboard/StatCard';
import DataTable from '@/app/components/dashboard/DataTable';
import { TrendingUp } from 'lucide-react';

export default function NewPage() {
  const data = [
    { id: 1, name: 'Item 1', value: 100, status: 'Active' },
    { id: 2, name: 'Item 2', value: 200, status: 'Inactive' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">New Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Metric 1"
          value="1,234"
          variant="primary"
          icon={TrendingUp}
        />
      </div>

      <DataTable
        title="Data"
        data={data}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'value', label: 'Value', align: 'right' },
          { key: 'status', label: 'Status' },
        ]}
      />
    </div>
  );
}
```

---

## Color Scheme & Variants

All components use consistent color variants:

- **primary** (Blue): General information
- **success** (Emerald/Green): Positive data, income
- **warning** (Amber): Caution data, pending items
- **danger** (Red): Negative data, expenses, errors

The theme preserves your brand colors:
- Primary Green: `green-900`, `green-500`, `green-600`
- Slate/Dark: `slate-900`, `slate-700`, `slate-600`
- Accent: `emerald-600`, `teal-500`

---

## Key Features

✅ **Fully Reusable** - Use components anywhere in your app
✅ **Type-Safe** - Full TypeScript support
✅ **Responsive** - Mobile, tablet, and desktop layouts
✅ **Accessible** - Semantic HTML and ARIA labels
✅ **Consistent Design** - Unified color and spacing
✅ **Easy Customization** - Props for styling and behavior
✅ **Search & Filter** - Built-in table search
✅ **Pagination** - Automatic table pagination
✅ **Icons** - Lucide React icons integrated

---

## Layout Notes

### Dashboard Layout (`/app/dashboard/layout.tsx`)
- **No navbar or footer** - Clean dashboard UX
- **Sidebar with toggle** - Expandable/collapsible
- **Header with controls** - Date, notifications, user
- **Main content area** - Scrollable, full-width

### Main App Layout (`/app/layout.tsx`)
- **Includes navbar and footer** - For public pages
- **Use for marketing pages** - Home, About, Contact, etc.

---

## Next Steps

1. **Extend Components**: Add more features as needed (filters, exports, etc.)
2. **Create Forms**: Build form pages for transactions/invoices
3. **Add Authentication**: Integrate user auth and permissions
4. **Database Integration**: Connect to backend API
5. **Add Admin Dashboard**: Mirror for admin users
6. **Mobile App**: Use same components for mobile

---

## File Structure Summary

```
✓ Dashboard layout (separate from main app)
✓ 8+ reusable components
✓ 5 main dashboard pages (Dashboard, Transactions, Income, Expenses, Ledger)
✓ Reports and Settings pages
✓ Collapsible sidebar with navigation
✓ Header with user profile and notifications
✓ Consistent green/slate/white theme
✓ TypeScript support throughout
✓ Professional, production-ready code
```

---

**Built with**: Next.js 16, React 19, Tailwind CSS 4, Lucide React Icons

**Version**: 1.0.0
