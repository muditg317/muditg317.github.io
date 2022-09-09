import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {ExternalLink} from 'components/external-link';
import { Page } from 'components/reusable/page';
import {Card} from 'components/reusable/card';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

const fasCode: IconProp = ['fas','code'];

export function AboutPage() {
  return <Page>
    <Card>
      <div className="w-full">
        <ExternalLink to="https://github.com/muditg317/muditg317.github.io" className="underline text-lg font-bold"><FontAwesomeIcon icon={fasCode} size='lg' className="w-6" />&nbsp;Source code</ExternalLink><br/>
        
        <br/>
        I tried way too hard on this to make a very dynamic website in typscript.
        There is a single source of truth for all pages/external redirects which is verified at compile-time and then rendered dynamically.
        This website served as not only a pseudo-portfolio, but also a great learning opportunity (mostly the latter).        
      </div>
    </Card>
  </Page>
}