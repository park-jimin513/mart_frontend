const unsplash = (photoId) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=600&q=80`;
const pexels = (photoId) =>
  `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=600`;

export const categoryDisplayItems = [
  { id: "groceries", name: "Groceries", slug: "groceries", image: unsplash("photo-1542838132-92c53300491e") },
  { id: "vegetables-fruits", name: "Vegetables & Fruits", slug: "vegetables", image: unsplash("photo-1610348725531-843dff563e2c") },
  { id: "meat-chicken", name: "Meat & Chicken", slug: "non-veg", image: unsplash("photo-1604503468506-a8da13d82791") },
  { id: "fish-seafood", name: "Fish & Seafood", slug: "non-veg", image: pexels("3296279") },
  { id: "fast-food", name: "Fast Food", slug: "fast-food", image: unsplash("photo-1561758033-d89a9ad46330") },
  { id: "bakery", name: "Bakery", slug: "bakery", image: unsplash("photo-1578985545062-69928b1d9587") },
  { id: "dairy-products", name: "Dairy Products", slug: "groceries", image: pexels("416978") },
  { id: "snacks", name: "Snacks", slug: "fast-food", image: pexels("568805") },
  { id: "beverages", name: "Beverages", slug: "groceries", image: pexels("109275") },
  { id: "household-essentials", name: "Household Essentials", slug: "home-needs", image: unsplash("photo-1583947215259-38e31be8751f") },
  { id: "personal-care", name: "Personal Care", slug: "home-needs", image: pexels("3735641") },
  { id: "pharmacy-medicines", name: "Pharmacy & Medicines", slug: "medicines", image: unsplash("photo-1584308666744-24d5c474f2ae") }
];

export const mobileHomeCategoryItems = [
  categoryDisplayItems[0],
  { ...categoryDisplayItems[1], name: "Vegetables" },
  { id: "fruits", name: "Fruits", slug: "vegetables", image: unsplash("photo-1571771894821-ce9b6c11b08e") },
  { id: "milk-dairy", name: "Milk & Dairy", slug: "groceries", image: categoryDisplayItems[6].image },
  { id: "pharmacy", name: "Pharmacy", slug: "medicines", image: categoryDisplayItems[11].image },
  { ...categoryDisplayItems[9], name: "Home Needs" },
  { id: "snacks-bakery", name: "Snacks & Bakery", slug: "bakery", image: categoryDisplayItems[5].image },
  { id: "pooja-needs", name: "Pooja Needs", slug: "home-needs", image: pexels("6474471") }
];
