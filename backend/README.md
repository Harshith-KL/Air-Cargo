# Manifest: Air Cargo Dashboard

## What is Air Cargo?

Before diving into the app: air cargo is simply the business of shipping physical goods by airplane — think of it like FedEx or DHL but at a larger, commercial scale. A company in Bangalore might want to ship electronics to Frankfurt. They book space on a flight, hand over the boxes to the airline at the airport, and the goods travel in the belly of a passenger plane (or a dedicated cargo plane) to reach the buyer on the other side of the world.

Every shipment involves two key parties: the **shipper** (the company sending the goods) and the **consignee** (the company receiving them). The whole process generates a lot of paperwork and needs careful tracking — which is exactly what this application manages.

---

## What Does This Application Do?

This is called **Manifest**, an Air Cargo Dashboard — a digital command centre used by a freight forwarder or cargo agent to manage all their shipments in one place. Think of it as a very specialised spreadsheet that comes alive with real-time tracking, actions, and summaries.

---

## The Layout: What You See

The screen is divided into three zones:

**1. The Sidebar (left column)**
A navigation menu with links to different sections: Dashboard, Shipments, Analytics, Schedule, Documents, Reports, and Settings. The currently active section is highlighted in blue. At the bottom is a logged-in user profile.

**2. The Top Bar**
A search box runs across the top. You can type a shipment number, company name, airport code, or cargo type and the list filters instantly. There are also buttons to create a new shipment and a notification bell for alerts.

**3. The Main Content Area**
This changes depending on which page you're on. The two active pages are the Dashboard and the Shipments list.

---

## The Dashboard Page

This is the home screen — a bird's-eye view of everything happening right now.

### Stat Cards

At the top are five cards, each showing a count and a small trend graph (called a sparkline):

- **Active Shipments** — how many shipments are currently in motion (not yet delivered or cancelled)
- **Pending Bookings** — shipments that have been created but not yet confirmed (in Draft or Submitted state)
- **Confirmed** — bookings the airline has accepted
- **In Transit** — cargo that's physically in the air or moving between airports right now
- **Delivered** — shipments that have successfully reached their destination

Each card shows whether the number is trending up or down compared to recent history. Clicking a card filters the shipment table below to show only that category.

### Shipment Table (Recent Shipments)

Below the stat cards is a table listing recent shipments. Each row shows: the shipment reference number, the route (e.g. BLR → FRA, meaning Bangalore to Frankfurt), who the shipper and consignee are, the cargo type, weight, number of boxes, departure date, and the current status shown as a coloured badge. Clicking any row opens a detailed side panel.

### The Right Rail

Two smaller panels sit to the right of the table:

- **Status Pipeline** — a coloured bar chart showing how many shipments are in each stage of their journey
- **Upcoming Departures** — a list of flights that are about to depart, so the team can prioritise last-minute actions

---

## The Shipments Page

This is the full, detailed list of every shipment in the system — past, present, and future. It has more powerful filtering tools:

- Filter by status (Draft, Submitted, Confirmed, In Transit, Delivered, Cancelled)
- Filter by origin airport or destination airport
- Filter by service level (Standard, Express, etc.)
- Filter by a departure date range
- Sort any column by clicking its header

You can also select multiple shipments using checkboxes and perform bulk actions like Export or Delete. Each row has a three-dot menu for per-shipment actions: view details, edit, duplicate, or delete.

---

## The Lifecycle of a Shipment

Every shipment moves through a fixed set of stages, shown as coloured status badges:

| Stage | What it means |
|-------|---------------|
| **Draft** | Someone started filling in the booking but hasn't submitted it yet |
| **Submitted** | The booking request has been sent to the airline for review |
| **Confirmed** | The airline has accepted the booking and reserved space on the flight |
| **In Transit** | The cargo has been loaded and is physically moving |
| **Delivered** | The consignee has received the goods at the destination |
| **Cancelled** | The shipment was called off |

---

## Creating a New Shipment

Clicking "New Shipment" opens a slide-over panel (called a drawer) with a 4-step wizard:

**Step 1 — Shipment Details**
You describe what you're sending: the cargo description (e.g. "temperature-sensitive vaccines"), the commodity type (Electronics, Pharmaceuticals, Perishables, etc.), any special handling requirements (fragile, dangerous goods, live animals, temperature-controlled), and the origin and destination airports selected from a list of global airport codes.

**Step 2 — Cargo Measurements**
You enter the number of pieces (boxes/pallets), the total gross weight in kilograms, and the dimensions (length × width × height in centimetres). The app automatically calculates the total volume in cubic metres — this matters because airlines charge based on whichever is greater: actual weight or "volumetric weight" (a formula that translates size into an equivalent weight).

**Step 3 — Parties**
You fill in the Consignor (the shipper — company name, contact person, email) and the Consignee (the receiver — same fields). These are the two businesses at either end of the transaction.

**Step 4 — Flight Preferences**
You pick a preferred departure date, choose an airline (Lufthansa, Emirates, Qatar Airways, etc.), and select a service level (Standard, Express, Priority). A summary box shows the full booking at a glance before you confirm.

You can either **Save as Draft** (come back to it later) or **Submit Booking** (send it off immediately).

---

## The Shipment Details Panel

Clicking any shipment in the table opens a detailed side panel showing everything about that shipment. It has three tabs:

- **Overview** — the route banner (showing origin and destination city names and the airline), plus all the detailed data: AWB number, weight, dimensions, shipper and consignee contacts, commodity, service level, and departure date. An AWB (Air Waybill) is the official document/contract number for a cargo shipment — think of it like a tracking number but with legal significance.
- **Timeline** — a step-by-step history of the shipment's journey, showing when it was booked, confirmed, collected, departed, arrived, and delivered, with timestamps.
- **Documents** — a place to upload and manage the paperwork that travels with the cargo (customs declarations, packing lists, certificates, etc.).

From this panel you can also **duplicate** a shipment (useful for repeat orders) or **delete** it (only allowed for Drafts and Cancelled shipments, to protect active ones from accidental deletion).

---

## The Tweaks Panel

In the bottom-right corner is a small customisation panel (for the application designer) that lets you change the accent colour of the interface (the blue highlight colour used throughout) and switch between compact and comfortable layout densities — making rows tighter or more spacious depending on screen size or user preference.

---

## Summary

This application is essentially a digital operations desk for an air freight team. It replaces stacks of paper forms, email chains, and disconnected spreadsheets with a single organised system where every shipment can be created, tracked, filtered, and managed — from the moment a customer asks "can you ship this?" all the way until the goods land safely at their destination.
