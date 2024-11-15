// Mock data for books
const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://picsum.photos/200/300",
    duration: "4h 30m",
    progress: 45,
    currentChapter: 5,
    totalChapters: 12,
    genre: "Fiction",
    rating: 4.5,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    cover: "https://picsum.photos/200/301",
    duration: "5h 15m",
    progress: 30,
    currentChapter: 3,
    totalChapters: 15,
    genre: "Science Fiction",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "https://picsum.photos/200/302",
    duration: "6h 45m",
    progress: 60,
    currentChapter: 8,
    totalChapters: 14,
    genre: "Romance",
    rating: 4.6,
  },
];

// Mock categories
const mockCategories = [
  { id: 1, name: "Fiction", bookCount: 145 },
  { id: 2, name: "Non-Fiction", bookCount: 89 },
  { id: 3, name: "Mystery", bookCount: 56 },
  { id: 4, name: "Self-Help", bookCount: 78 },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Export the service object
export const bookService = {
  async getFeaturedBooks() {
    await delay(800);
    return mockBooks;
  },

  async getCurrentlyReading() {
    await delay(500);
    return [mockBooks[0]];
  },

  async getCategories() {
    await delay(500);
    return mockCategories;
  }
}; 