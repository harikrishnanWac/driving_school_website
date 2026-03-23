export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "5-tips-for-first-time-drivers",
    title: "5 Essential Tips for First-Time Drivers",
    excerpt: "Starting your driving journey can feel overwhelming. Here are five crucial tips that every new driver should know before hitting the road.",
    content: `Starting your driving journey is an exciting milestone, but it can also feel overwhelming. Whether you're a teenager getting behind the wheel for the first time or an adult learner, these five essential tips will help you build confidence and stay safe.

**1. Get Comfortable with the Controls**
Before you even start the engine, take time to familiarize yourself with all the controls. Adjust your mirrors, seat position, and steering wheel. Know where the indicators, wipers, and headlight controls are. This preparation reduces anxiety and lets you focus on the road.

**2. Start in Quiet Areas**
Begin your practice in empty parking lots or quiet residential streets. This gives you space to get comfortable with steering, braking, and accelerating without the pressure of traffic. Gradually work your way up to busier roads as your confidence grows.

**3. Follow the 3-Second Rule**
Maintain at least a 3-second following distance from the car ahead. Pick a fixed point, and when the car in front passes it, count "one-thousand-one, one-thousand-two, one-thousand-three." If you reach the point before finishing, you're too close.

**4. Use Your Mirrors Constantly**
Make it a habit to check your mirrors every 5-8 seconds. This keeps you aware of your surroundings and helps you anticipate potential hazards. Don't forget your blind spots — always do a shoulder check before changing lanes.

**5. Stay Calm and Patient**
Every experienced driver was once a beginner. Don't let other drivers' impatience affect your concentration. Drive at a speed you're comfortable with, and remember that safety always comes first.`,
    thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600&h=400",
    date: "2026-03-15",
    category: "Tips",
    readTime: "5 min read",
    author: "James Mitchell"
  },
  {
    slug: "understanding-road-signs",
    title: "A Complete Guide to Understanding Road Signs",
    excerpt: "Road signs are the language of the road. Learn what each shape, color, and symbol means to become a safer and more confident driver.",
    content: `Road signs are essential for safe driving. They communicate important information about road conditions, regulations, and potential hazards. Understanding them is not just crucial for passing your driving test — it's vital for everyday safety on the road.

**Regulatory Signs**
These signs are typically rectangular with a white background and black or red text. They inform you about traffic laws and regulations that you must follow, such as speed limits, no-parking zones, and one-way streets.

**Warning Signs**
Usually diamond-shaped with a yellow background, warning signs alert you to potential hazards ahead. These include sharp curves, pedestrian crossings, school zones, and construction areas. Slow down and stay alert when you see these signs.

**Guide Signs**
Green signs with white text are guide signs that provide directional information. They help you navigate highways, find exits, and locate services like gas stations, hospitals, and rest areas.

**Construction Signs**
Orange signs indicate construction or maintenance zones. These areas often have reduced speed limits and altered traffic patterns. Always slow down and be prepared for unexpected changes in construction zones.

**Understanding Sign Shapes**
The shape of a sign carries meaning too: octagons mean stop, triangles mean yield, circles indicate regulatory information, and diamonds warn of hazards. Learning these shapes helps you quickly identify a sign's purpose, even from a distance.`,
    thumbnail: "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&q=80&w=600&h=400",
    date: "2026-03-10",
    category: "Education",
    readTime: "7 min read",
    author: "Priya Sharma"
  },
  {
    slug: "highway-driving-confidence",
    title: "Building Confidence for Highway Driving",
    excerpt: "Highway driving doesn't have to be scary. Learn proven strategies to merge, maintain speed, and navigate exits with confidence.",
    content: `For many new drivers, highway driving feels intimidating. The higher speeds, merging traffic, and multiple lanes can seem daunting. But with the right preparation and mindset, highway driving can become one of the most enjoyable aspects of being behind the wheel.

**Preparation is Key**
Before your first highway drive, make sure you're comfortable with city driving. You should be confident with lane changes, mirror checks, and speed management. Check your vehicle's tire pressure, oil level, and ensure all lights are working properly.

**Mastering the Merge**
The entrance ramp is your runway. Use the acceleration lane to match the speed of highway traffic before merging. Check your mirrors and blind spot, signal your intention, and smoothly merge into the flow of traffic. Never stop on the entrance ramp unless absolutely necessary.

**Maintaining Safe Speed**
On the highway, keeping up with traffic flow is actually safer than driving too slowly. Stay in the right lane unless passing, and use cruise control on long stretches to maintain consistent speed. Always stay within the posted speed limit.

**Lane Discipline**
The right lane is for regular driving and exits. The middle lanes are for through traffic. The left lane is for passing only. Signal well in advance before changing lanes, and always check your blind spots.

**Handling Exits**
Begin moving to the exit lane well before your exit. Don't make last-minute lane changes across multiple lanes. If you miss your exit, continue to the next one rather than making dangerous maneuvers.`,
    thumbnail: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600&h=400",
    date: "2026-03-05",
    category: "Tips",
    readTime: "6 min read",
    author: "David Park"
  },
  {
    slug: "night-driving-safety",
    title: "Night Driving Safety: What Every Driver Should Know",
    excerpt: "Driving after dark presents unique challenges. Discover essential safety tips to help you navigate the roads confidently at night.",
    content: `Night driving accounts for a disproportionate number of road accidents, yet it's an essential skill every driver needs. Reduced visibility, glare from oncoming headlights, and driver fatigue all contribute to increased risk. Here's how to stay safe when driving after dark.

**Ensure Your Lights Work**
Before driving at night, check that all your lights are functioning — headlights (both low and high beam), tail lights, brake lights, and indicators. Clean your headlight lenses regularly, as dirty lenses can reduce light output by up to 90%.

**Reduce Speed**
Your visibility is significantly reduced at night, which means your stopping distance should account for what you can actually see. Reduce your speed to ensure you can stop within the distance illuminated by your headlights.

**Manage Headlight Glare**
When facing oncoming traffic, avoid looking directly at their headlights. Instead, focus on the left edge of the road or the lane markings to maintain your sense of direction. If you wear glasses, make sure they have anti-reflective coating.

**Watch for Pedestrians and Cyclists**
Pedestrians and cyclists are much harder to see at night, especially if they're wearing dark clothing. Be extra vigilant at crossings, intersections, and residential areas. Scan the sides of the road regularly.

**Avoid Drowsy Driving**
Fatigue is a major risk factor for night driving. If you feel tired, pull over at a safe location and take a 20-minute power nap. Coffee can help temporarily, but it's not a substitute for rest. Plan long drives so you're well-rested before starting.`,
    thumbnail: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=600&h=400",
    date: "2026-02-28",
    category: "Safety",
    readTime: "6 min read",
    author: "Emily Chen"
  },
  {
    slug: "passing-driving-test-first-attempt",
    title: "How to Pass Your Driving Test on the First Attempt",
    excerpt: "Maximize your chances of passing the driving test on your first try with these proven strategies from our experienced instructors.",
    content: `Passing your driving test on the first attempt is absolutely achievable with the right preparation. At SafeDrive, we've helped thousands of students pass on their first try, and here are the strategies that work.

**Know the Test Route**
While test routes vary, familiarize yourself with the common roads and intersections near the testing center. Practice driving in these areas during your lessons so the environment feels familiar on test day.

**Master the Basics**
Examiners look for consistent, safe driving — not perfection. Focus on smooth steering, proper mirror usage, correct signaling, and appropriate speed control. These fundamentals account for the majority of your assessment.

**Practice Mock Tests**
Take at least 3-5 mock tests with your instructor before the actual exam. This helps you understand the format, manage time pressure, and identify areas that need improvement. Our Standard and Premium plans include mock driving tests.

**Manage Test Anxiety**
Nervousness is normal, but don't let it overwhelm you. Get a good night's sleep before the test, eat a light meal, and arrive early. Deep breathing exercises can help calm your nerves. Remember, the examiner wants you to pass.

**Common Mistakes to Avoid**
The most common reasons for failing include: not checking mirrors frequently enough, incorrect positioning at roundabouts, rolling through stop signs, and poor observation at junctions. Being aware of these pitfalls helps you avoid them.

**After the Test**
If you pass — congratulations! But remember, passing the test is just the beginning. Continue to practice and build your experience gradually. If you don't pass, don't be discouraged. Review the examiner's feedback, work on the noted areas, and try again.`,
    thumbnail: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600&h=400",
    date: "2026-02-20",
    category: "Tips",
    readTime: "8 min read",
    author: "James Mitchell"
  }
];
