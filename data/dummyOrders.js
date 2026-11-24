// data/dummyOrders.js
export const initialOrders = [
  {
    id: "VK250001",
    date: "23 Nov 2026, 04:30 PM",
    items: [
      { id: "prod-6", name: "Fresh Red Onions (Desi Ullipaya)", price: 30, qty: 1, weight: "1 kg", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80" },
      { id: "prod-10", name: "Fresh Broiler Chicken Curry Cut", price: 120, qty: 2, weight: "500 g", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80" },
      { id: "prod-15", name: "Rich Dutch Chocolate Truffle Cake", price: 380, qty: 1, weight: "500 grams", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80" }
    ],
    itemCount: 4,
    subtotal: 650,
    deliveryFee: 0,
    discount: 50,
    total: 600,
    status: "Delivered",
    statusStep: 5,
    deliveryAddress: {
      name: "Srinivas Reddy",
      village: "Peddapalli Village, Peddapalli Mandal",
      district: "Dist: Karimnagar - 505172",
      phone: "9876543210"
    },
    paymentMethod: "Cash on Delivery",
    timeline: [
      { step: "Order Placed", time: "04:30 PM", completed: true },
      { step: "Order Confirmed", time: "04:35 PM", completed: true },
      { step: "Preparing", time: "04:45 PM", completed: true },
      { step: "Out for Delivery", time: "05:05 PM", completed: true },
      { step: "Delivered", time: "05:25 PM", completed: true }
    ]
  },
  {
    id: "VK250000",
    date: "21 Nov 2026, 11:15 AM",
    items: [
      { id: "prod-1", name: "Tata Salt Vacuum Evaporated", price: 28, qty: 1, weight: "1 kg", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80" },
      { id: "prod-2", name: "Aashirvaad Shudh Chakki Atta", price: 220, qty: 1, weight: "5 kg", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80" },
      { id: "prod-7", name: "Farm Fresh Country Tomatoes", price: 40, qty: 1, weight: "1 kg", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80" }
    ],
    itemCount: 3,
    subtotal: 288,
    deliveryFee: 20,
    discount: 28,
    total: 280,
    status: "Delivered",
    statusStep: 5,
    deliveryAddress: {
      name: "Srinivas Reddy",
      village: "Peddapalli Village, Peddapalli Mandal",
      district: "Dist: Karimnagar - 505172",
      phone: "9876543210"
    },
    paymentMethod: "UPI (Google Pay Demo)",
    timeline: [
      { step: "Order Placed", time: "11:15 AM", completed: true },
      { step: "Order Confirmed", time: "11:20 AM", completed: true },
      { step: "Preparing", time: "11:30 AM", completed: true },
      { step: "Out for Delivery", time: "11:50 AM", completed: true },
      { step: "Delivered", time: "12:10 PM", completed: true }
    ]
  },
  {
    id: "VK249999",
    date: "18 Nov 2026, 09:00 AM",
    items: [
      { id: "prod-6", name: "Fresh Red Onions (Desi Ullipaya)", price: 30, qty: 1, weight: "1 kg", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80" },
      { id: "prod-7", name: "Farm Fresh Country Tomatoes", price: 40, qty: 1, weight: "1 kg", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80" },
      { id: "prod-10", name: "Fresh Broiler Chicken Curry Cut", price: 120, qty: 1, weight: "500 g", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80" }
    ],
    itemCount: 3,
    subtotal: 190,
    deliveryFee: 0,
    discount: 0,
    total: 190,
    status: "Delivered",
    statusStep: 5,
    deliveryAddress: {
      name: "Srinivas Reddy",
      village: "Peddapalli Village, Peddapalli Mandal",
      district: "Dist: Karimnagar - 505172",
      phone: "9876543210"
    },
    paymentMethod: "Cash on Delivery",
    timeline: [
      { step: "Order Placed", time: "09:00 AM", completed: true },
      { step: "Order Confirmed", time: "09:05 AM", completed: true },
      { step: "Preparing", time: "09:15 AM", completed: true },
      { step: "Out for Delivery", time: "09:35 AM", completed: true },
      { step: "Delivered", time: "09:55 AM", completed: true }
    ]
  }
];

export const activeLiveOrder = {
  id: "VK250002",
  date: "Today, 10:30 AM",
  items: [
    { id: "prod-6", name: "Fresh Red Onions (Desi Ullipaya)", price: 30, qty: 1, weight: "1 kg", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80" },
    { id: "prod-7", name: "Farm Fresh Country Tomatoes", price: 40, qty: 1, weight: "1 kg", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80" },
    { id: "prod-10", name: "Fresh Broiler Chicken Curry Cut", price: 120, qty: 1, weight: "500 g", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80" }
  ],
  itemCount: 3,
  subtotal: 190,
  deliveryFee: 0,
  total: 190,
  status: "Out for Delivery",
  estimatedDelivery: "Arriving in 15 mins",
  currentStepIndex: 3, // 0: Order Placed, 1: Order Confirmed, 2: Preparing, 3: Out for Delivery, 4: Delivered
  deliveryPartner: {
    name: "Ramesh Naik",
    phone: "+91 94412 88319",
    vehicle: "Hero Splendor (TS 02 AB 4591)",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  deliveryAddress: {
    name: "Srinivas Reddy",
    village: "Peddapalli Village, Peddapalli Mandal",
    district: "Dist: Karimnagar - 505xxx",
    phone: "9876543210"
  },
  steps: [
    { title: "Order Placed", time: "10:30 AM", active: true, done: true },
    { title: "Order Confirmed", time: "10:35 AM", active: true, done: true },
    { title: "Preparing", time: "11:00 AM", active: true, done: true },
    { title: "Out for Delivery", time: "11:30 AM", active: true, done: true, current: true },
    { title: "Delivered", time: "Estimated 12:00 PM", active: false, done: false }
  ]
};
