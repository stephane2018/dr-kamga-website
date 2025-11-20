# Admin Dashboard Tab Navigation

## Overview
The admin dashboard now supports URL-based tab navigation, allowing you to link directly to specific tabs using query parameters.

## How to Use

### Direct Links
You can now navigate to specific tabs using the `?tab=` query parameter:

```
/admin/dashboard?tab=masterclass
/admin/dashboard?tab=seminaires
/admin/dashboard?tab=appointments
/admin/dashboard?tab=newsletter
/admin/dashboard?tab=axis-cards    (admin only)
/admin/dashboard?tab=users          (admin only)
```

### Examples

#### From Navigation Menu
The navigation menu already has a link to `/admin/dashboard`. You can modify it to link to a specific tab:

```tsx
<Link href="/admin/dashboard?tab=axis-cards">
  Manage Axis Cards
</Link>
```

#### From Email or External Links
You can share direct links to specific admin sections:
- **Masterclass Management**: `https://yoursite.com/admin/dashboard?tab=masterclass`
- **Axis Cards Management**: `https://yoursite.com/admin/dashboard?tab=axis-cards`
- **User Management**: `https://yoursite.com/admin/dashboard?tab=users`

#### Programmatic Navigation
```tsx
import { useRouter } from 'next/navigation'

const router = useRouter()
router.push('/admin/dashboard?tab=axis-cards')
```

## Features

### URL Synchronization
- The URL updates automatically when you click on tabs
- The active tab is preserved in the browser history
- You can use browser back/forward buttons to navigate between tabs

### Permission Checking
- Admin-only tabs (`axis-cards` and `users`) are automatically protected
- Non-admin users trying to access these tabs via URL will be denied

### Default Behavior
- If no `?tab=` parameter is provided, the dashboard defaults to the "masterclass" tab
- Invalid tab names are ignored and default to "masterclass"

## Implementation Details

The dashboard uses:
- `useSearchParams()` to read the URL parameter
- `useRouter()` to update the URL when tabs change
- `useEffect()` to sync the active tab with the URL on page load
- Permission checks to ensure admin-only tabs are protected

## Available Tabs

| Tab Name | Access Level | Description |
|----------|-------------|-------------|
| `masterclass` | All authenticated users | Manage masterclass sessions |
| `seminaires` | All authenticated users | Manage seminars |
| `appointments` | All authenticated users | Manage appointments |
| `newsletter` | All authenticated users | Manage newsletter subscriptions |
| `axis-cards` | **Admin only** | Manage axis cards for the masterclass page |
| `users` | **Admin only** | Manage user accounts |
