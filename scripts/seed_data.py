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
            "name": "Mystery",
            "slug": "mystery",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Fiction",
            "slug": "fiction",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Poetry",
            "slug": "poetry",
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
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Echoes of the Past",
            "slug": "echoes-of-the-past",
            "excerpt": "In the misty realm where memories collide, ancient whispers reveal forgotten truths.",
            "content": "The fog rolled in from the hills, thick and impenetrable, carrying with it the weight of centuries. Sarah stood at the edge of the old manor, her fingers tracing the weathered stone walls that had witnessed so much history. \n\nEach crack in the foundation told a story, each darkened window held a secret. She had come seeking answers about her grandmother's disappearance fifty years ago, but what she found was far more than she bargained for. \n\nThe house remembered everything. It whispered through the creaking floorboards, sang through the wind in the chimneys, and beckoned her deeper into its shadowy embrace. Time seemed to fold in on itself here, past and present dancing together in an eternal waltz. \n\nAs she explored the abandoned rooms, Sarah discovered that some echoes never truly fade. They linger, waiting for someone brave enough to listen, to understand, to finally set them free.",
            "image_url": "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800",
            "author": "Admin",
            "category": "Mystery",
            "published": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "The Crimson Key",
            "slug": "the-crimson-key",
            "excerpt": "A mysterious artifact unlocks doors to worlds unknown, but at what cost?",
            "content": "Marcus had always been fascinated by antiques, but the crimson key he found at the estate sale was unlike anything he had ever seen. Its surface seemed to shimmer with an inner light, and strange symbols danced across its ornate handle. \n\nThe shopkeeper's warning echoed in his mind: 'Some doors are better left locked.' But curiosity is a powerful force, and Marcus couldn't resist trying to find what the key might unlock. \n\nHis search led him through dusty archives and forgotten libraries, following a trail that stretched back hundreds of years. Each clue brought him closer to understanding the key's true purpose, but also deeper into danger. \n\nThere were others searching for the key, people who would stop at nothing to possess it. As Marcus finally stood before the door the key was meant to open, he had to decide: would he turn the lock and face what lay beyond, or walk away from the greatest mystery of his life?",
            "image_url": "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800",
            "author": "Admin",
            "category": "Mystery",
            "published": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Chronicles of the Time-Lost",
            "slug": "chronicles-of-the-time-lost",
            "excerpt": "When time becomes unstuck, one traveler must navigate the threads of reality itself.",
            "content": "Elena woke to find herself in a place that shouldn't exist - a crossroads of moments, where past, present, and future converged. She was time-lost, caught between the ticks of a cosmic clock that had suddenly stopped. \n\nAround her, other travelers wandered, each lost in their own temporal confusion. Some had been there for what felt like hours, others for lifetimes. The rules here were different; cause and effect no longer followed any logical sequence. \n\nShe learned that to escape, she would need to find the anchor point - the single moment in time where her story truly belonged. But with infinite possibilities sprawling before her, how could she know which one was real? \n\nEach decision created new timelines, each choice opened new doors. Elena realized that being time-lost wasn't about finding her way back; it was about understanding that every moment is connected, every decision ripples through eternity, and that home isn't a place or a time - it's the acceptance of one's own story, whatever it may be.",
            "image_url": "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800",
            "author": "Admin",
            "category": "Fiction",
            "published": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Whispers in the Dark",
            "slug": "whispers-in-the-dark",
            "excerpt": "Sometimes the silence speaks louder than words, and shadows hold more truth than light.",
            "content": "The old lighthouse keeper knew all about loneliness. Perched on the edge of the world, where land met sea in a violent embrace, he had spent thirty years watching the waves and listening to the wind. \n\nBut lately, something had changed. The darkness between the sweeps of the lighthouse beam seemed deeper, more alive. And in that darkness, he heard whispers - not quite words, but something trying to communicate. \n\nAt first, he thought it was the wind playing tricks, or perhaps his mind finally succumbing to the isolation. But the whispers persisted, growing clearer each night. They spoke of things forgotten, of stories that needed to be told, of souls seeking release. \n\nThe keeper realized he wasn't just maintaining a lighthouse; he was tending to memories, keeping watch over the thin places where the living world brushed against something else. The whispers weren't haunting him - they were trusting him. And as he began to listen, really listen, he understood that some stories are kept alive not by the light, but by those brave enough to face the dark.",
            "image_url": "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800",
            "author": "Admin",
            "category": "Fiction",
            "published": True,
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
