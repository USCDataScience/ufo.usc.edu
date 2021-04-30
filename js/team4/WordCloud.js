export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["../../data/team4/wordcloud_text.txt",new URL("../../data/team4/wordcloud_input",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Word Cloud of Email Subject when Reconnaissance is detected`
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","fontFamily","data","padding","rotate","fontScale","invalidation"], function(d3,width,height,fontFamily,data,padding,rotate,fontScale,invalidation)
{ var height = 640;
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("font-family", fontFamily)
      .attr("text-anchor", "middle");

  const cloud = d3.cloud()
      .size([width, height])
      .words(data.map(d => Object.create(d)))
      .padding(padding)
      .rotate(rotate)
      .font(fontFamily)
      .fontSize(d => Math.sqrt(d.value) * fontScale)
      .on("word", ({size, x, y, rotate, text}) => {
        svg.append("text")
            .attr("font-size", size)
            .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
            .text(text);
      });

  cloud.start();
  invalidation.then(() => cloud.stop());
  return svg.node();
}
);
  main.variable(observer("viewof source")).define("viewof source", ["html","FileAttachment"], async function(html,FileAttachment)
{
  const textarea = html`<textarea rows=10>`;
  textarea.value = (await FileAttachment("../../data/team4/wordcloud_text.txt").text()).trim();
  textarea.style = `
  display: block;
  boxSizing: border-box;
  width: calc(100% + 28px);
  font: var(--mono_fonts);
  border: none;
  border-radius: 0;
  padding: 6px 10px;
  margin: 0 -14px;
  background: #f5f5f5;
  tabSize: 2;
  outline: none;
  resize: none;
`;
  return textarea;
}
);
  main.variable(observer("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  main.variable(observer("fontFamily")).define("fontFamily", function(){return(
"sans-serif"
)});
  main.variable(observer("fontScale")).define("fontScale", function(){return(
15
)});
  main.variable(observer("rotate")).define("rotate", function(){return(
() => 0
)});
  main.variable(observer("padding")).define("padding", function(){return(
0
)});
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("words")).define("words", ["source","stopwords"], function(source,stopwords){return(
source.split(/[\s.]+/g)
  .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
  .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
  .map(w => w.replace(/['’]s$/g, ""))
  .map(w => w.substring(0, 30))
  .map(w => w.toLowerCase())
  .filter(w => w && !stopwords.has(w))
)});
  main.variable(observer()).define(["words"], function(words){return(
words.filter(w => /\W/.test(w))
)});
  main.variable(observer("data")).define("data", ["d3","words"], function(d3,words){return(
d3.rollups(words, group => group.length, w => w)
  .sort(([, a], [, b]) => d3.descending(a, b))
  .slice(0, 250)
  .map(([text, value]) => ({text, value}))
)});
  main.variable(observer("stopwords")).define("stopwords", function(){return(
new Set("i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall,FROM,FW,0,1,2,3,4,5,6,7,8,9,Re:,+,rrrrr,u,n,/,id#,nan,re,&".split(","))
)});
  main.variable(observer("d3")).define("d3", ["require"], async function(require){return(
Object.assign(await require("d3@6"), {cloud: await require("d3-cloud@1")})
)});
  return main;
}
