# AI Development Rules – Next.js React Project

## Project Overview

This project is a **Next.js React application** built using a **feature-based architecture**.
The goal is to maintain **clean, scalable, and maintainable code** following modern React and frontend best practices.

AI assistants must strictly follow these rules when generating or modifying code.

---

# 1. Architecture Rules

The project follows **Feature-Based Modular Architecture**.

```
src
 ├ app
 │   ├ router
 │   └ providers
 │
 ├ features
 │   ├ auth
 │   │   ├ components
 │   │   ├ hooks
 │   │   ├ services
 │   │   ├ store
 │   │   └ authSlice.js
 │
 │   ├ dashboard
 │   │   ├ components
 │   │   ├ pages
 │   │   └ services
 │
 ├ components
 │   ├ ui
 │   └ common
 │
 ├ hooks
 ├ services
 ├ utils
 ├ constants
 ├ assets
 └ styles
```

### Feature Folder Rules

Each feature must contain only logic related to that feature.

Example:

```
features/
   booking/
      components/
      hooks/
      services/
      store/
      pages/
```

Do not mix logic between features.

---

# 2. Component Rules

### Component Types

Use these categories:

**UI Components**

Reusable design elements.

Location:

```
src/components/ui
```

Examples:

* Button
* Input
* Modal
* Card

These must be **pure and reusable**.

---

**Common Components**

Shared business components.

Location:

```
src/components/common
```

Examples:

* Navbar
* Footer
* Layout
* Sidebar

---

**Feature Components**

Feature-specific components.

Location:

```
src/features/{featureName}/components
```

Example:

```
features/booking/components/BookingForm.jsx
```

---

# 3. File Naming Conventions

Use consistent naming:

| Type      | Format              |
| --------- | ------------------- |
| Component | `PascalCase.jsx`    |
| Hook      | `useHookName.js`    |
| Service   | `featureService.js` |
| Store     | `featureSlice.js`   |
| Utility   | `camelCase.js`      |
| Constants | `UPPER_CASE.js`     |

Example:

```
DrivingLessonCard.jsx
useBooking.js
bookingService.js
bookingSlice.js
dateFormatter.js
API_ENDPOINTS.js
```

---

# 4. React Component Guidelines

AI must follow these practices:

* Use **functional components only**
* Use **React hooks**
* Avoid class components
* Keep components **small and reusable**
* Extract logic into hooks when possible

Example structure:

```jsx
import React from "react";

const BookingCard = ({ lesson }) => {
  return (
    <div>
      <h3>{lesson.title}</h3>
    </div>
  );
};

export default BookingCard;
```

---

# 5. Hooks Rules

Hooks should contain reusable logic.

Location:

```
src/hooks
```

Feature-specific hooks:

```
src/features/{feature}/hooks
```

Naming:

```
useAuth
useBooking
useLessons
```

Rules:

* Hooks must start with `use`
* Avoid side effects outside hooks
* Separate API logic from hooks

---

# 6. API & Services Rules

All API calls must go inside **services**.

Never call APIs directly inside components.

Location:

```
src/services
```

or feature services:

```
src/features/{feature}/services
```

Example:

```js
import axios from "axios";

export const getLessons = async () => {
  const res = await axios.get("/api/lessons");
  return res.data;
};
```

---

# 7. State Management Rules

State must be separated properly.

Local UI state → `useState`

Global state → Store

Feature store location:

```
src/features/{feature}/store
```

Example:

```
authSlice.js
bookingSlice.js
```

---

# 8. Styling Rules

Styling must follow one consistent approach.

Preferred order:

1. Tailwind CSS
2. CSS Modules
3. Global styles

Global styles location:

```
src/styles
```

Never use inline styles unless necessary.

---

# 9. Constants Rules

All constant values must be stored in:

```
src/constants
```

Examples:

```
API_ROUTES.js
APP_CONFIG.js
USER_ROLES.js
```

Avoid hardcoding values inside components.

---

# 10. Utility Functions

Reusable helper functions go in:

```
src/utils
```

Examples:

```
formatDate.js
calculatePrice.js
validateEmail.js
```

Utilities must be **pure functions**.

---

# 11. Performance Rules

AI must ensure:

* Use `React.memo` for heavy components
* Use `useCallback` for handlers
* Use `useMemo` for expensive calculations
* Avoid unnecessary re-renders

---

# 12. Import Order

Imports must follow this order:

```
1. React / Next libraries
2. Third party libraries
3. Absolute imports
4. Feature imports
5. Local imports
6. Styles
```

Example:

```js
import React from "react";
import axios from "axios";

import Button from "@/components/ui/Button";
import useAuth from "@/features/auth/hooks/useAuth";

import "./styles.css";
```

---

# 13. Error Handling

All async operations must include error handling.

Example:

```js
try {
  const data = await getLessons();
} catch (error) {
  console.error(error);
}
```

---

# 14. Code Quality Rules

AI must ensure:

* No unused variables
* No console logs in production
* Clean readable code
* Small focused functions
* Avoid duplicate logic

---

# 15. Security Rules

AI must never:

* Expose API keys
* Store secrets in frontend
* Trust client inputs

Use environment variables.

```
.env.local
```

Example:

```
NEXT_PUBLIC_API_URL
```

---

# 16. Accessibility Rules

Components must support accessibility:

* Use semantic HTML
* Include `aria` attributes when needed
* Support keyboard navigation

---

# 17. Next.js Rules

Follow Next.js best practices:

* Use **Server Components when possible**
* Use **Client Components only when necessary**
* Use **app router conventions**
* Use **dynamic routes properly**

Example:

```
app/dashboard/page.jsx
app/lessons/[id]/page.jsx
```

---

# 18. AI Restrictions

AI must NOT:

* Create unnecessary folders
* Add unused dependencies
* Modify project structure
* Write overly complex logic
* Create test files unless explicitly requested

---

# 19. Code Philosophy

This project prioritizes:

* Simplicity
* Readability
* Maintainability
* Scalability
* Clean architecture

AI must always prefer **simple solutions over complex ones**.

---

# 20. Driving School Domain Notes

This application may include modules like:

* Student Registration
* Driving Lesson Booking
* Instructor Management
* Payment Handling
* Lesson Scheduling
* Dashboard Analytics

AI should organize these inside **separate features**.

Example:

```
features
   students
   instructors
   booking
   payments
   dashboard
```

---

# End of Rules

All AI generated code must strictly follow this document.
