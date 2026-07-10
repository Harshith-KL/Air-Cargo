# Air-Cargo
This application is essentially a digital operations desk for an air freight team. It replaces stacks of paper forms, email chains, and disconnected spreadsheets with a single organised system where every shipment can be created, tracked, filtered, and managed all the way until the goods land safely at their destination.

Stage What it means
Draft Someone started filling in the booking but hasn't submitted it yet
Submitted The booking request has been sent to the airline for review
Confirmed The airline has accepted the booking and reserved space on the flight
In Transit The cargo has been loaded and is physically moving
Delivered The consignee has received the goods at the destination
Cancelled The shipment was called off
Creating a New Shipment
Clicking "New Shipment" opens a slide-over panel (called a drawer) with a 4-step wizard:

Step 1 — Shipment Details You describe what you're sending: the cargo description (e.g. "temperature-sensitive vaccines"), the commodity type (Electronics, Pharmaceuticals, Perishables, etc.), any special handling requirements (fragile, dangerous goods, live animals, temperature-controlled), and the origin and destination airports selected from a list of global airport codes.

Step 2 — Cargo Measurements You enter the number of pieces (boxes/pallets), the total gross weight in kilograms, and the dimensions (length × width × height in centimetres). The app automatically calculates the total volume in cubic metres — this matters because airlines charge based on whichever is greater: actual weight or "volumetric weight" (a formula that translates size into an equivalent weight).

Step 3 — Parties You fill in the Consignor (the shipper — company name, contact person, email) and the Consignee (the receiver — same fields). These are the two businesses at either end of the transaction.

Step 4 — Flight Preferences You pick a preferred departure date, choose an airline (Lufthansa, Emirates, Qatar Airways, etc.), and select a service level (Standard, Express, Priority). A summary box shows the full booking at a glance before you confirm.

You can either Save as Draft (come back to it later) or Submit Booking (send it off immediately).

The Shipment Details Panel
Clicking any shipment in the table opens a detailed side panel showing everything about that shipment. It has three tabs:

Overview — the route banner (showing origin and destination city names and the airline), plus all the detailed data: AWB number, weight, dimensions, shipper and consignee contacts, commodity, service level, and departure date. An AWB (Air Waybill) is the official document/contract number for a cargo shipment — think of it like a tracking number but with legal significance.
Timeline — a step-by-step history of the shipment's journey, showing when it was booked, confirmed, collected, departed, arrived, and delivered, with timestamps.
Documents — a place to upload and manage the paperwork that travels with the cargo (customs declarations, packing lists, certificates, etc.).
From this panel you can also duplicate a shipment (useful for repeat orders) or delete it (only allowed for Drafts and Cancelled shipments, to protect active ones from accidental deletion).

The Tweaks Panel
In the bottom-right corner is a small customisation panel (for the application designer) that lets you change the accent colour of the interface (the blue highlight colour used throughout) and switch between compact and comfortable layout densities — making rows tighter or more spacious depending on screen size or user preference.
