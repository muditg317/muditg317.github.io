import { Page } from 'components/reusable/page';
import { Card } from 'components/reusable/card';
import {blogPosts} from 'data';

const dateStringOptions = { year: 'numeric', month: 'long', day: 'numeric' } as const;

export function Blog() {
  return <Page>
    {blogPosts.map(post => {
      return <Card>
        <div className="w-full">
          <div className="text-2xl font-semibold pt-3 w-full flex justify-between">
            <p>{post.title}: </p><p className="text-lg text-gray-500">{post.date.toLocaleDateString("en-US", dateStringOptions)}</p>
          </div>
          {post.contents}
        </div>
      </Card>;
    })}
  </Page>
}
