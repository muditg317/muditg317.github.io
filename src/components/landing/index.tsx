import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {ExternalLink} from 'components/external-link';

import profilePic from 'assets/images/profile-pic.jpg';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const fabGithub: IconProp = ['fab','github'];
const farEnvelope: IconProp = ['far','envelope'];



export default function Landing() {
  return <div className="bg-cyan-100 h-full flex flex-col items-center">
    <div className="p-5 w-full max-w-3xl">
      <div className="rounded-md shadow-md bg-white p-5 flex flex-col items-center">

        <img src={profilePic} alt="Mudit Gupta" className="block sm:hidden w-64" height="278" width="256" /> 
        <div className="w-full">
          <span className="text-3xl font-bold pt-3 ">
          Mudit Gupta
          </span>
          <img src={profilePic} alt="Mudit Gupta" className="hidden sm:block float-right w-64" height="278" width="256" /> 
          <br/>
          Student<br/>
          <ExternalLink to="https://cc.gatech.edu/" className="underline text-green-300">College of Computing</ExternalLink><br/>
          <ExternalLink to="http://www.gatech.edu/" className="underline text-green-300">Georgia Institute of Technology</ExternalLink><br/>
          <ExternalLink to="mailto:mgupta303@gatech.edu" className="no-underline"><FontAwesomeIcon icon={farEnvelope} size='lg' />&nbsp;mgupta303@gatech.edu</ExternalLink><br/>
          <ExternalLink to="https://github.com/muditg317" className="no-underline"><FontAwesomeIcon icon={fabGithub} size='lg' />&nbsp;@muditg317</ExternalLink><br/>
          
          
          <br/>
          {/* My research lies at the intersections of <b>machine learning</b>, <b>natural language processing</b>, and <b>social media</b>. I focus on designing algorithms for learning semantics from large data for natural language understanding, and natural language generation in particular with stylistic variations. I recently received the NSF CRII Award, Criteo Faculty Research Award, CrowdFlower AI for Everyone Award, Best Paper Award at COLING'18, as well as research funds from DARPA. I was a postdoctoral researcher at the University of Pennsylvania. I received my PhD in Computer Science from New York University, MS and BS from Tsinghua University.  */}
          
          <br/>
          <br/>
          {/* I am a senior area chair for NAACL 2021 (generation) and ACL 2020 (generation), and an area chair for EMNLP 2021 (computational social science), EMNLP 2020 (generation), AAAI 2020 (NLP), ACL 2019 (semantics), NAACL 2019 (generation), EMNLP 2018 (social media), COLING 2018 (semantics), EMNLP 2016 (generation), a workshop chair for ACL 2017, and the publicity chair for EMNLP 2019, NAACL 2018 and 2016. I also created a new undergraduate course on <a href="http://socialmedia-class.org/">Social Media and Text Analytics</a>.  */}
          
        </div>
      </div>
    </div>
  </div>
}