import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {ExternalLink} from 'components/external-link';
import { Page } from 'components/reusable/page';
import {Card} from 'components/reusable/card';

import profilePic from 'assets/images/linkedin-pic.jpg';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const farEnvelope: IconProp = ['far','envelope'];
const fabGithub: IconProp = ['fab','github'];
const fabLinkedIn: IconProp = ['fab','linkedin'];



export function Landing() {
  return <Page>
    <Card>
      <img src={profilePic} alt="Mudit Gupta" className="block sm:hidden w-64 rounded-full" height="278" width="256" /> 
      <div className="w-full">
        <span className="text-3xl font-bold pt-3 ">
        Mudit Gupta
        </span>
        <img src={profilePic} alt="Mudit Gupta" className="hidden sm:block float-right w-64 rounded-full" height="278" width="256" /> 
        <br/>

        Master's Student<br/>
        <ExternalLink to="https://cc.gatech.edu/" className="underline text-green-300">College of Computing</ExternalLink><br/>
        <ExternalLink to="http://www.gatech.edu/" className="underline text-green-300">Georgia Institute of Technology</ExternalLink><br/>
        <ExternalLink to="mailto:mgupta303@gatech.edu" className="no-underline"><FontAwesomeIcon icon={farEnvelope} size='lg' className="w-6" />&nbsp;mgupta303@gatech.edu</ExternalLink><br/>
        <ExternalLink to="https://github.com/muditg317" className="no-underline"><FontAwesomeIcon icon={fabGithub} size='lg' className="w-6" />&nbsp;@muditg317</ExternalLink><br/>
        <ExternalLink to="https://linkedin.com/in/muditg317" className="no-underline"><FontAwesomeIcon icon={fabLinkedIn} size='lg' className="w-6" />&nbsp;@muditg317</ExternalLink><br/>
        
        <br/>
        I am currently a graduate computer science student at Georgia Tech.
        My concentration is in computer perception and robotics.
        I plan to finish my Master's degree by May 2023.
        I graduated with a Bachelor's in CS (focused in AI/ML and mod/sim) in May 2022.<br/>

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
      </div>
    </Card>
  </Page>
}