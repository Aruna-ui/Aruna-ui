import asyncio
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent.parent / 'backend'))

from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from datetime import datetime, timezone
import uuid

load_dotenv('/app/backend/.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

async def seed_data():
    # Clear existing data
    await db.posts.delete_many({})
    await db.categories.delete_many({})
    
    # Create categories
    categories = [
        {
            "id": str(uuid.uuid4()),
            "name": "Personal",
            "slug": "personal",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Writing Process",
            "slug": "writing-process",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Book Updates",
            "slug": "book-updates",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Life & Balance",
            "slug": "life-balance",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.categories.insert_many(categories)
    print("✓ Categories created")
    
    # Create blog posts
    posts = [
        {
            "id": str(uuid.uuid4()),
            "title": "Why This Blog?",
            "slug": "why-this-blog",
            "excerpt": "Welcome to my new corner of the internet! Many of you know me as the author of the Agarkas series. This is a space to share the stories between the books.",
            "content": "Welcome to my new corner of the internet! Many of you know me as the author of the Agarkas series. While my books explore worlds of fantasy and shadow, my own life is a busy blend of reality—juggling a career in banking, raising my two daughters here in Pune, and diving deep into writing my fourth novel.\n\nI created this blog to bridge those worlds. This is a space to share the stories between the books: my writing process, the sparks of inspiration found in daily life, and the chaotic, wonderful balancing act of being a mother, a banker, and a storyteller.\n\nYou'll find posts here about:\n\n• Behind-the-scenes glimpses into my writing journey\n• Reflections on balancing creativity with corporate life\n• Insights into building fantasy worlds and complex characters\n• The everyday magic that inspires my stories\n• Updates on my upcoming fourth book\n\nWriting has always been my way of making sense of the world—both the real one and the imagined ones. Through the Agarkas series, I've explored themes of power, redemption, and the eternal battle between light and darkness. But there's so much more to say, so many smaller stories that don't fit into epic fantasy novels.\n\nThis blog is for those in-between moments. It's for the times when I want to share a thought that struck me during my morning commute, or discuss a writing challenge I'm wrestling with, or simply connect with readers who've journeyed through my books and want to know what comes next.\n\nThank you for being here. I'm so excited to connect with you in this space.\n\nWith warm regards,\nAruna.S",
            "image_url": "https://customer-assets.emergentagent.com/job_3753420f-aaf4-4ba8-bc35-43e58ba6eb39/artifacts/jxahflxn_1760974219204.jpg",
            "author": "Aruna.S",
            "category": "Personal",
            "published": True,
            "likes": 0,
            "dislikes": 0,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "The Agarkas Series: A Journey Into Darkness",
            "slug": "agarkas-series-journey",
            "excerpt": "Exploring the themes of power, redemption, and the eternal battle between light and darkness that define the Agarkas saga.",
            "content": "When I first conceived the character of Agarkas, I knew I was creating something that would haunt me—in the best possible way. The King of Satan isn't just a villain; he's a complex exploration of what happens when power corrupts absolutely, and whether redemption is possible even for those who've committed the darkest acts.\n\nThe first book, 'Agarkas the King of Satan,' was born from a simple question: What if the ultimate evil had once been good? This question drove me to create a backstory that would make readers understand—if not sympathize with—a character who represents everything we fear.\n\nWriting about darkness while balancing my day job in banking and raising my daughters created an interesting dichotomy in my life. By day, I'm analyzing financial statements and attending board meetings. By night, I'm crafting worlds where ancient evils rise and heroes face impossible choices.\n\n'The Whisper That Name Me' delved deeper into the mythology I'd created, exploring the origins of evil and the whispers that corrupt even the strongest souls. And 'Agarkas the Return of the King' brought the saga full circle—or did it?\n\nMy readers know I never provide easy answers. The line between good and evil isn't clear-cut in my books because it isn't clear-cut in life. We all have our shadows; we all face our whispers. The question is: what do we do with them?\n\nAs I work on my fourth book, I'm exploring new territories while staying true to the themes that have defined my work. Stay tuned for more updates!\n\nWith darkness and light,\nAruna.S",
            "image_url": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
            "author": "Aruna.S",
            "category": "Book Updates",
            "published": True,
            "likes": 0,
            "dislikes": 0,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Writing Between Spreadsheets",
            "slug": "writing-between-spreadsheets",
            "excerpt": "How I balance my banking career with my passion for storytelling—and why I wouldn't have it any other way.",
            "content": "People often ask me how I manage to write dark fantasy novels while working full-time in banking. The answer is simpler than you might think: I don't have a choice. Writing isn't something I do; it's something I am.\n\nMy typical day starts at 6 AM. I wake up before my daughters, make myself a strong cup of chai, and sit at my writing desk while the world is still quiet. This is my sacred time—the hours before the banking world demands my attention, before school drop-offs and client meetings.\n\nDuring these early morning hours, I'm not a banker or a mother. I'm a storyteller, and the worlds I create are as real to me as the spreadsheets I'll review later that day. There's something magical about watching the sun rise while writing about darkness, about creating epic battles while sipping tea in my peaceful Pune home.\n\nThe banking sector has taught me discipline, structure, and attention to detail—skills that translate surprisingly well to novel writing. Plot holes in a story are like errors in a balance sheet; both need careful examination and correction. The analytical thinking required in finance helps me construct intricate plots and keep track of multiple story threads.\n\nBut I won't pretend it's easy. There are days when I'm exhausted, when the corporate world has drained every ounce of creativity from me. On those days, I remind myself why I do this: because the stories demand to be told, because readers are waiting, because somewhere out there, someone needs the escape that only fiction can provide.\n\nMy daughters have grown up watching me juggle these two worlds. I hope I'm teaching them that passion and responsibility don't have to be at odds—that you can honor your commitments while still chasing your dreams.\n\nSo here I am: writing between spreadsheets, creating darkness between board meetings, and loving every chaotic, exhausting, wonderful moment of it.\n\nWith persistence,\nAruna.S",
            "image_url": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
            "author": "Aruna.S",
            "category": "Life & Balance",
            "published": True,
            "likes": 0,
            "dislikes": 0,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "The Writer's Ritual: My Creative Process",
            "slug": "writers-ritual-creative-process",
            "excerpt": "A peek behind the curtain at how I craft my stories, from the first spark of an idea to the final word.",
            "content": "Every writer has their rituals, those sacred practices that help them access the creative space where stories live. Mine have evolved over the years, shaped by the demands of motherhood, career, and the sheer stubbornness required to write epic fantasy novels.\n\nIt starts with silence. Before I write a single word, I need absolute quiet—not just external silence, but internal calm. Living in Pune with two energetic daughters, this is a luxury I rarely have. So I've learned to create internal silence even in chaos, to find that still point within myself where the stories wait.\n\nI'm a pantser when I start, letting the story flow without too much planning. But I'm an editor by nature—probably a skill honed from years of reviewing financial documents. My first drafts are messy, emotional, raw. The real work happens in the revision, where I shape the chaos into something readers can follow.\n\nMusic plays a huge role in my process. While writing the Agarkas series, I created specific playlists for different characters and scenes. Agarkas has his own dark, orchestral soundtrack. The heroes have something more hopeful but still tinged with melancholy. When I'm stuck, I'll put on these playlists and let the music guide me back into the story.\n\nI write in layers. The first draft is all dialogue and action—getting the bare bones of the scene down. The second pass adds description and atmosphere. The third focuses on emotion and subtext. By the fourth or fifth revision, the scene has transformed into something I never could have planned from the beginning.\n\nOne of my quirks: I write the ending first. Not always the final words, but I know where I'm heading before I start the journey. This gives me a destination to write toward, even if the path there changes along the way.\n\nThe hardest part? Knowing when to stop revising. Every writer struggles with this. At some point, you have to let your creation go, send it out into the world, and trust that you've done your best.\n\nMy fourth book is testing all these rituals, pushing me to evolve my process even further. And that's the beautiful thing about writing—you never stop learning, never stop growing.\n\nWith creative chaos,\nAruna.S",
            "image_url": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
            "author": "Aruna.S",
            "category": "Writing Process",
            "published": True,
            "likes": 0,
            "dislikes": 0,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.posts.insert_many(posts)
    print("✓ Blog posts created")
    print(f"✓ Seeded {len(posts)} posts and {len(categories)} categories")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_data())
