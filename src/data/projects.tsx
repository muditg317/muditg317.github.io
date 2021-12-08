enum Language {
  CPP = "C++",
}

interface Project {
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  startDate: Date;
  endDate: Date;
  languages?: Language[];
  contents: string | JSX.Element;
}

export const projects: Project[] = [
  {
    title: "Bokay: Custom C-style language",
    subtitle: "Programming language created from scratch",
    startDate: new Date(2021, 10, 10),
    endDate: new Date(),
    languages: [Language.CPP],
    contents: "I implemented a compiler for .bokay files in C++. The compiler involved a custom lexer, parser, and compiler."
  },
  {
    title: "Termdraw",
    subtitle: "Graphics Library for the Terminal",
    startDate: new Date(2021, 10, 21),
    endDate: new Date(2021,10,28),
    languages: [Language.CPP],
    contents: "I made a graphics library for drawing in the terminal with a series of braille characters (to get more pixels than console size). The library provides a similar API to p5.js."
  },
];

projects.sort((a,b) => b.endDate.valueOf() - a.endDate.valueOf());