// data/categories.js
export const categories = [
  {
    id: "all",
    name: "All Items",
    slug: "all",
    icon: "🛍️",
    subCategories: ["All Products"]
  },
  {
    id: "groceries",
    name: "Groceries",
    slug: "groceries",
    startingPrice: 20,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    icon: "🌾",
    description: "Daily essentials, rice, flour, pulses, spices & cooking oils",
    subCategories: ["Rice & Grains", "Pulses & Dal", "Oils & Ghee", "Spices & Masala", "Salt & Sugar"]
  },
  {
    id: "vegetables",
    name: "Vegetables & Fruits",
    slug: "vegetables",
    startingPrice: 15,
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80",
    icon: "🥦",
    description: "Farm-fresh vegetables and naturally ripened seasonal fruits",
    subCategories: ["Daily Veggies", "Leafy Greens", "Fresh Fruits", "Tubers & Roots", "Organic Produce"]
  },
  {
    id: "non-veg",
    name: "Non-Veg",
    slug: "non-veg",
    startingPrice: 80,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80",
    icon: "🍗",
    description: "Fresh chicken, tender mutton, country eggs, and river fish",
    subCategories: ["Fresh Chicken", "Mutton", "Country Eggs", "Fish & Seafood"]
  },
  {
    id: "fast-food",
    name: "Fast Food",
    slug: "fast-food",
    startingPrice: 40,
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=600&q=80",
    icon: "🍔",
    description: "Hot samosas, dosas, biryani, burgers, and village roadside delicacies",
    subCategories: ["Snacks & Chaat", "Burgers & Rolls", "Biryani & Rice Bowls", "Tiffin & Breakfast"]
  },
  {
    id: "bakery",
    name: "Bakery",
    slug: "bakery",
    startingPrice: 30,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    icon: "🎂",
    description: "Fresh milk breads, celebration cakes, butter cookies, and buns",
    subCategories: ["Bread & Pav", "Cakes & Pastries", "Biscuits & Cookies", "Puffs & Savories"]
  },
  {
    id: "home-needs",
    name: "Home Needs",
    slug: "home-needs",
    startingPrice: 50,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
    icon: "🧴",
    description: "Cleaning liquids, washing soaps, mosquito repellents & household care",
    subCategories: ["Detergents & Soaps", "Cleaners", "Pooja Essentials", "Kitchen Care"]
  },
  {
    id: "medicines",
    name: "Medicines",
    slug: "medicines",
    startingPrice: 60,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    icon: "💊",
    description: "First-aid, OTC fever relief, pain balms, vitamins and prescription medicines",
    subCategories: ["First Aid & Antiseptics", "Wellness & Supplements", "Pain & Fever", "Prescription Drugs"]
  }
];

export const sampleVillages = [
  { name: "Peddapalli Village", mandal: "Peddapalli", district: "Karimnagar", pincode: "505172", distance: 8, status: "Eligible" },
  { name: "Sultanabad Town", mandal: "Sultanabad", district: "Peddapalli", pincode: "505185", distance: 14, status: "Eligible" },
  { name: "Julapalli Village", mandal: "Julapalli", district: "Peddapalli", pincode: "505525", distance: 19, status: "Eligible" },
  { name: "Kalva Srirampur", mandal: "Srirampur", district: "Peddapalli", pincode: "505153", distance: 22, status: "Out of Zone" },
  { name: "Manthani Village", mandal: "Manthani", district: "Peddapalli", pincode: "505184", distance: 27, status: "Out of Zone" },
  { name: "Basanthnagar", mandal: "Palakurthy", district: "Peddapalli", pincode: "505187", distance: 12, status: "Eligible" }
];
