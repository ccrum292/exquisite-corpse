const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exquisite-corpse", {
  useNewUrlParser: true,
  useFindAndModify: false
})

const storiesSeed = [
  {
    authors: [
      {
        authorName: "Mother Teresa"
      }
    ],
    numberOfEntries: 1,
    text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    dateCreated: new Date().setDate(new Date().getDate()-10)
  },
  {
    authors: [
      {
        authorName: "Benjamin Franklin"
      }
    ],
    numberOfEntries: 1,
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    dateCreated: new Date().setDate(new Date().getDate()-9)
  },
  {
    authors: [
      {
        authorName: "Dr. Seuss"
      }
    ],
    numberOfEntries: 1,
    text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",
    dateCreated: new Date().setDate(new Date().getDate()-8)
  },
  {
    authors: [
      {
        authorName: "J.R.R. Tolkien"
      }
    ],
    numberOfEntries: 1,
    text: "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.",
    dateCreated: new Date().setDate(new Date().getDate()-7)
  },
  {
    authors: [
      {
        authorName: "Stephen King"
      }
    ],
    numberOfEntries: 1,
    text: "Eddie discovered one of his childhood’s great truths. Grownups are the real monsters, he thought.",
    dateCreated: new Date().setDate(new Date().getDate()-7)
  },
  {
    authors: [
      {
        authorName: "Stephen King"
      }
    ],
    numberOfEntries: 1,
    text: "You realize that you are in a hell of your own making, but you go on nevertheless. Because there is nothing else to do.",
    dateCreated: new Date().setDate(new Date().getDate()-7)
  },
  {
    authors: [
      {
        authorName: "Edgar Allan Poe"
      }
    ],
    numberOfEntries: 1,
    text: "Ah, distinctly I remember it was in the bleak December, and each separate dying ember wrought its ghost upon the floor. Eagerly I wished the morrow, vainly I had sought to borrow from my books surcease of sorrow, sorrow for the lost Lenore, for the rare and radiant maiden whom the angels name Lenore, Nameless here for evermore.",
    dateCreated: new Date().setDate(new Date().getDate()-7)
  },
  {
    authors: [
      {
        authorName: "Bill Waterson"
      }
    ],
    numberOfEntries: 1,
    text: "Everybody seeks happiness! Not me, though! That’s the difference between me and the rest of the world. Happiness isn’t good enough for me! I demand euphoria!",
    dateCreated: new Date().setDate(new Date().getDate()-7)
  },
  {
    authors: [
      {
        authorName: "Bill Waterson"
      }
    ],
    numberOfEntries: 1,
    text: "As you can see, I have memorized this utterly useless piece of information long enough to pass a test question. I now intend to forget it forever. You’ve taught me nothing except how to cynically manipulate the system. Congratulations.",
    dateCreated: new Date().setDate(new Date().getDate()-7)
  },
  {
    authors: [
      {
        authorName: "Murc"
      }
    ],
    numberOfEntries: 1,
    text: "Once upon a Time, there lived a king in a Castle.",
    dateCreated: new Date().setDate(new Date().getDate()-7)
  },
  {
    authors: [
      {
        authorName: "Emily Page Hatch"
      },
      {
        authorName: "Emily Page Hatch"
      }
    ],
    numberOfEntries: 2,
    text: "In a kitschy bar in Cambridge, he asked to sit at my table, though later he would insist that I made the first move. I was intrigued by his tattoos. He thought I went to Harvard. All we had in common was that we’d both almost stayed home. Friends had dragged us out on a frigid February evening. We still never agree on anything, except that it’s a darn good thing we sucked it up that snowy night. Our wild blue-eyed son always stops us in our tracks, reminding us that fate is just as fragile as our memory.",
    dateCreated: new Date().setDate(new Date().getDate()-7)
  },
  {
    authors: [
      {
        authorName: "Ron Fleming"
      },
      {
        authorName: "Ron Fleming"
      }
    ],
    numberOfEntries: 2,
    text: "While walking across an open, grassy field, I became excited as my hand swooped toward the ground like an eagle attacking its prey. I picked up half of a $5 bill. I continued to walk around looking for the other half but thought to myself it would be impossible to find it on such a windy day. As I lifted my head, I spotted the other half of the bill tangled in crabgrass. Somehow, finding two halves of a ripped $5 bill felt better than working for a twenty.",
    dateCreated: new Date().setDate(new Date().getDate()-7)
  },
  {
    authors: [
      {
        authorName: "Dan Rolince"
      },
      {
        authorName: "G.C."
      }
    ],
    numberOfEntries: 2,
    text: "On a cool night lit only by the orange glow of fire, we rushed to my grandfather’s home as his decades-old barn burned to the ground. The firemen let us stand nearby as they pumped water from the creek a quarter mile away. We watched the barn go up in flames, which stirred memories of jumping off foot-wide wooden beams into the hay below. The real sadness came as my elderly grandfather, who did not get out of bed, quietly asked if his cows were safe. He hadn’t had dairy cows in a dozen years.",
    dateCreated: new Date().setDate(new Date().getDate()-7)
  },
  {
    authors: [
      {
        authorName: "Ralph Waldo Emerson"
      }
    ],
    numberOfEntries: 3,
    text: "That you are fair or wise is vain, or strong, or rich, or generous, you must have also the untaught strain that sheds beauty on the rose. There is a melody born of melody, which melts the world into a sea, toil could never compass it, art its height could never hit, it came never out of with, but a music music-born well may Jove and Juno scorn. Thy beauty, if it lack the fire, which drives me mad with sweet desire, what boots it? What the soldier's mail, unless he conquer and prevail? What all the goods thy pride which lift, if thou pine for another's gift? Alas! that one is born in blight, victim of perpetual slight, when thou lookest on his face, thy heart saith 'Brother, go thy ways! None shall ask thee what thou doest, or care a rush for what thou knowest, or listen when thou repliest, or remember where thou liest, or how thy supper is sodden.' And another is born to make the sun forgotten. Surely he carries a talisman under his tongue broad are his shoulders, and strong and his eye is scornful, threatening, and young. I hold it of little matter whether your jewel be of pure water, a rose diamond or a white, but whether it dazzle me with light. I care not how you are dressed, in the coarsest or in the best, nor whether your name is base or brave, nor for the fashion of your behavior, but whether you charm me, bid my bread feed and my fire warm me, and dress up Nature in your favor. One thing is forever good that one thing is success, dear to the Eumenides, and to all the heavenly brood. Who bides at home, nor looks abroad, Carries the eagles, and masters the sword.",
    dateCreated: new Date().setDate(new Date().getDate()-7)
  }
];

db.Stories.deleteMany({})
  .then(() => db.Stories.collection.insertMany(storiesSeed))
  .then(data => {
    console.log(data.result.n + " records insterted");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });