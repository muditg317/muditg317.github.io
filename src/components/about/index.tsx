import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {ExternalLink} from 'components/external-link';
import { Page } from 'components/reusable/page';
import {Card} from 'components/reusable/card';

import profilePic from 'assets/images/linkedin-pic.jpg';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const farEnvelope: IconProp = ['far','envelope'];
const fabGithub: IconProp = ['fab','github'];
const fabLinkedIn: IconProp = ['fab','linkedin'];



export function AboutPage() {
  return <Page>
    <Card>
      <img src={profilePic} alt="Mudit Gupta" className="block sm:hidden w-64 rounded-full" height="278" width="256" /> 
      <div className="w-full">
        <span className="text-3xl font-bold pt-3 ">
        Mudit Gupta
        </span>
        <img src={profilePic} alt="Mudit Gupta" className="hidden sm:block float-right w-64 rounded-full" height="278" width="256" /> 
        <br/>

        Student<br/>
        <ExternalLink to="https://cc.gatech.edu/" className="underline text-green-300">College of Computing</ExternalLink><br/>
        <ExternalLink to="http://www.gatech.edu/" className="underline text-green-300">Georgia Institute of Technology</ExternalLink><br/>
        <ExternalLink to="mailto:mgupta303@gatech.edu" className="no-underline"><FontAwesomeIcon icon={farEnvelope} size='lg' className="w-6" />&nbsp;mgupta303@gatech.edu</ExternalLink><br/>
        <ExternalLink to="https://github.com/muditg317" className="no-underline"><FontAwesomeIcon icon={fabGithub} size='lg' className="w-6" />&nbsp;@muditg317</ExternalLink><br/>
        <ExternalLink to="https://linkedin.com/in/muditg317" className="no-underline"><FontAwesomeIcon icon={fabLinkedIn} size='lg' className="w-6" />&nbsp;@muditg317</ExternalLink><br/>
        
        <br/>
        I am currently studying computer science at Georgia Tech.
        My focuses are in AI/ML and mod/sim.
        I plan to graduate with a Bachelor's in May 2022.
        I will be completing a masters at GT as well, with a concentration on computer perception and robotics.
        I plan to finish my Master's degree by May 2023.<br/>

        <br/>
        My interests are in applications of machine learning to robotics.
        I see robotics as a combination of 4 fields: human-computer interaction, manipulation of objects, localization/mapping, and perception.<br/>
        I have basic experience with object manipulation, but I hope to take part in research directed at making dynamic systems which can adapt to manipulating different types of objects on the fly.<br/>
        I am also very interested in the perception / navigation process for autonomous agents.
        I have some experience with navigating based on LiDAR data, but being able to train agents with images can provide a more robust and abstract understanding of their environments.<br/>
        I hope to eventually acheive mastery in all of these fields, so I can become the ultimate roboticist :)<br/>

        <br/>
        Outside of academia, I try to stay as active as I can.
        I love playing spikeball with my friends or getting destroyed at table tennis
        (eventually I'll destroy them, but not yet).
        I am also learning to play guitar, advice would be appreciated!<br/>


        {/* <br/> */}
        

        {/* My research lies at the intersections of <b>machine learning</b>, <b>natural language processing</b>, and <b>social media</b>. I focus on designing algorithms for learning semantics from large data for natural language understanding, and natural language generation in particular with stylistic variations. I recently received the NSF CRII Award, Criteo Faculty Research Award, CrowdFlower AI for Everyone Award, Best Paper Award at COLING'18, as well as research funds from DARPA. I was a postdoctoral researcher at the University of Pennsylvania. I received my PhD in Computer Science from New York University, MS and BS from Tsinghua University.  */}
        
        {/* <br/>
        <br/> */}
        {/* I am a senior area chair for NAACL 2021 (generation) and ACL 2020 (generation), and an area chair for EMNLP 2021 (computational social science), EMNLP 2020 (generation), AAAI 2020 (NLP), ACL 2019 (semantics), NAACL 2019 (generation), EMNLP 2018 (social media), COLING 2018 (semantics), EMNLP 2016 (generation), a workshop chair for ACL 2017, and the publicity chair for EMNLP 2019, NAACL 2018 and 2016. I also created a new undergraduate course on <a href="http://socialmedia-class.org/">Social Media and Text Analytics</a>.  */}
        
      </div>
    </Card>
  </Page>
}