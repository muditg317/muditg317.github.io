import { Page } from 'components/reusable/page';
import { Card } from 'components/reusable/card';
import {projects} from 'data';

const dateStringOptions = { year: 'numeric', month: 'long', day: 'numeric' } as const;

export function Projects() {
  return <Page>
    {projects.map(project => {
      return <Card>
        <div className="w-full">
          <div className="w-full flex justify-between pt-3">
            <p>
              <span className="text-2xl font-semibold">
                {project.title}<br/>
              </span>
              {!!project.subtitle && <span className="text-lg font-semibold pt-2 text-gray-400">
                {project.subtitle}<br/>
              </span>}
            </p>
            <p className="text-lg font-semibold text-gray-500 text-right">
              {project.startDate.toLocaleDateString("en-US", dateStringOptions)}<br/>
              {project.endDate.toLocaleDateString("en-US", dateStringOptions)}
            </p>
          </div>
          {project.contents}
        </div>
      </Card>;
    })}
  </Page>
}
