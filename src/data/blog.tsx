interface BlogPost {
  title: string | JSX.Element;
  date: Date;
  contents: string | JSX.Element;
}

export const blogPosts: BlogPost[] = [
  {
    title: <>An obsession over <span className="italic">I, Robot</span></>,
    date: new Date(2021, 7, 20),
    contents: <>If you ask any of my friends about my interests, they'll immediately bring up how much I love the movie <span className="italic">I, Robot</span>.
    In this movie, robots are fully integrated into the society and help everyone with their daily tasks, ranging from cutting vegetables to carrying their bags in a grocery store.
    I am fascinated by and hope to contribute to the creation of robots that can seamlessly communicate with humans at a high level.
    Not only are these robots not only excellent communicators, but also they can navigate the complex environment in real-time without error.
    This is the most exciting to me because legged robots, let alone bipedal ones, are much harder to work with than wheels because of the complex inverse kinematics and high-dimensional path planning for each actuator.
    These robots can also see and make meaningful interpretations about their environments, which is another entire class of machine learning.</>
  }
];

blogPosts.sort((a,b) => b.date.valueOf() - a.date.valueOf());