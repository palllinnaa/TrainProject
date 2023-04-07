import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';
import {IParams, IPostsData} from '../src/interfaces';
import {VFile} from 'vfile';


const postsDirectory:string = path.join(process.cwd(), 'posts');


export function getSortedPostsData(){
    const fileNames:string[] = fs.readdirSync(postsDirectory);
    const allPostsData: IPostsData[] = fileNames.map((fileNames) => {
        const id:string = fileNames.replace(/\.md$/, '');

        const fullPath:string = path.join(postsDirectory, fileNames);
        const fileContents:string = fs.readFileSync(fullPath, 'utf8');
        const matterResult:matter.GrayMatterFile<string> = matter(fileContents);
        return {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            // ...matterResult.data,
        };
    });

    return allPostsData.sort((a,b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds(): IParams[] {
    const fileNames:string[] = fs.readdirSync(postsDirectory);
  
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
      return {
        params: {
            id: fileName.replace(/\.md$/, ''),
        },
      };
    });
  }

  export async function getPostData(id: string): Promise<IPostsData> {
    const fullPath:string = path.join(postsDirectory, `${id}.md`);
    const fileContents:string = fs.readFileSync(fullPath, 'utf8');

    const matterResult:matter.GrayMatterFile<string>  = matter(fileContents);
    const { title, date } = matterResult.data;

    const processedContent:VFile = await remark()
        .use(html)
        .process(matterResult.content);
    
    const contentHtml:string = processedContent.toString();

      return{
          id,
          contentHtml,
          title,
          date
      };
  }