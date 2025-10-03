// Mock data for the gothic author website

export const authorInfo = {
  name: "Aruna.S",
  tagline: "Weaving Tales from the Abyss",
  bio: "My name is Aruna S., and I am a storyteller drawn to the whispered secrets in the dark. My fiction is an exploration of that duality—the beautiful and the broken, the terrifying and the true. I believe that to truly heal, we must first confront what haunts us. My stories are born from this conviction, offering a path through the shadows and a glimpse of the light that waits on the other side.",
  longBio: "Raised on a steady diet of folklore, forgotten myths, and classic horror, I was often found with my head buried in a book or my hands tracing the patterns on old stone walls. It was the ancient legends—tales of wise ravens, the cyclical nature of the coiled serpent, and the delicate but powerful moth—that taught me how to find the sacred in the terrifying. These symbols have become the silent language of my work, guiding me as I navigate the grim forests and haunted halls of my imagination. I write with a quill—the metaphorical kind—allowing the worlds to unfold on the page as if they've always existed, just waiting to be transcribed. My mission is to provide fearless fiction for young minds and old souls alike, stories that linger long after the final page is turned.",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
  socialLinks: {
    twitter: "#",
    instagram: "#",
    goodreads: "#",
    email: "contact@arunas.com"
  },
  awards: [
    "London Book & World Record Recognition - Excellence in Literary Writing and Mythic Horror Storytelling",
    "Abdul Kalam Award for Literary Excellence - Visionary Contribution to Indian Literature", 
    "Author Pen Award, New Delhi - Outstanding Achievement in Novel Writing and Character Development"
  ]
};

export const books = [
  {
    id: 1,
    title: "Agarkas, The Future King of Satan",
    subtitle: "The Agarkas Chronicles",
    description: "In a haunted Romanian church, Aria—a gifted girl marked by silence—uncovers the buried name of Agarkas, a demon sealed beneath the altar. As relics bleed and prayers fail, she's drawn into visions, rituals, and spiritual warfare that test her faith and identity. Across forty chapters of mythic horror, this novel explores the thin veil between salvation and damnation.",
    cover: "https://customer-assets.emergentagent.com/job_gothic-author/artifacts/4lqwnq0d_copilot_image_1755341425711.jpeg",
    price: "₹199",
    publishDate: "2024",
    genre: ["Mythic Horror", "Spiritual Thriller", "Gothic Fiction"],
    status: "available",
    purchaseLinks: {
      amazon: "https://www.amazon.in/Agarkas-Aruna-S/dp/9356059276/ref=sr_1_3?dib=eyJ2IjoiMSJ9.whDXSNtmHIUUtXz--D520A.POtUCIBg09DnC2NhaWX2GByLIBl70Pytev2kunIp_mI&dib_tag=se&keywords=agarkas&qid=1758391291&sr=8-3"
    },
    chapters: 40,
    pages: 500
  },
  {
    id: 2,
    title: "The Whisper That Named Me",
    subtitle: "A Psychological Horror Novel",
    description: "In the shadowed corridors of a crumbling seminary, a woman walks alone—an exorcist not by training, but by necessity. Her name is Aruna, and she has come to confront the darkness that once called her by name. This is not just a horror story. It is a reckoning. A journey through spiritual terror, psychological unraveling, and the quiet hope that even the most cursed soul can be reclaimed.",
    cover: "https://customer-assets.emergentagent.com/job_gothic-author/artifacts/22nyrwpq_IMG-20250924-WA0060.jpg",
    price: "₹149",
    publishDate: "2024", 
    genre: ["Psychological Horror", "Spiritual Fiction", "Gothic Romance"],
    status: "available",
    purchaseLinks: {
      googlePlay: "https://play.google.com/store/books/details?id=_h-BEQAAQBAJ"
    }
  }
];

export const newsArticles = [
  {
    id: 1,
    title: "The Bone Garden: Writing Update",
    excerpt: "Progress on the second Chronicles of Agarkas book continues. Here's a glimpse into Elara's latest discoveries...",
    content: "The mist grows thicker as I write deeper into The Bone Garden. Each chapter reveals new mysteries about the realm of Agarkas, and I find myself as surprised by the revelations as my readers will be. Currently at 60,000 words and climbing.",
    date: "December 15, 2024",
    category: "Writing Updates",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "Gothic Romance: Finding Love in the Darkness",
    excerpt: "Exploring the delicate balance between horror and romance in my latest work, Mirror of Sorrows.",
    content: "There's something beautiful about love that persists beyond the veil of death. In Mirror of Sorrows, I wanted to explore how connection transcends the boundaries we think are absolute. The gothic genre allows for this exploration in ways that pure romance cannot.",
    date: "November 28, 2024",
    category: "Writing Craft",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "Reader Q&A: Inspiration for Agarkas",
    excerpt: "Answering your questions about the world-building process behind the Chronicles of Agarkas series.",
    content: "Many readers have asked about the inspiration for Agarkas. The truth is, it came to me in a dream - a realm where shadows held memories and moonlight revealed truths hidden in daylight. I knew I had to explore this world through Elara's eyes.",
    date: "November 10, 2024",
    category: "Reader Interaction",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    text: "Aruna.S weaves darkness and beauty in ways that haunt you long after the last page. The Shadowed Castle consumed my thoughts for weeks.",
    rating: 5,
    book: "The Shadowed Castle"
  },
  {
    id: 2,
    name: "Marcus Chen",
    text: "Each story in Whispers from the Void is a masterpiece of atmospheric horror. I couldn't put it down, even though it gave me chills.",
    rating: 5,
    book: "Whispers from the Void"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    text: "Mirror of Sorrows made me believe in love that transcends death. Beautifully haunting and achingly romantic.",
    rating: 5,
    book: "Mirror of Sorrows"
  }
];

export const navigationItems = [
  { name: "Books", href: "#books" },
  { name: "About", href: "#about" },
  { name: "News", href: "#news" },
  { name: "Contact", href: "#contact" }
];