// Centralized mock data — replace with real API calls once DB is ready

export const mockRentItems = [
  { id: 1, name: "DSLR Camera", price: "$8/day", category: "Devices", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", status: "Available" },
  { id: 2, name: "Electric Drill", price: "$3/day", category: "Tools", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80", status: "Available" },
  { id: 3, name: "Projector", price: "$10/day", category: "Devices", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80", status: "Available" },
  { id: 4, name: "Calculus Textbook", price: "$2/day", category: "Books", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80", status: "Available" },
  { id: 5, name: "Laptop Stand", price: "$1/day", category: "Accessories", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80", status: "Available" },
  { id: 6, name: "Bicycle", price: "$8/day", category: "Others", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80", status: "Available" },
  { id: 7, name: "Scientific Calculator", price: "$3/day", category: "Devices", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80", status: "Available" },
  { id: 8, name: "Mini Fridge", price: "$20/week", category: "Others", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80", status: "Available" },
];

export const mockBuyItems = [
  { id: 101, name: "Desk Lamp", price: "$12", category: "Accessories", image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&q=80" },
  { id: 102, name: "Mechanical Keyboard", price: "$35", category: "Devices", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&q=80" },
  { id: 103, name: "Monitor Stand", price: "$22", category: "Accessories", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80" },
  { id: 104, name: "USB Hub", price: "$15", category: "Devices", image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&q=80" },
  { id: 105, name: "Textbook Bundle", price: "$45", category: "Books", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80" },
  { id: 106, name: "Bluetooth Speaker", price: "$25", category: "Devices", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80" },
];

export const mockMyRentals = [
  { id: 201, name: "MacBook Pro 13\"", price: "$15/day", category: "Devices", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", status: "Available" },
  { id: 202, name: "Arduino Kit", price: "$4/day", category: "Devices", image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&q=80", status: "On Rent" },
  { id: 203, name: "Guitar", price: "$6/day", category: "Others", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80", status: "Available" },
  { id: 204, name: "Standing Desk", price: "$5/day", category: "Others", image: "https://images.unsplash.com/photo-1616627577385-5c0c4dab9fa5?w=400&q=80", status: "On Rent" },
];

export const mockMySaleItems = [
  { id: 301, name: "Bluetooth Speaker", price: "$25", category: "Devices", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80" },
  { id: 302, name: "Bike Lock", price: "$12", category: "Accessories", image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=80" },
  { id: 303, name: "Wifi Extender", price: "$18", category: "Devices", image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&q=80" },
];

export const mockMessages = [
  { id: 1, name: "Sarah M.", lastMessage: "Is the projector still available?", time: "2m ago", unread: true, avatar: "S" },
  { id: 2, name: "Alex K.", lastMessage: "Thanks! I'll pick it up tomorrow.", time: "1h ago", unread: false, avatar: "A" },
  { id: 3, name: "Jordan L.", lastMessage: "Can I rent the camera for 3 days?", time: "3h ago", unread: true, avatar: "J" },
  { id: 4, name: "Taylor R.", lastMessage: "The textbook is in great condition!", time: "Yesterday", unread: false, avatar: "T" },
];

export function getAllItems() {
  return [...mockRentItems, ...mockBuyItems];
}

export function getItemById(id) {
  const numId = Number(id);
  return getAllItems().find(item => item.id === numId)
    || mockMyRentals.find(item => item.id === numId)
    || mockMySaleItems.find(item => item.id === numId);
}
