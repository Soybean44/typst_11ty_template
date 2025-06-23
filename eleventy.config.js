import { NodeCompiler } from '@myriaddreamin/typst-ts-node-compiler';
import { readFile } from 'fs/promises';
import { JSDOM } from 'jsdom';

export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("src");

  // Change server config since the javascript only runs on page reload
  // This just makes development nicer since without it the svgs are really tiny
  // on live reload update
  eleventyConfig.setServerOptions({
    liveReload: true,
    domDiff: false,
  });

  // Registering typst markup language
  eleventyConfig.addTemplateFormats("typ");
  eleventyConfig.addExtension("typ", {
    outputFileExtension: "html", 
    compile : async function (inputContent, inputPath) {
      // Compile the typst document as a pdf
      const compiler = NodeCompiler.create();
      const raw_svg = compiler.svg({ mainFilePath: inputPath});

      // Read the template html file into a string
      const raw_html = await readFile('template.html', 'utf8');
      
      // The following happens in the resultant function so we can insert data variables using the jsdom api
      return async (data) => {
        // Create a jsdom object to manipulate the html
        const dom = new JSDOM(raw_html);
        const document = dom.window.document;
        
        // Insert the SVG into the content div
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = raw_svg;

        // Serialize the dom back into a string then return it
        const html_data = dom.serialize();
        console.log(html_data)
        return html_data;
      };
    }
  });
}
