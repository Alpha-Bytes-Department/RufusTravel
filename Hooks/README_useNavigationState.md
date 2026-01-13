# useNavigationState Hook - Usage Guide

## Overview

The `useNavigationState` hook allows you to navigate between pages while passing complex state data (objects, arrays, etc.) without cluttering the URL or dealing with encoding issues.

---

## 🚀 How to Navigate WITH State

### Step 1: Import the hook and types

```typescript
import { useNavigationState } from "@/Hooks/useNavigationState";
import { FlightSearchState } from "@/Types/Navigation/Navigation.types";
```

### Step 2: Use the hook in your component

```typescript
const MyComponent = () => {
  const { navigateWithState } = useNavigationState();

  // Your state/data
  const myData = {
    from: "New York",
    to: "London",
    date: "2026-01-15",
    passengers: 2,
  };

  // Navigate with state
  const handleNavigate = () => {
    navigateWithState("/destination-page", myData);
  };

  return <button onClick={handleNavigate}>Go to Page</button>;
};
```

---

## 📥 How to RECEIVE State on Destination Page

### Step 1: Import the hook and types

```typescript
import { useNavigationState } from "@/Hooks/useNavigationState";
import { FlightSearchState } from "@/Types/Navigation/Navigation.types";
```

### Step 2: Get the state

```typescript
const DestinationPage = () => {
  const { getState } = useNavigationState();

  // Retrieve the state (with type safety)
  const receivedData = getState<FlightSearchState>();

  // Check if data exists
  if (!receivedData) {
    return <div>No search data found</div>;
  }

  // Use the data
  return (
    <div>
      <p>From: {receivedData.from}</p>
      <p>To: {receivedData.to}</p>
      <p>Date: {receivedData.journeyDate}</p>
    </div>
  );
};
```

---

## 📋 Real Example: Flight Search

### Sending Page (FlightSearchForm.tsx)

```typescript
import { useNavigationState } from "@/Hooks/useNavigationState";
import { FlightSearchState } from "@/Types/Navigation/Navigation.types";

const FlightSearchForm = () => {
  const { navigateWithState } = useNavigationState();

  const onSubmit = (data: FlightFormData) => {
    // Prepare your state
    const flightData: FlightSearchState = {
      tripType: "roundTrip",
      from: "New York",
      to: "London",
      journeyDate: "2026-01-15",
      returnDate: "2026-01-22",
      travelers: {
        adults: 2,
        children: 0,
        infants: 0,
      },
      class: "Economy",
    };

    // Navigate with state
    navigateWithState("/bookings", flightData);
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Your form fields */}
      <button type="submit">Search Flights</button>
    </form>
  );
};
```

### Receiving Page (Bookings.tsx)

```typescript
import { useNavigationState } from "@/Hooks/useNavigationState";
import { FlightSearchState } from "@/Types/Navigation/Navigation.types";

const Bookings = () => {
  const { getState } = useNavigationState();

  // Get the flight search data
  const searchData = getState<FlightSearchState>();

  console.log("Search Data:", searchData);

  // Handle case where no data exists
  if (!searchData) {
    return <div>Please search for flights first</div>;
  }

  // Use the data to filter/display flights
  return (
    <div>
      <h1>Flight Results</h1>
      <p>
        Route: {searchData.from} → {searchData.to}
      </p>
      <p>Date: {searchData.journeyDate}</p>
      <p>Passengers: {searchData.travelers.adults} adults</p>

      {/* Display filtered flights based on searchData */}
    </div>
  );
};
```

---

## 🎯 Multiple Use Cases

### Example 1: Car Rental Search

```typescript
// From Car Search Form
const { navigateWithState } = useNavigationState();

const carSearchData: CarSearchState = {
  pickupLocation: "New York Airport",
  dropoffLocation: "Boston",
  pickupDate: "2026-01-15",
  dropoffDate: "2026-01-20",
  carType: "SUV",
};

navigateWithState("/car-bookings", carSearchData);

// In Car Bookings Page
const { getState } = useNavigationState();
const carData = getState<CarSearchState>();
```

### Example 2: Tour Booking

```typescript
// From Tour Card (already implemented in your Explore.tsx)
const handleBookNow = (id: string) => {
  const tour = tours.find((t) => t.id === id);

  const bookingData: TourBookingState = {
    tourId: tour.id,
    tourTitle: tour.title,
    tourImage: tour.image,
    price: tour.price,
    currency: "BDT",
    // ... more data
  };

  navigateWithState(`/tour/booking/${tour.id}`, bookingData);
};

// In Tour Booking Page
const { getState } = useNavigationState();
const tourData = getState<TourBookingState>();
```

### Example 3: Hotel Search

```typescript
// From Hotel Search Form
const hotelData: HotelSearchState = {
  destination: "Paris",
  checkIn: "2026-02-10",
  checkOut: "2026-02-15",
  guests: {
    adults: 2,
    children: 1,
  },
  rooms: 1,
};

navigateWithState("/hotel-results", hotelData);

// In Hotel Results Page
const { getState } = useNavigationState();
const hotelSearch = getState<HotelSearchState>();
```

---

## 🛡️ Type Safety

Define your types in `Types/Navigation/Navigation.types.ts`:

```typescript
export interface FlightSearchState {
  tripType: "oneWay" | "roundTrip" | "multiWay";
  from: string;
  to: string;
  journeyDate: string;
  returnDate?: string;
  travelers: {
    adults: number;
    children: number;
    infants: number;
  };
  class: string;
}

export interface CarSearchState {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  carType?: string;
}
```

Then use them with `getState<YourType>()` for full TypeScript autocomplete and type checking!

---

## 🧹 Clearing State (Optional)

If you want to clear the state after using it:

```typescript
const { getState, clearState } = useNavigationState();

const data = getState<FlightSearchState>();

// Use the data...

// Clear it when done
clearState();
```

---

## ✅ Key Benefits

1. **Clean URLs** - No messy query parameters
2. **Type Safe** - Full TypeScript support
3. **Complex Data** - Pass objects, arrays, nested data
4. **Reusable** - Works from any page to any page
5. **No Encoding** - Handles serialization automatically

---

## 🔍 How It Works Behind the Scenes

1. When you call `navigateWithState(path, state)`:

   - Creates a unique navigation ID
   - Stores state in sessionStorage with that ID
   - Navigates to the page with `?navId=xxx` in URL

2. When destination page loads:

   - Reads the `navId` from URL
   - Retrieves state from sessionStorage
   - Returns the state via `getState()`

3. State persists in sessionStorage until:
   - You call `clearState()`
   - User closes the tab
   - Session ends

---

## 📌 Quick Reference

```typescript
// Send state
const { navigateWithState } = useNavigationState();
navigateWithState("/path", yourData);

// Receive state
const { getState } = useNavigationState();
const data = getState<YourType>();

// Clear state (optional)
const { clearState } = useNavigationState();
clearState();
```
